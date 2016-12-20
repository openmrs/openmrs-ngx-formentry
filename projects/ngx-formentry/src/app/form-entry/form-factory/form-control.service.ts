import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension/control-extensions';

import { NestedQuestion } from '../question-models/interfaces/nested-questions';

import { QuestionBase } from '../question-models/question-base';
import { QuestionGroup } from '../question-models/group-question';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { Form } from './form';

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
        generateChildren: boolean, form?: Form): AbstractControl {
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

    generateFormGroupModel(question: QuestionBase, generateChildren: boolean,
        parentControl?: AfeFormGroup, form?: Form): AfeFormGroup {
        let formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }

        let asGroup = question as QuestionGroup;

        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }

        return formGroup;
    }

    _generateFormGroupChildrenModel(questions: QuestionBase[], parentControl: AfeFormGroup, form?: Form) {

        if (questions.length > 0) {
            questions.forEach(element => {
                let generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }


    generateFormArray(question: QuestionBase, parentControl?: AfeFormGroup, form?: Form): AfeFormArray {

        let formArray = new AfeFormArray([]);
        formArray.uuid = question.key;
        this.wireHidersDisablers(question, formArray, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }

        return formArray;
    }

    generateFormControl(question: QuestionBase, parentControl?: AfeFormGroup, form?: Form): AfeFormControl {

        let value = question.defaultValue || '';
        let validators = this.validationFactory.getValidators(question);

        let control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, (form ? form.dataSourcesContainer.dataSources : null));

        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }

        return control;
    }

    private wireHidersDisablers(question: QuestionBase,
        control: AfeFormArray | AfeFormGroup | AfeFormControl, dataSource?: any) {
        if (question.hide && question.hide !== '') {
            let hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, dataSource);
            control.setHidingFn(hider);
        }

        if (question.disable && question.disable !== '') {
            let disable =
                this.hidersDisablersFactory.getJsExpressionDisabler(question, control, dataSource);
            control.setDisablingFn(disable);
        }
    }

}
