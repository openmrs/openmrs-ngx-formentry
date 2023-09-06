import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import {
  AfeFormControl,
  AfeFormArray,
  AfeFormGroup
} from '../../abstract-controls-extension';

import { FormControlService } from './form-control.service';
import { TextInputQuestion } from '../question-models/text-input-question';
import { RepeatingQuestion } from '../question-models/repeating-question';
import { QuestionBase } from '../question-models/question-base';
import { QuestionGroup } from '../question-models/group-question';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { DebugModeService } from './../services/debug-mode.service';
import { TranslateModule } from '@ngx-translate/core';

describe('Form Factory Control Service Tests', () => {
  let injector: Injector;
  let formControlService: FormControlService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TranslateModule.forRoot()],
      providers: [
        FormControlService,
        ValidationFactory,
        HidersDisablersFactory,
        AlertsFactory,
        ExpressionRunner,
        JsExpressionHelper,
        DebugModeService
      ]
    });
    injector = getTestBed();
    formControlService = injector.get(FormControlService);
  });

  afterEach(() => {
    injector = undefined;
    formControlService = undefined;
  });

  it('is defined', () => {
    expect(FormControlService).toBeDefined();
    expect(formControlService instanceof FormControlService).toBeTruthy();
  });

  it('Should have a generateFormArray function that returns a form array', () => {
    const formArray = formControlService.generateFormArray(
      new RepeatingQuestion({
        type: 'repeating',
        key: 'repeating1',
        label: 'Repeated',
        questions: [
          new TextInputQuestion({
            type: 'text',
            key: 'reatingPrvi2',
            label: 'Am Repeated',
            placeholder: 'Am Repeated'
          }),
          new TextInputQuestion({
            type: 'text',
            key: 'reatingPrvi1',
            label: 'Am Repeated Second',
            placeholder: 'Am Repeated Second'
          })
        ]
      })
    );

    expect(formArray instanceof AfeFormArray).toBeTruthy();
  });

  it('Should have a generateControl function that returns a form control', () => {
    const control = formControlService.generateFormControl(
      new TextInputQuestion({
        type: 'text',
        key: 'things',
        label: 'Things You Like',
        defaultValue: 'Hello',
        placeholder: ''
      })
    );

    expect(control.value).toEqual('Hello');
    expect(control instanceof AfeFormControl).toBeTruthy();
  });

  it('should generate control model for a form-control type question', () => {
    const testQuestion: QuestionBase = new TextInputQuestion({
      type: 'text',
      key: 'things',
      label: 'Things You Like',
      defaultValue: 'Hello',
      placeholder: ''
    });

    const parentControl = new AfeFormGroup({});
    const createdControl = formControlService.generateFormControl(
      testQuestion,
      parentControl
    );

    // examine the created control
    expect(createdControl).toBeTruthy();
    expect(createdControl instanceof AfeFormControl).toBe(true);
    expect(createdControl.parent).toBe(parentControl);

    // examine the parent control
    expect(parentControl.get(testQuestion.key)).toBe(createdControl);
  });

  it('should generate control model for a form-array type question', () => {
    const testQuestion: RepeatingQuestion = new RepeatingQuestion({
      type: 'repeating',
      key: 'things',
      label: 'Things You Like',
      questions: []
    });

    const childQuestion: QuestionBase = new TextInputQuestion({
      type: 'text',
      key: 'things',
      label: 'Things You Like',
      defaultValue: 'Hello',
      placeholder: ''
    });

    testQuestion.questions.push(childQuestion);

    const parentControl = new AfeFormGroup({});
    const createdControl = formControlService.generateFormArray(
      testQuestion,
      parentControl
    );

    // examine the created control
    expect(createdControl).toBeTruthy();
    expect(createdControl instanceof AfeFormArray).toBe(true);
    expect(createdControl.parent).toBe(parentControl);

    // examine the parent control
    expect(parentControl.get(testQuestion.key)).toBe(createdControl);
  });

  it('should generate control model for a form-group type question', () => {
    const testQuestion: QuestionGroup = new QuestionGroup({
      type: 'group',
      key: 'things',
      label: 'Things You Like',
      questions: []
    });

    const childQuestion: QuestionBase = new TextInputQuestion({
      type: 'text',
      key: 'things',
      label: 'Things You Like',
      defaultValue: 'Hello',
      placeholder: ''
    });

    testQuestion.questions.push(childQuestion);

    const parentControl = new AfeFormGroup({});
    const createdControl = formControlService.generateFormGroupModel(
      testQuestion,
      true,
      parentControl
    );

    // examine the created control
    expect(createdControl).toBeTruthy();
    expect(createdControl instanceof AfeFormGroup).toBe(true);
    expect(createdControl.parent).toBe(parentControl);

    // examine the parent control
    expect(parentControl.get(testQuestion.key)).toBe(createdControl);

    // examine child controls

    // examine the parent control
    expect(createdControl.get(testQuestion.questions[0].key)).toBeTruthy();
  });

  it('should wire disabling and hiding expressions', () => {
    // CASE: CONTROLS
    const testQuestion: QuestionBase = new TextInputQuestion({
      type: 'text',
      key: 'things',
      label: 'Things You Like',
      defaultValue: 'Hello',
      placeholder: '',
      hide: '1 === 2',
      disable: '3 === 4'
    });

    const parentControl = new AfeFormGroup({});
    const createdControl = formControlService.generateFormControl(
      testQuestion,
      parentControl
    );

    // examine the created control
    expect(createdControl).toBeTruthy();
    expect(createdControl.disablers).toBeTruthy();
    expect(createdControl.disablers.length).toBe(1);
    expect(createdControl.disablers[0].disableWhenExpression).toBe('3 === 4');

    expect(createdControl.hiders).toBeTruthy();
    expect(createdControl.hiders.length).toBe(1);
    expect(createdControl.hiders[0].hideWhenExpression).toBe('1 === 2');

    // CASE: GROUPS
    const testGroup: QuestionGroup = new QuestionGroup({
      type: 'group',
      key: 'things',
      label: 'Things You Like',
      questions: [],
      hide: '1 === 2',
      disable: '3 === 4'
    });

    const createdGroupControl = formControlService.generateFormGroupModel(
      testGroup,
      false
    );
    // examine the created control
    expect(createdGroupControl).toBeTruthy();
    expect(createdGroupControl.disablers).toBeTruthy();
    expect(createdGroupControl.disablers.length).toBe(1);
    expect(createdGroupControl.disablers[0].disableWhenExpression).toBe(
      '3 === 4'
    );

    expect(createdGroupControl.hiders).toBeTruthy();
    expect(createdGroupControl.hiders.length).toBe(1);
    expect(createdGroupControl.hiders[0].hideWhenExpression).toBe('1 === 2');

    // CASE: Arrays
    const testArray: RepeatingQuestion = new RepeatingQuestion({
      type: 'group',
      key: 'things',
      label: 'Things You Like',
      questions: [],
      hide: '1 === 2',
      disable: '3 === 4'
    });

    const createdArrayControl = formControlService.generateFormArray(testArray);
    // examine the created control
    expect(createdArrayControl).toBeTruthy();
    expect(createdArrayControl.disablers).toBeTruthy();
    expect(createdArrayControl.disablers.length).toBe(1);
    expect(createdArrayControl.disablers[0].disableWhenExpression).toBe(
      '3 === 4'
    );

    expect(createdArrayControl.hiders).toBeTruthy();
    expect(createdArrayControl.hiders.length).toBe(1);
    expect(createdArrayControl.hiders[0].hideWhenExpression).toBe('1 === 2');
  });

  it('should wire calculator expressions functions and evaluate correctly', () => {
    const heightQuestion: QuestionBase = new TextInputQuestion({
      type: 'text',
      key: 'height',
      label: 'Height',
      defaultValue: '180',
      placeholder: ''
    });

    const weightQuestion: QuestionBase = new TextInputQuestion({
      type: 'text',
      key: 'weight',
      label: 'Weight',
      defaultValue: '70',
      placeholder: ''
    });

    const bmiQuestion: QuestionBase = new TextInputQuestion({
      type: 'text',
      key: 'bmi',
      label: 'BMI:Kg/M2',
      placeholder: '',
      calculateExpression: 'calcBMI(height,weight)'
    });

    const control1 = formControlService.generateFormControl(heightQuestion);
    const control2 = formControlService.generateFormControl(weightQuestion);

    const control3 = formControlService.generateFormControl(bmiQuestion);

    control3.controlRelations.addRelatedControls([control1, control2]);
    // this will trigger propagateChange() function in the controls
    control1.setValue(180);
    control2.setValue(70);

    expect(control3).toBeTruthy();
    expect(control3.calculator).toBeTruthy();
    expect(control3.value).toEqual(21.6);
  });
});
