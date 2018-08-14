import { FormFactory } from './form.factory';
import { QuestionFactory } from './question.factory';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, GroupNode } from './form-node';
export declare class Form {
    schema: any;
    formFactory: FormFactory;
    questionFactory: QuestionFactory;
    rootNode: GroupNode;
    valueProcessingInfo: any;
    existingOrders: any;
    private _dataSourcesContainer;
    private _showErrors;
    constructor(schema: any, formFactory: FormFactory, questionFactory: QuestionFactory);
    readonly dataSourcesContainer: DataSources;
    searchNodeByPath(node: GroupNode, path: any, found: Array<NodeBase>): NodeBase[];
    searchNodeByQuestionId(questionId: string, questionType?: string): Array<NodeBase>;
    searchNodeByQuestionType(rootNode: any, questionType: string, found: Array<NodeBase>): void;
    private findNodesByQuestionId(rootNode, questionId, results);
    readonly valid: boolean;
    showErrors: boolean;
    markInvalidControls(node: GroupNode, invalidControlNodes?: any): any;
    updateHiddenDisabledStateForAllControls(): void;
    updateAlertsForAllControls(): void;
    private _updateAlertsForAllControls(rootNode);
    private _updateHiddenDisabledStateForAllControls(rootNode);
}
