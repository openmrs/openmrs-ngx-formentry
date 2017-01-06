import * as _ from 'lodash';

import { TextInputQuestion } from '../question-models/text-input-question';
import { TextAreaInputQuestion } from '../question-models/text-area-input-question';
import { SelectQuestion } from '../question-models/select-question';
import { UiSelectQuestion } from '../question-models/ui-select-question';
import { DateQuestion } from '../question-models/date-question';
import { MultiSelectQuestion } from '../question-models/multi-select-question';
import { QuestionGroup } from '../question-models/group-question';
import { RepeatingQuestion } from '../question-models/repeating-question';
import { QuestionBase } from '../question-models/question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

import { ValidationModel } from '../question-models/validation.model';
import { DateValidationModel } from '../question-models/date-validation.model';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { DummyDataSource } from '../data-sources/dummy-data-source';
import { HistoricalHelperService } from '../helpers/historical-expression-helper-service';

export class QuestionFactory {
  constructor() {
  }

  createQuestionModel(formSchema: any): QuestionBase {
    return this.toFormQuestionModel(formSchema);
  }

  toSelectQuestion(schemaQuestion: any): SelectQuestion {
    let question = new SelectQuestion({ options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
      return {
        label: obj.label,
        value: obj.concept
      };
    });
    question.renderingType = schemaQuestion.questionOptions.rendering;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toNumericQuestion(schemaQuestion: any): TextInputQuestion {
    let question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'number';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toNumberQuestion(schemaQuestion: any): TextInputQuestion {
    let question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'number';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toDateQuestion(schemaQuestion: any): DateQuestion {
    let question = new DateQuestion({ type: '', key: '' });
    question.renderingType = 'date';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toEncounterDatetimeQuestion(schemaQuestion: any): DateQuestion {
    let question = new DateQuestion({ type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toMultiCheckboxQuestion(schemaQuestion: any): MultiSelectQuestion {
    let question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
      return {
        label: obj.label,
        value: obj.concept
      };
    });
    question.validators = this.addValidators(schemaQuestion);
    question.dataSource = new DummyDataSource();
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toTextAreaQuestion(schemaQuestion: any): TextAreaInputQuestion {
    let question = new TextAreaInputQuestion({ isExpanded: false, rows: 18, placeholder: '', type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.isExpanded = schemaQuestion.isExpanded;
    question.rows = schemaQuestion.questionOptions.rows;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toTextQuestion(schemaQuestion: any): TextInputQuestion {
    let question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'text';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toDrugQuestion(schemaQuestion: any): SelectQuestion {
    let question = new SelectQuestion({ options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = schemaQuestion.type;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toRepeatingQuestion(schemaQuestion: any): RepeatingQuestion {
    let question = new RepeatingQuestion({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.questions = schemaQuestion.questions;
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toGroupQuestion(schemaQuestion: any): QuestionGroup {
    let question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.questions = schemaQuestion.questions;
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toPageQuestion(schemaQuestion: any): QuestionGroup {
    let question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.label;
    question.renderingType = 'page';
    question.controlType = AfeControlType.None;
    question.questions = [];
    schemaQuestion.sections.forEach(element => {
      question.questions.push(this.toSectionQuestion(element));
    });
    return question;
  }

  toFormQuestionModel(schemaQuestion: any): QuestionGroup {
    let question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.label;
    question.renderingType = 'form';
    question.controlType = AfeControlType.AfeFormGroup;
    question.extras = schemaQuestion;
    question.questions = [];
    schemaQuestion.pages.forEach(element => {
      question.questions.push(this.toPageQuestion(element));
    });
    return question;
  }

  toSectionQuestion(schemaQuestion: any): QuestionGroup {
    let question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.label;
    question.renderingType = 'section';
    question.controlType = AfeControlType.None;
    question.questions = this.getSchemaQuestions(schemaQuestion.questions);
    return question;
  }

  toPersonAttributeQuestion(schemaQuestion: any): UiSelectQuestion {
    let question = new UiSelectQuestion({
      options: [], type: '', key: '', searchFunction: function () { },
      resolveFunction: function () {

      }
    });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = schemaQuestion.type;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toEncounterProviderQuestion(schemaQuestion: any): UiSelectQuestion {
    let question = new UiSelectQuestion({
      options: [], type: '', key: '', searchFunction: function () { },
      resolveFunction: function () {

      }
    });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = schemaQuestion.type;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  toEncounterLocationQuestion(schemaQuestion: any): UiSelectQuestion {
    let question = new UiSelectQuestion({
      options: [], type: '', key: '', searchFunction: function () { },
      resolveFunction: function () {

      }
    });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = schemaQuestion.type;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    let mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    return question;
  }

  getSchemaQuestions(schema: any): any {
    let listQuestions = new Array();
    this.getQuestions(schema, listQuestions);
    return listQuestions;
  }

  getQuestions(schema: any, foundArray: any): any {
    if (!Array.isArray(foundArray)) {
      foundArray = [];
    }
    if (Array.isArray(schema)) {

      for (let property in schema) {
        if (schema.hasOwnProperty(property)) {
          this.getQuestions(schema[property], foundArray);
        }
      };
    }

    if (schema && !Array.isArray(schema) && typeof schema === 'object') {
      if (schema.questionOptions) {
        if (schema.questionOptions.rendering === 'group' || schema.questionOptions.rendering === 'repeating') {
          schema.questions = this.getGroupMembers(schema.questions);
          foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
        } else {
          foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
        }
      } else {
        for (let o in schema) {
          if (schema.hasOwnProperty(o)) {
            this.getQuestions(schema[o], foundArray);
          }
        }
      }
    }

  }

  getGroupMembers(schema: any): any {
    let groupMembers = [];
    this.getQuestions(schema, groupMembers);
    return groupMembers;

  }

  toModel(schema: any, renderType: string): any {
    if (renderType === 'ui-select-extended') {
      renderType = schema.type;
    }
    if (!schema.id) {
      schema['id'] = this.generateId(10);
    }
    switch (renderType) {
      case 'select':
        return this.toSelectQuestion(schema);
      case 'numeric':
        return this.toNumericQuestion(schema);
      case 'number':
        return this.toNumberQuestion(schema);
      case 'date':
        return this.toDateQuestion(schema);
      case 'multiCheckbox':
        return this.toMultiCheckboxQuestion(schema);
      case 'drug':
        return this.toDrugQuestion(schema);
      case 'group':
        return this.toGroupQuestion(schema);
      case 'repeating':
        return this.toRepeatingQuestion(schema);
      case 'personAttribute':
        return this.toPersonAttributeQuestion(schema);
      case 'text':
        return this.toTextQuestion(schema);
      case 'textarea':
        return this.toTextAreaQuestion(schema);
      case 'textarea':
        return this.toTextAreaQuestion(schema);
      case 'encounterLocation':
        return this.toEncounterLocationQuestion(schema);

      case 'encounterDatetime':
        return this.toEncounterDatetimeQuestion(schema);
      case 'encounterProvider':
        return this.toEncounterProviderQuestion(schema);

      default:
        console.log('New Schema Question Type found.........' + renderType);
        return this.toTextQuestion(schema);
    }

  }

  copyProperties(mappings: any, source: any, destination: QuestionBase) {

    for (let property in source) {
      if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
        destination[mappings[property]] = source[property];
      }
    };
  }

  addValidators(schemaQuestion: any): Array<ValidationModel> {

    let validators: Array<ValidationModel> = [];

    if (schemaQuestion.validators) {

      // TODO - add more validator types
      _.forEach(schemaQuestion.validators, (validator: any) => {
        switch (validator.type) {
          case 'date':
            validators.push(new DateValidationModel(validator));
            break;
          case 'js_expression':
            validators.push(new JsExpressionValidationModel(validator));
            break;
          default:
            validators.push(new ValidationModel(validator));
            break;
        }
      });
    }

    return validators;
  }

  addHistoricalExpressions(schemaQuestion: any, question: QuestionBase): any {

    if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {

      question['hasHistoricalValue'] = true;

      let helper = new HistoricalHelperService();
      let origValue = helper.evaluate(schemaQuestion.historicalExpression);

      question['historicalDataValue'] = origValue;
      if (schemaQuestion.historicalPrepopulate) {

        question.defaultValue = origValue;
      }
    }

  }

  addDisableOrHideProperty(schemaQuestion: any, question: QuestionBase): any {

    if (!!schemaQuestion.disable) {
      question.disable = schemaQuestion.disable;
    }

    if (typeof schemaQuestion.disable === 'object') {
      question.disable = schemaQuestion.disable.disableWhenExpression;
    }

    if (!!schemaQuestion.hide) {
      question.hide = schemaQuestion.hide;
    }
    if (typeof schemaQuestion.hide === 'object') {
      question.hide = schemaQuestion.hide.hideWhenExpression;
    }
  }
  private generateId(x) {
    let s = '';
    while (s.length < x && x > 0) {
      let r = Math.random();
      s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
  }
}
