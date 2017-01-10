import { Injectable } from '@angular/core';

import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { Form } from '../form-factory/form';

import { ValueAdapter } from './value.adapter';

const moment = require('moment');

@Injectable()
export class EncounterAdapter implements  ValueAdapter {

    constructor() { }

    populateForm(form: Form, payload) {
        this.populateNode(form.rootNode, payload);

        // Populate obs by using the obs payload
        // Populate orders by using the orders payload
    }

    populateNode(rootNode: NodeBase, payload) {

        if (payload === undefined || payload === null) {
            throw 'Expected payload';
        }

        let nodes = this.getEncounterNodes(rootNode);

        nodes.forEach(node => {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment(payload['encounterDatetime']).toDate());
                        node.initialValue = moment(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (payload['provider'] && payload['provider'].person) {
                        node.control.setValue(payload['provider'].person.uuid);
                        node.initialValue = payload['provider'].person.uuid;
                    }
                    break;
                case 'encounterLocation':
                    if (payload['location'] && payload['location'].uuid) {
                        node.control.setValue(payload['location'].uuid);
                        node.initialValue = payload['location'].uuid;
                    }
                    break;
                default:
                    break;
            }
        });
    }

    generateFormPayload(form: Form) {
        let payload = this.generateNodePayload(form.rootNode);

        this.setNonFilledPayloadMembers(form, payload);

        // Generate obs payload and attach to encounter
        // Generate orders payload and attach to encounter
        return payload;
    }

    generateNodePayload(rootNode: NodeBase) {
        let nodes = this.getEncounterNodes(rootNode);
        let payload = {};

        nodes.forEach(node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        let dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        payload['provider'] = node.control.value;
                        break;
                    case 'encounterLocation':
                        payload['location'] = node.control.value;
                        break;
                    default:
                        break;
                }
            }
        });

        return payload;
    }

    getEncounterNodes(rootNode: NodeBase): Array<NodeBase> {
        let results: Array<NodeBase> = [];
        this._getEncounterNodes(rootNode, results);
        return results;
    }

    setNonFilledPayloadMembers(form: Form, payload) {
        if (form.valueProcessingInfo.patientUuid) {
            this.setPayloadPatientUuid(payload, form.valueProcessingInfo.patientUuid);
        }

        if (form.valueProcessingInfo.visitUuid) {
            this.setPayloadVisitUuid(payload, form.valueProcessingInfo.visitUuid);
        }

        if (form.valueProcessingInfo.encounterTypeUuid) {
            this.setPayloadEncounterTypeUuid(payload, form.valueProcessingInfo.encounterTypeUuid);
        }

        if (form.valueProcessingInfo.formUuid) {
            this.setPayloadFormUuid(payload, form.valueProcessingInfo.formUuid);
        }

        if (form.valueProcessingInfo.encounterUuid) {
            this.setPayloadEncounterUuid(payload, form.valueProcessingInfo.encounterUuid);
        }
    }

    setPayloadPatientUuid(payload, patientUuid: string) {
        payload['patient'] = patientUuid;
    }

    setPayloadVisitUuid(payload, visitUuid: string) {
        payload['visit'] = visitUuid;
    }

    setPayloadEncounterTypeUuid(payload, encounterTypeUuid: string) {
        payload['encounterType'] = encounterTypeUuid;
    }

    setPayloadFormUuid(payload, formUuid: string) {
        payload['form'] = formUuid;
    }

    setPayloadEncounterUuid(payload, encounterUuid: string) {
        payload['uuid'] = encounterUuid;
    }

    private _getEncounterNodes(rootNode: NodeBase, array: Array<NodeBase>) {
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }

        if (rootNode instanceof GroupNode) {
            let node = rootNode as GroupNode;
            // tslint:disable-next-line:forin
            for (let o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }

        if (rootNode instanceof ArrayNode) {
            let node = rootNode as ArrayNode;
            node.children.forEach(child => {
                this._getEncounterNodes(child, array);
            });
        }
    }

    private _isEncounterNode(node: NodeBase): boolean {
        if (node.question.extras &&
            (node.question.extras.type === 'encounterDatetime' ||
                node.question.extras.type === 'encounterProvider' ||
                node.question.extras.type === 'encounterLocation')) {
            return true;
        }
        return false;
    }
}
