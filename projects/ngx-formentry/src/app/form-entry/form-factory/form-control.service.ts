import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension/control-extensions';

import { NestedQuestion } from '../question-models/interfaces/nested-questions';

import { QuestionBase } from '../question-models/question-base';
import { QuestionGroup } from '../question-models/group-question';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';

@Injectable()
export class FormControlService {
    controls = [];
    validationFactory: ValidationFactory;
    hidersDisablersFactory: HidersDisablersFactory;

    constructor(validationFactory: ValidationFactory,
        hidersDisablersFactory: HidersDisablersFactory) {
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }

    generateControlModel(questionModel: QuestionBase | NestedQuestion, parentControl: AfeFormGroup,
        generateChildren: boolean): AbstractControl {
        if (questionModel instanceof QuestionBase) {
            if (questionModel.controlType === AfeControlType.AfeFormArray) {
                return this.generateFormArray(questionModel, parentControl);
            }
            if (questionModel.controlType === AfeControlType.AfeFormGroup) {
                return this.generateFormGroupModel(questionModel, generateChildren, parentControl);
            }

            if (questionModel.controlType === AfeControlType.AfeFormControl) {
                return this.generateFormControl(questionModel, parentControl);
            }
        }
        return null;
    }

    generateFormGroupModel(question: QuestionBase, generateChildren: boolean, parentControl?: AfeFormGroup): AfeFormGroup {
        let formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }

        let asGroup = question as QuestionGroup;

        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup);
        }

        return formGroup;
    }

    _generateFormGroupChildrenModel(questions: QuestionBase[], parentControl: AfeFormGroup) {

        if (questions.length > 0) {
            questions.forEach(element => {
                let generated = this.generateControlModel(element, parentControl, true);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }


    generateFormArray(question: QuestionBase, parentControl?: AfeFormGroup): AfeFormArray {

        let formArray = new AfeFormArray([]);
        this.wireHidersDisablers(question, formArray);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }

        return formArray;
    }

    generateFormControl(question: QuestionBase, parentControl?: AfeFormGroup): AfeFormControl {

        let value = question.defaultValue || '';
        let validators = this.validationFactory.getValidators(question);

        let control = new AfeFormControl(value, validators);
        this.wireHidersDisablers(question, control);

        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }

        return control;
    }

    private wireHidersDisablers(question: QuestionBase,
        control: AfeFormArray | AfeFormGroup | AfeFormControl) {
        if (question.hide && question.hide !== '') {
            let hider = this.hidersDisablersFactory.getJsExpressionHider(question, control);
            control.setHidingFn(hider);
        }

        if (question.disable && question.disable !== '') {
            let disable =
                this.hidersDisablersFactory.getJsExpressionDisabler(question, control);
            control.setDisablingFn(disable);
        }
    }

}
