import { Injectable } from '@angular/core';

import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { Form } from '../form-factory';
import { Identifier } from './types';

@Injectable()
export class PatientIdentifierAdapter {
  generateFormPayload(form: Form, locationUuid: string) {
    return this.generateNodePayload(form.rootNode, locationUuid);
  }

  generateNodePayload(rootNode: NodeBase, locationUuid: string) {
    const nodes = this.getPatientIdentifierNodes(rootNode);
    const payload = [];
    nodes.forEach((node) => {
      // Skip hidden identifier fields when building the payload so we never
      // submit a value the user cannot see.
      if (node.control.hidden === true) {
        return;
      }
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

  populateForm(form: Form, payload: Array<Identifier>) {
    this.populateNode(form.rootNode, payload);
  }

  populateNode(rootNode: NodeBase, payload: Array<Identifier>) {
    if (!Array.isArray(payload)) {
      throw new Error('Expected an array of patient identifiers');
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
            // Keep the existing identifier value even while the control is
            // hidden. A hiding expression may hide the field at load time and
            // only reveal it later; without this the hider would null the value
            // and the field would appear empty once shown. Hidden identifiers
            // are still excluded from the payload in generateNodePayload.
            (node.control as any).retainValueWhenHidden = true;
          }
        }
      });
    });
  }

  getPatientIdentifierNodes(rootNode: NodeBase): Array<NodeBase> {
    const results: Array<NodeBase> = [];
    this.getPatientIdentifierTypeNodes(rootNode, results);

    results.forEach((node) => {
      if (!node.question.extras?.questionOptions?.identifierType) {
        console.warn(
          `Patient identifier node "${node.question.extras.label}" is missing required identifierType property`
        );
      }
    });
    return results;
  }

  private getPatientIdentifierTypeNodes(
    rootNode: NodeBase,
    array: Array<NodeBase>
  ) {
    // Collect every patient-identifier node regardless of its current hidden
    // state. On edit a field may still be hidden at population time and only be
    // revealed later once hiding expressions re-evaluate; if we skipped it here
    // its value would never be set and it would appear empty when unhidden.
    // Callers that must exclude hidden fields (e.g. payload generation) apply
    // the hidden check themselves.
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
          this.getPatientIdentifierTypeNodes(node.children[o], array);
        }
      }
    }

    if (rootNode instanceof ArrayNode) {
      const node = rootNode as ArrayNode;
      node.children.forEach((child) => {
        this.getPatientIdentifierTypeNodes(child, array);
      });
    }
  }
}
