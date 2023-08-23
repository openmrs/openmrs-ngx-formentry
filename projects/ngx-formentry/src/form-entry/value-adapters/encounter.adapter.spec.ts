import { TestBed, waitForAsync } from '@angular/core/testing';

import moment from 'moment';

import { FormFactory } from '../form-factory/form.factory';
import { FormControlService } from '../form-factory/form-control.service';
import { ValidationFactory } from '../form-factory/validation.factory';
import { EncounterAdapter } from './encounter.adapter';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { HidersDisablersFactory } from '../form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-factory/show-messages.factory';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { QuestionFactory } from '../form-factory/question.factory';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import { NodeBase, ArrayNode, LeafNode } from '../form-factory/form-node';

import { ObsAdapterHelper } from './obs-adapter-helper';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
import { DebugModeService } from './../services/debug-mode.service';

import adultForm from '../../adult.json';
import adultFormOrders from '../../mock/orders.json';
import adultFormDiagnoses from '../../mock/diagnoses.json';
import adultFormObs from '../../mock/obs.json';
import { DiagnosisValueAdapter } from "./diagnosis.adapter";

describe('Encounter Value Adapter:', () => {
  let adultFormSchema: any;
  beforeEach(
    waitForAsync(() => {
      adultFormSchema = JSON.parse(JSON.stringify(adultForm));
      TestBed.configureTestingModule({
        providers: [
          OrderValueAdapter,
          DiagnosisValueAdapter,
          ObsValueAdapter,
          FormFactory,
          FormControlService,
          ValidationFactory,
          HidersDisablersFactory,
          AlertsFactory,
          EncounterAdapter,
          ExpressionRunner,
          JsExpressionHelper,
          QuestionFactory,
          ControlRelationsFactory,
          ObsAdapterHelper,
          DebugModeService
        ]
      });
    })
  );

  it('should be injectable', () => {
    const adapter = TestBed.inject(EncounterAdapter);
    const factory: FormFactory = TestBed.inject(FormFactory);
    expect(adapter).toBeTruthy();
    expect(factory).toBeTruthy();
    expect(adultForm).toBeTruthy();
    const createdForm = factory.createForm(adultFormSchema);
    expect(createdForm).toBeTruthy();
  });

  it('should return all encounter nodes', () => {
    const adapter = TestBed.inject(EncounterAdapter);
    const factory: FormFactory = TestBed.inject(FormFactory);
    const form = factory.createForm(adultFormSchema);

    const nodes: Array<NodeBase> = adapter.getEncounterNodes(form.rootNode);

    expect(nodes.length).toBe(3);
    expect(nodes[0].question.extras.type).toBe('encounterDatetime');
    expect(nodes[1].question.extras.type).toBe('encounterProvider');
    expect(nodes[2].question.extras.type).toBe('encounterLocation');
  });

  it('should populate form with existing encounter', () => {
    const adapter = TestBed.inject(EncounterAdapter);
    const factory: FormFactory = TestBed.inject(FormFactory);
    const form = factory.createForm(adultFormSchema);

    const encounter = {
      encounterDatetime: '2016-12-14T11:26:23.000+0300',
      encounterType: {
        uuid: '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
        display: 'ADULTRETURN'
      },
      form: {
        uuid: '81f92a8a-ff5c-415d-a34c-b5bdca2406be',
        name: 'AMPATH POC Adult Return Visit Form v1.0'
      },
      location: {
        uuid: '18c343eb-b353-462a-9139-b16606e6b6c2',
        display: 'Location Test'
      },
      obs: adultFormObs.obs,
      orders: adultFormOrders.orders,
      diagnoses: adultFormDiagnoses.diagnoses,
      patient: {
        uuid: 'patient-uuid',
        identifiers: []
      },
      encounterProviders: [
        {
          provider: {
            uuid: 'ef59ac9d-9cca-46c5-ab04-b4d708584e13',
            display: 'Florida Jepngetich Kiplagat'
          }
        }
      ],
      uuid: '3841e9e6-b6cb-4667-b495-89331c6a973a'
    };

    adapter.populateForm(form, encounter);

    const nodes: Array<NodeBase> = adapter.getEncounterNodes(form.rootNode);

    // Encounter Date
    expect(nodes[0].control.value).toEqual(
      moment('2016-12-14T11:26:23.000+0300').toDate()
    );
    expect(nodes[0].initialValue).toEqual(
      moment('2016-12-14T11:26:23.000+0300').toDate()
    );

    // Encounter Provider
    expect(nodes[1].control.value).toBe('ef59ac9d-9cca-46c5-ab04-b4d708584e13');
    expect(nodes[1].initialValue).toBe('ef59ac9d-9cca-46c5-ab04-b4d708584e13');

    // Encounter Location
    expect(nodes[2].control.value).toBe('18c343eb-b353-462a-9139-b16606e6b6c2');
    expect(nodes[2].initialValue).toBe('18c343eb-b353-462a-9139-b16606e6b6c2');

    // Check that it populated obs
    const node = form.searchNodeByQuestionId('onArt');
    expect(node[0].control.value !== '').toBe(true);

    // Check that it populated orders
    expect(adapter.ordersAdapter.formOrderNodes[0].control.value[0]).toEqual({
      order1: 'a8982474-1350-11df-a1f1-0026b9348838'
    });

    // Check that it populated diagnoses
    expect(adapter.diagnosesAdapter.formDiagnosisNodes[1].control.value[0].secondaryDiagnosisId).toEqual('5945AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  });

  it('should generate encounter payload', () => {
    const adapter = TestBed.inject(EncounterAdapter);
    const factory: FormFactory = TestBed.inject(FormFactory);
    const form = factory.createForm(adultFormSchema);

    const encounter = {
      encounterDatetime: '2016-12-14T11:26:23.000+0300',
      encounterType: {
        uuid: '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
        display: 'ADULTRETURN'
      },
      form: {
        uuid: '81f92a8a-ff5c-415d-a34c-b5bdca2406be',
        name: 'AMPATH POC Adult Return Visit Form v1.0'
      },
      location: {
        uuid: '18c343eb-b353-462a-9139-b16606e6b6c2',
        display: 'Location Test'
      },
      obs: adultFormObs.obs,
      orders: adultFormOrders.orders,
      diagnoses: adultFormDiagnoses.diagnoses,
      patient: {
        uuid: 'patient-uuid',
        identifiers: []
      },
      encounterProviders: [
        {
          provider: {
            uuid: 'ef59ac9d-9cca-46c5-ab04-b4d708584e13',
            display: 'Florida Jepngetich Kiplagat'
          }
        }
      ],
      uuid: '3841e9e6-b6cb-4667-b495-89331c6a973a'
    };

    adapter.populateForm(form, encounter);

    // Set valueProcessingInfo
    form.valueProcessingInfo = {
      patientUuid: 'patientUuid',
      visitUuid: 'visitUuid',
      encounterTypeUuid: 'encounterTypeUuid',
      formUuid: 'formUuid',
      encounterUuid: 'encounterUuid',
      providerUuid: 'providerUuid',
      utcOffset: '+0300'
    };

    const nodes: Array<NodeBase> = adapter.getEncounterNodes(form.rootNode);

    // Simulate user input
    // change date
    const setDate = moment.parseZone('2016-11-23T11:32:54+0000').toDate();
    nodes[0].control.setValue(setDate);

    // change provider
    nodes[1].control.setValue('new-provider-uuid');

    // change location
    nodes[2].control.setValue('new-location-uuid');

    // change obs
    let node = form.searchNodeByQuestionId('onArt');
    node[0].control.setValue('changed-obs');

    // change orders
    node = form.searchNodeByQuestionId('order1');
    const createdNode = (node[0] as ArrayNode).createChildNode();
    (createdNode.children['order1'] as LeafNode).control.setValue('new-order');

    // change diagnoses
    let primaryDiagnosisNode = form.searchNodeByQuestionId('primaryDiagnosisId')[0];
    primaryDiagnosisNode.createChildNode();
    const value = {};
    value[primaryDiagnosisNode.question.key] = '116125AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const childNode = primaryDiagnosisNode.children[0];
    childNode.control.setValue(value);

    // generate payload
    const payload = adapter.generateFormPayload(form);

    expect(payload['encounterDatetime']).toEqual('2016-11-23T14:32:54+03:00');
    expect(payload['encounterProviders'].length).toEqual(1);
    expect(payload['encounterProviders'][0].provider).toEqual(
      'new-provider-uuid'
    );
    expect(payload['encounterProviders'][0].encounterRole).toEqual(
      'a0b03050-c99b-11e0-9572-0800200c9a66'
    );
    expect(payload['location']).toEqual('new-location-uuid');

    // check members not filled by the user
    expect(payload['patient']).toEqual('patientUuid');
    expect(payload['visit']).toEqual('visitUuid');
    expect(payload['encounterType']).toEqual('encounterTypeUuid');
    expect(payload['form']).toEqual('formUuid');
    expect(payload['uuid']).toEqual('encounterUuid');

    // check that it generated obs payload
    expect(payload['obs'].length > 0).toBe(true);

    // check that it generated orders payload
    expect(payload['orders'].length > 0).toBe(true);

    // check that it generated orders payload
    expect(payload['diagnoses'].find(d => d.diagnosis.coded == '116125AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')).toBeTruthy();
    expect(payload['diagnoses'].find(d => d.diagnosis.coded == '5945AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')).toBeTruthy();
  });
});
