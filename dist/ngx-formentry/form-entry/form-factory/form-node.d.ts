import { FormFactory } from './form.factory';
import { Form } from './form';
import { QuestionBase, RepeatingQuestion } from '../question-models/models';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension';
export interface ChildNodeCreatedListener {
    addChildNodeCreatedListener(func: any): any;
    fireChildNodeCreatedListener(node: GroupNode): any;
}
export declare type CreateArrayChildNodeFunction = (question: RepeatingQuestion, node: ArrayNode, factory?: FormFactory) => GroupNode;
export interface RemoveArrayChildNodeFunction {
    (index: number, node: ArrayNode): any;
}
export declare class NodeBase {
    children?: any;
    private _control;
    private _questionModel;
    private _form;
    private _path;
    initialValue: any;
    constructor(question: QuestionBase, control?: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form, parentPath?: string);
    readonly question: QuestionBase;
    readonly control: AfeFormControl | AfeFormArray | AfeFormGroup;
    readonly form: Form;
    readonly path: string;
    removeAt(index: number): void;
    createChildNode(): void;
    removeChildNode(): void;
}
export declare class LeafNode extends NodeBase {
    constructor(question: QuestionBase, control?: AfeFormControl | AfeFormArray | AfeFormGroup, parentControl?: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form, parentPath?: string);
}
export declare class GroupNode extends NodeBase {
    private _children;
    constructor(question: QuestionBase, control?: AfeFormControl | AfeFormArray | AfeFormGroup, parentControl?: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form, parentPath?: string);
    readonly children: any;
    setChild(key: string, node: NodeBase): void;
}
export declare class ArrayNode extends NodeBase implements ChildNodeCreatedListener {
    private formFactory;
    private childNodeCreatedEvents;
    private _children;
    createChildFunc: CreateArrayChildNodeFunction;
    removeChildFunc: RemoveArrayChildNodeFunction;
    constructor(question: QuestionBase, control?: AfeFormControl | AfeFormArray | AfeFormGroup, parentControl?: AfeFormControl | AfeFormArray | AfeFormGroup, formFactory?: FormFactory, form?: Form, parentPath?: string);
    readonly children: GroupNode[];
    createChildNode(): GroupNode;
    removeAt(index: number): void;
    addChildNodeCreatedListener(func: any): void;
    fireChildNodeCreatedListener(node: GroupNode): void;
}
