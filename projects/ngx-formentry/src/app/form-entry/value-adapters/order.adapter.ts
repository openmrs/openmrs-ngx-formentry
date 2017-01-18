import { Injectable } from '@angular/core';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
import * as _ from 'lodash';
@Injectable()
export class OrderValueAdapter implements ValueAdapter {
    formOrderNodes = [];
    existingOrders = [];
    private provider = '';

    generateFormPayload(form: Form) {
        this.formOrderNodes = [];
        this._setOrderProvider(form);
        this._findTestOrderQuestionNodes(form.rootNode);
        return this._createOrdersPayload(this.formOrderNodes);
    }

    populateForm(form: Form, payload) {
        this.formOrderNodes = [];
        this._findTestOrderQuestionNodes(form.rootNode);
        let existingOrders = this._getExistingOrders(payload);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    }

    private _setOrderProvider(form: Form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    }

    private _createOrdersPayload(orderNodes) {
        let payload = [];
        let selectedOrders = [];
        let deletedOrders = [];

        for (let orderNode of orderNodes) {
            let orderNodeValues = orderNode.control.value;
            let orders = [];
            this.existingOrders.map(function (obj) {
                orders[obj.concept] = obj.concept;
            });

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

        deletedOrders = this._getDeletedOrders(selectedOrders);
        this._addDeletedOrdersToPayload(deletedOrders, payload);

        return _.uniqBy(payload, function (order) {
            return order.concept;
        });
    }

    private _getExistingOrders(encounterPayload) {

        let existingOrders = encounterPayload.orders.map((o) => {
            return {
                concept: o.concept.uuid,
                orderNumber: o.orderNumber,
                orderUuid: o.uuid,
                voided: o.voided,
            };
        });

        return this.existingOrders = _.filter(existingOrders, (order: any) => {
            if (order.voided === true) {
                return false;
            } else {
                return true;
            }
        });

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

    private _getDeletedOrders(selectedOrders): any {
        let deleteOrders = [];
        if (selectedOrders) {
            for (let order in this.existingOrders) {
                if (this.existingOrders.hasOwnProperty(order)) {
                    let existingOrderConcept = this.existingOrders[order].concept;
                    let selectedOrder = selectedOrders[existingOrderConcept];
                    if (selectedOrder !== existingOrderConcept) {
                        deleteOrders.push(this.existingOrders[order].orderUuid);
                    }
                }
            }
        }
        console.log('Deleted Orders ', deleteOrders);
        return deleteOrders;
    }

    private _setOrderNodeValues(node, orders) {
        let index = 0;
        for (let order of orders) {
            node.createChildNode();
            let value = {};
            value[node.question.key] = order.concept;
            let childNode = node.children[index];
            childNode.control.setValue(value);
            childNode['orderNumber'] = order.orderNumber;
            console.log('Set Value', node.children[index].control.value);
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
