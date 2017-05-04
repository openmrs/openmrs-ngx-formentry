import { TestBed, inject } from '@angular/core/testing';
// import { FormControl } from '@angular/forms';

import { ObsAdapterHelper } from './obs-adapter-helper';
import { NodeBase, ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';
const adultForm = require('../../adult');
const adultFormObs = require('../../mock/obs');
const generatedPayload = require('./generatedPayload');
import { FormFactory } from '../../form-entry/form-factory/form.factory';
import { FormControlService } from '../../form-entry/form-factory/form-control.service';
import { ValidationFactory } from '../../form-entry/form-factory/validation.factory';
import { QuestionFactory } from '../../form-entry/form-factory/question.factory';
import { HidersDisablersFactory } from '../../form-entry/form-factory/hiders-disablers.factory';
import { ExpressionRunner } from '../../form-entry/expression-runner/expression-runner';
import { JsExpressionHelper } from '../../form-entry/helpers/js-expression-helper';
import { ControlRelationsFactory } from '../../form-entry/form-factory/control-relations.factory';
import { Form } from '../form-factory/form';

describe('Obs Value Adapter Helper: ', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                ObsAdapterHelper,
                FormFactory,
                FormControlService,
                ValidationFactory,
                HidersDisablersFactory,
                QuestionFactory,
                ExpressionRunner,
                JsExpressionHelper,
                ControlRelationsFactory
            ]
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });


    it('should be injected',
        inject([ObsAdapterHelper], (s: ObsAdapterHelper) => {
            expect(s).toBeTruthy();
        })
    );

    it('should find the obs that is an answer to a question', () => {
        let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
        let ff: FormFactory = TestBed.get(FormFactory);
        expect(ff).toBeDefined();
        let form: Form = ff.createForm(adultForm);
        expect(form).toBeDefined();


        // CASE 1: Simple Obs
        // find tb status question
        let simpleNode = form.searchNodeByQuestionId('tbstatus')[0];
        expect(simpleNode).toBeTruthy();

        let simpleObs = [
            {
                uuid: 'some uuid',
                concept: {
                    uuid: 'random uuid 2',
                    display: 'tb status'
                }
            },
            {
                uuid: 'some uuid 1',
                concept: {
                    uuid: '02ad9357-b996-4530-b1a4-aff91a105383',
                    display: 'tb status'
                },
                value: {
                    uuid: 'a899e0ac-1350-11df-a1f1-0026b9348838',
                    display: 'some value'
                }
            },
            {
                uuid: 'some uuid 2',
                concept: {
                    uuid: 'random uuid',
                    display: 'tb status'
                }
            },
        ];

        let expectedSimpleObs = [simpleObs[1]];

        expect(helper.findObsAnswerToQuestion(simpleNode, simpleObs)).toEqual(expectedSimpleObs);

        // CASE 2: Repeating obs
        // find arv drugs concept: a89b6a62-1350-11df-a1f1-0026b9348838
        let multiselectNode = form.searchNodeByQuestionId('artStartedAdult')[0];
        expect(multiselectNode).toBeDefined();

        let multiselectObs = [
            {
                uuid: 'some uuid 2',
                concept: {
                    uuid: 'random uuid',
                    display: 'tb status'
                }
            },
            {
                uuid: 'some uuid',
                concept: {
                    uuid: 'a89b6a62-1350-11df-a1f1-0026b9348838',
                    display: 'tb status'
                },
                value: {
                    uuid: '6a73f32d-1870-4527-af6e-74443251ded2',
                    display: 'NVP200/ZDV300/3TC150'
                }
            },
            {
                uuid: 'some uuid 2',
                concept: {
                    uuid: 'random uuid 2',
                    display: 'tb status'
                }
            },
            {
                uuid: 'some other uuid',
                concept: {
                    uuid: 'a89b6a62-1350-11df-a1f1-0026b9348838',
                    display: 'tb status'
                },
                value: {
                    uuid: '6a73f32d-1870-4527-af6e-74443251ded2',
                    display: 'NVP200/ZDV300/3TC150'
                }
            },
            {
                uuid: 'other uuid',
                concept: {
                    uuid: 'a8982474-1350-11df-a1f1-0026b9348838',
                    display: 'viral load'
                },
                obsDatetime: '2015-01-01',
                value: 10
            }
        ];

        let expectedMultiselectObs = [multiselectObs[1], multiselectObs[3]];
        expect(helper.findObsAnswerToQuestion(multiselectNode, multiselectObs))
            .toEqual(expectedMultiselectObs);


        // CASE 3: Complex obs i.e obs where multiple properties are editable e.g obsDatetime
        let complexObsNode = form.searchNodeByQuestionId('complex_viralLoad_test')[0];
        let expectedComplexObs = [multiselectObs[4]];
        expect(helper.findObsAnswerToQuestion(complexObsNode, multiselectObs))
            .toEqual(expectedComplexObs);

        // CASE 4: Groups and Repeating Groups

        let groupObs = [
            {
                uuid: 'uuid',
                concept: {
                    uuid: 'some-uuid'
                }
            },
            {
                uuid: 'some uuid',
                concept: {
                    uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
                    display: 'tb history'
                },
                groupMembers: [
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'a899e5f2-1350-11df-a1f1-0026b9348838'
                        }
                    }
                ]
            },
            {
                uuid: 'some other uuid',
                concept: {
                    uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
                    display: 'tb history'
                },
                groupMembers: [
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
                        }
                    },
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
                        }
                    }
                ]
            },
            {
                uuid: 'some other uuid',
                concept: {
                    uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
                    display: 'tb history'
                },
                groupMembers: [
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
                        }
                    },
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
                        }
                    }
                ]
            },
            {
                uuid: 'some other uuid',
                concept: {
                    uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
                    display: 'tb history'
                },
                groupMembers: [
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
                        }
                    },
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'a8a063c8-1350-11df-a1f1-0026b9348838'
                        }
                    }
                ]
            },
            {
                uuid: 'some other uuid',
                concept: {
                    uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
                    display: 'tb history'
                },
                groupMembers: [
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'some other uuid'
                        }
                    },
                    {
                        uuid: 'nested uuid',
                        concept: {
                            uuid: 'some other uuid 2'
                        }
                    }
                ]
            },
            {
                uuid: 'some other uuid',
                concept: {
                    uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
                    display: 'tb history'
                },
                groupMembers: [
                    {
                        uuid: 'random uuid',
                        concept: {
                            uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
                        }
                    },
                    {
                        uuid: 'random uuid',
                        concept: {
                            uuid: 'random uuid'
                        }
                    }
                ]
            }
        ];

        // example one: non-repeating group
        // tb treatement start date

        let groupNodeWithStartDate = form.searchNodeByQuestionId('groupStartDateTbTreatment')[0];
        let expectedTbStartDateObs = [groupObs[1]];

        expect(helper.findObsAnswerToQuestion(groupNodeWithStartDate, groupObs))
            .toEqual(expectedTbStartDateObs);

        // example two: repeating group
        let repeatingGroupNode = form.searchNodeByQuestionId('tb_current_regimen_group')[0];
        let expectedRepeatingGroupObs = [groupObs[2], groupObs[3], groupObs[4]];
        expect(helper.findObsAnswerToQuestion(repeatingGroupNode, groupObs))
            .toEqual(expectedRepeatingGroupObs);
    });

    it('should identify the type of obs a node represents', () => {
        let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
        let ff: FormFactory = TestBed.get(FormFactory);
        expect(ff).toBeDefined();
        let form: Form = ff.createForm(adultForm);
        expect(form).toBeDefined();

        // There are types of obs node i.e simple obs node, complex obs node, multiselect obs node,
        // copmlex multiselect obs node, group obs node, repeating group obs node

        // case 1: simple obs node
        let simpleObsNode = form.searchNodeByQuestionId('scheduledVisit')[0];
        expect(helper.getObsNodeType(simpleObsNode)).toEqual('simple');

        // case 2: multi-select obs node
        let multiSelectNode = form.searchNodeByQuestionId('current_art_regimen_adult')[0];
        expect(helper.getObsNodeType(multiSelectNode)).toEqual('multiselect');

        // case 3: complex obs
        let complexObsNode = form.searchNodeByQuestionId('complex_creatinine_test')[0];
        expect(helper.getObsNodeType(complexObsNode)).toEqual('complex');

        // case 4: group obs node
        let groupObsNode = form.searchNodeByQuestionId('groupStartDateTbTreatment')[0];
        expect(helper.getObsNodeType(groupObsNode)).toEqual('group');
        console.log('groupObsNode', groupObsNode);

        // case 5: repeating obs node
        let repeatingGroupNode = form.searchNodeByQuestionId('tb_current_regimen_group')[0];
        expect(helper.getObsNodeType(repeatingGroupNode)).toEqual('repeatingGroup');

    });

    it('should set the value of a simple obs node given the obs that represents its value', () => {
        // simple obs represent values such as free text, single select, numbers, dates
        // the obs array supplied is already filtered as the obs that is the answer to the given node
        let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
        let ff: FormFactory = TestBed.get(FormFactory);
        expect(ff).toBeDefined();
        let form: Form = ff.createForm(adultForm);
        expect(form).toBeDefined();

        // CASE 1: select values i.e obs value is an object

        let simpleObsNode = form.searchNodeByQuestionId('scheduledVisit')[0];

        let obsValue = [
            {
                uuid: 'some uuid',
                concept: {
                    uuid: 'a89ff9a6-1350-11df-a1f1-0026b9348838',
                    display: 'Unscheduled early'
                },
                value: {
                    uuid: 'a89b6440-1350-11df-a1f1-0026b9348838'
                },
                display: 'scheduled visit'
            }
        ];

        helper.setSimpleObsNodeValue(simpleObsNode, obsValue);

        // check 1: the value of the node control should be set
        expect(simpleObsNode.control.value).toEqual(obsValue[0].value.uuid);

        // check 2: the obs object used to populate the payload should be set
        expect(simpleObsNode.initialValue).toEqual(obsValue[0]);

        // CASE 2: numbers, text values, and dates in text formats
        let numericObsNode = form.searchNodeByQuestionId('creatinine_test')[0];
        let obsWithNumeric = [{
            uuid: 'ac55c445-9661-4d42-86b5-4d6ec33a000',
            obsDatetime: '2016-01-21T16:17:46.000+0300',
            concept: {
                uuid: 'a897e450-1350-11df-a1f1-0026b9348838'
            },
            value: 1000,
            groupMembers: null
        }];

        helper.setSimpleObsNodeValue(numericObsNode, obsWithNumeric);
        // check 1: the value of the node control should be set
        expect(numericObsNode.control.value).toEqual(obsWithNumeric[0].value);

        // check 2: the obs object used to populate the payload should be set
        expect(numericObsNode.initialValue).toEqual(obsWithNumeric[0]);
    });

    it('should set the value of a multi-select obs node given the obs that represents its value', () => {
        // multi-select obs represent anwsers with multiple choices.
        // they are usually represented as multiple-obs
        // the obs array supplied is already filtered as the obs that is the answer to the given node
        let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
        let ff: FormFactory = TestBed.get(FormFactory);
        expect(ff).toBeDefined();
        let form: Form = ff.createForm(adultForm);
        expect(form).toBeDefined();

        let multiselectObs = [
            {
                uuid: 'uuid1',
                concept: {
                    uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
                },
                value: {
                    uuid: '6a73f32d-1870-4527-af6e-74443251ded2'
                }
            },
            {
                uuid: 'uuid2',
                concept: {
                    uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
                },
                value: {
                    uuid: '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
                }
            },
            {
                uuid: 'uuid3',
                concept: {
                    uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
                },
                value: {
                    uuid: 'a89cc876-1350-11df-a1f1-0026b9348838'
                }
            }
        ];

        let multiSelectNode = form.searchNodeByQuestionId('current_art_regimen_adult')[0];

        helper.setMultiselectObsNodeValue(multiSelectNode, multiselectObs);

        // check 1: the value of the node control should be set
        expect(multiSelectNode.control.value).toEqual([
            '6a73f32d-1870-4527-af6e-74443251ded2',
            '1c4a75d0-cc91-4752-b0a5-4b833326ff7a',
            'a89cc876-1350-11df-a1f1-0026b9348838'
        ]);

        // check 2: the obs object used to populate the payload should be set
        expect(multiSelectNode.initialValue).toEqual(multiselectObs);
    });

    it('should set values for a complex obs node given the obs that represents its value', () => {
        // complex obs is a single obs but whose members other than the value, needs to be changed.
        // the obs array supplied is already filtered as the obs that is the answer to the given node
        let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
        let ff: FormFactory = TestBed.get(FormFactory);
        expect(ff).toBeDefined();
        let form: Form = ff.createForm(adultForm);
        expect(form).toBeDefined();

        let complexObsNode = form.searchNodeByQuestionId('complex_creatinine_test')[0];
        let obs = [{
            uuid: 'ac55c445-9661-4d42-86b5-4d6ec33a000',
            obsDatetime: '2016-01-21T16:17:46.000+0300',
            concept: {
                uuid: 'a897e450-1350-11df-a1f1-0026b9348838'
            },
            value: 1000,
            groupMembers: null
        }];

        expect(complexObsNode).toBeDefined();

        helper.setComplexObsNodeValue(complexObsNode, obs);

        // check 1: the initial value for the complex obs node is set
        expect(complexObsNode.initialValue).toBe(obs[0]);

        // check 2: the value property is set
        let valueControl = form.searchNodeByQuestionId('creatinine_test')[0];
        expect(valueControl).toBeDefined();
        expect(valueControl.control.value).toEqual(obs[0].value);
        expect(valueControl.initialValue).toEqual(obs[0]);

        // check 3: the date property is set
        let dateControl = form.searchNodeByQuestionId('date_creatinine_test')[0];
        expect(dateControl.control.value).toEqual(obs[0].obsDatetime);
        expect(dateControl.initialValue).toEqual(obs[0]);

    });

    it('should set the value for a group obs node given the obs that represents its value', () => {
        let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
        let ff: FormFactory = TestBed.get(FormFactory);
        expect(ff).toBeDefined();
        let form: Form = ff.createForm(adultForm);
        expect(form).toBeDefined();

        let groupObsNode = form.searchNodeByQuestionId('groupStartDateTbTreatment')[0];

        let groupObs = [
            {
                uuid: 'some uuid',
                obsDatetime: '2016-01-21T16:17:46.000+0300',
                concept: {
                    uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
                },
                groupMembers: [
                    {
                        uuid: 'some inner uuid',
                        obsDatetime: '2016-01-21T16:17:46.000+0300',
                        concept: {
                            uuid: 'a899e5f2-1350-11df-a1f1-0026b9348838'
                        },
                        value: '2016-01-21T16:17:46.000+0300'
                    }
                ],
                value: null
            }
        ];

        helper.setGroupObsNodeValue(groupObsNode, groupObs);

        // check 1: the initial value for the group obs node is set
        expect(groupObsNode.initialValue).toBe(groupObs[0]);

        // check 2: the value for children is set
        let childNode = form.searchNodeByQuestionId('startDateOfTbTreatment')[0];
        expect(childNode).toBeDefined();
        expect(childNode.control.value).toEqual(groupObs[0].groupMembers[0].value);
        expect(childNode.initialValue).toEqual(groupObs[0].groupMembers[0]);

    });

    it('should set the value for a repeating group obs node given ' +
        'the obs array representing its value', () => {
            let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
            let ff: FormFactory = TestBed.get(FormFactory);
            expect(ff).toBeDefined();
            let form: Form = ff.createForm(adultForm);
            expect(form).toBeDefined();

            let repeatingObsNode = form.searchNodeByQuestionId('tb_current_regimen_group')[0];

            let repeatingGroupObs = [
                {
                    uuid: 'some uuid 1',
                    obsDatetime: '2016-01-21T16:17:46.000+0300',
                    concept: {
                        uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
                    },
                    groupMembers: [
                        {
                            uuid: 'some inner uuid 1',
                            obsDatetime: '2016-01-21T16:17:46.000+0300',
                            concept: {
                                uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
                            },
                            value: {
                                uuid: 'a899f51a-1350-11df-a1f1-0026b9348838'
                            }
                        },
                        {
                            uuid: 'some inner uuid 2',
                            obsDatetime: '2016-01-21T16:17:46.000+0300',
                            concept: {
                                uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
                            },
                            value: 29
                        }
                    ],
                    value: null
                },
                {
                    uuid: 'some uuid 1',
                    obsDatetime: '2016-01-21T16:17:46.000+0300',
                    concept: {
                        uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
                    },
                    groupMembers: [
                        {
                            uuid: 'some inner uuid 1',
                            obsDatetime: '2016-01-21T16:17:46.000+0300',
                            concept: {
                                uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
                            },
                            value: {
                                uuid: 'a8971c64-1350-11df-a1f1-0026b9348838'
                            }
                        },
                        {
                            uuid: 'some inner uuid 2',
                            obsDatetime: '2016-01-21T16:17:46.000+0300',
                            concept: {
                                uuid: 'a8a0744e-1350-11df-a1f1-0026b9348838'
                            },
                            value: 200
                        }
                    ],
                    value: null
                }
            ];

            helper.setRepeatingGroupObsNodeValue(repeatingObsNode, repeatingGroupObs);

            // check 1: repeating node has initial value set
            expect(repeatingObsNode.initialValue).toBe(repeatingGroupObs);

            // check 2: repeating node has added all the children
            let node = repeatingObsNode as ArrayNode;
            expect(node.children.length).toEqual(2);
            expect(node.children[0].initialValue).toBe(repeatingGroupObs[0]);
            expect(node.children[1].initialValue).toBe(repeatingGroupObs[1]);

            // check 3: child controls have all the required values

            let node1 = node.children[0];

            // tb regimen is set
            let regimenNode1 = node1.children['tb_current'] as NodeBase;
            expect(regimenNode1).toBeDefined();
            expect(regimenNode1.initialValue).toBe(repeatingGroupObs[0].groupMembers[0]);
            expect(regimenNode1.control.value).
                toEqual(repeatingGroupObs[0].groupMembers[0].value.uuid);

            // quantity is set
            let quantityNode1 = node1.children['regimenTabsDay'] as NodeBase;
            expect(quantityNode1).toBeDefined();
            expect(quantityNode1.initialValue).toBe(repeatingGroupObs[0].groupMembers[1]);
            expect(quantityNode1.control.value).
                toEqual(repeatingGroupObs[0].groupMembers[1].value);

            let node2 = node.children[1];

            // tb regimen is set
            let regimenNode2 = node2.children['tb_current'] as NodeBase;
            expect(regimenNode2).toBeDefined();
            expect(regimenNode2.initialValue).toBe(repeatingGroupObs[1].groupMembers[0]);
            expect(regimenNode2.control.value).
                toEqual(repeatingGroupObs[1].groupMembers[0].value.uuid);

            // quantity is set
            let quantityNode2 = node2.children['regimenMgDay'] as NodeBase;
            expect(quantityNode2).toBeDefined();
            expect(quantityNode2.initialValue).toBe(repeatingGroupObs[1].groupMembers[1]);
            expect(quantityNode2.control.value).
                toEqual(repeatingGroupObs[1].groupMembers[1].value);

        });

    it('should set the values for nodes given the array of obs for an encounter', () => {
        let helper: ObsAdapterHelper = TestBed.get(ObsAdapterHelper);
        let ff: FormFactory = TestBed.get(FormFactory);
        expect(ff).toBeDefined();
        let form: Form = ff.createForm(adultForm);
        expect(form).toBeDefined();

        helper.setNodeValue(form.rootNode, adultFormObs.obs);

        // Simple obs are set
        let simpleNode = form.searchNodeByQuestionId('onTbTreatment')[0];
        expect(simpleNode.control.value).toEqual('a899b35c-1350-11df-a1f1-0026b9348838');

        // Multiselect obs are set
        let mutliselectNode = form.searchNodeByQuestionId('current_art_regimen_adult')[0];
        expect(mutliselectNode.control.value).toEqual([
            'a89cc876-1350-11df-a1f1-0026b9348838',
            '6a73f32d-1870-4527-af6e-74443251ded2',
            '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'

        ]);

        // complex obs are set
        let complexNode = form.searchNodeByQuestionId('creatinine_test')[0];
        expect(complexNode.control.value).toEqual(1000);

        // Group obs are set
        let nodeInaGroup = form.searchNodeByQuestionId('pcpProphylaxisAdherence')[0];
        expect(nodeInaGroup.control.value).toEqual('a8b0f882-1350-11df-a1f1-0026b9348838');

        // Repeating group obs are set
        let arrayNode = form.searchNodeByQuestionId('tb_current_regimen_group')[0] as ArrayNode;
        expect(arrayNode.children.length).toBe(1);
        let nodeInArray = ((arrayNode.children[0] as GroupNode).children['tb_current']) as NodeBase;
        expect(nodeInArray.control.value).toEqual('a899f51a-1350-11df-a1f1-0026b9348838');

    });

});
