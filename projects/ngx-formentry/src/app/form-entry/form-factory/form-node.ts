import { AbstractControl } from '@angular/forms';

import { FormFactory } from './form.factory';
import { Form } from './form';

// import { AfeControlType, AfeFormArray, AfeFormGroup, AfeFormControl } from '../../abstract-controls-extension/control-extensions';
import { QuestionBase, RepeatingQuestion } from '../question-models/models';

export class NodeBase {
    private _control: AbstractControl;
    private _questionModel: QuestionBase;
    private _form: Form;
    private _path: string;

    public initialValue: any;

    constructor(question: QuestionBase, control?: AbstractControl, form?: Form, parentPath?: string) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
        this._path = parentPath ? parentPath + '.' + question.key : question.key;
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

    public get path(): string {
        return this._path;
    }

}

export class LeafNode extends NodeBase {
    constructor(question: QuestionBase, control?: AbstractControl, parentControl?: AbstractControl, form?: Form, parentPath?: string) {
        super(question, control, form, parentPath);
    }
}

export class GroupNode extends NodeBase {
    private _children: any;
    constructor(question: QuestionBase, control?: AbstractControl, parentControl?: AbstractControl, form?: Form, parentPath?: string) {
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

export class ArrayNode extends NodeBase {

    private _children: GroupNode[];
    public createChildFunc: CreateArrayChildNodeFunction;
    public removeChildFunc: RemoveArrayChildNodeFunction;

    constructor(question: QuestionBase, control?: AbstractControl,
        parentControl?: AbstractControl, private formFactory?: FormFactory,
        form?: Form, parentPath?: string) {
        super(question, control, form, parentPath);
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
