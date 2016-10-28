import {Injectable} from '@angular/core';
import {FormControl, FormGroup, FormArray} from '@angular/forms';

import {QuestionBase} from './question-models/question-base';
import {QuestionGroup} from './question-models/group-question';

@Injectable()
export class FormControlService {
  controls = [];

  constructor() {
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

    toReturn[formKey] = new FormGroup(temp);
    return toReturn;
  }

  generateGroup(question: QuestionBase): FormGroup {

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

  generateFormArray(question: QuestionBase): FormArray {

    let formArray = new FormArray([]);

    this.controls.push({
      id: question.key,
      type: 'repeating',
      control: formArray
    });

    return formArray;
  }

  generateControl(question: QuestionBase): FormControl {

    let value = question.value || '';

    let control = new FormControl(value);
    this.controls.push({
      id: question.key,
      type: 'control',
      control: control
    });

    return control;
  }
}
