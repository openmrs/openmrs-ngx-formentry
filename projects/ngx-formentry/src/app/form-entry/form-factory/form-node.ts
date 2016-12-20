import { AbstractControl } from '@angular/forms';

import { FormFactory } from './form.factory';
import { Form } from './form';

// import { AfeControlType, AfeFormArray, AfeFormGroup, AfeFormControl } from '../../abstract-controls-extension/control-extensions';
import { QuestionBase, RepeatingQuestion } from '../question-models/models';

export class NodeBase {
    private _control: AbstractControl;
    private _questionModel: QuestionBase;
    private _form: Form;

    public initialValue: any;

    constructor(question: QuestionBase, control?: AbstractControl, form?: Form) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
    }

    public get question(): QuestionBase {
        return this._questionModel;
    }

    public get control(): AbstractControl {
        return this._control;
    }

    public get form(): Form {
        return this._form;
    }

}

export class LeafNode extends NodeBase {
    constructor(question: QuestionBase, control?: AbstractControl, parentControl?: AbstractControl, form?: Form) {
        super(question, control, form);
    }
}

export class GroupNode extends NodeBase {
    private _children: any;
    constructor(question: QuestionBase, control?: AbstractControl, parentControl?: AbstractControl, form?: Form) {
        super(question, control, form);
        this._children = {};
    }

    public get children(): any {
        return this._children;
    }

    public setChild(key: string, node: NodeBase) {
        this.children[key] = node;
    }

}

export class ArrayNode extends NodeBase {

    private _children: GroupNode[];
    public createChildFunc: CreateArrayChildNodeFunction;
    public removeChildFunc: RemoveArrayChildNodeFunction;

    constructor(question: QuestionBase, control?: AbstractControl,
        parentControl?: AbstractControl, private formFactory?: FormFactory, form?: Form) {
        super(question, control, form);
        this._children = [];
    }



    public get children(): GroupNode[] {
        return this._children;
    }

    public createChildNode(): GroupNode {
        if (this.createChildFunc) {
            return this.createChildFunc(this.question as RepeatingQuestion, this, this.formFactory);
        }
        return null;
    }

    public removeAt(index: number) {
        if (this.removeChildFunc) {
            this.removeChildFunc(index, this);
        }
    }

}

export interface CreateArrayChildNodeFunction {
    (question: RepeatingQuestion, node: ArrayNode, factory?: FormFactory): GroupNode;
}

export interface RemoveArrayChildNodeFunction {
    (index: number, node: ArrayNode);
}
