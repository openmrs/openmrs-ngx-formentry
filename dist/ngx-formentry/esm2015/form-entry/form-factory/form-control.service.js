/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
export class FormControlService {
    /**
     * @param {?} validationFactory
     * @param {?} hidersDisablersFactory
     * @param {?} alertsFactory
     */
    constructor(validationFactory, hidersDisablersFactory, alertsFactory) {
        this.alertsFactory = alertsFactory;
        this.controls = [];
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }
    /**
     * @param {?} questionModel
     * @param {?} parentControl
     * @param {?} generateChildren
     * @param {?=} form
     * @return {?}
     */
    generateControlModel(questionModel, parentControl, generateChildren, form) {
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
    /**
     * @param {?} question
     * @param {?} generateChildren
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormGroupModel(question, generateChildren, parentControl, form) {
        const /** @type {?} */ formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }
        const /** @type {?} */ asGroup = /** @type {?} */ (question);
        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }
        return formGroup;
    }
    /**
     * @param {?} questions
     * @param {?} parentControl
     * @param {?=} form
     * @return {?}
     */
    _generateFormGroupChildrenModel(questions, parentControl, form) {
        if (questions.length > 0) {
            questions.forEach(element => {
                const /** @type {?} */ generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormArray(question, parentControl, form) {
        const /** @type {?} */ validators = this.validationFactory.getValidators(question, form);
        let /** @type {?} */ formArray;
        if (validators && validators.length > 0) {
            formArray = new AfeFormArray([], validators[0]);
        }
        else {
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
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormControl(question, parentControl, form) {
        const /** @type {?} */ value = question.defaultValue || '';
        const /** @type {?} */ validators = this.validationFactory.getValidators(question, form);
        const /** @type {?} */ control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }
        return control;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    wireAlerts(question, control, form) {
        if (question.alert && question.alert !== '') {
            const /** @type {?} */ alert = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert);
        }
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    wireHidersDisablers(question, control, form) {
        if (question.hide && question.hide !== '') {
            const /** @type {?} */ hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }
        if (question.disable && question.disable !== '') {
            const /** @type {?} */ disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} dataSource
     * @return {?}
     */
    wireCalculator(question, control, dataSource) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            const /** @type {?} */ helper = new JsExpressionHelper();
            const /** @type {?} */ runner = new ExpressionRunner();
            const /** @type {?} */ runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }
    }
}
FormControlService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormControlService.ctorParameters = () => [
    { type: ValidationFactory, },
    { type: HidersDisablersFactory, },
    { type: AlertsFactory, },
];
function FormControlService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormControlService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormControlService.ctorParameters;
    /** @type {?} */
    FormControlService.prototype.controls;
    /** @type {?} */
    FormControlService.prototype.validationFactory;
    /** @type {?} */
    FormControlService.prototype.hidersDisablersFactory;
    /** @type {?} */
    FormControlService.prototype.alertsFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUNsRSxNQUFNLG1DQUFtQyxDQUFDO0FBSTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJckUsTUFBTTs7Ozs7O0lBS0YsWUFBWSxpQkFBb0MsRUFDNUMsc0JBQThDLEVBQVUsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7d0JBTDdFLEVBQUU7UUFNVCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0tBQ3hEOzs7Ozs7OztJQUVELG9CQUFvQixDQUFDLGFBQTRDLEVBQUUsYUFBMkIsRUFDMUYsZ0JBQXlCLEVBQUUsSUFBVztRQUN0QyxFQUFFLENBQUMsQ0FBQyxhQUFhLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxLQUFLLGNBQWMs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UUFBc0IsRUFDekMsT0FBdUIsRUFBRSxVQUFnQjtRQUN6QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLElBQUksUUFBUSxDQUFDLG1CQUFtQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEUsdUJBQU0sTUFBTSxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDNUQsdUJBQU0sTUFBTSxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDeEQsdUJBQU0sUUFBUSxHQUFhLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUNwRSxPQUFPLEVBQ1QsTUFBTSxDQUFDLGVBQWUsRUFDdEIsVUFBVSxDQUFDLENBQUM7O1lBRWhCLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDOzs7O1lBaklSLFVBQVU7Ozs7WUFSRixpQkFBaUI7WUFDakIsc0JBQXNCO1lBQ3RCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCwgQWZlQ29udHJvbFR5cGVcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcblxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcblxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB9IGZyb20gJy4vaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sU2VydmljZSB7XG4gICAgY29udHJvbHMgPSBbXTtcbiAgICB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3Rvcnk7XG4gICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcblxuICAgIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICAgICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSwgcHJpdmF0ZSBhbGVydHNGYWN0b3J5OiBBbGVydHNGYWN0b3J5KSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkgPSB2YWxpZGF0aW9uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5ID0gaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbk1vZGVsOiBRdWVzdGlvbkJhc2UgfCBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Q29udHJvbDogQWZlRm9ybUdyb3VwLFxuICAgICAgICBnZW5lcmF0ZUNoaWxkcmVuOiBib29sZWFuLCBmb3JtPzogRm9ybSk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uTW9kZWwgaW5zdGFuY2VvZiBRdWVzdGlvbkJhc2UpIHtcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1BcnJheShxdWVzdGlvbk1vZGVsLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Hcm91cE1vZGVsKHF1ZXN0aW9uTW9kZWwsIGdlbmVyYXRlQ2hpbGRyZW4sIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Db250cm9sKHF1ZXN0aW9uTW9kZWwsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlRm9ybUdyb3VwTW9kZWwocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgZ2VuZXJhdGVDaGlsZHJlbjogYm9vbGVhbixcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtR3JvdXAge1xuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSBuZXcgQWZlRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgdGhpcy53aXJlSGlkZXJzRGlzYWJsZXJzKHF1ZXN0aW9uLCBmb3JtR3JvdXAsIGZvcm0pO1xuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICBwYXJlbnRDb250cm9sLnNldENvbnRyb2wocXVlc3Rpb24ua2V5LCBmb3JtR3JvdXApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXNHcm91cCA9IHF1ZXN0aW9uIGFzIFF1ZXN0aW9uR3JvdXA7XG5cbiAgICAgICAgaWYgKGdlbmVyYXRlQ2hpbGRyZW4gJiYgYXNHcm91cCAmJiBhc0dyb3VwLnF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwoYXNHcm91cC5xdWVzdGlvbnMsIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybUdyb3VwO1xuICAgIH1cblxuICAgIF9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwocXVlc3Rpb25zOiBRdWVzdGlvbkJhc2VbXSwgcGFyZW50Q29udHJvbDogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSkge1xuXG4gICAgICAgIGlmIChxdWVzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVkID0gdGhpcy5nZW5lcmF0ZUNvbnRyb2xNb2RlbChlbGVtZW50LCBwYXJlbnRDb250cm9sLCB0cnVlLCBmb3JtKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRyb2wuYWRkQ29udHJvbChlbGVtZW50LmtleSwgZ2VuZXJhdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2VuZXJhdGVGb3JtQXJyYXkocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQXJyYXkge1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmdldFZhbGlkYXRvcnMocXVlc3Rpb24sIGZvcm0pO1xuICAgICAgICAgbGV0IGZvcm1BcnJheTogQWZlRm9ybUFycmF5O1xuICAgICAgICAgaWYgKHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSwgdmFsaWRhdG9yc1swXSk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSk7XG4gICAgICAgICB9XG4gICAgICAgIGZvcm1BcnJheS51dWlkID0gcXVlc3Rpb24ua2V5O1xuICAgICAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGZvcm1BcnJheSwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUFsZXJ0cyhxdWVzdGlvbiwgZm9ybUFycmF5LCBmb3JtKTtcbiAgICAgICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIHBhcmVudENvbnRyb2wuc2V0Q29udHJvbChxdWVzdGlvbi5rZXksIGZvcm1BcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybUFycmF5O1xuICAgIH1cblxuICAgIGdlbmVyYXRlRm9ybUNvbnRyb2wocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQ29udHJvbCB7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgfHwgJyc7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmdldFZhbGlkYXRvcnMocXVlc3Rpb24sIGZvcm0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgQWZlRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcnMpO1xuICAgICAgICBjb250cm9sLnV1aWQgPSBxdWVzdGlvbi5rZXk7XG4gICAgICAgIHRoaXMud2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUFsZXJ0cyhxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUNhbGN1bGF0b3IocXVlc3Rpb24sIGNvbnRyb2wsIChmb3JtID8gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcyA6IG51bGwpKTtcblxuICAgICAgICBpZiAocGFyZW50Q29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1Hcm91cCkge1xuICAgICAgICAgICAgcGFyZW50Q29udHJvbC5zZXRDb250cm9sKHF1ZXN0aW9uLmtleSwgY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdpcmVBbGVydHMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICAgICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsIGZvcm0/OiBGb3JtKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5hbGVydCAmJiBxdWVzdGlvbi5hbGVydCAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsZXJ0ID0gdGhpcy5hbGVydHNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbnNob3dBbGVydChxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBjb250cm9sLnNldEFsZXJ0Rm4oYWxlcnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgd2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgZm9ybT86IEZvcm0pIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmhpZGUgJiYgcXVlc3Rpb24uaGlkZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGhpZGVyID0gdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbkhpZGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0SGlkaW5nRm4oaGlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHF1ZXN0aW9uLmRpc2FibGUgJiYgcXVlc3Rpb24uZGlzYWJsZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGUgPVxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25EaXNhYmxlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBjb250cm9sLnNldERpc2FibGluZ0ZuKGRpc2FibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3aXJlQ2FsY3VsYXRvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQ29udHJvbCwgZGF0YVNvdXJjZT86IGFueSkge1xuICAgICAgICBpZiAocXVlc3Rpb24uY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uICE9PSAnJykge1xuICAgICAgICAgICAgY29uc3QgaGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XG4gICAgICAgICAgICBjb25zdCBydW5uZXI6IEV4cHJlc3Npb25SdW5uZXIgPSBuZXcgRXhwcmVzc2lvblJ1bm5lcigpO1xuICAgICAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gcnVubmVyLmdldFJ1bm5hYmxlKHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAsIGNvbnRyb2wsXG4gICAgICAgICAgICAgICAgaGVscGVyLmhlbHBlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlKTtcbiAgICAgICAgICAgIC8vIHRoaXMgZnVuY3Rpb25hbGl0eSBzdHJpY3RseSBhc3N1bWVzIHRoZSBjYWxjdWxhdGVFeHByZXNzaW9uIGZ1bmN0aW9uIGhhcyBiZWVuIGRlZmluZWQgaW4gdGhlIEpzRXhwcmVzc2lvbkhlbHBlciBjbGFzc1xuICAgICAgICAgICAgY29udHJvbC5zZXRDYWxjdWxhdG9yRm4ocnVubmFibGUucnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iXX0=