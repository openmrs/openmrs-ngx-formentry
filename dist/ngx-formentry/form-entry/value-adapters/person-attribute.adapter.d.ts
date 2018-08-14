import { NodeBase } from '../form-factory/form-node';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
export declare class PersonAttribuAdapter implements ValueAdapter {
    constructor();
    generateFormPayload(form: Form): any[];
    generateNodePayload(rootNode: NodeBase): any[];
    populateForm(form: Form, payload: any): void;
    populateNode(rootNode: NodeBase, payload: any): void;
    getPersonAttributeNodes(rootNode: NodeBase): Array<NodeBase>;
    private _getPersonAttributesNodes(rootNode, array);
}
