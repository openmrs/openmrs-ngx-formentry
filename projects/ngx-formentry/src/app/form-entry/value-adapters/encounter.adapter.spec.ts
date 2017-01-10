import { TestBed } from '@angular/core/testing';

import { FormFactory } from '../form-factory/form.factory';
import { FormControlService } from '../form-factory/form-control.service';
import { ValidationFactory } from '../form-factory/validation.factory';
import { EncounterAdapter } from './encounter.adapter';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { HidersDisablersFactory } from '../form-factory/hiders-disablers.factory';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { QuestionFactory } from '../form-factory/question.factory';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import { NodeBase, ArrayNode, LeafNode } from '../form-factory/form-node';

import { OrderValueAdapter, ObsValueAdapter } from '.';

const adultForm = require('../../adult');
const adultFormOrders = require('../../mock/orders');
const adultFormObs = require('../../mock/obs');
const moment = require('moment');

describe('Encounter Value Adapter:', () => {
    let adultFormSchema: any;
    beforeEach(() => {
        adultFormSchema = JSON.parse(JSON.stringify(adultForm));
        TestBed.configureTestingModule({
            providers: [
                OrderValueAdapter,
                ObsValueAdapter,
                FormFactory,
                FormControlService,
                ValidationFactory,
                HidersDisablersFactory,
                EncounterAdapter,
                ExpressionRunner,
                JsExpressionHelper,
                QuestionFactory,
                ControlRelationsFactory,

            ]
        });
    });


    it('should be injectable', () => {
        let adapter = TestBed.get(EncounterAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        expect(adapter).toBeTruthy();
        expect(factory).toBeTruthy();
        expect(adultForm).toBeTruthy();
        let createdForm = factory.createForm(adultFormSchema);
        expect(createdForm).toBeTruthy();
    });

    it('should return all encounter nodes', () => {
        let adapter = TestBed.get(EncounterAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        let form = factory.createForm(adultFormSchema);

        let nodes: Array<NodeBase> =
            adapter.getEncounterNodes(form.rootNode);

        expect(nodes.length).toBe(3);
        expect(nodes[0].question.extras.type)
            .toBe('encounterDatetime');
        expect(nodes[1].question.extras.type)
            .toBe('encounterProvider');
        expect(nodes[2].question.extras.type)
            .toBe('encounterLocation');
    });

    it('should populate form with existing encounter', () => {
        let adapter = TestBed.get(EncounterAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        let form = factory.createForm(adultFormSchema);

        let encounter = {
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
            patient: {
                uuid: 'patient-uuid',
                identifiers: []
            },
            provider: {
                uuid: 'ef59ac9d-9cca-46c5-ab04-b4d708584e13',
                display: 'Florida Jepngetich Kiplagat'
            },
            uuid: '3841e9e6-b6cb-4667-b495-89331c6a973a'
        };

        adapter.populateForm(form, encounter);

        let nodes: Array<NodeBase> =
            adapter.getEncounterNodes(form.rootNode);

        // Encounter Date
        expect(nodes[0].control.value).toEqual(moment('2016-12-14T11:26:23.000+0300').toDate());
        expect(nodes[0].initialValue).toEqual(moment('2016-12-14T11:26:23.000+0300').toDate());

        // Encounter Provider
        expect(nodes[1].control.value).toBe('ef59ac9d-9cca-46c5-ab04-b4d708584e13');
        expect(nodes[1].initialValue).toBe('ef59ac9d-9cca-46c5-ab04-b4d708584e13');

        // Encounter Location
        expect(nodes[2].control.value).toBe('18c343eb-b353-462a-9139-b16606e6b6c2');
        expect(nodes[2].initialValue).toBe('18c343eb-b353-462a-9139-b16606e6b6c2');

        // Check that it populated obs
        let node = form.searchNodeByQuestionId('onArt');
        expect(node[0].control.value !== '').toBe(true);

        // Check that it populated orders
        expect(adapter.ordersAdapter.formOrderNodes[0].control.value[0]).toEqual({ order1: 'a8982474-1350-11df-a1f1-0026b9348838' });

    });

    it('should generate encounter payload', () => {
        let adapter = TestBed.get(EncounterAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        let form = factory.createForm(adultFormSchema);

        let encounter = {
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
            patient: {
                uuid: 'patient-uuid',
                identifiers: []
            },
            provider: {
                uuid: 'ef59ac9d-9cca-46c5-ab04-b4d708584e13',
                display: 'Florida Jepngetich Kiplagat'
            },
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


        let nodes: Array<NodeBase> =
            adapter.getEncounterNodes(form.rootNode);

        // Simulate user input
        // change date
        let setDate = moment.parseZone('2016-11-23T11:32:54+0000').toDate();
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
        let createdNode = (node[0] as ArrayNode).createChildNode();
        (createdNode.children['order1'] as LeafNode).control.setValue('new-order');


        // generate payload
        let payload = adapter.generateFormPayload(form);

        expect(payload['encounterDatetime']).toEqual('2016-11-23 14:32:54');
        expect(payload['provider']).toEqual('new-provider-uuid');
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
    });

});
