export class SampleSchema {
    constructor() {
    }

    getSchema() {
        return {
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
                        },
                        validators: [
                          {
                            'type': 'js_expression',
                            'failsWhenExpression': '!isEmpty(encDate)',
                            'message': 'test message'
                          }
                        ]
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
                        id: 'otherDrug',
                        questionOptions: {
                            concept: 'a8a072c8-1350-11df-a1f1-0026b9348838',
                            rendering: 'repeating'
                        },
                        questions: [
                            {
                                label: 'Other drugs:',
                                id: 'otherDrugDetail',
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
                        id: 'testGroup',
                        questionOptions: {
                            rendering: 'group',
                            concept: 'a899e6d8-1350-11df-a1f1-0026b9348838'
                        },
                        questions: [{
                            label: 'BP:Systolic:',
                            id: 'systolic',
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
    }
}
