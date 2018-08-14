import { LeafNode, GroupNode, ArrayNode, NodeBase } from './form-node';
import { QuestionBase, NestedQuestion, RepeatingQuestion } from '../question-models/models';
import { FormControlService } from './form-control.service';
import { QuestionFactory } from './question.factory';
import { AfeFormGroup } from '../../abstract-controls-extension';
import { ControlRelationsFactory } from './control-relations.factory';
import { Form } from './form';
export declare class FormFactory {
    controlService: FormControlService;
    questionFactroy: QuestionFactory;
    controlRelationsFactory: ControlRelationsFactory;
    hd: any;
    constructor(controlService: FormControlService, questionFactroy: QuestionFactory, controlRelationsFactory: ControlRelationsFactory);
    createForm(schema: any, dataSource?: any): Form;
    buildRelations(rootNode: GroupNode): void;
    createNode(question: QuestionBase | NestedQuestion, parentNode?: GroupNode, parentControl?: AfeFormGroup, form?: Form): NodeBase;
    createLeafNode(question: QuestionBase, parentNode: GroupNode, parentControl?: AfeFormGroup, form?: Form): LeafNode;
    createGroupNode(question: NestedQuestion, parentNode?: GroupNode, parentControl?: AfeFormGroup, form?: Form): GroupNode;
    createArrayNode(question: NestedQuestion, parentNode?: GroupNode, parentControl?: AfeFormGroup, form?: Form): ArrayNode;
    createNodeChildren(question: NestedQuestion, node: GroupNode, parentControl?: AfeFormGroup, form?: Form): any;
    createArrayNodeChild(question: RepeatingQuestion, node: ArrayNode, factory?: FormFactory): GroupNode;
    removeArrayNodeChild(index: number, node: ArrayNode): void;
}
