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
import { FileUploadQuestion } from '../question-models/file-upload-question';
import { TestOrderQuestion } from '../question-models/test-order-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

import { ValidationModel } from '../question-models/validation.model';
import { DateValidationModel } from '../question-models/date-validation.model';
import { MaxValidationModel } from '../question-models/max-validation.model';
import { MinValidationModel } from '../question-models/min-validation.model';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { DummyDataSource } from '../data-sources/dummy-data-source';
import { HistoricalHelperService } from '../helpers/historical-expression-helper-service';
import { Form } from './form';
import { CheckBoxQuestion } from '../question-models/models';

export class QuestionFactory {
  dataSources: any = {};
  historicalHelperService: HistoricalHelperService = new HistoricalHelperService();
  constructor() {
  }

  createQuestionModel(formSchema: any, form?: Form): QuestionBase {
    if (form) {
      const dataSources = form.dataSourcesContainer.dataSources;
      this.dataSources = dataSources;
    }
    return this.toFormQuestionModel(formSchema);
  }

  toSelectQuestion(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
      return {
        label: obj.label,
        value: obj.concept
      };
    });

    const options: any = question.options;
    options.splice(0, 0, {
      label: '',
      value: ''
    });

    question.renderingType = schemaQuestion.questionOptions.rendering;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toNumericQuestion(schemaQuestion: any): TextInputQuestion {
    const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'number';
    question.placeholder = schemaQuestion.questionOptions.placeholder;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.placeholder = schemaQuestion.questionOptions.placeholder || '';
    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toNumberQuestion(schemaQuestion: any): TextInputQuestion {
    const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'number';
    question.placeholder = schemaQuestion.questionOptions.placeholder || '';
    question.extras = schemaQuestion;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    question.validators = this.addValidators(schemaQuestion);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toDateQuestion(schemaQuestion: any): DateQuestion {
    if (schemaQuestion.type === 'encounterDatetime') {
      return this.toEncounterDatetimeQuestion(schemaQuestion);
    }
    const question = new DateQuestion({ type: '', key: '' });
    question.renderingType = 'date';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.showTime = schemaQuestion.questionOptions.showTime as boolean;
    question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };


    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toEncounterDatetimeQuestion(schemaQuestion: any): DateQuestion {
    const question = new DateQuestion({ type: '', key: '' });
    question.label = schemaQuestion.label;
    question.renderingType = 'date';
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.showTime = true;

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toCheckBoxQuestion(schemaQuestion: any): CheckBoxQuestion {
    const question = new CheckBoxQuestion({ options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.extras = schemaQuestion;
    question.options = schemaQuestion.questionOptions.answers.map((obj) => {
      return {
        label: obj.label,
        value: obj.concept
      };
    });
    question.options.splice(0, 0);

    question.renderingType = schemaQuestion.questionOptions.rendering;
    const mappings: any = {
      label: 'label',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;

  }

  toMultiCheckboxQuestion(schemaQuestion: any): MultiSelectQuestion {
    const question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
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

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toTextAreaQuestion(schemaQuestion: any): TextAreaInputQuestion {
    const question = new TextAreaInputQuestion({
      isExpanded: false, rows: 18,
      placeholder: '', type: '', key: ''
    });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.placeholder = schemaQuestion.questionOptions.placeholder;
    question.isExpanded = schemaQuestion.isExpanded;
    question.rows = schemaQuestion.questionOptions.rows;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.placeholder = schemaQuestion.questionOptions.placeholder || '';

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toTextQuestion(schemaQuestion: any): TextInputQuestion {
    const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'text';
    question.placeholder = schemaQuestion.questionOptions.placeholder;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.placeholder = schemaQuestion.questionOptions.placeholder || '';
    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toFileUploadQuestion(schemaQuestion: any): FileUploadQuestion {
    const question = new FileUploadQuestion({ type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'file';
    question.dataSource = 'file';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toDrugQuestion(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource = 'drug';
    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toProblemQuestion(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource = 'problem';
    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toConceptAnswerSelect(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
    question.dataSourceOptions = {
      concept: schemaQuestion.questionOptions.concept
    };
    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toRepeatingQuestion(schemaQuestion: any): RepeatingQuestion {
    const question = new RepeatingQuestion({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    if (schemaQuestion.type === 'testOrder') {
      const testOrder = this.toTestOrderQuestion(schemaQuestion);
      const orders = []; orders.push(testOrder);
      question.questions = orders;
    }

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toGroupQuestion(schemaQuestion: any): QuestionGroup {
    const question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toPageQuestion(schemaQuestion: any): QuestionGroup {
    const question = new QuestionGroup({ questions: [], type: '', key: '' });
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
    const question = new QuestionGroup({ questions: [], type: '', key: '' });
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
    const question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.label;
    question.renderingType = 'section';
    question.controlType = AfeControlType.None;
    question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
    question.questions = this.getSchemaQuestions(schemaQuestion.questions);
    return question;
  }

  toPersonAttributeQuestion(schemaQuestion: any): UiSelectQuestion {
    const question = new UiSelectQuestion({
      options: [], type: '', key: '', searchFunction: function () { },
      resolveFunction: function () {

      }
    });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource = 'personAttribute';

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toEncounterProviderQuestion(schemaQuestion: any): UiSelectQuestion {
    const question = new UiSelectQuestion({
      options: [], type: '', key: '', searchFunction: function () { },
      resolveFunction: function () {

      }
    });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource = 'provider';

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toFieldSetQuestion(schemaQuestion: any): QuestionGroup {
    const toReturn = this.toGroupQuestion(schemaQuestion);
    toReturn.renderingType = 'field-set';
    return toReturn;
  }

  toEncounterLocationQuestion(schemaQuestion: any): UiSelectQuestion {
    const question = new UiSelectQuestion({
      options: [], type: '', key: '', searchFunction: function () { },
      resolveFunction: function () {

      }
    });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.renderingType = schemaQuestion.type;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource = 'location';

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toTestOrderQuestion(schemaQuestion: any): TestOrderQuestion {

    const question = new TestOrderQuestion({
      type: '', key: '', orderType: '', selectableOrders: [],
      orderSettingUuid: '', label: '', rendering: ''
    });

    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.options = schemaQuestion.questionOptions.selectableOrders.map(function (obj) {
      return {
        label: obj.label,
        value: obj.concept
      };
    });

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    this.copyProperties(mappings, schemaQuestion, question);
    return question;
  }

  getSchemaQuestions(schema: any): any {
    const listQuestions = new Array();
    this.getQuestions(schema, listQuestions);
    return listQuestions;
  }

  getQuestions(schema: any, foundArray: any): any {
    if (!Array.isArray(foundArray)) {
      foundArray = [];
    }
    if (Array.isArray(schema)) {

      for (const property in schema) {
        if (schema.hasOwnProperty(property)) {
          this.getQuestions(schema[property], foundArray);
        }
      }
    }

    if (schema && !Array.isArray(schema) && typeof schema === 'object') {
      if (schema.questionOptions) {
        if (schema.questionOptions.rendering === 'group' ||
          schema.questionOptions.rendering === 'repeating') {
          // schema.questions = this.getGroupMembers(schema.questions);
          foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
        } else if (schema.questionOptions.rendering === 'field-set') {
        } else {
          foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
        }
      } else {
        for (const o in schema) {
          if (schema.hasOwnProperty(o)) {
            this.getQuestions(schema[o], foundArray);
          }
        }
      }
    }

  }

  getChildrenQuestionModels(schema: any): any {
    const children = [];
    this.getQuestions(schema, children);
    return children;

  }

  toModel(schema: any, renderType: string): any {
    if (renderType === 'ui-select-extended') {
      renderType = schema.type;
    }
    if (!schema.id) {
      schema['id'] = this.generateId(10);
    }

    if (schema.questionOptions &&
      (schema.questionOptions.showDate === true ||
        schema.questionOptions.showDate === 'true')) {
      schema = this.convertOldVersionComplexObsQuestionToNewVersion(schema);
      renderType = 'field-set';
    }

    switch (renderType) {
      case 'select':
        return this.toSelectQuestion(schema);
      case 'single-select':
        return this.toSelectQuestion(schema);
      case 'multi-select':
        return this.toSelectQuestion(schema);
      case 'numeric':
        return this.toNumericQuestion(schema);
      case 'number':
        return this.toNumberQuestion(schema);
      case 'encounterDatetime':
        return this.toEncounterDatetimeQuestion(schema);
      case 'date':
        return this.toDateQuestion(schema);
      case 'multiCheckbox':
        return this.toMultiCheckboxQuestion(schema);
      case 'drug':
        return this.toDrugQuestion(schema);
      case 'problem':
        return this.toProblemQuestion(schema);
      case 'group':
        return this.toGroupQuestion(schema);
      case 'field-set':
        return this.toFieldSetQuestion(schema);
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
      case 'select-concept-answers':
        return this.toConceptAnswerSelect(schema);
      case 'encounterLocation':
        return this.toEncounterLocationQuestion(schema);
      case 'encounterDatetime':
        return this.toEncounterDatetimeQuestion(schema);
      case 'encounterProvider':
        return this.toEncounterProviderQuestion(schema);
      case 'radio':
        return this.toCheckBoxQuestion(schema);
      case 'checkbox':
        return this.toCheckBoxQuestion(schema);
        case 'encounterProvider':
        return this.toEncounterProviderQuestion(schema);
      default:
        console.warn('New Schema Question Type found.........' + renderType);
        return this.toTextQuestion(schema);
    }

  }

  convertOldVersionComplexObsQuestionToNewVersion(schemaQuestion: any) {
    const converted: any = {};
    converted.type = 'complex-obs';
    converted.label = schemaQuestion.label;
    converted.id = 'complex_' + schemaQuestion.id;
    converted.questionOptions = {};
    converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
    converted.questionOptions.rendering = 'field-set';
    converted.questions = [];
    converted.validators = [];

    const mainField: any = JSON.parse(JSON.stringify(schemaQuestion));
    mainField.type = 'complex-obs-child';
    delete mainField.questionOptions.showDate;
    delete mainField.questionOptions.shownDateOptions;
    mainField.questionOptions.obsField = 'value';

    const dateField: any = {};
    dateField.type = 'complex-obs-child';
    dateField.label = 'Date of ' + mainField.label;
    dateField.id = 'date_' + mainField.id;
    dateField.questionOptions = {};
    dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
    dateField.questionOptions.rendering = 'date';
    dateField.questionOptions.obsField = 'obsDatetime';
    const dateOptions: any = (Object as any).assign({},
    schemaQuestion.questionOptions.shownDateOptions);
    dateField.validators = dateOptions.validators;
    dateField.hide = dateOptions.hide;


    converted.questions.push(mainField);
    converted.questions.push(dateField);

    return converted;
  }

  copyProperties(mappings: any, source: any, destination: QuestionBase) {

    for (const property in source) {
      if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
        destination[mappings[property]] = source[property];
      }
    }
  }

  addValidators(schemaQuestion: any): Array<ValidationModel> {

    const validators: Array<ValidationModel> = [];

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
          case 'conditionalAnswered':
            validators.push(new ConditionalValidationModel(validator));
            break;
          default:
            validators.push(new ValidationModel(validator));
            break;
        }
      });
    }

    const questionOptions = schemaQuestion.questionOptions;
    const renderingType = questionOptions ? questionOptions.rendering : '';
    switch (renderingType) {
      case 'number':

        if (questionOptions.max && questionOptions.min) {
          validators.push(new MaxValidationModel({
            type: 'max',
            max: questionOptions.max
          }));
          validators.push(new MinValidationModel({
            type: 'min',
            min: questionOptions.min
          }));
        }

        break;
      default:
        break;
    }

    // add conditional required validators
    if (typeof schemaQuestion.required === 'object') {

      const required: any = schemaQuestion.required;

      if (required.type === 'conditionalRequired') {

        validators.push(new ConditionalValidationModel({
          referenceQuestionId: required.referenceQuestionId,
          referenceQuestionAnswers: required.referenceQuestionAnswers,
          type: required.type,
          message: required.message,
        }));
      }
    }

    return validators;
  }

  addHistoricalExpressions(schemaQuestion: any, question: QuestionBase): any {
    if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {
      question.setHistoricalValue(true);
      if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
        question.showHistoricalEncounterDate(
          (schemaQuestion.showHistoricalEncounterDate === 'true'));
      } else {
        question.showHistoricalEncounterDate();
      }
      const origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression,
        this.dataSources);
      question.historicalDataValue = origValue;
      if (schemaQuestion.historicalPrepopulate) {
        question.defaultValue = origValue;
      }
    }
  }

  addCalculatorProperty(schemaQuestion: any, question: QuestionBase): any {

    if (schemaQuestion.questionOptions &&
      typeof schemaQuestion.questionOptions.calculate === 'object') {
      question.calculateExpression = schemaQuestion.questionOptions.calculate.calculateExpression;
    }

  }

  addAlertProperty(schemaQuestion: any, question: QuestionBase): any {
    if (schemaQuestion.alert) {
      question.alert = schemaQuestion.alert;
    }
    // if (typeof schemaQuestion.message === 'object') {
    //   if (schemaQuestion.message.alertWhenExpression) {
    //     question.message = schemaQuestion.message.alertWhenExpression;
    //   }
    // }
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

      if (schemaQuestion.hide.hideWhenExpression) {
        question.hide = schemaQuestion.hide.hideWhenExpression;
      }
    }
  }
  private generateId(x) {
    let s = '_';
    while (s.length < x && x > 0) {
      const r = Math.random();
      s += (r < 0.1 ? Math.floor(r * 100) :
        String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return '_' + s;
  }
}
