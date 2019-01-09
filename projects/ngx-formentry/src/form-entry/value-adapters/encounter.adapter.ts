import { Injectable } from '@angular/core';

import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { Form } from '../form-factory/form';

import { ValueAdapter } from './value.adapter';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';

import * as moment_ from 'moment';

const moment = moment_;

@Injectable()
export class EncounterAdapter implements ValueAdapter {

    constructor(public ordersAdapter: OrderValueAdapter, public obsAdapter: ObsValueAdapter) { }

    populateForm(form: Form, payload) {
        this.populateNode(form.rootNode, payload);

        if (Array.isArray(payload.orders)) {
            this.ordersAdapter.populateForm(form, payload);
        }
        if (Array.isArray(payload.obs)) {
            this.obsAdapter.populateForm(form, payload.obs);
        }
    }

    populateNode(rootNode: NodeBase, payload) {

        if (payload === undefined || payload === null) {
            throw new Error('Expected payload');
        }

        const nodes = this.getEncounterNodes(rootNode);

        nodes.forEach(node => {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        // console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment(payload['encounterDatetime']).toDate());
                        node.initialValue = moment(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (Array.isArray(payload['encounterProviders']) && payload['encounterProviders'].length > 0) {
                        const firstProvider: any = payload['encounterProviders'][0].provider;
                        if (firstProvider && firstProvider.uuid) {
                            //Very weird work around for an issue with setting the value
                            node.control.setValue(firstProvider.uuid);
                            setTimeout(()=>{
                                node.control.setValue(firstProvider.uuid);
                            });
                            node.initialValue = firstProvider.uuid;
                        }
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
        const payload = this.generateNodePayload(form.rootNode);

        this.setNonFilledPayloadMembers(form, payload);

        payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];

        payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];

        return payload;
    }

    generateNodePayload(rootNode: NodeBase) {
        const nodes = this.getEncounterNodes(rootNode);
        const payload = {};

        nodes.forEach(node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        const dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            const providers = [];
                            providers.push({
                                provider: node.control.value,
                                encounterRole: 'a0b03050-c99b-11e0-9572-0800200c9a66' // unknown provider role in the encounter as default
                            });
                            payload['encounterProviders'] = providers;
                        }
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
        const results: Array<NodeBase> = [];
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
            const node = rootNode as GroupNode;
            // tslint:disable-next-line:forin
            for (const o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }

        if (rootNode instanceof ArrayNode) {
            const node = rootNode as ArrayNode;
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
