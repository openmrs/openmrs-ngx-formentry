import { Injectable } from "@angular/core";

import { NodeBase, GroupNode, ArrayNode } from "../form-factory/form-node";
import { Form } from "../form-factory";


@Injectable()
export class PatientIdenfierAdapater {
    generateFormPayload(form: Form, locationUuid: string) {
        return this.generateNodePayload(form.rootNode, locationUuid);
    }

    generateNodePayload(rootNode: NodeBase, locationUuid: string) {
        const nodes = this.getPatientIdentifierNodes(rootNode);
        const payload = [];
        nodes.forEach((node) => {
            if (
                node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== ''
            ) {
                payload.push({
                    identifierType: node.question.extras.questionOptions.identifierType,
                    identifier: node.control.value,
                    location: locationUuid,
                    preferred: false
                });
            }
        });
        return payload;
    }

    populateForm(form: Form, payload) {
        this.populateNode(form.rootNode, payload);
    }

    populateNode(rootNode: NodeBase, payload) {
        if (!Array.isArray(payload)) {
            throw new Error('Expected an array of patient identfiers');
        }

        const nodes = this.getPatientIdentifierNodes(rootNode);

        nodes.forEach((node) => {
            payload.forEach((element) => {
                if (
                    element.identifierType.uuid ===
                    node.question.extras.questionOptions.identifierType
                ) {
                    if (element.identifier) {
                        node.control.setValue(element.identifier);
                        node.initialValue = element.identifier;
                    }
                }
            });
        });
    }

    getPatientIdentifierNodes(rootNode: NodeBase): Array<NodeBase> {
        const results: Array<NodeBase> = [];
        this.getPatientidentifierTypeNodes(rootNode, results);
        return results;
    }

    private getPatientidentifierTypeNodes(
        rootNode: NodeBase,
        array: Array<NodeBase>
    ) {
        if (
            rootNode.question.extras &&
            rootNode.question.extras.type === 'patientIdentifier'
        ) {
            array.push(rootNode);
        }

        if (rootNode instanceof GroupNode) {
            const node = rootNode as GroupNode;
            for (const o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this.getPatientidentifierTypeNodes(node.children[o], array);
                }
            }
        }

        if (rootNode instanceof ArrayNode) {
            const node = rootNode as ArrayNode;
            node.children.forEach((child) => {
                this.getPatientidentifierTypeNodes(child, array);
            });
        }
    }
}