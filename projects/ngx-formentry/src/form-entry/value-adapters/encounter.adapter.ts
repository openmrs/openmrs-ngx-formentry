import { Injectable } from '@angular/core';

import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { Form } from '../form-factory/form';

import { ValueAdapter } from './value.adapter';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
import { DiagnosisValueAdapter } from './diagnosis.adapter';

import moment from 'moment';

@Injectable()
export class EncounterAdapter implements ValueAdapter {
  constructor(
    public ordersAdapter: OrderValueAdapter,
    public diagnosesAdapter: DiagnosisValueAdapter,
    public obsAdapter: ObsValueAdapter
  ) {}

  populateForm(form: Form, payload) {
    this.populateNode(form.rootNode, payload);
    if (Array.isArray(payload.orders)) {
      this.ordersAdapter.populateForm(form, payload);
    }
    if (Array.isArray(payload.diagnoses)) {
      this.diagnosesAdapter.populateForm(form, payload.diagnoses);
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

    nodes.forEach((node) => {
      switch (node.question.extras.type) {
        case 'encounterDatetime':
          if (payload['encounterDatetime']) {
            node.control.setValue(
              moment(payload['encounterDatetime']).toDate()
            );
            node.initialValue = moment(payload['encounterDatetime']).toDate();
          }
          break;
        case 'encounterProvider':
          if (
            Array.isArray(payload['encounterProviders']) &&
            payload['encounterProviders'].length > 0
          ) {
            const firstProvider: any =
              payload['encounterProviders'][0].provider;
            if (firstProvider && firstProvider.uuid) {
              // Very weird work around for an issue with setting the value
              node.control.setValue(firstProvider.uuid);
              setTimeout(() => {
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

    // Get all obs and filter out subform obs
    const allObs = this.obsAdapter.generateFormPayload(form) || [];
    const subforms = this.extractSubforms(form.schema);
    const mainFormObs = allObs.filter(obs => {
      return !this.isObsFromSubform(form.rootNode, obs, subforms);
    });
    payload['obs'] = mainFormObs;

    // Get all orders and filter out subform orders
    const allOrders = this.ordersAdapter.generateFormPayload(form) || [];
    const mainFormOrders = allOrders.filter(order => {
      return !this.isOrderFromSubform(form.rootNode, order, subforms);
    });
    payload['orders'] = mainFormOrders;

    // Get all diagnoses and filter out subform diagnoses
    const allDiagnoses = this.diagnosesAdapter.generateFormPayload(form) || [];
    const mainFormDiagnoses = allDiagnoses.filter(diagnosis => {
      return !this.isDiagnosisFromSubform(form.rootNode, diagnosis, subforms);
    });
    payload['diagnoses'] = mainFormDiagnoses;

    return payload;
  }

  /**
   * Generates multiple encounter payloads if the form contains subforms
   * @param form The form to generate payloads for
   * @returns Array of encounter payloads
   */
  generateFormPayloadWithSubforms(form: Form): any[] {
    const subforms = this.extractSubforms(form.schema);
    
    if (subforms.length === 0) {
      // No subforms, return single encounter
      return [this.generateFormPayload(form)];
    }

    const encounters: any[] = [];
    
    // Generate main encounter payload
    const mainEncounter = this.generateFormPayload(form);
    encounters.push(mainEncounter);

    // Group subforms by encounter type
    const subformsByEncounterType = this.groupSubformsByEncounterType(subforms);
    
    // Generate encounter for each unique encounter type
    for (const [encounterType, subformList] of Object.entries(subformsByEncounterType)) {
      const subformEncounter = this.generateSubformEncounterPayload(
        form, 
        encounterType, 
        subformList
      );
      encounters.push(subformEncounter);
    }

    return encounters;
  }

  /**
   * Extracts subform information from the form schema
   * @param schema The form schema
   * @returns Array of subform information
   */
  private extractSubforms(schema: any): any[] {
    const subforms: any[] = [];
    
    if (!schema.pages) {
      return subforms;
    }

    for (const page of schema.pages) {
      if (page.isSubform && page.subform) {
        const subformInfo = {
          name: page.subform.name,
          encounterType: page.subform.form.encounterType,
          formUuid: page.subform.form.uuid,
          form: page.subform.form
        };
        subforms.push(subformInfo);
      }
    }

    return subforms;
  }

  /**
   * Groups subforms by encounter type
   * @param subforms Array of subform information
   * @returns Object with encounter types as keys and arrays of subforms as values
   */
  private groupSubformsByEncounterType(subforms: any[]): { [key: string]: any[] } {
    const grouped: { [key: string]: any[] } = {};
    
    for (const subform of subforms) {
      if (!grouped[subform.encounterType]) {
        grouped[subform.encounterType] = [];
      }
      grouped[subform.encounterType].push(subform);
    }
    
    return grouped;
  }

  /**
   * Generates encounter payload for a specific encounter type and its subforms
   * @param form The main form
   * @param encounterType The encounter type UUID
   * @param subforms Array of subforms for this encounter type
   * @returns Encounter payload
   */
  private generateSubformEncounterPayload(
    form: Form, 
    encounterType: string, 
    subforms: any[]
  ): any {
    // Start with base encounter payload
    const basePayload = this.generateNodePayload(form.rootNode);
    
    // Set encounter-specific properties
    const encounter: any = {
      encounterType: encounterType,
      form: subforms[0].formUuid, // Use first subform's form UUID
      obs: [],
      orders: [],
      diagnoses: []
    };

    // Copy base payload properties
    Object.assign(encounter, basePayload);

    // Set non-filled payload members with subform-specific values
    this.setSubformPayloadMembers(form, encounter, subforms[0]);

    // Generate obs, orders, and diagnoses for this encounter type
    encounter.obs = this.generateSubformObsPayload(form, subforms);
    encounter.orders = this.generateSubformOrdersPayload(form, subforms);
    encounter.diagnoses = this.generateSubformDiagnosesPayload(form, subforms);

    return encounter;
  }

  /**
   * Sets payload members specific to subform encounters
   * @param form The main form
   * @param payload The encounter payload
   * @param subform The subform information
   */
  private setSubformPayloadMembers(form: Form, payload: any, subform: any) {
    if (form.valueProcessingInfo.patientUuid) {
      this.setPayloadPatientUuid(payload, form.valueProcessingInfo.patientUuid);
    }

    if (form.valueProcessingInfo.visitUuid) {
      this.setPayloadVisitUuid(payload, form.valueProcessingInfo.visitUuid);
    }

    // Use subform's encounter type
    payload.encounterType = subform.encounterType;

    if (!payload.encounterDatetime) {
      this.setPayloadEncounterDate(
        payload,
        form.valueProcessingInfo.encounterDatetime,
        form.valueProcessingInfo.utcOffset
      );
    }

    // Use subform's form UUID
    payload.form = subform.formUuid;

    if (form.valueProcessingInfo.encounterUuid) {
      this.setPayloadEncounterUuid(
        payload,
        form.valueProcessingInfo.encounterUuid
      );
    }
  }

  /**
   * Generates obs payload for subforms of a specific encounter type
   * @param form The main form
   * @param subforms Array of subforms for this encounter type
   * @returns Array of obs
   */
  private generateSubformObsPayload(form: Form, subforms: any[]): any[] {
    // Get all obs from the form
    const allObs = this.obsAdapter.generateFormPayload(form) || [];
    
    // Filter obs to only include those that belong to subform nodes
    const subformObs = allObs.filter(obs => {
      return this.isObsFromSubform(form.rootNode, obs, subforms);
    });
    
    return subformObs;
  }

  /**
   * Generates orders payload for subforms of a specific encounter type
   * @param form The main form
   * @param subforms Array of subforms for this encounter type
   * @returns Array of orders
   */
  private generateSubformOrdersPayload(form: Form, subforms: any[]): any[] {
    // Get all orders from the form
    const allOrders = this.ordersAdapter.generateFormPayload(form) || [];
    
    // Filter orders to only include those that belong to subform nodes
    const subformOrders = allOrders.filter(order => {
      return this.isOrderFromSubform(form.rootNode, order, subforms);
    });
    
    return subformOrders;
  }

  /**
   * Generates diagnoses payload for subforms of a specific encounter type
   * @param form The main form
   * @param subforms Array of subforms for this encounter type
   * @returns Array of diagnoses
   */
  private generateSubformDiagnosesPayload(form: Form, subforms: any[]): any[] {
    // Get all diagnoses from the form
    const allDiagnoses = this.diagnosesAdapter.generateFormPayload(form) || [];
    
    // Filter diagnoses to only include those that belong to subform nodes
    const subformDiagnoses = allDiagnoses.filter(diagnosis => {
      return this.isDiagnosisFromSubform(form.rootNode, diagnosis, subforms);
    });
    
    return subformDiagnoses;
  }

  generateNodePayload(rootNode: NodeBase) {
    const nodes = this.getEncounterNodes(rootNode);
    const payload = {};

    nodes.forEach((node) => {
      if (
        node.control.value !== null &&
        node.control.value !== undefined &&
        node.control.value !== ''
      ) {
        switch (node.question.extras.type) {
          case 'encounterDatetime':
            const dateValue = moment(node.control.value).utcOffset(
              rootNode.form.valueProcessingInfo.utcOffset || '+0300'
            );
            // If the dateValue is same as new Date() then we are not going to send the encounterDatetime
            // to the server. This is to avoid sending the encounterDatetime to the server when the user
            // has not changed the encounterDatetime

            if (dateValue.isSame(moment(new Date()), 'day')) {
              break;
            }
            payload['encounterDatetime'] = dateValue.format();
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
      this.setPayloadEncounterTypeUuid(
        payload,
        form.valueProcessingInfo.encounterTypeUuid
      );
    }

    if (!payload.encounterDatetime) {
      this.setPayloadEncounterDate(
        payload,
        form.valueProcessingInfo.encounterDatetime,
        form.valueProcessingInfo.utcOffset
      );
    }

    if (form.valueProcessingInfo.formUuid) {
      this.setPayloadFormUuid(payload, form.valueProcessingInfo.formUuid);
    }

    if (form.valueProcessingInfo.encounterUuid) {
      this.setPayloadEncounterUuid(
        payload,
        form.valueProcessingInfo.encounterUuid
      );
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

  setPayloadEncounterDate(
    payload,
    encounterDatetime: string,
    utcOffset: string
  ) {
    if (!encounterDatetime) {
      // Not sending encounter datetime from the UI if no encounter datetime is specified
      return;
    }
    const dateValue = moment(encounterDatetime).utcOffset(utcOffset || '+0300');
    payload['encounterDatetime'] = dateValue.format();
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

      for (const o in node.children) {
        if (node.children[o] instanceof NodeBase) {
          this._getEncounterNodes(node.children[o], array);
        }
      }
    }

    if (rootNode instanceof ArrayNode) {
      const node = rootNode as ArrayNode;
      node.children.forEach((child) => {
        this._getEncounterNodes(child, array);
      });
    }
  }

  private _isEncounterNode(node: NodeBase): boolean {
    if (
      node.question.extras &&
      (node.question.extras.type === 'encounterDatetime' ||
        node.question.extras.type === 'encounterProvider' ||
        node.question.extras.type === 'encounterLocation')
    ) {
      return true;
    }
    return false;
  }

  /**
   * Determines if an obs belongs to a subform based on the node path
   * @param rootNode The root node of the form
   * @param obs The obs to check
   * @param subforms Array of subform information
   * @returns True if the obs belongs to a subform
   */
  private isObsFromSubform(rootNode: NodeBase, obs: any, subforms: any[]): boolean {
    // If no subforms, obs cannot be from subform
    if (subforms.length === 0) {
      return false;
    }

    // Find the node that generated this obs by matching the question ID
    const questionId = this.getQuestionIdFromFormFieldPath(obs.formFieldPath);
    if (!questionId) {
      return false;
    }

    // Find the node with this question ID
    const node = this.findNodeByQuestionId(rootNode, questionId);
    if (!node) {
      return false;
    }

    // Check if the node's path contains any subform names
    const nodePath = node.path;
    
    for (const subform of subforms) {
      if (nodePath.includes(subform.name)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determines if an order belongs to a subform based on the node path
   * @param rootNode The root node of the form
   * @param order The order to check
   * @param subforms Array of subform information
   * @returns True if the order belongs to a subform
   */
  private isOrderFromSubform(rootNode: NodeBase, order: any, subforms: any[]): boolean {
    // If no subforms, order cannot be from subform
    if (subforms.length === 0) {
      return false;
    }

    // Find the node that generated this order by matching the question ID
    const questionId = this.getQuestionIdFromFormFieldPath(order.formFieldPath);
    if (!questionId) {
      return false;
    }

    // Find the node with this question ID
    const node = this.findNodeByQuestionId(rootNode, questionId);
    if (!node) {
      return false;
    }

    // Check if the node's path contains any subform names
    const nodePath = node.path;
    for (const subform of subforms) {
      if (nodePath.includes(subform.name)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determines if a diagnosis belongs to a subform based on the node path
   * @param rootNode The root node of the form
   * @param diagnosis The diagnosis to check
   * @param subforms Array of subform information
   * @returns True if the diagnosis belongs to a subform
   */
  private isDiagnosisFromSubform(rootNode: NodeBase, diagnosis: any, subforms: any[]): boolean {
    // If no subforms, diagnosis cannot be from subform
    if (subforms.length === 0) {
      return false;
    }

    // Find the node that generated this diagnosis by matching the question ID
    const questionId = this.getQuestionIdFromFormFieldPath(diagnosis.formFieldPath);
    if (!questionId) {
      return false;
    }

    // Find the node with this question ID
    const node = this.findNodeByQuestionId(rootNode, questionId);
    if (!node) {
      return false;
    }

    // Check if the node's path contains any subform names
    const nodePath = node.path;
    for (const subform of subforms) {
      if (nodePath.includes(subform.name)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Extracts question ID from form field path
   * @param formFieldPath The form field path
   * @returns The question ID
   */
  private getQuestionIdFromFormFieldPath(formFieldPath: string): string {
    if (formFieldPath?.includes('~')) {
      return formFieldPath.split('~', 1)[0];
    }
    return null;
  }

  /**
   * Finds a node by its question ID
   * @param rootNode The root node to search from
   * @param questionId The question ID to search for
   * @returns The node if found, null otherwise
   */
  private findNodeByQuestionId(rootNode: NodeBase, questionId: string): NodeBase {
    if (!rootNode || !questionId) {
      return null;
    }

    // Check if current node has the question ID
    if (rootNode.question?.extras?.id === questionId) {
      return rootNode;
    }

    // Search in children if it's a group node
    if (rootNode instanceof GroupNode) {
      const groupNode = rootNode as GroupNode;
      for (const key in groupNode.children) {
        const child = groupNode.children[key];
        const found = this.findNodeByQuestionId(child, questionId);
        if (found) {
          return found;
        }
      }
    }

    // Search in children if it's an array node
    if (rootNode instanceof ArrayNode) {
      const arrayNode = rootNode as ArrayNode;
      for (const child of arrayNode.children) {
        const found = this.findNodeByQuestionId(child, questionId);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }
}
