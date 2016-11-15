import {Injectable} from '@angular/core';
import { AfeFormControl } from '../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../abstract-controls-extension/afe-form-array';
import { AfeFormGroup } from '../abstract-controls-extension/afe-form-group';
import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';

import {QuestionBase} from './question-models/question-base';
import {QuestionGroup} from './question-models/group-question';
import {ValidationFactory} from './factories/validation.factory';

@Injectable()
export class FormControlService {
  controls = [];
  validationFactory: ValidationFactory;

  constructor(validationFactory: ValidationFactory) {
    this.validationFactory = validationFactory;
  }

  create(questions: QuestionBase[], formKey?): any {
    let temp = {},
      toReturn = {};
    for (let question of questions) {

      if (question.type === 'group') {
        temp[question.key] = this.generateGroup(question);
      } else if (question.type === 'repeating') {
        temp[question.key] = this.generateFormArray(question);
      } else {
        temp[question.key] = this.generateControl(question);
      }
    }

    toReturn[formKey] = new AfeFormGroup(temp);
    return toReturn;
  }

  generateGroup(question: QuestionBase): AfeFormGroup {

    let questionGroup = question as QuestionGroup;
    let formGroup = this.create(questionGroup.questions, question.key);
    let group = formGroup[question.key];

    this.controls.push({
      id: question.key,
      type: 'group',
      control: group
    });

    return group;
  }

  generateFormArray(question: QuestionBase): AfeFormArray {

    let formArray = new AfeFormArray([]);

    this.controls.push({
      id: question.key,
      type: 'repeating',
      control: formArray
    });

    return formArray;
  }

  generateControl(question: QuestionBase): AfeFormControl {

    let value = question.value || '';
    let validators = this.validationFactory.getValidators(question);

    let control = new AfeFormControl(value, validators);
    this.controls.push({
      id: question.key,
      type: 'control',
      control: control
    });

    return control;
  }
}
