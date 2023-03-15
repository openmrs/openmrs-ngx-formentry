import { TestBed } from '@angular/core/testing';

const adultForm = require('../../adult.json');
const adultFormObs = require('../../mock/obs.json');
const generatedPayload = require('./generatedPayload.json');
import { FormFactory } from '../../form-entry/form-factory/form.factory';
import { FormControlService } from '../../form-entry/form-factory/form-control.service';
import { ValidationFactory } from '../../form-entry/form-factory/validation.factory';
import { QuestionFactory } from '../../form-entry/form-factory/question.factory';
import { HidersDisablersFactory } from '../../form-entry/form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-factory/show-messages.factory';
import { ExpressionRunner } from '../../form-entry/expression-runner/expression-runner';
import { JsExpressionHelper } from '../../form-entry/helpers/js-expression-helper';
import { ControlRelationsFactory } from '../../form-entry/form-factory/control-relations.factory';
import { Form } from '../form-factory/form';
import { ObsValueAdapter } from './obs.adapter';
import { ObsAdapterHelper } from './obs-adapter-helper';
import { DebugModeService } from './../services/debug-mode.service';
import { TranslateModule } from '@ngx-translate/core';

describe('Obs Value Adapter: ', () => {
  let formFactory: FormFactory;
  let obsValueAdapter: ObsValueAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
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
        ObsValueAdapter,
        ObsAdapterHelper,
        AlertsFactory,
        DebugModeService
      ]
    });

    formFactory = TestBed.inject(FormFactory);
    obsValueAdapter = TestBed.inject(ObsValueAdapter);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be defined', () => {
    expect(obsValueAdapter).toBeTruthy();
  });

  describe('processMultiSelect', () => {
    it('should exist', () => {
      const processMultiSelectSpy = spyOn(
        obsValueAdapter,
        'processMultiSelect'
      );
      expect(processMultiSelectSpy).toBeTruthy();
    });

    it('should return payload for multi select given a concept and values', () => {
      const payload = obsValueAdapter.processMultiSelect('concept', [
        'value1',
        'value2'
      ]);

      expect(payload).toEqual([
        { concept: 'concept', value: 'value1' },
        { concept: 'concept', value: 'value2' }
      ]);
    });
  });

  describe('updateOrVoidObs', () => {
    it('should exist', () => {
      const updateOrVoidObs = spyOn(obsValueAdapter, 'updateOrVoidObs');
      expect(updateOrVoidObs).toBeTruthy();
    });

    it('should insert updated obs into payload', () => {
      const obsPayload = [];
      obsValueAdapter.updateOrVoidObs(
        { value: 'value1' },
        { obsUuid: 'uuid', value: 'value2' },
        obsPayload
      );
      expect(obsPayload).toEqual([{ uuid: 'uuid', value: 'value1' }]);
    });

    it('should insert voided obs into payload', () => {
      const obsPayload = [];
      obsValueAdapter.updateOrVoidObs(
        { value: '' },
        { obsUuid: 'uuid', value: 'value2' },
        obsPayload
      );
      expect(obsPayload).toEqual([{ uuid: 'uuid', voided: true }]);
    });
  });

  describe('processNewMultiSelectObs', () => {
    it('should exist', () => {
      const processNewMultiSelectObs = spyOn(
        obsValueAdapter,
        'processNewMultiSelectObs'
      );
      expect(processNewMultiSelectObs).toBeTruthy();
    });

    it('should insert new multiselect obs into payload', () => {
      const obsPayload = [];
      obsValueAdapter.processNewMultiSelectObs(
        [
          { value: { concept: 'concept1', value: 'value1' } },
          { value: { concept: 'concept1', value: 'value2' } }
        ],
        obsPayload
      );

      expect(obsPayload).toEqual([
        { concept: 'concept1', value: 'value1' },
        { concept: 'concept1', value: 'value2' }
      ]);
    });
  });

  describe('processDeletedMultiSelectObs', () => {
    it('should exist', () => {
      const processDeletedMultiSelectObs = spyOn(
        obsValueAdapter,
        'processDeletedMultiSelectObs'
      );
      expect(processDeletedMultiSelectObs).toBeTruthy();
    });

    it('should insert deleted multiselect obs into payload', () => {
      const obsPayload = [];
      obsValueAdapter.processDeletedMultiSelectObs(
        [
          { uuid: 'uuid', value: { concept: 'concept1', value: 'value1' } },
          { uuid: 'uuid2', value: { concept: 'concept1', value: 'value2' } }
        ],
        obsPayload
      );
      expect(obsPayload).toEqual([
        { uuid: 'uuid', voided: true },
        { uuid: 'uuid2', voided: true }
      ]);
    });
  });

  describe('createGroupDeletedObs', () => {
    it('should exist', () => {
      const createGroupDeletedObs = spyOn(
        obsValueAdapter,
        'createGroupDeletedObs'
      );
      expect(createGroupDeletedObs).toBeTruthy();
    });

    it('should return deleted obs given a payload of existing groups', () => {
      let obsPayload = [];
      obsPayload = obsValueAdapter.createGroupDeletedObs([
        { uuid: 'uuid' },
        { uuid: 'uuid2' }
      ]);
      expect(obsPayload).toEqual([
        { uuid: 'uuid', voided: true },
        { uuid: 'uuid2', voided: true }
      ]);
    });
  });

  describe('createGroupNewObs', () => {
    it('should exist', () => {
      const createGroupNewObs = spyOn(obsValueAdapter, 'createGroupNewObs');
      expect(createGroupNewObs).toBeTruthy();
    });

    it('should return new obs given a mapped obs group payload', () => {
      const obsPayload = obsValueAdapter.createGroupNewObs(
        [{ value: { 'uuid:value1': 'value1', 'uuid2:value2': 'value2' } }],
        'uuid'
      );
      expect(obsPayload).toEqual([
        {
          concept: 'uuid',
          groupMembers: [
            { concept: 'uuid', value: 'value1' },
            { concept: 'uuid2', value: 'value2' }
          ]
        }
      ]);
    });
  });

  describe('leftOuterJoinArrays', () => {
    it('should exist', () => {
      const leftOuterJoinArrays = spyOn(obsValueAdapter, 'leftOuterJoinArrays');
      expect(leftOuterJoinArrays).toBeTruthy();
    });

    it('should return the objects in the first array that are not in the second', () => {
      const joined = obsValueAdapter.leftOuterJoinArrays(
        [
          { value: { concept: 'uuid1', value: 'value1' } },
          { value: { concept: 'uuid2', value: 'value2' } }
        ],
        [{ value: { concept: 'uuid2', value: 'value2' } }]
      );
      expect(joined).toEqual([
        { value: { concept: 'uuid1', value: 'value1' } }
      ]);
    });
  });

  describe('mapInitialGroup', () => {
    it('should exist', () => {
      const mapInitialGroup = spyOn(obsValueAdapter, 'mapInitialGroup');
      expect(mapInitialGroup).toBeTruthy();
    });

    it('should properly map group payload', () => {
      const payload = {
        uuid: '7e5d7b85-075a-4d5e-aa0c-678196b40a18',
        obsDatetime: '2016-12-01T11:33:57.000+0300',
        concept: {
          uuid: 'a8a072c8-1350-11df-a1f1-0026b9348838',
          name: {
            display: 'PATIENT REPORTED CURRENT OTHER TREATMENT'
          }
        },
        value: null,
        groupMembers: [
          {
            uuid: 'b6fe4171-69c7-4cd4-a8d1-c280cd123554',
            display: 'MEDICATION ADDED: PARACETAMOL',
            concept: {
              uuid: 'a8a060c6-1350-11df-a1f1-0026b9348838',
              display: 'MEDICATION ADDED'
            },
            person: {
              uuid: 'b4ddd369-bec5-446e-b8f8-47fd5567b295',
              display: '234750205-2 - Robai Test Robai'
            },
            obsDatetime: '2016-12-01T11:33:57.000+0300',
            accessionNumber: null,
            obsGroup: {
              uuid: '7e5d7b85-075a-4d5e-aa0c-678196b40a18',
              display: 'PATIENT REPORTED CURRENT OTHER TREATMENT: PARACETAMOL'
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '08feae7c-1352-11df-a1f1-0026b9348838',
              display: 'MTRH Module 1'
            },
            order: null,
            encounter: {
              uuid: 'e3a504ad-f9db-46e5-b4a8-017dcddc9950',
              display: 'ADULTRETURN 01/12/2016'
            },
            voided: false,
            value: {
              uuid: 'a890c3aa-1350-11df-a1f1-0026b9348838',
              display: 'PARACETAMOL',
              name: {
                display: 'PARACETAMOL',
                uuid: 'a93c40a4-1350-11df-a1f1-0026b9348838',
                name: 'PARACETAMOL',
                locale: 'en',
                localePreferred: true,
                conceptNameType: 'FULLY_SPECIFIED',
                resourceVersion: '1.9'
              },
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A'
              },
              conceptClass: {
                uuid: '8d490dfc-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Drug'
              },
              set: false,
              version: '',
              retired: false,
              names: [
                {
                  uuid: 'a9547b24-1350-11df-a1f1-0026b9348838',
                  display: 'CALPOL'
                },
                {
                  uuid: 'a958c33c-1350-11df-a1f1-0026b9348838',
                  display: 'PANADOL'
                },
                {
                  uuid: 'a93c40a4-1350-11df-a1f1-0026b9348838',
                  display: 'PARACETAMOL'
                },
                {
                  uuid: 'a958c792-1350-11df-a1f1-0026b9348838',
                  display: 'PARACETAMOL SYRUP'
                },
                {
                  uuid: 'a9532076-1350-11df-a1f1-0026b9348838',
                  display: 'ACETOMINOPHEN'
                }
              ],
              descriptions: [
                {
                  uuid: 'a8ec4220-1350-11df-a1f1-0026b9348838'
                }
              ],
              mappings: [
                {
                  uuid: 'dfae3980-9525-4ebb-8cd6-554dfb6a0339',
                  display: 'MCL/CIEL: 70116'
                },
                {
                  uuid: 'b06e1793-dc19-4840-b4b3-71e7d3d8785e',
                  display: 'local: 89'
                }
              ],
              answers: [],
              setMembers: [],
              resourceVersion: '1.11'
            },
            valueModifier: null,
            formFieldPath: null,
            formFieldNamespace: null,
            resourceVersion: '1.11'
          }
        ]
      };
      const mapped = obsValueAdapter.mapInitialGroup(payload);
      expect(mapped).toEqual({
        'a8a060c6-1350-11df-a1f1-0026b9348838:a890c3aa-1350-11df-a1f1-0026b9348838':
          'a890c3aa-1350-11df-a1f1-0026b9348838'
      });
    });
  });

  describe('getMultiselectValues', () => {
    it('should exist', () => {
      const getMultiselectValues = spyOn(
        obsValueAdapter,
        'getMultiselectValues'
      );
      expect(getMultiselectValues).toBeTruthy();
    });

    it('should return an array of concept uuids given multiselect payload', () => {
      const joined = obsValueAdapter.getMultiselectValues([
        { value: { uuid: 'uuid1' } },
        { value: { uuid: 'uuid2' } }
      ]);
      expect(joined).toEqual(['uuid1', 'uuid2']);
    });
  });

  describe('getObsPayload', () => {
    it('should exist', () => {
      const getObsPayload = spyOn(obsValueAdapter, 'getObsPayload');
      expect(getObsPayload).toBeTruthy();
    });

    it('should return correct payload given an array of nodes with and without values set', () => {
      // Traverse to get all nodes
      const form = formFactory.createForm(adultForm);
      const pages = obsValueAdapter.traverse(form.rootNode);
      // Extract actual question nodes
      const questionNodes = obsValueAdapter.getQuestionNodes(pages);
      // Extract set obs
      obsValueAdapter.setValues(questionNodes, adultFormObs.obs);

      // simulate user changing complex obs values
      const creatinineValue = form.searchNodeByQuestionId('creatinine_test')[0];
      const creatinineDate = form.searchNodeByQuestionId(
        'date_creatinine_test'
      )[0];
      creatinineValue.control.setValue(2000);
      creatinineDate.control.setValue('2016-01-22T16:17:46.000+0300');

      // let payload = obsValueAdapter.getObsPayload(questionNodes);
      // expect(payload).toEqual(generatedPayload);
    });
  });

  describe('Set Values', () => {
    it('should exist', () => {
      const setValues = spyOn(obsValueAdapter, 'setValues');
      expect(setValues).toBeTruthy();
    });

    it('should correctly set the values given question nodes and obs payload', () => {
      const form: Form = formFactory.createForm(adultForm);

      const pages = obsValueAdapter.traverse(form.rootNode);

      const questionNodes = obsValueAdapter.getQuestionNodes(pages);

      obsValueAdapter.setValues(questionNodes, adultFormObs.obs);

      const value = form.rootNode.control.value;
      expect(value['onArt']).toEqual('a899b35c-1350-11df-a1f1-0026b9348838');
      expect(value['tbadhere']).toEqual({
        tb_adherence: 'a8b0f882-1350-11df-a1f1-0026b9348838',
        adherenceTbTreatment: '',
        adherenceTbOther: ''
      });

      // check complex values
      const creatineValue = form.searchNodeByQuestionId('creatinine_test')[0];
      const creatineDate = form.searchNodeByQuestionId(
        'date_creatinine_test'
      )[0];

      expect(creatineValue.control.value).toEqual(1000);
      expect(creatineDate.control.value).toEqual(
        '2016-01-21T16:17:46.000+0300'
      );
    });
  });
});
