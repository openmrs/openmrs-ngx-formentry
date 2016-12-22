import { Injectable } from '@angular/core';

import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { Form } from '../form-factory/form';

@Injectable()
export class PersonAttribuAdapter {
    constructor() { }

    generateFormPayload(form: Form) {
        return this.generateNodePayload(form.rootNode);
    }

    generateNodePayload(rootNode: NodeBase) {
        let nodes = this.getPersonAttributeNodes(rootNode);
        let payload = [];
        nodes.forEach(node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '' &&
                node.initialValue !== node.control.value) {

                if (node.question.extras.questionOptions.isSimpleValue === true) {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        value: node.control.value
                    });
                } else {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        hydratedObject: node.control.value
                    });
                }

            }
        });
        return payload;
    }

    populateForm(form: Form, payload) {
        this.populateNode(form.rootNode, payload);
    }

    populateNode(rootNode: NodeBase, payload) {
        if (!Array.isArray(payload)) {
            throw 'Expected an array of attributes';
        }

        let nodes = this.getPersonAttributeNodes(rootNode);

        nodes.forEach(node => {
            payload.forEach(element => {
                if (element.attributeType.uuid
                    === node.question.extras.questionOptions.attributeType) {
                    if (element.value.uuid) {
                        node.control.setValue(element.value.uuid);
                        node.initialValue = element.value.uuid;
                    } else {
                        node.control.setValue(element.value);
                        node.initialValue = element.value;
                    }
                }
            });
        });
    }

    getPersonAttributeNodes(rootNode: NodeBase): Array<NodeBase> {
        let results: Array<NodeBase> = [];
        this._getPersonAttributesNodes(rootNode, results);
        return results;
    }

    private _getPersonAttributesNodes(rootNode: NodeBase, array: Array<NodeBase>) {
        if (rootNode.question.extras &&
            rootNode.question.extras.type === 'personAttribute') {
            array.push(rootNode);
        }

        if (rootNode instanceof GroupNode) {
            let node = rootNode as GroupNode;
            // tslint:disable-next-line:forin
            for (let o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getPersonAttributesNodes(node.children[o], array);
                }
            }
        }

        if (rootNode instanceof ArrayNode) {
            let node = rootNode as ArrayNode;
            node.children.forEach(child => {
                this._getPersonAttributesNodes(child, array);
            });
        }
    }
}
