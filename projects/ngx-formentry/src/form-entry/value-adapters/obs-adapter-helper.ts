import * as _ from 'lodash';
import * as moment_ from 'moment';

const moment = moment_;

import { NodeBase, ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';

export class ObsAdapterHelper {
    constructor() {

    }

    findObsAnswerToQuestion(node: NodeBase, obsArray: Array<any>): Array<any> {
        const found = [];

        if (!this.isObsNode(node)) {
            return found;
        }

        if (node instanceof LeafNode ||
            (node instanceof GroupNode &&
                node.question.extras.type === 'complex-obs')) {
            _.each(obsArray, (item) => {
                if (item.concept &&
                    item.concept.uuid === node.question.extras.questionOptions.concept) {
                    found.push(item);
                }
            });

            return found;
        }

        // At this point the node is either a group or a repeating node

        const childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
        if (childQuestionsUuids.length > 0) {
            _.each(obsArray, (obs) => {
                if (obs.concept &&
                    obs.concept.uuid === node.question.extras.questionOptions.concept &&
                    Array.isArray(obs.groupMembers) &&
                    this.isSubsetOf(childQuestionsUuids,
                        this.getGroupMembersConceptUuids(obs))) {
                    found.push(obs);
                }
            });
        }

        return found;
    }

    getChildQuestionsConceptUuids(node: NodeBase): Array<string> {
        const found = [];

        if (node.question.extras && node.question.extras.questions) {
            _.each(node.question.extras.questions, (question) => {
                if (question.questionOptions &&
                    question.questionOptions.concept) {
                    found.push(question.questionOptions.concept);
                }
            });
        }

        return found;
    }

    getGroupMembersConceptUuids(obsWithGroupMembers): Array<string> {
        const found = [];

        if (Array.isArray(obsWithGroupMembers.groupMembers)) {
            _.each(obsWithGroupMembers.groupMembers,
                (member) => {
                    found.push(member.concept.uuid);
                });
        }

        return found;
    }

    isObsNode(node: NodeBase): boolean {
        return node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child');
    }

    isSubsetOf(supersetArray: Array<any>, subsetArray: Array<any>): boolean {
        if (subsetArray.length === 0 && supersetArray.length === 0) {
            return true;
        }
        return subsetArray.every((element): boolean => {
            return supersetArray.indexOf(element) >= 0;
        });
    }

    setSimpleObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            const obsToUse = obs[0];

            // set initial value
            node.initialValue = obsToUse;

            if (!this.isEmpty(obsToUse.value) && obsToUse.value.uuid) {
                // answer to the obs is a concept, use uuid value
                this.setNodeFormControlValue(node, obsToUse.value.uuid);
            } else if (!this.isEmpty(obsToUse.value)) {
                this.setNodeFormControlValue(node, obsToUse.value);
            }
        }
    }

    setMultiselectObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            node.initialValue = obs;

            const obsUuids = [];
            for (const m of obs) {
                obsUuids.push(m.value.uuid);
            }

            this.setNodeFormControlValue(node, obsUuids);
        }
    }

    setComplexObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            let valueField: LeafNode; // essential memmber
            let dateField: LeafNode; // other member to be manipulated by user

            const nodeAsGroup = (node as GroupNode);
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                if ((nodeAsGroup.children[o] as LeafNode).question.extras.questionOptions.obsField === 'value') {
                    valueField = nodeAsGroup.children[o];
                }

                if ((nodeAsGroup.children[o] as LeafNode).question.extras.questionOptions.obsField === 'obsDatetime') {
                    dateField = nodeAsGroup.children[o];
                }
            }

            // set the obs value here
            this.setNodeValue(valueField, obs);
            node.initialValue = valueField.initialValue;

            // set the date value here
            dateField.initialValue = valueField.initialValue;
            this.setNodeFormControlValue(dateField, valueField.initialValue.obsDatetime);
        }
    }

    setGroupObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            const groupNode = node as GroupNode;
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (const o in groupNode.children) {
                this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
            }
        }
    }

    setRepeatingGroupObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            const arrayNode = node as ArrayNode;
            arrayNode.initialValue = obs;

            for (let i = 0; i < obs.length; i++) {
                const createdNode = arrayNode.createChildNode();
                this.setGroupObsNodeValue(createdNode, [obs[i]]);
            }
        }
    }

    setNodeValue(node: NodeBase, obs: Array<any>) {
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    const groupNode = node as GroupNode;
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const arrayNode = node as ArrayNode;
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                const answeringObs = this.findObsAnswerToQuestion(node, obs);

                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;

            case 'multiselect':
                // search asnwering obs at this point
                const multiselectObs = this.findObsAnswerToQuestion(node, obs);

                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;


            case 'complex':
                // search asnwering obs at this point
                const complexObs = this.findObsAnswerToQuestion(node, obs);

                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;

            case 'group':
                const groupObs = this.findObsAnswerToQuestion(node, obs);

                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }

                break;
            case 'repeatingGroup':
                const repeatingGroupObs = this.findObsAnswerToQuestion(node, obs);

                if (repeatingGroupObs.length > 0) {
                    this.setRepeatingGroupObsNodeValue(node, repeatingGroupObs);
                }

                break;
            default:
                console.error('Unknown obs node', node);
                break;
        }
    }

    setNodeFormControlValue(node: NodeBase, value) {
        node.control.setValue(value);
        // TODO: Determine if we need this call
        // node.control.updateValueAndValidity();

        // TODO: Remove this hack and put it in appropriate place
        if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
            node.question.setHistoricalValue(false);
        }
    }

    getObsNodeType(node: NodeBase): string {
        if (this.isObsNode(node)) {
            if (node instanceof LeafNode &&
                ( node.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                node.question.extras.questionOptions.rendering === 'checkbox' ||
                node.question.extras.questionOptions.rendering === 'multi-select') ) {
                return 'multiselect';
            }

            if (node instanceof LeafNode) {
                return 'simple';
            }

            if (node instanceof GroupNode &&
                node.question.extras.type === 'complex-obs') {
                return 'complex';
            }

            if (node instanceof ArrayNode &&
                node.question.extras.type === 'obsGroup' &&
                node.question.extras.questionOptions.rendering === 'repeating') {
                return 'repeatingGroup';
            }

            if (node instanceof GroupNode &&
                node.question.extras.type === 'obsGroup') {
                return 'group';
            }

            return 'unknownObs';
        }
        return 'unknown';
    }

    // PAYLOAD GENERATION FUNCTIONS
    getSimpleObsPayload(node: NodeBase): any {
        // check for empty values first
        if (this.isEmpty(node.control.value)) {
            if (node.initialValue) {
                // Handle case for existing voided obs
                return {
                    uuid: node.initialValue.uuid,
                    voided: true
                };
            }
            return null;
        }

        // check for exisiting, unchanged values
        if (node.initialValue && !this.simpleNodeValueChanged(node)) {
            return null;
        }

        // all numbers, text, concepts answers are handled in the same way
        // no need for further formatting in this case
        const obs: any = {
            concept: node.question.extras.questionOptions.concept,
            value: node.control.value
        };

        // handle date fields
        if (node.question.extras.questionOptions.rendering === 'date') {
            obs.value = this.toOpenMrsDateTimeString(node.control.value);
        }

        if (node.initialValue) {
            // for existing cases, delete concept property, and add uuid
            delete obs.concept;
            obs.uuid = node.initialValue.uuid;
        }

        return obs;
    }

    getComplexObsPayload(node: NodeBase) {
        let valueField: LeafNode; // essential memmber
        let dateField: LeafNode; // other member to be manipulated by user

        const nodeAsGroup = (node as GroupNode);
        // tslint:disable-next-line:forin
        for (const o in nodeAsGroup.children) {
            if ((nodeAsGroup.children[o] as LeafNode).question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }

            if ((nodeAsGroup.children[o] as LeafNode).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }

        const valuePayload = this.getObsNodePayload(valueField);
        console.log('valuePayload', valuePayload);

        // set obs datetime for the generated payload
        if (valuePayload.length > 0) {
            valuePayload[0].obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
            return valuePayload[0];
        } else if (valuePayload.length === 0 && node.initialValue) {
            // determine if date changed
            if (!this.areDatesEqual(node.initialValue.obsDatetime, dateField.control.value)) {
                const payload: any = {
                    uuid: node.initialValue.uuid,
                };
                payload.obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                return payload;
            }
        }
        return null;
    }

    getMultiselectObsPayload(node: NodeBase): Array<any> {
        const payload: Array<any> = [];

        const existingUuids = [];

        // add voided obs i.e. deleted options
        if (Array.isArray(node.initialValue)) {
            _.each(node.initialValue, (item) => {
                existingUuids.push(item.value.uuid);
                if (Array.isArray(node.control.value)) {
                    if (node.control.value.indexOf(item.value.uuid) < 0) {
                        payload.push({
                            uuid: item.uuid,
                            voided: true
                        });
                    }
                } else {
                    // every value was deleted
                    payload.push({
                        uuid: item.uuid,
                        voided: true
                    });
                }
            });
        }

        // add new obs i.e they didn't exisit originally
        if (Array.isArray(node.control.value)) {
            _.each(node.control.value, (item) => {
                if (existingUuids.indexOf(item) < 0) {
                    payload.push({
                        concept: node.question.extras.questionOptions.concept,
                        value: item
                    });
                }
            });
        }

        return payload;
    }

    getGroupPayload(node: NodeBase) {
        const nodeAsGroup: GroupNode = node as GroupNode;

        let childrenPayload = [];
        _.each(nodeAsGroup.children, (child) => {
            const payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        });

        if (childrenPayload.length === 0) {
            return null;
        }

        const groupPayload: any = {
            groupMembers: childrenPayload
        };

        if (nodeAsGroup.initialValue) {
            groupPayload.uuid = nodeAsGroup.initialValue.uuid;

        } else {
            groupPayload.concept = nodeAsGroup.question.extras.questionOptions.concept;
        }

        return groupPayload;
    }

    getRepeatingGroupPayload(node: NodeBase) {
        const nodeAsArray: ArrayNode = node as ArrayNode;

        let childrenPayload = [];

        const groupsUuidsAfterEditting = [];
        _.each(nodeAsArray.children, (child) => {
            const payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
            if (child.initialValue && child.initialValue.uuid) {
                groupsUuidsAfterEditting.push(child.initialValue.uuid);
            }
        });

        // void deleted groups
        // console.log('groupsUuidsAfterEditting', groupsUuidsAfterEditting);
        if (nodeAsArray.initialValue && Array.isArray(nodeAsArray.initialValue)) {
            _.each(nodeAsArray.initialValue, (obs) => {
                if (groupsUuidsAfterEditting.indexOf(obs.uuid) < 0) {
                    const voidedGroup = {
                        uuid: obs.uuid,
                        voided: true
                    };
                    childrenPayload.push(voidedGroup);
                }
            });
        }

        if (childrenPayload.length <= 0) {
            return null;
        }
        return childrenPayload;

    }

    getObsNodePayload(node: NodeBase): Array<any> {
        let payload = [];

        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    const groupNode = node as GroupNode;
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        const groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const arrayNode = node as ArrayNode;
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        const arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                const simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;

            case 'multiselect':
                const multiselectObs = this.getMultiselectObsPayload(node);

                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;

            case 'complex':
                const complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;

            case 'group':
                const groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                const repeatingGroupedObs = this.getRepeatingGroupPayload(node);
                if (Array.isArray(repeatingGroupedObs) && repeatingGroupedObs.length > 0) {
                    payload = payload.concat(repeatingGroupedObs);
                }
                break;
            default:
                break;
        }

        return payload;
    }

    simpleNodeValueChanged(node: NodeBase): boolean {
        if (node.initialValue) {
            if (node.initialValue.value && node.initialValue.value.uuid) {
                // question whose answer is a concept
                return node.control.value !== node.initialValue.value.uuid;
            }

            if (node.question.extras.questionOptions.rendering === 'date') {
                return !this.areDatesEqual(node.control.value, node.initialValue.value);
            }
            return node.control.value !== node.initialValue.value;
        }
        return false;
    }

    areDatesEqual(date1, date2) {
        return moment(date1).isSame(date2);
    }

    isEmpty(value): boolean {
        if (value === '' ||
            value === null ||
            value === undefined
            // || value === [] ||
            // value === {}
        ) {
            return true;
        }
        return false;
    }

    toOpenMrsDateTimeString(datetime: string): string {
        if (this.isEmpty(datetime)) {
            return undefined;
        } else {
            // transform value to memoent value to avoid error
            const formattedVal = moment(datetime).format();
            const val = formattedVal.substring(0, 19).replace('T', ' ');
            return this.isEmpty(val) ? undefined : val;

        }
    }

}
