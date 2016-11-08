
import { TextInputQuestion } from '../question-models/text-input-question';
import { TextAreaInputQuestion } from '../question-models/text-area-input-question';
import { SelectQuestion } from '../question-models/select-question';
import { UiSelectQuestion } from '../question-models/ui-select-question';
import { DateQuestion } from '../question-models/date-question';
import { MultiSelectQuestion } from '../question-models/multi-select-question';
import { QuestionGroup } from '../question-models/group-question';
import { RepeatingQuestion } from '../question-models/repeating-question';

export class QuestionFactory {
    constructor() {
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
        question.type = schemaQuestion.questionOptions.rendering;
        return question;
    }

    toNumericQuestion(schemaQuestion: any): TextInputQuestion {
        let question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.type = 'number';
        return question;
    }

    toNumberQuestion(schemaQuestion: any): TextInputQuestion {
        let question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.type = 'number';
        return question;
    }

    toDateQuestion(schemaQuestion: any): DateQuestion {
        let question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        return question;
    }

    toEncounterDatetimeQuestion(schemaQuestion: any): DateQuestion {
        let question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
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
        return question;
    }

    toTextAreaQuestion(schemaQuestion: any): TextAreaInputQuestion {
        let question = new TextAreaInputQuestion({ isExpanded: false, rows: 18, placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.isExpanded = schemaQuestion.isExpanded;
        question.rows = schemaQuestion.questionOptions.rows;
        return question;
    }

    toTextQuestion(schemaQuestion: any): TextInputQuestion {
        let question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.type = 'text';
        return question;
    }

    toDrugQuestion(schemaQuestion: any): SelectQuestion {
        let question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.type = schemaQuestion.type;
        return question;
    }

    toRepeatingQuestion(schemaQuestion: any): RepeatingQuestion {
        let question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = schemaQuestion.questions;
        question.key = schemaQuestion.id;
        return question;
    }

    toGroupQuestion(schemaQuestion: any): RepeatingQuestion {
        let question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = schemaQuestion.questions;
        question.key = schemaQuestion.id;
        return question;
    }

    toPersonAttributeQuestion(schemaQuestion: any): SelectQuestion {
        let question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {

            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.type = schemaQuestion.type;
        return question;
    }

    toEncounterProviderQuestion(schemaQuestion: any): SelectQuestion {
        let question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {

            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.type = schemaQuestion.type;
        return question;
    }

    toEncounterLocationQuestion(schemaQuestion: any): SelectQuestion {
        let question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {

            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.type = schemaQuestion.type;
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

        if (!Array.isArray(schema) && typeof schema === 'object') {
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

}
