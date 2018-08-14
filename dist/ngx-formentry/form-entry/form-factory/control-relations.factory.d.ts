import { QuestionBase } from '../question-models/question-base';
import { NodeBase, GroupNode } from './form-node';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../../abstract-controls-extension/afe-form-array';
export declare class ControlRelationsFactory {
    constructor();
    buildRelations(rootNode: GroupNode): void;
    buildArrayNodeRelations(node: GroupNode): void;
    createRelationsToArrayControls(node: GroupNode): void;
    getRelationsForControl(id: any, node: GroupNode): Array<AfeFormControl | AfeFormArray>;
    mapControlIds(node: GroupNode, controlsStore: any): any;
    setRelations(controlsStore: any, nodeBase: NodeBase): void;
    hasRelation(id: string, questionBase: QuestionBase, nodeBase?: NodeBase): boolean;
    addRelationToControl(control: AfeFormControl | AfeFormArray, related: AfeFormControl | AfeFormArray): void;
}
