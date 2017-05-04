import * as _ from 'lodash';

import { NodeBase, ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';

export class ObsAdapterHelper {
    constructor() {

    }

    findObsAnswerToQuestion(node: NodeBase, obsArray: Array<any>): Array<any> {
        let found = [];

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

        let childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
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
        let found = [];

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
        let found = [];

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
            let obsToUse = obs[0];

            // set initial value
            node.initialValue = obsToUse;

            if (obsToUse.value && obsToUse.value.uuid) {
                // answer to the obs is a concept, use uuid value
                this.setNodeFormControlValue(node, obsToUse.value.uuid);
            } else if (obsToUse.value) {
                this.setNodeFormControlValue(node, obsToUse.value);
            }
        }
    }

    setMultiselectObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            node.initialValue = obs;

            let obsUuids = [];
            for (let m of obs) {
                obsUuids.push(m.value.uuid);
            }

            this.setNodeFormControlValue(node, obsUuids);
        }
    }

    setComplexObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            let valueField: LeafNode; // essential memmber
            let dateField: LeafNode; // other member to be manipulated by user

            let nodeAsGroup = (node as GroupNode);
            // tslint:disable-next-line:forin
            for (let o in nodeAsGroup.children) {
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
            let groupNode = node as GroupNode;
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (let o in groupNode.children) {
                this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
            }
        }
    }

    setRepeatingGroupObsNodeValue(node: NodeBase, obs: Array<any>) {
        if (node && obs.length > 0) {
            let arrayNode = node as ArrayNode;
            arrayNode.initialValue = obs;

            for (let i = 0; i < obs.length; i++) {
                let createdNode = arrayNode.createChildNode();
                this.setGroupObsNodeValue(createdNode, [obs[i]]);
            }
        }
    }

    setNodeValue(node: NodeBase, obs: Array<any>) {
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    let groupNode = node as GroupNode;
                    // tslint:disable-next-line:forin
                    for (let o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    let arrayNode = node as ArrayNode;
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                let answeringObs = this.findObsAnswerToQuestion(node, obs);

                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;

            case 'multiselect':
                // search asnwering obs at this point
                let multiselectObs = this.findObsAnswerToQuestion(node, obs);

                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;


            case 'complex':
                // search asnwering obs at this point
                let complexObs = this.findObsAnswerToQuestion(node, obs);

                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;

            case 'group':
                let groupObs = this.findObsAnswerToQuestion(node, obs);

                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }

                break;
            case 'repeatingGroup':
                let repeatingGroupObs = this.findObsAnswerToQuestion(node, obs);

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
                node.question.extras.questionOptions.rendering === 'multiCheckbox') {
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

}
