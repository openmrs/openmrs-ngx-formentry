
import { TestBed, inject } from '@angular/core/testing';

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
import { ObsValueAdapter } from '.';


describe('Obs Value Adapter: ', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                FormFactory,
                FormControlService,
                ValidationFactory,
                HidersDisablersFactory,
                QuestionFactory,
                ExpressionRunner,
                JsExpressionHelper,
                ControlRelationsFactory,
                ObsValueAdapter
            ]
        });
    });
    afterEach(() => {
        TestBed.resetTestingModule();
    });
    it('should be defined',
        inject([ObsValueAdapter], (s: ObsValueAdapter) => {
            expect(s).toBeTruthy();

        })
    );
    describe('getObsPayload', () => {
        it('should return payload from the form', inject([ObsValueAdapter, FormFactory],
            (s: ObsValueAdapter, f: FormFactory) => {


            }));

    });

    describe('processMultiSelect', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let processMultiSelectSpy = spyOn(s, 'processMultiSelect');
                expect(processMultiSelectSpy).toBeTruthy();
            }));
        it('should return payload for multi select given a concept and values', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let payload = s.processMultiSelect('concept', ['value1', 'value2']);
                expect(payload).toEqual([{ concept: 'concept', value: 'value1' }, { concept: 'concept', value: 'value2' }]);
            }));

    });
    describe('updateOrVoidObs', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let updateOrVoidObs = spyOn(s, 'updateOrVoidObs');
                expect(updateOrVoidObs).toBeTruthy();
            }));
        it('should insert updated obs into payload', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let obsPayload = [];
                s.updateOrVoidObs({ value: 'value1' }, { obsUuid: 'uuid', value: 'value2' }, obsPayload);
                expect(obsPayload).toEqual([{ uuid: 'uuid', value: 'value1' }]);
            }));
        it('should insert voided obs into payload', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let obsPayload = [];
                s.updateOrVoidObs({ value: '' }, { obsUuid: 'uuid', value: 'value2' }, obsPayload);
                expect(obsPayload).toEqual([{ uuid: 'uuid', voided: true }]);
            }));

    });

    describe('processNewMultiSelectObs', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let processNewMultiSelectObs = spyOn(s, 'processNewMultiSelectObs');
                expect(processNewMultiSelectObs).toBeTruthy();
            }));
        it('should insert new multiselect obs into payload', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let obsPayload = [];
                s.processNewMultiSelectObs([{ value: { concept: 'concept1', value: 'value1' } },
                { value: { concept: 'concept1', value: 'value2' } }], obsPayload);
                expect(obsPayload).toEqual([{ concept: 'concept1', value: 'value1' }, { concept: 'concept1', value: 'value2' }]);
            }));
    });

    describe('processDeletedMultiSelectObs', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let processDeletedMultiSelectObs = spyOn(s, 'processDeletedMultiSelectObs');
                expect(processDeletedMultiSelectObs).toBeTruthy();
            }));
        it('should insert deleted multiselect obs into payload', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let obsPayload = [];
                s.processDeletedMultiSelectObs([{ uuid: 'uuid', value: { concept: 'concept1', value: 'value1' } },
                { uuid: 'uuid2', value: { concept: 'concept1', value: 'value2' } }], obsPayload);
                expect(obsPayload).toEqual([{ uuid: 'uuid', voided: true }, { uuid: 'uuid2', voided: true }]);
            }));
    });

    describe('createGroupDeletedObs', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let createGroupDeletedObs = spyOn(s, 'createGroupDeletedObs');
                expect(createGroupDeletedObs).toBeTruthy();
            }));
        it('should return deleted obs given a payload of existing groups', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let obsPayload = [];
                obsPayload = s.createGroupDeletedObs([{ uuid: 'uuid' }, { uuid: 'uuid2' }]);
                expect(obsPayload).toEqual([{ uuid: 'uuid', voided: true }, { uuid: 'uuid2', voided: true }]);
            }));
    });

    describe('createGroupNewObs', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let createGroupNewObs = spyOn(s, 'createGroupNewObs');
                expect(createGroupNewObs).toBeTruthy();
            }));
        it('should return new obs given a mapped obs group payload', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let obsPayload = s.createGroupNewObs([{ value: { 'uuid:value1': 'value1', 'uuid2:value2': 'value2' } }]);
                expect(obsPayload).toEqual([{ concept: 'uuid', value: 'value1' }, { concept: 'uuid2', value: 'value2' }]);
            }));
    });

    describe('leftOuterJoinArrays', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let leftOuterJoinArrays = spyOn(s, 'leftOuterJoinArrays');
                expect(leftOuterJoinArrays).toBeTruthy();
            }));
        it('should return the objects in the first array that are not in the second', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let joined = s.leftOuterJoinArrays([{ value: { concept: 'uuid1', value: 'value1' } },
                { value: { concept: 'uuid2', value: 'value2' } }], [{ value: { concept: 'uuid2', value: 'value2' } }]);
                expect(joined).toEqual([{ value: { concept: 'uuid1', value: 'value1' } }]);
            }));
    });

    describe('mapInitialGroup', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let mapInitialGroup = spyOn(s, 'mapInitialGroup');
                expect(mapInitialGroup).toBeTruthy();
            }));
        it('should properly map group payload', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let payload = {
                    'uuid': '7e5d7b85-075a-4d5e-aa0c-678196b40a18',
                    'obsDatetime': '2016-12-01T11:33:57.000+0300',
                    'concept': {
                        'uuid': 'a8a072c8-1350-11df-a1f1-0026b9348838',
                        'name': {
                            'display': 'PATIENT REPORTED CURRENT OTHER TREATMENT'
                        }
                    },
                    'value': null,
                    'groupMembers': [
                        {
                            'uuid': 'b6fe4171-69c7-4cd4-a8d1-c280cd123554',
                            'display': 'MEDICATION ADDED: PARACETAMOL',
                            'concept': {
                                'uuid': 'a8a060c6-1350-11df-a1f1-0026b9348838',
                                'display': 'MEDICATION ADDED',
                            },
                            'person': {
                                'uuid': 'b4ddd369-bec5-446e-b8f8-47fd5567b295',
                                'display': '234750205-2 - Robai Test Robai',
                            },
                            'obsDatetime': '2016-12-01T11:33:57.000+0300',
                            'accessionNumber': null,
                            'obsGroup': {
                                'uuid': '7e5d7b85-075a-4d5e-aa0c-678196b40a18',
                                'display': 'PATIENT REPORTED CURRENT OTHER TREATMENT: PARACETAMOL',
                            },
                            'valueCodedName': null,
                            'groupMembers': null,
                            'comment': null,
                            'location': {
                                'uuid': '08feae7c-1352-11df-a1f1-0026b9348838',
                                'display': 'MTRH Module 1',
                            },
                            'order': null,
                            'encounter': {
                                'uuid': 'e3a504ad-f9db-46e5-b4a8-017dcddc9950',
                                'display': 'ADULTRETURN 01/12/2016',
                            },
                            'voided': false,
                            'value': {
                                'uuid': 'a890c3aa-1350-11df-a1f1-0026b9348838',
                                'display': 'PARACETAMOL',
                                'name': {
                                    'display': 'PARACETAMOL',
                                    'uuid': 'a93c40a4-1350-11df-a1f1-0026b9348838',
                                    'name': 'PARACETAMOL',
                                    'locale': 'en',
                                    'localePreferred': true,
                                    'conceptNameType': 'FULLY_SPECIFIED',
                                    'resourceVersion': '1.9'
                                },
                                'datatype': {
                                    'uuid': '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                                    'display': 'N/A',
                                },
                                'conceptClass': {
                                    'uuid': '8d490dfc-c2cc-11de-8d13-0010c6dffd0f',
                                    'display': 'Drug',
                                },
                                'set': false,
                                'version': '',
                                'retired': false,
                                'names': [
                                    {
                                        'uuid': 'a9547b24-1350-11df-a1f1-0026b9348838',
                                        'display': 'CALPOL',
                                    },
                                    {
                                        'uuid': 'a958c33c-1350-11df-a1f1-0026b9348838',
                                        'display': 'PANADOL',
                                    },
                                    {
                                        'uuid': 'a93c40a4-1350-11df-a1f1-0026b9348838',
                                        'display': 'PARACETAMOL',
                                    },
                                    {
                                        'uuid': 'a958c792-1350-11df-a1f1-0026b9348838',
                                        'display': 'PARACETAMOL SYRUP',
                                    },
                                    {
                                        'uuid': 'a9532076-1350-11df-a1f1-0026b9348838',
                                        'display': 'ACETOMINOPHEN',
                                    }
                                ],
                                'descriptions': [
                                    {
                                        'uuid': 'a8ec4220-1350-11df-a1f1-0026b9348838',
                                    }
                                ],
                                'mappings': [
                                    {
                                        'uuid': 'dfae3980-9525-4ebb-8cd6-554dfb6a0339',
                                        'display': 'MCL/CIEL: 70116',
                                    },
                                    {
                                        'uuid': 'b06e1793-dc19-4840-b4b3-71e7d3d8785e',
                                        'display': 'local: 89',
                                    }
                                ],
                                'answers': [],
                                'setMembers': [],
                                'resourceVersion': '1.11'
                            },
                            'valueModifier': null,
                            'formFieldPath': null,
                            'formFieldNamespace': null,
                            'resourceVersion': '1.11'
                        }
                    ]
                };
                let mapped = s.mapInitialGroup(payload);
                expect(mapped).toEqual({
                    'a8a060c6-1350-11df-a1f1-0026b9348838:a890c3aa-1350-11df-a1f1-0026b9348838': 'a890c3aa-1350-11df-a1f1-0026b9348838'
                });
            }));
    });

    describe('getMultiselectValues', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let getMultiselectValues = spyOn(s, 'getMultiselectValues');
                expect(getMultiselectValues).toBeTruthy();
            }));
        it('it should return an array of concept uuids given multiselect payload', inject([ObsValueAdapter],
            (s: ObsValueAdapter) => {
                let joined = s.getMultiselectValues([{ value: { uuid: 'uuid1' } }, { value: { uuid: 'uuid2' } }]);
                expect(joined).toEqual(['uuid1', 'uuid2']);
            }));
    });

    describe('getObsPayload', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let getObsPayload = spyOn(s, 'getObsPayload');
                expect(getObsPayload).toBeTruthy();
            }));
        it('it should return correct payload given an array of nodes with and without values set',
            inject([ObsValueAdapter, FormFactory],
                (s: ObsValueAdapter, f: FormFactory) => {
                    // Traverse  to get all nodes
                    let pages = s.traverse(f.createForm(adultForm).rootNode);
                    // Extract actual question nodes
                    let questionNodes = s.getQuestionNodes(pages);
                    // Extract set obs
                    s.setValues(questionNodes, adultFormObs.obs);
                    let payload = s.getObsPayload(questionNodes);
                    expect(payload).toEqual(generatedPayload);
                }));
    });

    describe('Set Values', () => {
        it('should exist',
            inject([ObsValueAdapter], (s: ObsValueAdapter) => {
                let setValues = spyOn(s, 'setValues');
                expect(setValues).toBeTruthy();
            }));
        it('should correctly set the values given question nodes and obs payload',
            inject([ObsValueAdapter, FormFactory],
                (s: ObsValueAdapter, f: FormFactory) => {
                    let form: Form = f.createForm(adultForm);

                    let pages = s.traverse(form.rootNode);

                    let questionNodes = s.getQuestionNodes(pages);

                    s.setValues(questionNodes, adultFormObs.obs);

                    let value = form.rootNode.control.value;
                    expect(value['onArt']).toEqual('a899b35c-1350-11df-a1f1-0026b9348838');
                    expect(value['tbadhere']).toEqual({
                        tb_adherence: 'a8b0f882-1350-11df-a1f1-0026b9348838',
                        adherenceTbTreatment: '',
                        adherenceTbOther: ''
                    });
                }));
    });

});
