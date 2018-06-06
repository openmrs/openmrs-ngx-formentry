import { Injectable } from '@angular/core';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
import * as _ from 'lodash';
@Injectable()
export class OrderValueAdapter implements ValueAdapter {
    private formOrderNodes = [];
    private provider = '';

    generateFormPayload(form: Form) {
        this.formOrderNodes = [];
        this._setOrderProvider(form);
        this._findTestOrderQuestionNodes(form.rootNode);
        return this._createOrdersPayload(this.formOrderNodes, form);
    }

    populateForm(form: Form, payload) {
        form.existingOrders = payload;
        this.formOrderNodes = [];
        this._findTestOrderQuestionNodes(form.rootNode);
        let existingOrders = this._getExistingOrders(form);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    }

    private _setOrderProvider(form: Form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    }

    private _createOrdersPayload(orderNodes, form: Form) {
        let payload = [];
        let selectedOrders = [];
        let deletedOrders = [];
        let existingOrders = this._getExistingOrders(form);
        for (let orderNode of orderNodes) {
            let orderNodeValues = orderNode.control.value;
            let orders = [];
            if (existingOrders) {
                existingOrders.map(function (obj) {
                    orders[obj.concept] = obj.concept;
                });
            }


            for (let order in orderNodeValues) {
                if (orderNodeValues.hasOwnProperty(order)) {

                    let orderValue = orderNodeValues[order][orderNode.question.key];

                    let payloadOrder = this._createPayloadOrder(orderValue, orderNode.question.extras);

                    if (orders[orderValue] !== orderValue && payloadOrder.concept !== '') {

                        payload.push(payloadOrder);
                    }
                    selectedOrders[orderValue] = orderValue;
                    if (payloadOrder.orderNumber === '') {
                        delete payloadOrder.orderNumber;
                    }
                    if (payloadOrder.uuid === '') {
                        delete payloadOrder.uuid;
                    }
                }
            }

        }

        deletedOrders = this._getDeletedOrders(selectedOrders, existingOrders);
        return this._addDeletedOrdersToPayload(deletedOrders, payload);

    }

    private _getExistingOrders(form: Form) {
        if (form.existingOrders && form.existingOrders.orders) {
            let existingOrders = form.existingOrders.orders.map((o) => {
                return {
                    concept: o.concept.uuid,
                    orderNumber: o.orderNumber,
                    orderUuid: o.uuid,
                    voided: o.voided,
                    dateVoided: o.auditInfo.dateVoided
                };
            });

            return existingOrders = _.filter(existingOrders, (order: any) => {
                if (order.voided === true || order.dateVoided) {
                    return false;
                } else {
                    return true;
                }
            });
        } else {
            return;
        }

    }

    private _setOrderValues(node, existingOrders) {
        this._findTestOrderQuestionNodes(node);

        let orderNodes = this.formOrderNodes;
        for (let orderNode of orderNodes) {
            this._setOrderNodeValues(orderNode, existingOrders);
        }
    }

    private _addDeletedOrdersToPayload(deletedOrders, payload): any {
        for (let order in deletedOrders) {
            if (deletedOrders.hasOwnProperty(order)) {
                payload.push({ uuid: deletedOrders[order], voided: true });
            }
        }
        return payload;
    }

    private _createPayloadOrder(orderConcept, quesitonExtras): any {
        let order = {
            concept: '',
            type: '',
            orderer: '',
            careSetting: ''
        };
        order.concept = orderConcept;
        order.type = quesitonExtras.questionOptions.orderType;
        order.orderer = this.provider;
        order.careSetting = quesitonExtras.questionOptions.orderSettingUuid;

        // delete orderer if provider not provided
        if (order.orderer === '') {
            delete order.orderer;
        }

        return order;
    }

    private _getDeletedOrders(selectedOrders, existingOrders): any {
        let deleteOrders = [];
        if (selectedOrders) {
            for (let order in existingOrders) {
                if (existingOrders.hasOwnProperty(order)) {
                    let existingOrderConcept = existingOrders[order].concept;
                    let selectedOrder = selectedOrders[existingOrderConcept];
                    if (selectedOrder !== existingOrderConcept) {
                        deleteOrders.push(existingOrders[order].orderUuid);
                    }
                }
            }
        }
        console.log('Deleted Orders ', deleteOrders);
        return deleteOrders;
    }

    private _setOrderNodeValues(node, orders) {
        let index = 0;
        node['initialValue'] = orders;
        for (let order of orders) {
            node.createChildNode();
            let value = {};
            value[node.question.key] = order.concept;
            let childNode = node.children[index];
            childNode.control.setValue(value);
            childNode['initialValue'] = value;
            childNode['orderNumber'] = order.orderNumber;
            console.log('Set Value', node.children[index].control.value, node, childNode);
            index++;
        }
    }

    private _findTestOrderQuestionNodes(formNode) {

        if (formNode.children) {
            if (formNode.children instanceof Object) {
                for (let key in formNode.children) {
                    if (formNode.children.hasOwnProperty(key)) {
                        switch (formNode.children[key].question.renderingType) {
                            case 'page':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'section':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'group':
                                this._findTestOrderQuestionNodes(formNode.children[key]);

                                break;
                            case 'repeating':
                                if (formNode.children) {
                                    // tslint:disable-next-line:forin
                                    for (let node in formNode.children) {
                                        let question = formNode.children[node].question;
                                        if (question.extras && question.extras.type === 'testOrder') {
                                            this.formOrderNodes.push(formNode.children[node]);
                                        }
                                    }

                                }
                                break;
                            default:
                                break;

                        }
                    }
                }
            }

        }
    }

}
