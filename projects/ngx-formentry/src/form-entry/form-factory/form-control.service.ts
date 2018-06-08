import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType
} from '../../abstract-controls-extension';

import { NestedQuestion } from '../question-models/interfaces/nested-questions';

import { QuestionBase } from '../question-models/question-base';
import { QuestionGroup } from '../question-models/group-question';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { Form } from './form';
import { ExpressionRunner, Runnable } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';


@Injectable()
export class FormControlService {
    controls = [];
    validationFactory: ValidationFactory;
    hidersDisablersFactory: HidersDisablersFactory;

    constructor(validationFactory: ValidationFactory,
        hidersDisablersFactory: HidersDisablersFactory, private alertsFactory: AlertsFactory) {
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }

    generateControlModel(questionModel: QuestionBase | NestedQuestion, parentControl: AfeFormGroup,
        generateChildren: boolean, form?: Form): AfeFormControl | AfeFormArray | AfeFormGroup {
        if (questionModel instanceof QuestionBase) {
            if (questionModel.controlType === AfeControlType.AfeFormArray) {
                return this.generateFormArray(questionModel, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormGroup) {
                return this.generateFormGroupModel(questionModel, generateChildren, parentControl, form);
            }

            if (questionModel.controlType === AfeControlType.AfeFormControl) {
                return this.generateFormControl(questionModel, parentControl, form);
            }
        }
        return null;
    }

    generateFormGroupModel(question: QuestionBase, generateChildren: boolean,
        parentControl?: AfeFormGroup, form?: Form): AfeFormGroup {
        const formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }

        const asGroup = question as QuestionGroup;

        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }

        return formGroup;
    }

    _generateFormGroupChildrenModel(questions: QuestionBase[], parentControl: AfeFormGroup, form?: Form) {

        if (questions.length > 0) {
            questions.forEach(element => {
                const generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }


    generateFormArray(question: QuestionBase, parentControl?: AfeFormGroup, form?: Form): AfeFormArray {

        const validators = this.validationFactory.getValidators(question, form);
         let formArray: AfeFormArray;
         if (validators && validators.length > 0) {
             formArray = new AfeFormArray([], validators[0]);
         } else {
            formArray = new AfeFormArray([]);
         }
        formArray.uuid = question.key;
        this.wireHidersDisablers(question, formArray, form);
        this.wireAlerts(question, formArray, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }

        return formArray;
    }

    generateFormControl(question: QuestionBase, parentControl?: AfeFormGroup, form?: Form): AfeFormControl {

        const value = question.defaultValue || '';
        const validators = this.validationFactory.getValidators(question, form);

        const control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, (form ? form.dataSourcesContainer.dataSources : null));

        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }

        return control;
    }

    private wireAlerts(question: QuestionBase,
        control: AfeFormArray | AfeFormGroup | AfeFormControl, form?: Form) {
        if (question.alert && question.alert !== '') {
            const alert = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert);
        }
    }
    private wireHidersDisablers(question: QuestionBase,
        control: AfeFormArray | AfeFormGroup | AfeFormControl, form?: Form) {
        if (question.hide && question.hide !== '') {
            const hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }

        if (question.disable && question.disable !== '') {
            const disable =
                this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    }

    private wireCalculator(question: QuestionBase,
        control: AfeFormControl, dataSource?: any) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            const helper: JsExpressionHelper = new JsExpressionHelper();
            const runner: ExpressionRunner = new ExpressionRunner();
            const runnable: Runnable = runner.getRunnable(question.calculateExpression
                , control,
                helper.helperFunctions,
                dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }

    }

}
