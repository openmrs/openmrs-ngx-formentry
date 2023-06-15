import _ from 'lodash';
import moment from 'moment';

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
import { RadioButtonQuestion } from '../question-models/models';
import { Injectable } from '@angular/core';
import { CustomControlQuestion } from '../question-models/custom-control-question.model';
import { DiagnosisQuestion } from '../question-models/diagnosis-question';
import { MaxLengthValidationModel } from '../question-models/max-length-validation.model';
import { MinLengthValidationModel } from '../question-models/min-length-validation.model';

@Injectable()
export class QuestionFactory {
  dataSources: any = {};
  historicalHelperService: HistoricalHelperService = new HistoricalHelperService();
  quetionIndex = 0;
  constructor() {}

  createQuestionModel(formSchema: any, form?: Form): QuestionBase {
    if (form) {
      const dataSources = form.dataSourcesContainer.dataSources;
      this.dataSources = dataSources;
    }
    return this.toFormQuestionModel(formSchema);
  }

  toSelectQuestion(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.id;
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    question.options = schemaQuestion.questionOptions.answers.map((obj) => ({
      label: obj.label,
      value: obj.concept
    }));

    question.options.splice(0, 0, {
      label: '',
      value: ''
    });

    question.renderingType = schemaQuestion.questionOptions.rendering;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    const mappings = {
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
    const question = new TextInputQuestion({
      placeholder: '',
      type: '',
      key: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.id;
    question.renderingType = 'number';
    question.placeholder = schemaQuestion.questionOptions.placeholder;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.placeholder = schemaQuestion.questionOptions.placeholder || '';
    question.componentConfigs = schemaQuestion.componentConfigs || [];
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
    const question = new TextInputQuestion({
      placeholder: '',
      type: '',
      key: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.id;
    question.renderingType = 'number';
    question.placeholder = schemaQuestion.questionOptions.placeholder || '';
    question.extras = schemaQuestion;
    question.componentConfigs = schemaQuestion.componentConfigs || [];

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
    question.questionIndex = this.quetionIndex;
    question.renderingType = 'date';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.showTime = schemaQuestion.questionOptions.showTime as boolean;
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    question.showWeeksAdder = schemaQuestion.questionOptions.weeksList
      ? true
      : false;

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
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.renderingType = 'date';
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.showWeeksAdder = schemaQuestion.questionOptions.weeksList
      ? true
      : false;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.showTime = true;
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    question.datePickerFormat = schemaQuestion.datePickerFormat ?? 'calendar';

    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toCheckBoxQuestion(schemaQuestion: any): CheckBoxQuestion {
    const question = new CheckBoxQuestion({ options: [], type: '', key: '' });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.id;
    question.extras = schemaQuestion;
    question.orientation = schemaQuestion.questionOptions.orientation;
    question.options = schemaQuestion.questionOptions.answers.map((obj) => {
      return {
        label: obj.label,
        value: obj.concept
      };
    });
    question.options.splice(0, 0);

    question.renderingType = schemaQuestion.questionOptions.rendering;
    const mappings = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toRadioButtonQuestion(schemaQuestion: any): RadioButtonQuestion {
    const question = new RadioButtonQuestion({
      options: [],
      type: '',
      key: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.id;
    question.prefix = schemaQuestion.prefix;
    question.extras = schemaQuestion;
    question.allowUnselect = schemaQuestion.questionOptions.allowUnselect;
    question.orientation = schemaQuestion.questionOptions.orientation;
    question.options = schemaQuestion.questionOptions.answers.map((obj) => {
      return {
        label: obj.label,
        value: obj.concept
      };
    });
    question.options.splice(0, 0);

    question.renderingType = schemaQuestion.questionOptions.rendering;
    const mappings = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toMultiCheckboxQuestion(schemaQuestion: any): MultiSelectQuestion {
    const question = new MultiSelectQuestion({
      renderType: '',
      options: [],
      type: '',
      key: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.id;
    question.options = schemaQuestion.questionOptions.answers.map((obj) => ({
      label: obj.label,
      value: obj.concept
    }));
    question.validators = this.addValidators(schemaQuestion);
    question.dataSource = new DummyDataSource();
    question.extras = schemaQuestion;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toTextAreaQuestion(schemaQuestion: any): TextAreaInputQuestion {
    const question = new TextAreaInputQuestion({
      isExpanded: false,
      rows: 18,
      placeholder: '',
      type: '',
      key: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toTextQuestion(schemaQuestion: any): TextInputQuestion {
    const question = new TextInputQuestion({
      placeholder: '',
      type: '',
      key: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toFileUploadQuestion(schemaQuestion: any): FileUploadQuestion {
    const question = new FileUploadQuestion({ type: '', key: '' });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toDrugQuestion(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toProblemQuestion(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toConceptAnswerSelect(schemaQuestion: any): SelectQuestion {
    const question = new SelectQuestion({ options: [], type: '', key: '' });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.id;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource =
      schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
    question.dataSourceOptions = {
      concept: schemaQuestion.questionOptions.concept
    };
    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toRepeatingQuestion(schemaQuestion: any): RepeatingQuestion {
    const question = new RepeatingQuestion({
      questions: [],
      type: '',
      key: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.questions = this.getChildrenQuestionModels(
      schemaQuestion.questions
    );
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    if (schemaQuestion.type === 'testOrder') {
      const testOrder = this.toTestOrderQuestion(schemaQuestion);
      const orders = [];
      orders.push(testOrder);
      question.questions = orders;
    } else if (schemaQuestion.type === 'diagnosis') {
      const diagnosisQuestion = this.toDiagnosisQuestion(schemaQuestion);
      question.questions = [diagnosisQuestion];
    }

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toGroupQuestion(schemaQuestion: any): QuestionGroup {
    const question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.questions = this.getChildrenQuestionModels(
      schemaQuestion.questions
    );
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
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
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.label;
    question.renderingType = 'page';
    question.controlType = AfeControlType.None;
    question.questions = [];
    schemaQuestion.sections.forEach((element) => {
      question.questions.push(this.toSectionQuestion(element));
    });
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    return question;
  }

  toFormQuestionModel(schemaQuestion: any): QuestionGroup {
    const question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.key = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.renderingType = 'form';
    question.controlType = AfeControlType.AfeFormGroup;
    question.extras = schemaQuestion;
    question.questions = [];
    schemaQuestion.pages.forEach((element) => {
      question.questions.push(this.toPageQuestion(element));
    });
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    return question;
  }

  toSectionQuestion(schemaQuestion: any): QuestionGroup {
    const question = new QuestionGroup({ questions: [], type: '', key: '' });
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.label;
    question.renderingType = 'section';
    question.controlType = AfeControlType.None;
    question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
    question.questions = this.getSchemaQuestions(schemaQuestion.questions);
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    return question;
  }

  toPersonAttributeQuestion(schemaQuestion: any): UiSelectQuestion {
    const question = new UiSelectQuestion({
      options: [],
      type: '',
      key: '',
      searchFunction: function () {},
      resolveFunction: function () {}
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
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
      options: [],
      type: '',
      key: '',
      searchFunction: function () {},
      resolveFunction: function () {}
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toFieldSetQuestion(schemaQuestion: any): QuestionGroup {
    const question = this.toGroupQuestion(schemaQuestion);
    question.renderingType = 'field-set';
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    return question;
  }

  toEncounterLocationQuestion(schemaQuestion: any): UiSelectQuestion {
    const question = new UiSelectQuestion({
      options: [],
      type: '',
      key: '',
      searchFunction: function () {},
      resolveFunction: function () {}
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
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
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
    return question;
  }

  toTestOrderQuestion(schemaQuestion: any): TestOrderQuestion {
    const question = new TestOrderQuestion({
      type: '',
      key: '',
      orderType: '',
      selectableOrders: [],
      orderSettingUuid: '',
      label: '',
      rendering: ''
    });
    question.questionIndex = this.quetionIndex;
    question.label = schemaQuestion.label;
    question.prefix = schemaQuestion.prefix;
    question.key = schemaQuestion.id;
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.options = schemaQuestion.questionOptions.selectableOrders.map(
      function (obj) {
        return {
          label: obj.label,
          value: obj.concept
        };
      }
    );

    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    return question;
  }

  toDiagnosisQuestion(schemaQuestion: any): DiagnosisQuestion {
    const question = new DiagnosisQuestion({
      type: '',
      key: schemaQuestion.id,
      label: schemaQuestion.label,
      rendering: '',
      rank: schemaQuestion.questionOptions.rank
    });
    question.questionIndex = this.quetionIndex;
    question.prefix = schemaQuestion.prefix;
    question.renderingType = 'remote-select';
    question.validators = this.addValidators(schemaQuestion);
    question.extras = schemaQuestion;
    question.dataSource =
      schemaQuestion.questionOptions.dataSource || 'diagnoses';
    const mappings: any = {
      label: 'label',
      required: 'required',
      id: 'key'
    };
    question.componentConfigs = schemaQuestion.componentConfigs || [];
    this.copyProperties(mappings, schemaQuestion, question);
    this.addDisableOrHideProperty(schemaQuestion, question);
    this.addAlertProperty(schemaQuestion, question);
    this.addHistoricalExpressions(schemaQuestion, question);
    this.addCalculatorProperty(schemaQuestion, question);
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
        if (
          schema.questionOptions.rendering === 'group' ||
          schema.questionOptions.rendering === 'repeating'
        ) {
          // schema.questions = this.getGroupMembers(schema.questions);
          foundArray.push(
            this.toModel(schema, schema.questionOptions.rendering)
          );
        } else if (schema.questionOptions.rendering === 'field-set') {
        } else {
          foundArray.push(
            this.toModel(schema, schema.questionOptions.rendering)
          );
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
    this.quetionIndex++;
    if (renderType === 'ui-select-extended') {
      renderType = schema.type;
    }
    if (!schema.id) {
      schema['id'] = this.generateId(10);
    }

    if (
      schema.questionOptions &&
      (schema.questionOptions.showDate === true ||
        schema.questionOptions.showDate === 'true')
    ) {
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
      case 'select-concept-answers':
        return this.toConceptAnswerSelect(schema);
      case 'encounterLocation':
        return this.toEncounterLocationQuestion(schema);
      case 'encounterDatetime':
        return this.toEncounterDatetimeQuestion(schema);
      case 'encounterProvider':
        return this.toEncounterProviderQuestion(schema);
      case 'radio':
        return this.toRadioButtonQuestion(schema);
      case 'checkbox':
        return this.toCheckBoxQuestion(schema);
      case 'encounterProvider':
        return this.toEncounterProviderQuestion(schema);
      case 'file':
        return this.toFileUploadQuestion(schema);
      default:
        console.warn('New Schema Question Type found.........' + renderType);
        return this.toTextQuestion(schema);
    }
  }

  convertOldVersionComplexObsQuestionToNewVersion(schemaQuestion: any) {
    const converted: any = {};
    converted.type = 'complex-obs';
    converted.label = schemaQuestion.label;
    converted.prefix = schemaQuestion.prefix;
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
    const dateOptions: any = (Object as any).assign(
      {},
      schemaQuestion.questionOptions.shownDateOptions
    );
    dateField.validators = dateOptions.validators;
    dateField.hide = dateOptions.hide;

    converted.questions.push(mainField);
    converted.questions.push(dateField);

    return converted;
  }

  copyProperties(mappings: any, source: any, destination: QuestionBase) {
    for (const property in source) {
      if (
        mappings.hasOwnProperty(property) &&
        destination.hasOwnProperty(mappings[property])
      ) {
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
          validators.push(
            new MaxValidationModel({
              type: 'max',
              max: questionOptions.max
            })
          );
          validators.push(
            new MinValidationModel({
              type: 'min',
              min: questionOptions.min
            })
          );
        }
        if (questionOptions.maxLength) {
          validators.push(
            new MaxLengthValidationModel({
              type: 'maxlength',
              maxlength: questionOptions.maxLength
            })
          );
        }
        if (questionOptions.minLength) {
          validators.push(
            new MinLengthValidationModel({
              type: 'minlength',
              minlength: questionOptions.minLength
            })
          );
        }

        break;
      default:
        break;
    }

    // add conditional required validators
    if (typeof schemaQuestion.required === 'object') {
      const required: any = schemaQuestion.required;

      if (required.type === 'conditionalRequired') {
        validators.push(
          new ConditionalValidationModel({
            referenceQuestionId: required.referenceQuestionId,
            referenceQuestionAnswers: required.referenceQuestionAnswers,
            type: required.type,
            message: required.message
          })
        );
      }
    }

    return validators;
  }

  addHistoricalExpressions(schemaQuestion: any, question: QuestionBase): any {
    if (
      schemaQuestion.historicalExpression &&
      schemaQuestion.historicalExpression.length > 0
    ) {
      question.setHistoricalValue(true);
      if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
        question.showHistoricalEncounterDate(
          schemaQuestion.showHistoricalEncounterDate === 'true'
        );
      } else {
        question.showHistoricalEncounterDate();
      }
      const origValue = this.historicalHelperService.evaluate(
        schemaQuestion.historicalExpression,
        this.dataSources,
        undefined
      );
      question.historicalDataValue = origValue;
      // console.info('historical value', origValue);
      // console.info('historical data question :::', question);
      // console.info('schema data question :::', schemaQuestion);

      if (schemaQuestion.historicalPrepopulateCondition && origValue) {
        const toPopulate = this.historicalHelperService.evaluatePrecondition(
          schemaQuestion.historicalPrepopulateCondition,
          this.dataSources,
          origValue
        );

        if (toPopulate) {
          question.defaultValue = origValue.value;
        }
        return; // don't try to evaluate the other option
      }

      if (schemaQuestion.historicalPrepopulate && origValue) {
        // sample schema options for this branch
        // "historicalPrepopulate":true,
        // "allowedHistoricalValueAgeInDays": 40000,
        const valDate = moment(origValue.valueDate);
        const differenceInDays = moment().diff(valDate, 'days');
        if (Number.isInteger(schemaQuestion.allowedHistoricalValueAgeInDays)) {
          if (
            differenceInDays <= schemaQuestion.allowedHistoricalValueAgeInDays
          ) {
            question.defaultValue = origValue.value;
          }
        } else {
          question.defaultValue = origValue.value;
        }
      }
    }
  }

  addCalculatorProperty(schemaQuestion: any, question: QuestionBase): any {
    if (
      schemaQuestion.questionOptions &&
      typeof schemaQuestion.questionOptions.calculate === 'object'
    ) {
      question.calculateExpression =
        schemaQuestion.questionOptions.calculate.calculateExpression;
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

    if (schemaQuestion.disable) {
      //if resetValueOnDisable doesn't exist on the config or no value is provided the default value will be passed (true)
      question.resetValueOnDisable =
        !schemaQuestion.hasOwnProperty('resetValueOnDisable') ||
        this.isEmpty(schemaQuestion.resetValueOnDisable)
          ? true
          : schemaQuestion.resetValueOnDisable;
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
      s +=
        r < 0.1
          ? Math.floor(r * 100)
          : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65));
    }
    return '_' + s;
  }

  isEmpty(value): boolean {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    return false;
  }
}
