import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
export declare class OrderValueAdapter implements ValueAdapter {
    formOrderNodes: any[];
    private provider;
    generateFormPayload(form: Form): any;
    populateForm(form: Form, payload: any): void;
    private _setOrderProvider(form);
    private _createOrdersPayload(orderNodes, form);
    private _getExistingOrders(form);
    private _setOrderValues(node, existingOrders);
    private _addDeletedOrdersToPayload(deletedOrders, payload);
    private _createPayloadOrder(orderConcept, quesitonExtras);
    private _getDeletedOrders(selectedOrders, existingOrders);
    private _setOrderNodeValues(node, orders);
    private _findTestOrderQuestionNodes(formNode);
}
