import { NodeBase } from '../form-factory/form-node';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
export declare class EncounterAdapter implements ValueAdapter {
    ordersAdapter: OrderValueAdapter;
    obsAdapter: ObsValueAdapter;
    constructor(ordersAdapter: OrderValueAdapter, obsAdapter: ObsValueAdapter);
    populateForm(form: Form, payload: any): void;
    populateNode(rootNode: NodeBase, payload: any): void;
    generateFormPayload(form: Form): {};
    generateNodePayload(rootNode: NodeBase): {};
    getEncounterNodes(rootNode: NodeBase): Array<NodeBase>;
    setNonFilledPayloadMembers(form: Form, payload: any): void;
    setPayloadPatientUuid(payload: any, patientUuid: string): void;
    setPayloadVisitUuid(payload: any, visitUuid: string): void;
    setPayloadEncounterTypeUuid(payload: any, encounterTypeUuid: string): void;
    setPayloadFormUuid(payload: any, formUuid: string): void;
    setPayloadEncounterUuid(payload: any, encounterUuid: string): void;
    private _getEncounterNodes(rootNode, array);
    private _isEncounterNode(node);
}
