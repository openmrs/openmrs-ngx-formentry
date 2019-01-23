import { Injectable } from '@angular/core';
import 'rxjs';

import * as _ from 'lodash';

import { LeafNode, GroupNode } from '../form-factory/form-node';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
import { ObsAdapterHelper } from './obs-adapter-helper';

@Injectable()
export class ObsValueAdapter implements ValueAdapter {

    constructor(private helper: ObsAdapterHelper) { }

    generateFormPayload(form: Form) {
        return this.helper.getObsNodePayload(form.rootNode);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Get obs Payload
        // return this.getObsPayload(questionNodes);
    }

    populateForm(form: Form, payload) {
        this.helper.setNodeValue(form.rootNode, payload);

        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Extract set obs
        // this.setValues(questionNodes, payload);
    }

    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable

    setValues(nodes, payload?, forcegroup?) {
        if (nodes) {
            for (const node of nodes) {
                if (node instanceof LeafNode) {
                    this.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }

                } else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
                    const groupObs = _.find(payload, (o: any) => {
                        return o.concept.uuid === node.question.extras.questionOptions.concept && o.groupMembers;
                    });
                    if (groupObs) {
                        if (node.node) {
                            node.node['initialValue'] = groupObs;
                        }

                        this.setValues(node.groupMembers, groupObs.groupMembers);
                    }
                    if (forcegroup && node.payload) {
                        this.setValues(node.groupMembers, node.payload.groupMembers);
                    }


                } else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this.setComplexObsValue(node, payload);
                } else if (node.question && node.question.extras && node.question.renderingType === 'repeating' && !forcegroup) {
                    this.setRepeatingGroupValues(node, payload);
                    node.node.control.updateValueAndValidity();
                } else {
                    throw new Error('not implemented');
                }
            }
        }
    }

    setObsValue(node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
            (node.question.extras.type === 'complex-obs-child' &&
            node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox' ||
            node.question.extras.questionOptions.rendering !== 'checkbox' ||
            node.question.extras.questionOptions.rendering !== 'multi-select') {
            const obs = _.find(payload, (o: any) => {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (obs) {
                if (obs.value instanceof Object) {
                    node.control.setValue(obs.value.uuid);
                    node.control.updateValueAndValidity();
                } else {
                    node.control.setValue(obs.value);
                    node.control.updateValueAndValidity();
                }
                node['initialValue'] = { obsUuid: obs.uuid, value: obs.value };
            }
        } else {
            const multiObs = _.filter(payload, (o: any) => {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (multiObs && multiObs.length > 0) {
                node.control.setValue(this.getMultiselectValues(multiObs));
                node.control.updateValueAndValidity();
                node['initialValue'] = multiObs;
            }
        }
    }

    setComplexObsValue(node, payload) {
        let valueField: any;
        let dateField: any;

        // tslint:disable-next-line:forin
        for (const o in node.children) {
            if ((node.children[o] as LeafNode).question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }

            if ((node.children[o] as LeafNode).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        // set the usual obs value
        this.setObsValue(valueField, payload);

        // set the obs date
        const obs = _.find(payload, (o: any) => {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });

        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            (dateField as LeafNode).control.setValue(obs.obsDatetime);
            (dateField as LeafNode).control.updateValueAndValidity();
        }
    }

    getMultiselectValues(multiObs) {
        const values = [];
        for (const m of multiObs) {
            values.push(m.value.uuid);
        }
        return values;
    }

    setRepeatingGroupValues(node, payload) {
        const groupRepeatingObs = _.filter(payload, (o: any) => {
            const found = o.concept.uuid === node.question.extras.questionOptions.concept;
            let intersect = false;
            if (found && o.groupMembers) {
                const obs = o.groupMembers.map((a) => {
                    return a.concept.uuid;
                });

                const schemaQuestions = node.question.questions.map((a) => {
                    return a.extras.questionOptions.concept;
                });

                intersect = (_.intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        });
        if (groupRepeatingObs.length > 0) {
            node.node['initialValue'] = groupRepeatingObs;
            for (let i = 0; i < groupRepeatingObs.length; i++) {
                node.node.createChildNode();
            }
        }
        const groups = [];
        let index = 0;
        for (const child of node.node.children) {
            const children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            const groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        }
        this.setValues(groups, groupRepeatingObs, true);
    }

    getQuestionNodes(pages) {
        const merged = [];
        const arrays = [];
        for (const page of pages) {
            for (const section of page.page) {
                arrays.push(section.section);
            }
        }
        return merged.concat.apply([], arrays);
    }

    repeatingGroup(nodes) {
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }

    processGroup(obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            const members = _.filter(this.getObsPayload(obs.groupMembers), (o: any) => {
                return o.value !== '';
            });

            const mappedMembers = members.map((a) => {
                return a.voided;
            });
            if (members.length > 0 && mappedMembers.every(Boolean)) {
                obsPayload.push({
                    uuid: obs.node.initialValue.uuid,
                    voided: true
                });
            } else if (members.length > 0) {
                if (obs.node.initialValue) {
                    obsPayload.push({
                        uuid: obs.node.initialValue.uuid,
                        groupMembers: members
                    });
                } else {
                    obsPayload.push({
                        concept: obs.question.extras.questionOptions.concept,
                        groupMembers: members
                    });
                }
            }
        }
    }

    mapInitialGroup(group) {
        let current = {};
        for (const member of group.groupMembers) {
            let value: any = '';
            if (member.value instanceof Object) {
                value = member.value.uuid;
            } else if (member.value) {
                value = member.value;
            } else if (member.groupMembers && member.groupMembers.length > 0) {
                current = this.mapInitialGroup(group);
            }
            current[member.concept.uuid + ':' + value] = value;
        }
        return current;
    }

    mapModelGroup(node, value) {
        const current = {};
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const groupQuestion: any = _.find(node.question.questions, { key: key });
                const modelValue = value[key];
                if (modelValue instanceof Object) {
                } else if (modelValue !== '') {
                    current[groupQuestion.extras.questionOptions.concept + ':'
                        + modelValue] = modelValue;
                }
            }

        }
        return current;
    }

    processRepeatingGroups(node, obsPayload) {
        const initialValues = [];
        if (node.node.initialValue) {
            for (const group of node.node.initialValue) {
                initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
            }
        }
        const repeatingModel = [];
        for (const value of node.node.control.value) {
            repeatingModel.push({ value: this.mapModelGroup(node, value) });
        }
        const deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        const newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        const groupConcept = node.question.extras.questionOptions.concept;
        let newObsPayload = [];
        if (deleted.length > 0) {
            const deletedObs = this.createGroupDeletedObs(deleted);
            for (const d of deletedObs) {
                obsPayload.push(d);
            }
            if (newObs.length > 0) {
                newObsPayload = this.createGroupNewObs(newObs, groupConcept);
            }
        } else {
            newObsPayload = this.createGroupNewObs(newObs, groupConcept);
        }

        if (newObsPayload.length > 0) {
            for (const p of newObsPayload) {
                obsPayload.push(p);
            }
        }
    }

    leftOuterJoinArrays(first, second) {
        const unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    }

    createGroupNewObs(payload, groupConcept) {
        const newPayload = [];
        for (const obs of payload) {
            const groupPayload = [];
            /* tslint:disable */
            for (let key in obs.value) {
                let concept = key.split(':')[0];
                let value = key.split(':')[1];
                groupPayload.push({ concept: concept, value: value });
            }
            newPayload.push({ concept: groupConcept, groupMembers: groupPayload })
            /* tslint:enable */
        }
        return newPayload;
    }

    createGroupDeletedObs(payload) {
        const deletedObs = [];
        for (const d of payload) {
            deletedObs.push({ uuid: d.uuid, voided: true });
        }
        return deletedObs;
    }

    getExactTime(datetime: string) {
        return datetime.substring(0, 19).replace('T', ' ');
    }

    processObs(obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            const obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };

            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
            obs.question.extras.questionOptions.rendering === 'checkbox' ||
            obs.question.extras.questionOptions.rendering === 'multi-select') {
                const multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    const mappedInitial = obs.initialValue.map((a) => {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    const mappedCurrent = multis.map((a) => {
                        return { value: a };
                    });
                    const deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    const newObs = this.leftOuterJoinArrays(mappedCurrent, mappedInitial);
                    this.processDeletedMultiSelectObs(deletedObs, obsPayload);
                    this.processNewMultiSelectObs(newObs, obsPayload);
                } else {
                    this.processNewMultiSelectObs(multis, obsPayload);
                }
            } else {
                if (obs.initialValue && obs.initialValue.value && obsValue) {
                    this.updateOrVoidObs(obsValue, obs.initialValue, obsPayload);
                } else if (obsValue.value !== '' && obsValue.value !== null) {
                    obsPayload.push(obsValue);
                }
            }
        }
    }

    processComplexObs(node, obsPayload) {
        let valueField: any;
        let dateField: any;

        // tslint:disable-next-line:forin
        for (const o in node.children) {
            if ((node.children[o] as LeafNode).question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }

            if ((node.children[o] as LeafNode).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }

        if (valueField) {
            // process obs as usual
            this.processObs(valueField, obsPayload);

            // obtain the last inserted obs and set the obsDatetime
            const createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
            if (createdPayload &&
                ((createdPayload.concept && createdPayload.concept === node.question.extras.questionOptions.concept) ||
                    (valueField.initialValue && createdPayload.uuid === valueField.initialValue.obsUuid))) {
                if (dateField.initialValue && dateField.control.value !== dateField.initialValue.value) {
                    createdPayload.obsDatetime = dateField.control.value;
                }
            }
        }
    }

    processDeletedMultiSelectObs(values, obsPayload) {
        for (const value of values) {
            obsPayload.push({ uuid: value.uuid, voided: true });
        }
    }

    processNewMultiSelectObs(values, obsPayload) {
        for (const multi of values) {
            if (multi.value instanceof Object) {
                obsPayload.push(multi.value);
            } else {
                obsPayload.push(multi);
            }
        }
    }

    updateOrVoidObs(obsValue, initialValue, obsPayload) {
        if (this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        } else if (!this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
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

    traverse(o, type?) {
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page, label: o.children[key].question.label });
                                break;
                            case 'section':
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section, node: o.children[key], label: o.children[key].question.label });
                                break;
                            case 'group':
                                const qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                const rep = this.repeatingGroup(o.children[key].children);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: rep });
                                break;
                            default:
                                questions.push(o.children[key]);
                                break;

                        }
                    }
                }
            }

        }
        return questions;
    }

    processMultiSelect(concept, values) {
        const multiSelectObs = [];
        if (values && values !== null) {
            for (const value of values) {
                const obs = {
                    concept: concept,
                    value: value
                };
                multiSelectObs.push(obs);
            }
        }
        return multiSelectObs;
    }


    isObs(node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    }

    getObsPayload(nodes) {
        const obsPayload = [];
        for (const node of nodes) {
            if (this.isObs(node)) {
                if (node.groupMembers, node.question.extras.questionOptions.rendering === 'group') {

                    this.processGroup(node, obsPayload);

                } else if (node.groupMembers, node.question.extras.questionOptions.rendering === 'repeating') {
                    this.processRepeatingGroups(node, obsPayload);
                } else if (node instanceof GroupNode && (node as GroupNode).question.extras.type === 'complex-obs') {
                    this.processComplexObs(node, obsPayload);
                } else {
                    this.processObs(node, obsPayload);
                }
            }
        }
        return obsPayload;
    }
}
