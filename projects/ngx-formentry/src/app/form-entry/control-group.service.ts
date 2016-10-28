import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Validation } from './question-models/validation';
import { QuestionBase } from './question-models/question-base';
import { QuestionGroup } from './question-models/group-question';
@Injectable()
export class ControlGroupService {
  repeating = [];
  matches = [];
  formValue: any;
  controls = [];
  constructor(private formBuilder: FormBuilder) { }
  create(questions: QuestionBase[], formKey?): any {
    let temp = {},
      toReturn = {},
      self = this;

    for (let question of questions) {
      let val = question.value || '',
        validators = null;

      if (question.type === 'group') {
        let questionGroup = question as QuestionGroup;
        let formGroup = this.create(questionGroup.questions, question.key);
        let group = formGroup[question.key];
        let controlMap = {
          id: question.key,
          control: group
        };
        this.controls.push(controlMap);
        temp[question.key] = group;
      } else if (question.type === 'repeating') {
        let formArray = new FormArray([]);
        let controlMap = {
          id: question.key,
          control: formArray
        };
        this.controls.push(controlMap);
        temp[question.key] = formArray;
      } else {
        let control = new FormControl(val, Validators.compose(validators));
        temp[question.key] = control;
        let controlMap = {
          id: question.key,
          control: control
        };
        this.controls.push(controlMap);
      }
    }

    toReturn[formKey] = new FormGroup(temp);

    // Add matches for watching if required
    toReturn['matches'] = this.matches;
    return toReturn;

    function setValidator(item: Validation, original?) {
      switch (item.type) {
        case 'required': return Validators.required;
        case 'minLength': return Validators.minLength(item.value);
        case 'maxLength': return Validators.maxLength(item.value);
        case 'pattern': return Validators.pattern(item.value);
        case 'custom': return item.value;
      }
    }
  }
}
