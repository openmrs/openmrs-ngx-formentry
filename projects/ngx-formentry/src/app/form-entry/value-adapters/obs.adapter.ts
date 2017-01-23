import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { LeafNode, GroupNode } from '../form-factory/form-node';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';

@Injectable()
export class ObsValueAdapter implements ValueAdapter {

    constructor() { }

    generateFormPayload(form: Form) {
        // Traverse  to get all nodes
        let pages = this.traverse(form.rootNode);
        // Extract actual question nodes
        let questionNodes = this.getQuestionNodes(pages);
        // Get obs Payload
        return this.getObsPayload(questionNodes);
    }

    populateForm(form: Form, payload) {
        // Traverse  to get all nodes
        let pages = this.traverse(form.rootNode);
        // Extract actual question nodes
        let questionNodes = this.getQuestionNodes(pages);
        // Extract set obs
        this.setValues(questionNodes, payload);
    }

    setValues(nodes, payload?, forcegroup?) {
        if (nodes) {
            for (let node of nodes) {
                if (node instanceof LeafNode) {
                    this.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }

                } else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
                    let groupObs = _.find(payload, (o: any) => {
                        return o.concept.uuid === node.question.extras.questionOptions.concept;
                    });
                    if (groupObs) {
                        if (node.node) {
                            node.node['initialValue'] = groupObs;
                        }
                        this.setValues(node.groupMembers, groupObs.groupMembers);
                    }
                    if (forcegroup) {
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
            node.question.extras.questionOptions.rendering !== 'multiCheckbox') {
            let obs = _.find(payload, (o: any) => {
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
            let multiObs = _.filter(payload, (o: any) => {
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
        for (let o in node.children) {
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
        let obs = _.find(payload, (o: any) => {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });

        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            (dateField as LeafNode).control.setValue(obs.obsDatetime);
            (dateField as LeafNode).control.updateValueAndValidity();
        }
    }

    getMultiselectValues(multiObs) {
        let values = [];
        for (let m of multiObs) {
            values.push(m.value.uuid);
        }
        return values;
    }

    setRepeatingGroupValues(node, payload) {
        let groupRepeatingObs = _.filter(payload, (o: any) => {
            let found = o.concept.uuid === node.question.extras.questionOptions.concept;
            let intersect = false;
            if (found) {
                let obs = o.groupMembers.map((a) => {
                    return a.concept.uuid;
                });

                let schemaQuestions = node.question.questions.map((a) => {
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
        let groups = [];
        let index = 0;
        for (let child of node.node.children) {
            let children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            let groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        }
        this.setValues(groups, groupRepeatingObs, true);
    }

    getQuestionNodes(pages) {
        let merged = [];
        let arrays = [];
        for (let page of pages) {
            for (let section of page.page) {
                arrays.push(section.section);
            }
        }
        return merged.concat.apply([], arrays);
    }

    repeatingGroup(nodes) {
        let toReturn = [];
        for (let node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }

    processGroup(obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            let members = _.filter(this.getObsPayload(obs.groupMembers), (o: any) => {
                return o.value !== '';
            });
            let mappedMembers = members.map((a) => {
                return a.voided;
            });
            if (members.length > 0 && mappedMembers.every(Boolean)) {
                obsPayload.push({
                    uuid: obs.node.initialValue.uuid,
                    voided: true
                });
            } else if (members.length > 0) {
                obsPayload.push({
                    concept: obs.question.extras.questionOptions.concept,
                    groupMembers: members
                });
            }
        }
    }

    mapInitialGroup(group) {
        let current = {};
        for (let member of group.groupMembers) {
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
        let current = {};
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                let groupQuestion: any = _.find(node.question.questions, { key: key });
                let modelValue = value[key];
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
        let initialValues = [];
        if (node.node.initialValue) {
            for (let group of node.node.initialValue) {
                initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
            }
        }
        let repeatingModel = [];
        for (let value of node.node.control.value) {
            repeatingModel.push({ value: this.mapModelGroup(node, value) });
        }
        let deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        let newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        let newObsPayload = [];
        if (deleted.length > 0) {
            let deletedObs = this.createGroupDeletedObs(deleted);
            for (let d of deletedObs) {
                obsPayload.push(d);
            }
            if (newObs.length > 0) {
                newObsPayload = this.createGroupNewObs(newObs);
            }
        } else {
            newObsPayload = this.createGroupNewObs(newObs);
        }

        if (newObsPayload.length > 0) {
            obsPayload.push({ concept: node.question.extras.questionOptions.concept, groupMembers: newObsPayload });
        }
    }

    leftOuterJoinArrays(first, second) {
        let unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    }

    createGroupNewObs(payload) {
        let newPayload = [];
        for (let obs of payload) {
            /* tslint:disable */
            for (let key in obs.value) {
                let concept = key.split(':')[0];
                let value = key.split(':')[1];
                newPayload.push({ concept: concept, value: value });
            }
            /* tslint:enable */
        }
        return newPayload;
    }

    createGroupDeletedObs(payload) {
        let deletedObs = [];
        for (let d of payload) {
            deletedObs.push({ uuid: d.uuid, voided: true });
        }
        return deletedObs;
    }

    processObs(obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            let obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: obs.control.value
            };

            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox') {
                let multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    let mappedInitial = obs.initialValue.map((a) => {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    let mappedCurrent = multis.map((a) => {
                        return { value: a };
                    });
                    let deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    let newObs = this.leftOuterJoinArrays(mappedCurrent, mappedInitial);
                    this.processDeletedMultiSelectObs(deletedObs, obsPayload);
                    this.processNewMultiSelectObs(newObs, obsPayload);
                } else {
                    this.processNewMultiSelectObs(multis, obsPayload);
                }
            } else {
                if (obs.initialValue && obs.initialValue.value && obsValue) {
                    this.updateOrVoidObs(obsValue, obs.initialValue, obsPayload);
                } else if (obsValue.value !== '') {
                    obsPayload.push(obsValue);
                }
            }
        }
    }

    processComplexObs(node, obsPayload) {
        let valueField: any;
        let dateField: any;

        // tslint:disable-next-line:forin
        for (let o in node.children) {
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
            let createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
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
        for (let value of values) {
            obsPayload.push({ uuid: value.uuid, voided: true });
        }
    }

    processNewMultiSelectObs(values, obsPayload) {
        for (let multi of values) {
            if (multi.value instanceof Object) {
                obsPayload.push(multi.value);
            } else {
                obsPayload.push(multi);
            }
        }
    }

    updateOrVoidObs(obsValue, initialValue, obsPayload) {
        if (obsValue.value === '' && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        } else if (obsValue.value !== '' && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
    }

    traverse(o, type?) {
        let questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                let returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (let key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                let page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                let section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                let qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                let rep = this.repeatingGroup(o.children[key].children);
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
        let multiSelectObs = [];
        for (let value of values) {
            let obs = {
                concept: concept,
                value: value
            };
            multiSelectObs.push(obs);
        }
        return multiSelectObs;
    }


    isObs(node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    }

    getObsPayload(nodes) {
        let obsPayload = [];
        for (let node of nodes) {
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
