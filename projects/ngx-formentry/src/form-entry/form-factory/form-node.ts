import { FormFactory } from './form.factory';
import { Form } from './form';

// import { AfeControlType, AfeFormArray, AfeFormGroup, AfeFormControl } from '../../abstract-controls-extension';
import { QuestionBase, RepeatingQuestion } from '../question-models/models';
import {
  AfeFormControl,
  AfeFormArray,
  AfeFormGroup
} from '../../abstract-controls-extension';
export interface ChildNodeCreatedListener {
  addChildNodeCreatedListener(func: any);

  fireChildNodeCreatedListener(node: GroupNode);
}

export type CreateArrayChildNodeFunction = (
  question: RepeatingQuestion,
  node: ArrayNode,
  factory?: FormFactory
) => GroupNode;

export interface RemoveArrayChildNodeFunction {
  (index: number, node: ArrayNode);
}

export abstract class NodeBase {
  public abstract children?: any;
  private _control: AfeFormControl | AfeFormArray | AfeFormGroup;
  private _questionModel: QuestionBase;
  private _form: Form;
  private _path: string;

  public initialValue: any;

  constructor(
    question: QuestionBase,
    control?: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form,
    parentPath?: string
  ) {
    this._control = control;
    this._questionModel = question;
    this._form = form;
    this._path = parentPath ? parentPath + '.' + question.key : question.key;
  }

  public get question(): QuestionBase {
    return this._questionModel;
  }

  public get control(): AfeFormControl | AfeFormArray | AfeFormGroup {
    return this._control;
  }

  public get form(): Form {
    return this._form;
  }

  public get path(): string {
    return this._path;
  }
  removeAt(index: number) {}

  createChildNode() {}
  removeChildNode() {}
}

export class LeafNode extends NodeBase {
  get children() {
    return null;
  }
  constructor(
    question: QuestionBase,
    control?: AfeFormControl | AfeFormArray | AfeFormGroup,
    parentControl?: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form,
    parentPath?: string
  ) {
    super(question, control, form, parentPath);
  }
}

export class GroupNode extends NodeBase {
  private _children: any;
  constructor(
    question: QuestionBase,
    control?: AfeFormControl | AfeFormArray | AfeFormGroup,
    parentControl?: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form,
    parentPath?: string
  ) {
    super(question, control, form, parentPath);
    this._children = {};
  }

  public get children(): any {
    return this._children;
  }

  public setChild(key: string, node: NodeBase) {
    this.children[key] = node;
  }
}

export class ArrayNode extends NodeBase implements ChildNodeCreatedListener {
  private childNodeCreatedEvents: any[] = [];
  private _children: GroupNode[];
  public createChildFunc: CreateArrayChildNodeFunction;
  public removeChildFunc: RemoveArrayChildNodeFunction;

  constructor(
    question: QuestionBase,
    control?: AfeFormControl | AfeFormArray | AfeFormGroup,
    parentControl?: AfeFormControl | AfeFormArray | AfeFormGroup,
    private formFactory?: FormFactory,
    form?: Form,
    parentPath?: string
  ) {
    super(question, control, form, parentPath);
    this._children = [];
    this.childNodeCreatedEvents = [];
  }

  public get children(): GroupNode[] {
    return this._children;
  }

  public createChildNode(): GroupNode {
    if (this.createChildFunc) {
      const g: GroupNode = this.createChildFunc(
        this.question as RepeatingQuestion,
        this,
        this.formFactory
      );
      this.fireChildNodeCreatedListener(g);
      return g;
    }
    return null;
  }

  public removeAt(index: number) {
    const removePrompt = confirm('Are you sure you want to remove?');
    if (removePrompt) {
      if (this.removeChildFunc) {
        this.removeChildFunc(index, this);
      }
    }
  }

  addChildNodeCreatedListener(func: any) {
    this.childNodeCreatedEvents.push(func);
  }

  fireChildNodeCreatedListener(node: GroupNode) {
    for (let i = 0; i < this.childNodeCreatedEvents.length; i++) {
      const func: any = this.childNodeCreatedEvents[i];
      func(node);
    }
  }
}
