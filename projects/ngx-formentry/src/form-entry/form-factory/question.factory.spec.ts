import { QuestionGroup } from '../question-models/group-question';
import { QuestionBase } from '../question-models/question-base';
import { SelectQuestion } from '../question-models/select-question';
import { QuestionFactory } from './question.factory';

describe('Question Factory', () => {

    const selectSchemaQuestion: any = {
        label: 'Patient previous ART use',
        type: 'obs',
        id: 'pastArtUse',
        showHistoricalEncounterDate: 'false',
        questionOptions: {
            concept: 'a8a318e8-1350-11df-a1f1-0026b9348838',
            answers: [
                {
                    concept: 'a899b35c-1350-11df-a1f1-0026b9348838',
                    label: 'Yes'
                },
                {
                    concept: 'a899b42e-1350-11df-a1f1-0026b9348838',
                    label: 'No'
                }
            ],
            rendering: 'select'
        },
        disable: true

    };

    const numericSchemaQuestion: any = {
        label: 'Number of weeks on treatment:',
        id: 'ArvDays',
        type: 'obs',
        questionOptions: {
            rendering: 'numeric',
            concept: 'a89add22-1350-11df-a1f1-0026b9348838',
            answers: []
        },
        validators: [],
        hide: true
    };

    const numberSchemaQuestion: any = {
        label: 'mg',
        questionOptions: {
            concept: 'a8a063c8-1350-11df-a1f1-0026b9348838',
            max: '1000',
            min: '0',
            rendering: 'number'
        },
        validators: [],
        disable: 'onArt !== "a899b35c-1350-11df-a1f1-0026b9348838"'
    };


    const dateSchemaQuestion: any = {
        label: 'Date patient first became medically eligible for ART:',
        id: 'eligibility',
        type: 'obs',
        questionOptions: {
            concept: '81608e3b-fece-4136-8def-b822b54de197',
            rendering: 'date'
        },
        validators: [
            {
                type: 'date',
                allowFutureDates: 'false'
            },
            {
                type: 'js_expression',
                failsWhenExpression: '(new moment(encDate)).isBefore((new moment(myValue)), "day")' +
                ' || (new moment(encDate)).isSame((new moment(myValue)), "day")',
                message: 'Date should be before the encounter date.'
            }
        ],
        hide: 'NewbornProhpArv !== "a899b35c-1350 - 11df-a1f1 - 0026b9348838"'
    };

    const multiCheckboxSchemaQuestion: any = {
        label: 'Patient current ART regimen, peds: ',
        id: 'current_art_regimen_ped',
        questionOptions: {
            concept: 'a899cf5e-1350-11df-a1f1-0026b9348838',
            answers: [
                {
                    concept: 'b58a28d2-36de-11e0-93be-0026b9348838',
                    label: 'ABC 60mg/3TC 30mg'
                },
                {
                    concept: '25c753d8-870f-11e0-85d3-000d6014b64c',
                    label: 'ZDV 60mg/3TC 30mg'
                }
            ],
            rendering: 'multiCheckbox'
        },
        type: 'obs',
        validators: []
    };



    const textAreaSchemaQuestion: any = {
        label: 'Assessment Notes',
        isExpanded: 'true',
        questionOptions: [
            {
                label: 'Please enter the assessment below:',
                type: 'obs',
                id: 'assNote',
                required: 'false',
                default: '',
                questionOptions: {
                    concept: '23f710cc-7f9c-4255-9b6b-c3e240215dba',
                    rendering: 'textarea',
                    rows: 18
                }
            }
        ]
    };

    const drugSchemaQuestion: any = {
        type: 'encounterLocation',
        label: 'Facility name (site/satellite clinic required):',
        id: 'location',
        required: 'true',
        questionOptions: {
            rendering: 'ui-select-extended'
        }
    };

    const problemSchemaQuestion: any = {
        type: 'obs',
        label: 'Problem',
        id: 'problem',
        required: 'true',
        questionOptions: {
            rendering: 'problem'
        }
    };

    const repeatingGroupSchemaQuestion: any = {
        label: 'Other Medications',
        questions: [
            {
                label: 'Please add any other medications the patient is taking',
                type: 'obsGroup',
                questionOptions: {
                    concept: 'a8a072c8-1350-11df-a1f1-0026b9348838',
                    rendering: 'repeating'
                },
                questions: [
                    {
                        label: 'Other drugs:',
                        questionOptions: {
                            concept: 'a8a060c6-1350-11df-a1f1-0026b9348838',
                            rendering: 'drug'
                        },
                        type: 'obs',
                        validators: []
                    }
                ]
            }
        ]
    };
    const groupSchemaQuestion: any = {
        type: 'obsGroup',
        label: 'Eligible for ART',
        questionOptions: {
            concept: 'a8a17a7e-1350-11df-a1f1-0026b9348838',
            rendering: 'group'
        },
        questions: [
            {
                label: 'Eligible for ART but not started:',
                id: 'artEligibleNotStarted',
                questionOptions: {
                    concept: 'a89d26cc-1350-11df-a1f1-0026b9348838',
                    answers: [
                        {
                            concept: 'a89ce50e-1350-11df-a1f1-0026b9348838',
                            label: 'Adherence Concerns'
                        },
                        {
                            concept: 'a8a8b26c-1350-11df-a1f1-0026b9348838',
                            label: 'On TB Treatment'
                        }
                    ],
                    rendering: 'select'
                },
                type: 'obs',
                validators: [],
                hide: {
                    hideWhenExpression: 'arvPlan !== "a899e0ac-1350 - 11df-a1f1 - 0026b9348838"'
                }
            },
            {
                label: 'Eligible for ART but not started: Other (specify):',
                questionOptions: {
                    concept: 'a8a06fc6-1350-11df-a1f1-0026b9348838',
                    rendering: 'text'
                },
                type: 'obs',
                id: 'q24dOther',
                validators: [],
                hide: {
                    hideWhenExpression: 'artEligibleNotStarted !== "a8aaf3e2-1350 - 11df-a1f1 - 0026b9348838"'
                }
            }
        ]
    };

    const personAttributeSchemaQuestion: any = {
        type: 'personAttribute',
        label: 'Specify name of clinic to which patient is being referred:',
        id: 'transfered_out_to_ampath',
        required: 'false',
        default: '',
        questionOptions: {
            rendering: 'ui-select-extended',
            attributeType: '8d87236c-c2cc-11de-8d13-0010c6dffd0f'
        }
    };

    const encounterProviderSchemaQuestion: any = {
        type: 'encounterProvider',
        label: 'Provider',
        id: 'provider',
        required: 'true',
        default: '',
        questionOptions: {
            rendering: 'ui-select-extended'
        }
    };

    const encounterLocationSchemaQuestion: any = {
        type: 'encounterLocation',
        label: 'Facility name (site/satellite clinic required):',
        id: 'location',
        required: 'true',
        questionOptions: {
            rendering: 'ui-select-extended'
        }
    };

    const formSchema: any = {
        name: 'triage',
        uuid: 'xxxx',
        processor: 'EncounterFormProcessor',
        pages: [{
            label: 'Triage v0.01',
            sections: [{
                label: 'Encounter Details',
                questions: [{
                    label: 'Visit date',
                    type: 'encounterDatetime',
                    required: 'true',
                    default: '',
                    id: 'encDate',
                    questionOptions: {
                        rendering: 'date'
                    },
                    validators: [{
                        type: 'date'
                    }]
                }, {
                    type: 'encounterProvider',
                    label: 'Provider',
                    id: 'provider',
                    required: 'true',
                    default: '',
                    questionOptions: {
                        rendering: 'ui-select-extended'
                    }
                }, {
                    type: 'encounterLocation',
                    label: 'Facility name (site/satellite clinic required):',
                    id: 'location',
                    required: 'true',
                    questionOptions: {
                        rendering: 'ui-select-extended'
                    }
                }, {
                    label: 'Please add any other medications the patient is taking',
                    type: 'obsGroup',
                    questionOptions: {
                        concept: 'a8a072c8-1350-11df-a1f1-0026b9348838',
                        rendering: 'repeating'
                    },
                    questions: [
                        {
                            label: 'Other drugs:',
                            questionOptions: {
                                concept: 'a8a060c6-1350-11df-a1f1-0026b9348838',
                                rendering: 'drug'
                            },
                            type: 'obs',
                            validators: []
                        }
                    ]
                }, {
                    label: 'Patient current ART regimen, peds: ',
                    id: 'current_art_regimen_ped',
                    questionOptions: {
                        concept: 'a899cf5e-1350-11df-a1f1-0026b9348838',
                        answers: [
                            {
                                concept: 'b58a28d2-36de-11e0-93be-0026b9348838',
                                label: 'ABC 60mg/3TC 30mg'
                            },
                            {
                                concept: '25c753d8-870f-11e0-85d3-000d6014b64c',
                                label: 'ZDV 60mg/3TC 30mg'
                            }
                        ],
                        rendering: 'multiCheckbox'
                    },
                    type: 'obs',
                    validators: [],
                    hide: {
                        hideWhenExpression: 'onArt !== "a899b35c-1350 - 11df-a1f1 - 0026b9348838"'
                    }
                }, {
                    label: 'Patient covered by NHIF:',
                    questionOptions: {
                        rendering: 'select',
                        concept: 'a8b02524-1350-11df-a1f1-0026b9348838',
                        answers: [{
                            concept: '8b715fed-97f6-4e38-8f6a-c167a42f8923',
                            label: 'Yes'
                        }, {
                            concept: 'a899e0ac-1350-11df-a1f1-0026b9348838',
                            label: 'No'
                        }]
                    },
                    type: 'obs',
                    validators: []
                }, {
                    type: 'personAttribute',
                    label: 'Transfer in from other AMPATH clinic (specify):',
                    id: 'transfered_in_to_ampath',
                    default: '',
                    questionOptions: {
                        rendering: 'ui-select-extended',
                        attributeType: '7ef225db-94db-4e40-9dd8-fb121d9dc370'
                    }
                }]
            }, {
                label: 'PWPs',
                questions: [{
                    label: 'Civil status:',
                    questionOptions: {
                        rendering: 'select',
                        concept: 'a899a9f2-1350-11df-a1f1-0026b9348838',
                        answers: [{
                            concept: 'a899af10-1350-11df-a1f1-0026b9348838',
                            label: 'Cohabitating'
                        }, {
                            concept: 'a899ad58-1350-11df-a1f1-0026b9348838',
                            label: 'Divorced'
                        }]
                    },
                    type: 'obs',
                    validators: []
                }, {
                    label: 'Discordant couple:',
                    questionOptions: {
                        rendering: 'select',
                        concept: 'a8af49d8-1350-11df-a1f1-0026b9348838',
                        answers: [{
                            concept: 'a899b35c-1350-11df-a1f1-0026b9348838',
                            label: 'Yes'
                        }, {
                            concept: 'a899b42e-1350-11df-a1f1-0026b9348838',
                            label: 'No'
                        }]
                    },
                    type: 'obs',
                    validators: []
                }, {
                    label: 'Prevention with positives: At risk population:',
                    required: 'true',
                    questionOptions: {
                        rendering: 'select',
                        concept: '93aa3f1d-1c39-4196-b5e6-8adc916cd5d6',
                        answers: [{
                            concept: 'a89ad3a4-1350-11df-a1f1-0026b9348838',
                            label: 'N/A'
                        }, {
                            concept: '5da55301-e28e-4fdf-8b64-02622dedc8b0',
                            label: 'Client of sex worker'
                        }]
                    },
                    type: 'obs',
                    validators: []
                }, {
                    label: 'Prevention with positives: PWP services:',
                    required: 'true',
                    questionOptions: {
                        rendering: 'select',
                        concept: '9ce5dbf0-a141-4ad8-8c9d-cd2bf84fe72b',
                        answers: [{
                            concept: 'a89ad3a4-1350-11df-a1f1-0026b9348838',
                            label: 'N/A'
                        }, {
                            concept: 'f0a280e8-eb88-41a8-837a-f9949ed1b9cd',
                            label: 'Condom promotion/provision'
                        }]
                    },
                    type: 'obs',
                    validators: []
                }]
            }, {
                label: 'Vital Signs',
                questions: [{
                    type: 'obsGroup',
                    label: 'test group',
                    questionOptions: {
                        rendering: 'group',
                        concept: 'a899e6d8-1350-11df-a1f1-0026b9348838'
                    },
                    questions: [{
                        label: 'BP:Systolic:',
                        questionOptions: {
                            rendering: 'number',
                            concept: 'a8a65d5a-1350-11df-a1f1-0026b9348838',
                            max: '250',
                            min: '0'
                        },
                        type: 'obs',
                        validators: []
                    }, {
                        label: 'BP:Diastolic:',
                        questionOptions: {
                            rendering: 'number',
                            concept: 'a8a65e36-1350-11df-a1f1-0026b9348838',
                            max: '150',
                            min: '0'
                        },
                        type: 'obs',
                        validators: []
                    }]
                }]
            }, {
                label: 'General History (Ped/Youth Specific)',
                questions: [{
                    type: 'obsGroup',
                    label: 'Person bringing patient',
                    questionOptions: {
                        concept: 'a8a0798a-1350-11df-a1f1-0026b9348838',
                        rendering: 'group'
                    },
                    questions: [{
                        label: 'Person bringing patient:',
                        questionOptions: {
                            concept: 'a898c01e-1350-11df-a1f1-0026b9348838',
                            answers: [{
                                concept: 'a898c0dc-1350-11df-a1f1-0026b9348838',
                                label: 'Mother'
                            }, {
                                concept: 'a898c1a4-1350-11df-a1f1-0026b9348838',
                                label: 'Father'
                            }, {
                                concept: 'a898c262-1350-11df-a1f1-0026b9348838',
                                label: 'Sibling'
                            }],
                            rendering: 'select'
                        },
                        type: 'obs'
                    }]
                }, {
                    label: 'Patient changed their residence:',
                    questionOptions: {
                        rendering: 'select',
                        concept: 'd9a414af-021b-459f-bcea-4c88b1382e39',
                        answers: [{
                            concept: 'a899b35c-1350-11df-a1f1-0026b9348838',
                            label: 'Yes'
                        }, {
                            concept: 'a899b42e-1350-11df-a1f1-0026b9348838',
                            label: 'No'
                        }]
                    },
                    type: 'obs'
                }, {
                    label: 'Mother deceased:',
                    type: 'obs',
                    questionOptions: {
                        rendering: 'select',
                        concept: 'a8a0b670-1350-11df-a1f1-0026b9348838',
                        answers: [{
                            concept: 'a899b35c-1350-11df-a1f1-0026b9348838',
                            label: 'Yes'
                        }, {
                            concept: 'a899b42e-1350-11df-a1f1-0026b9348838',
                            label: 'No'
                        }]
                    },
                    validators: []
                }, {
                    label: 'Father deceased:',
                    type: 'obs',
                    questionOptions: {
                        rendering: 'select',
                        concept: 'a8a0b788-1350-11df-a1f1-0026b9348838',
                        answers: [{
                            concept: 'a899b35c-1350-11df-a1f1-0026b9348838',
                            label: 'Yes'
                        }, {
                            concept: 'a899b42e-1350-11df-a1f1-0026b9348838',
                            label: 'No'
                        }]
                    },
                    validators: []
                }, {
                    label: 'HIV disclosure:',
                    type: 'obs',
                    questionOptions: {
                        rendering: 'select',
                        concept: 'cd8ead74-96fc-4764-a9fa-c9ee059c59c5',
                        answers: [{
                            concept: 'a899ea48-1350-11df-a1f1-0026b9348838',
                            label: 'Not disclosed'
                        }, {
                            concept: '40c4e9fa-0fc0-4ceb-89d6-1c8cfebb9bae',
                            label: 'Partially disclosed'
                        }]
                    }
                }]
            }, {
                label: 'Assessment Notes',
                isExpanded: 'true',
                questions: [{
                    label: 'Please enter the assessment below:',
                    type: 'obs',
                    id: 'assNote',
                    required: 'false',
                    default: '',
                    questionOptions: {
                        concept: '23f710cc-7f9c-4255-9b6b-c3e240215dba',
                        rendering: 'textarea',
                        rows: 18
                    }
                }]
            }
            ]
        }]
    };

    const factory = new QuestionFactory();

    it('should convert schema select question to select question model', () => {
        const converted = factory.toSelectQuestion(selectSchemaQuestion);

        selectSchemaQuestion.questionOptions.answers.splice(0, 0, {
            label: '',
            concept: ''
        });

        converted.showHistoricalEncounterDate((selectSchemaQuestion.showHistoricalEncounterDate === 'true'));
        expect(converted.showHistoricalValueDate).toBeFalsy();
        selectSchemaQuestion.showHistoricalEncounterDate = 'true';
        converted.showHistoricalEncounterDate((selectSchemaQuestion.showHistoricalEncounterDate === 'true'));
        expect(converted.showHistoricalValueDate).toBeTruthy();
        expect(converted.label).toEqual(selectSchemaQuestion.label);
        expect(converted.options).toEqual(selectSchemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        }));
        expect(converted.renderingType).toEqual(selectSchemaQuestion.questionOptions.rendering);
        expect(converted.key).toEqual(selectSchemaQuestion.id);
        expect(converted.disable).toEqual(selectSchemaQuestion.disable);

    });

    it('should convert schema numeric question to Numeric question model', () => {
        const converted = factory.toNumericQuestion(numericSchemaQuestion);
        expect(converted.label).toEqual(numericSchemaQuestion.label);
        expect(converted.key).toEqual(numericSchemaQuestion.id);
        expect(converted.renderingType).toEqual('number');
        expect(converted.hide).toEqual(numericSchemaQuestion.hide);

    });

    it('should convert schema number question to Number question model', () => {
        const converted = factory.toNumberQuestion(numberSchemaQuestion);
        expect(converted.label).toEqual(numberSchemaQuestion.label);
        expect(converted.key).toEqual(numberSchemaQuestion.id);
        expect(converted.renderingType).toEqual('number');
        expect(converted.disable).toEqual(numberSchemaQuestion.disable);

    });

    it('should convert schema date question to Date question model', () => {
        const converted = factory.toDateQuestion(dateSchemaQuestion);
        expect(converted.label).toEqual(dateSchemaQuestion.label);
        expect(converted.key).toEqual(dateSchemaQuestion.id);
        expect(converted.renderingType).toEqual('date');
        expect(converted.hide).toEqual(dateSchemaQuestion.hide);

    });

    it('should convert schema multiCheckbox question to MultiCheckbox question model', () => {
        const converted = factory.toMultiCheckboxQuestion(multiCheckboxSchemaQuestion);
        expect(converted.label).toEqual(multiCheckboxSchemaQuestion.label);
        expect(converted.key).toEqual(multiCheckboxSchemaQuestion.id);
        expect(converted.options).toEqual(multiCheckboxSchemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        }));
        expect(converted.renderingType).toEqual('multi-select');

    });

    it('should convert schema text-area question to Text Area question model', () => {
        const converted = factory.toTextAreaQuestion(textAreaSchemaQuestion);
        expect(converted.label).toEqual(textAreaSchemaQuestion.label);
        expect(converted.key).toEqual(textAreaSchemaQuestion.id);
        expect(converted.isExpanded).toEqual(textAreaSchemaQuestion.isExpanded);
        expect(converted.rows).toEqual(textAreaSchemaQuestion.questionOptions.rows);

    });

    it('should convert schema drug question to Drug question model', () => {
        const converted = factory.toDrugQuestion(drugSchemaQuestion);
        expect(converted.label).toEqual(drugSchemaQuestion.label);
        expect(converted.key).toEqual(drugSchemaQuestion.id);
        expect(converted.renderingType).toEqual('remote-select');

    });

    it('should convert schema problem question to Problem question model', () => {
        const converted = factory.toProblemQuestion(problemSchemaQuestion);
        expect(converted.label).toEqual(problemSchemaQuestion.label);
        expect(converted.key).toEqual(problemSchemaQuestion.id);
        expect(converted.renderingType).toEqual('remote-select');

    });

    it('should convert schema group question to Group question model', () => {
        const converted = factory.toGroupQuestion(groupSchemaQuestion);
        expect(converted.label).toEqual(groupSchemaQuestion.label);
        // expect(converted.questions).toEqual(groupSchemaQuestion.questions);
    });

    it('should convert schema repeating question to Repeating question model', () => {
        const converted = factory.toRepeatingQuestion(repeatingGroupSchemaQuestion);
        expect(converted.label).toEqual(repeatingGroupSchemaQuestion.label);
        // expect(converted.questions).toEqual(repeatingGroupSchemaQuestion.questions);

    });

    it('should convert schema Person Attribute question to Person Attribute question model', () => {
        const converted = factory.toPersonAttributeQuestion(personAttributeSchemaQuestion);
        expect(converted.label).toEqual(personAttributeSchemaQuestion.label);
        expect(converted.key).toEqual(personAttributeSchemaQuestion.id);
        expect(converted.renderingType).toEqual('remote-select');

    });

    it('should convert schema encounter Provider question to Encounter Provider question model', () => {
        const converted = factory.toEncounterProviderQuestion(encounterProviderSchemaQuestion);
        expect(converted.label).toEqual(encounterProviderSchemaQuestion.label);
        expect(converted.key).toEqual(encounterProviderSchemaQuestion.id);
        expect(converted.renderingType).toEqual('remote-select');

    });

    it('should convert schema encounter Location question to Encounter Location question model', () => {
        const converted = factory.toEncounterLocationQuestion(encounterLocationSchemaQuestion);
        expect(converted.label).toEqual(encounterLocationSchemaQuestion.label);
        expect(converted.key).toEqual(encounterLocationSchemaQuestion.id);
        expect(converted.renderingType).toEqual('remote-select');

    });

    it('should convert select-concept-answers to remote select question', () => {
        const conceptAnswerSchema = {
            'label': 'Select criteria for new WHO stage:',
            'type': 'obs',
            'id': 'criteriaLabel',
            'questionOptions': {
                'concept': 'a8ae88a4-1350-11df-a1f1-0026b9348838',
                'rendering': 'select-concept-answers'
            },
            'required': {
                'type': 'conditionalRequired',
                'message': 'Patient marked as receiving new WHO stage. Please select stage.',
                'referenceQuestionId': 'adultWHOStage',
                'referenceQuestionAnswers': [
                    'a89b2606-1350-11df-a1f1-0026b9348838'
                ]
            },
            'validators': []
        };

        const converted: SelectQuestion = factory.toConceptAnswerSelect(conceptAnswerSchema);

        expect(converted).toBeDefined();
        expect(converted.label).toEqual(conceptAnswerSchema.label);
        expect(converted.key).toEqual(conceptAnswerSchema.id);
        expect(converted.renderingType).toEqual('remote-select');
        expect(converted.extras).toEqual(conceptAnswerSchema);
        expect(converted.dataSource).toEqual('conceptAnswers');
        expect(converted.dataSourceOptions).toEqual(
            {
                concept: 'a8ae88a4-1350-11df-a1f1-0026b9348838'
            }
        );
    });

    it('should convert form schema to a list of question models, without pages', () => {
        const converted = factory.getSchemaQuestions(formSchema);
        const convertedSample1: QuestionBase = converted[1];
        const convertedSample2: QuestionGroup = converted[12];
        const convertedSample3: SelectQuestion = converted[14];
        expect(converted.length).toEqual(18);
        expect(convertedSample1.renderingType).toEqual('remote-select');
        expect(convertedSample1.key).toEqual('provider');
        expect(convertedSample2.renderingType).toEqual('group');
        expect(convertedSample2.questions[0].renderingType).toEqual('select');
        expect(convertedSample2.questions[0].label).toEqual('Person bringing patient:');
        expect(((convertedSample2.questions[0] as SelectQuestion).options[2] as any).label).toEqual('Father');
        expect(convertedSample3.renderingType).toEqual('select');
        expect((convertedSample3.options[1] as any).label).toEqual('Yes');

    });

    it('should convert form schema to question model', () => {
        const converted = factory.createQuestionModel(formSchema);
        expect(converted instanceof QuestionGroup).toBe(true);
        let asGroup = converted as QuestionGroup;

        // check page count
        expect(asGroup.questions.length).toBe(1);
        expect(asGroup.questions[0] instanceof QuestionGroup).toBe(true);
        asGroup = asGroup.questions[0] as QuestionGroup;

        // check section count and sections
        expect(asGroup.questions.length).toBe(5);
        expect(asGroup.questions[0].label).toBe('Encounter Details');
        expect(asGroup.questions[4].label).toBe('Assessment Notes');

        // verify section questions
        expect(asGroup.questions[0] instanceof QuestionGroup).toBe(true);
        asGroup = asGroup.questions[0] as QuestionGroup;
        expect(asGroup.questions[0].label).toBe('Visit date');
        expect(asGroup.questions[0].key).toBe('encDate');
    });

    it('should convert complex obs schema question to field set question model', () => {
        const schemaQuestion = {
            'type': 'complex-obs',
            'label': 'Creatinine:',
            'id': 'complex_creatinine',
            'questionOptions': {
                'concept': 'a897e450-1350-11df-a1f1-0026b9348838',
                'rendering': 'field-set'
            },
            'questions': [
                {
                    'type': 'complex-obs-child',
                    'label': 'Creatinine mmol/L:',
                    'id': 'creat_test',
                    'questionOptions': {
                        'rendering': 'number',
                        'max': '11050',
                        'min': '0',
                        'obsField': 'value'
                    },
                    'validators': []
                },
                {
                    'type': 'complex-obs-child',
                    'label': 'Date of Creatinine mmol/L:',
                    'id': 'date_creat_test',
                    'questionOptions': {
                        'rendering': 'date',
                        'obsField': 'obsDatetime'
                    },
                    'validators': [
                        {
                            'type': 'date'
                        },
                        {
                            'type': 'js_expression',
                            'failsWhenExpression': '!isEmpty(creat_test) && isEmpty(myValue)',
                            'message': 'Date result is required.'
                        }
                    ],
                    'hde': {
                        'hideWhenExpression': 'isEmpty(creat_test)'
                    }
                }
            ],
            'validators': []
        };

        const converted = factory.toModel(schemaQuestion, 'field-set');
        const result: QuestionGroup = converted as QuestionGroup;

        expect(result).toBeTruthy();
        expect(result.extras).toBe(schemaQuestion);
        expect(result.key).toBe(schemaQuestion.id);
        expect(result.renderingType).toBe(schemaQuestion.questionOptions.rendering);

        expect(result.questions.length).toBe(2);

        expect((result.questions[0] as QuestionBase).label).toBe('Creatinine mmol/L:');
        expect((result.questions[0] as QuestionBase).key).toBe('creat_test');
        expect((result.questions[0] as QuestionBase).extras).toBe(schemaQuestion.questions[0]);
        expect((result.questions[0] as QuestionBase).renderingType).toBe('number');

        expect((result.questions[1] as QuestionBase).label).toBe('Date of Creatinine mmol/L:');
        expect((result.questions[1] as QuestionBase).key).toBe('date_creat_test');
        expect((result.questions[1] as QuestionBase).extras).toBe(schemaQuestion.questions[1]);
        expect((result.questions[1] as QuestionBase).renderingType).toBe('date');

    });

    it('should convert old schema version complex obs schema question to field set question model', () => {
        const schemaQuestion = {
            'type': 'obs',
            'label': 'Creatinine mmol/L:',
            'id': 'creatinine_test',
            'questionOptions': {
                'concept': 'a897e450-1350-11df-a1f1-0026b9348838',
                'rendering': 'number',
                'showDate': 'true',
                'max': '11050',
                'min': '0',
                'shownDateOptions': {
                    'validators': [
                        {
                            'type': 'date'
                        },
                        {
                            'type': 'js_expression',
                            'failsWhenExpression': '!isEmpty(creatinine_test) && isEmpty(myValue)',
                            'message': 'Date result is required.'
                        }
                    ],
                    'hide': {
                        'hideWhenExpression': 'isEmpty(creatinine_test)'
                    }
                }
            },
            'validators': []
        };

        const expectedConvertedSchema = {
            'type': 'complex-obs',
            'label': 'Creatinine mmol/L:',
            'id': 'complex_creatinine_test',
            'questionOptions': {
                'concept': 'a897e450-1350-11df-a1f1-0026b9348838',
                'rendering': 'field-set'
            },
            'questions': [
                {
                    'type': 'complex-obs-child',
                    'label': 'Creatinine mmol/L:',
                    'id': 'creatinine_test',
                    'questionOptions': {
                        'concept': 'a897e450-1350-11df-a1f1-0026b9348838',
                        'rendering': 'number',
                        'max': '11050',
                        'min': '0',
                        'obsField': 'value'
                    },
                    'validators': []
                },
                {
                    'type': 'complex-obs-child',
                    'label': 'Date of Creatinine mmol/L:',
                    'id': 'date_creatinine_test',
                    'questionOptions': {
                        'concept': 'a897e450-1350-11df-a1f1-0026b9348838',
                        'rendering': 'date',
                        'obsField': 'obsDatetime'
                    },
                    'validators': [
                        {
                            'type': 'date'
                        },
                        {
                            'type': 'js_expression',
                            'failsWhenExpression': '!isEmpty(creatinine_test) && isEmpty(myValue)',
                            'message': 'Date result is required.'
                        }
                    ],
                    'hide': {
                        'hideWhenExpression': 'isEmpty(creatinine_test)'
                    }
                }
            ],
            'validators': []
        };

        const converted = factory.toModel(schemaQuestion, 'field-set');
        const result: QuestionGroup = converted as QuestionGroup;

        console.log('result :', result.extras.questions[1]);
        console.log('expected', expectedConvertedSchema.questions[1]);

        expect(result).toBeTruthy();
        expect(result.extras).toEqual(expectedConvertedSchema);
        expect(result.key).toEqual(expectedConvertedSchema.id);
        expect(result.renderingType).toBe(expectedConvertedSchema.questionOptions.rendering);

        expect(result.questions.length).toBe(2);

        expect((result.questions[0] as QuestionBase).label).toBe('Creatinine mmol/L:');
        expect((result.questions[0] as QuestionBase).key).toBe('creatinine_test');
        expect((result.questions[0] as QuestionBase).extras).toEqual(expectedConvertedSchema.questions[0]);
        expect((result.questions[0] as QuestionBase).renderingType).toBe('number');

        expect((result.questions[1] as QuestionBase).label).toBe('Date of Creatinine mmol/L:');
        expect((result.questions[1] as QuestionBase).key).toBe('date_creatinine_test');
        expect((result.questions[1] as QuestionBase).extras).toEqual(expectedConvertedSchema.questions[1]);
        expect((result.questions[1] as QuestionBase).renderingType).toBe('date');

    });

});
