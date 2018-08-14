import { NodeBase } from '../form-factory/form-node';
export declare class ObsAdapterHelper {
    constructor();
    findObsAnswerToQuestion(node: NodeBase, obsArray: Array<any>): Array<any>;
    getChildQuestionsConceptUuids(node: NodeBase): Array<string>;
    getGroupMembersConceptUuids(obsWithGroupMembers: any): Array<string>;
    isObsNode(node: NodeBase): boolean;
    isSubsetOf(supersetArray: Array<any>, subsetArray: Array<any>): boolean;
    setSimpleObsNodeValue(node: NodeBase, obs: Array<any>): void;
    setMultiselectObsNodeValue(node: NodeBase, obs: Array<any>): void;
    setComplexObsNodeValue(node: NodeBase, obs: Array<any>): void;
    setGroupObsNodeValue(node: NodeBase, obs: Array<any>): void;
    setRepeatingGroupObsNodeValue(node: NodeBase, obs: Array<any>): void;
    setNodeValue(node: NodeBase, obs: Array<any>): void;
    setNodeFormControlValue(node: NodeBase, value: any): void;
    getObsNodeType(node: NodeBase): string;
    getSimpleObsPayload(node: NodeBase): any;
    getComplexObsPayload(node: NodeBase): any;
    getMultiselectObsPayload(node: NodeBase): Array<any>;
    getGroupPayload(node: NodeBase): any;
    getRepeatingGroupPayload(node: NodeBase): any[];
    getObsNodePayload(node: NodeBase): Array<any>;
    simpleNodeValueChanged(node: NodeBase): boolean;
    areDatesEqual(date1: any, date2: any): boolean;
    isEmpty(value: any): boolean;
    toOpenMrsDateTimeString(datetime: string): string;
}
