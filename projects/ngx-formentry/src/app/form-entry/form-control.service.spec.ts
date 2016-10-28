import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule,FormArray,FormControl } from '@angular/forms';

import { FormControlService } from './form-control.service';
import { TextInputQuestion } from './question-models/text-input-question';
import { QuestionGroup } from './question-models/group-question';
import { RepeatingQuestion } from './question-models/repeating-question'
import { MockForm } from '../mock/mock-form'

describe('Form Factory Control Service Tests', () => {
  let injector: Injector;
  let formControlService: FormControlService;
  let data = new MockForm().getMockForm();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      providers: [
        FormControlService
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

  it('Should have a controls array', () => {
    formControlService.create(data.questions, 'fbGroup');
    let controls = formControlService.controls;
    expect(controls.length).toEqual(10);
  });

  it('Should have a create function that returns a form group', () => {
    let formGroup = formControlService.create([new TextInputQuestion({
      type: 'text',
      key: 'Drugi',
      label: 'I Reference',
      value: '',
      placeholder: 'I Reference'
    })], 'fbGroup');

    expect(formGroup.fbGroup.value).toEqual({ 'Drugi': '' });
  });

  it('Should have a recursive generateGroup function that returns a form group', () => {
    let formGroup = formControlService.create([new TextInputQuestion({
      type: 'text',
      key: 'Drugi',
      label: 'I Reference',
      value: '',
      placeholder: 'I Reference'
    })], 'fbGroup');

    expect(formGroup.fbGroup.value).toEqual({ 'Drugi': '' });
  });

  it('Should have a generateFormArray function that returns a form array', () => {
    let formArray = formControlService.generateFormArray(new RepeatingQuestion({
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
    }));

    expect(formArray instanceof FormArray).toBeTruthy();
  });

  it('Should have a generateControl function that returns a form control', () => {
    let control = formControlService.generateControl(new TextInputQuestion({
      type: 'text',
      key: 'things',
      label: 'Things You Like',
      value: 'Hello',
      placeholder: ''
    }));

    expect(control.value).toEqual('Hello');
    expect(control instanceof FormControl).toBeTruthy();
  });

});
