import { Injectable } from '@angular/core';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
import * as _ from 'lodash';
@Injectable()
export class OrderValueAdapter implements ValueAdapter {
  formOrderNodes = [];
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
    const existingOrders = this._getExistingOrders(form);
    this._setOrderValues(this.formOrderNodes, existingOrders);
  }

  private _setOrderProvider(form: Form) {
    if (form.valueProcessingInfo.providerUuid) {
      this.provider = form.valueProcessingInfo.providerUuid;
    }
  }

  private _createOrdersPayload(orderNodes, form: Form) {
    const payload = [];
    const selectedOrders = [];
    let deletedOrders = [];
    const existingOrders = this._getExistingOrders(form);
    for (const orderNode of orderNodes) {
      const orderNodeValues = orderNode.control.value;
      const orders = [];
      if (existingOrders) {
        existingOrders.map(function (obj) {
          orders[obj.concept] = obj.concept;
        });
      }

      for (const order in orderNodeValues) {
        if (orderNodeValues.hasOwnProperty(order)) {
          const orderValue = orderNodeValues[order][orderNode.question.key];

          const payloadOrder = this._createPayloadOrder(
            orderValue,
            orderNode.question.extras
          );

          if (
            orders[orderValue] !== orderValue &&
            payloadOrder.concept !== ''
          ) {
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

      return (existingOrders = _.filter(existingOrders, (order: any) => {
        if (order.voided === true || order.dateVoided) {
          return false;
        } else {
          return true;
        }
      }));
    } else {
      return;
    }
  }

  private _setOrderValues(node, existingOrders) {
    this._findTestOrderQuestionNodes(node);

    const orderNodes = this.formOrderNodes;
    for (const orderNode of orderNodes) {
      this._setOrderNodeValues(orderNode, existingOrders);
    }
  }

  private _addDeletedOrdersToPayload(deletedOrders, payload): any {
    for (const order in deletedOrders) {
      if (deletedOrders.hasOwnProperty(order)) {
        payload.push({ uuid: deletedOrders[order], voided: true });
      }
    }
    return payload;
  }

  private _createPayloadOrder(orderConcept, quesitonExtras): any {
    const order = {
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
    const deleteOrders = [];
    if (selectedOrders) {
      for (const order in existingOrders) {
        if (existingOrders.hasOwnProperty(order)) {
          const existingOrderConcept = existingOrders[order].concept;
          const selectedOrder = selectedOrders[existingOrderConcept];
          if (selectedOrder !== existingOrderConcept) {
            deleteOrders.push(existingOrders[order].orderUuid);
          }
        }
      }
    }
    // console.log('Deleted Orders ', deleteOrders);
    return deleteOrders;
  }

  private _setOrderNodeValues(node, orders) {
    let index = 0;
    node['initialValue'] = orders;
    for (const order of orders) {
      node.createChildNode();
      const value = {};
      value[node.question.key] = order.concept;
      const childNode = node.children[index];
      childNode.control.setValue(value);
      childNode['initialValue'] = value;
      childNode['orderNumber'] = order.orderNumber;
      // console.log('Set Value', node.children[index].control.value, node, childNode);
      index++;
    }
  }

  private _findTestOrderQuestionNodes(formNode) {
    if (formNode.children) {
      if (formNode.children instanceof Object) {
        for (const key in formNode.children) {
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
                  // eslint-disable-next-line guard-for-in
                  for (const node in formNode.children) {
                    const question = formNode.children[node].question;
                    if (
                      question.extras &&
                      question.extras.type === 'testOrder'
                    ) {
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
