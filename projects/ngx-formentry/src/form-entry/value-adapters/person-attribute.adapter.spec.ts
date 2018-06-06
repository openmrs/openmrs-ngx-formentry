import { TestBed } from '@angular/core/testing';
import { FormFactory } from '../form-factory/form.factory';
import { FormControlService } from '../form-factory/form-control.service';
import { ValidationFactory } from '../form-factory/validation.factory';
import { PersonAttribuAdapter } from './person-attribute.adapter';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { HidersDisablersFactory } from '../form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-factory/show-messages.factory';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { QuestionFactory } from '../form-factory/question.factory';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import { NodeBase } from '../form-factory/form-node';
import { DebugModeService } from './../services/debug-mode.service';
import { CookieService } from 'ngx-cookie/services/cookies.service';

const adultForm = require('../../adult');

describe('Person Attribute Value Adapter:', () => {
    let adultFormSchema: any;
    beforeEach(() => {
        adultFormSchema = JSON.parse(JSON.stringify(adultForm));
        TestBed.configureTestingModule({
            providers: [
                FormFactory,
                FormControlService,
                ValidationFactory,
                HidersDisablersFactory,
                PersonAttribuAdapter,
                ExpressionRunner,
                JsExpressionHelper,
                AlertsFactory,
                QuestionFactory,
                ControlRelationsFactory,
                DebugModeService,
                CookieService
            ]
        });
    });


    it('should be injectable', () => {
        let adapter = TestBed.get(PersonAttribuAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        expect(adapter).toBeTruthy();
        expect(factory).toBeTruthy();
        expect(adultForm).toBeTruthy();
        let createdForm = factory.createForm(adultFormSchema);
        expect(createdForm).toBeTruthy();
    });

    it('should return all person attribute nodes', () => {
        let adapter = TestBed.get(PersonAttribuAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        let form = factory.createForm(adultFormSchema);

        let nodes: Array<NodeBase> =
            adapter.getPersonAttributeNodes(form.rootNode);
        expect(nodes.length).toBe(2);
        expect(nodes[0].question.extras.questionOptions.attributeType)
            .toBe('7ef225db-94db-4e40-9dd8-fb121d9dc370');
        expect(nodes[1].question.extras.questionOptions.attributeType)
            .toBe('8d87236c-c2cc-11de-8d13-0010c6dffd0f');
    });

    it('should populate form with existing person attribute', () => {
        let adapter = TestBed.get(PersonAttribuAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        let form = factory.createForm(adultFormSchema);

        let personWithAttributes = {
            attributes: [
                {
                    'display': 'Health Center = 14',
                    'uuid': 'f7a22a74-67b7-40e9-943c-5724c6ea9d2f',
                    'value': {
                        'uuid': '08fec150-1352-11df-a1f1-0026b9348838',
                        'display': 'MTRH Module 3'
                    },
                    'attributeType': {
                        'uuid': '8d87236c-c2cc-11de-8d13-0010c6dffd0f',
                        'display': 'Health Center'
                    }
                },
                {
                    'display': 'Contact Phone Number = 0717055994',
                    'uuid': 'e9741d1d-0094-44e7-a83d-6d66958fd8ae',
                    'value': '0717055994',
                    'attributeType': {
                        'uuid': '72a759a8-1359-11df-a1f1-0026b9348838',
                        'display': 'Contact Phone Number'
                    }
                },
                {
                    'display': 'Health Center = 14',
                    'uuid': 'f7a22a74-67b7-40e9-943c-5724c6ea9d2f',
                    'value': {
                        'uuid': '08fec144-1352-11df-a1f1-0026b9348838',
                        'display': 'MTRH Module 2'
                    },
                    'attributeType': {
                        'uuid': '7ef225db-94db-4e40-9dd8-fb121d9dc370',
                        'display': 'Health Center'
                    }
                }
            ]
        };

        adapter.populateForm(form, personWithAttributes.attributes);

        let nodes: Array<NodeBase> =
            adapter.getPersonAttributeNodes(form.rootNode);

        expect(nodes[0].control.value).toBe('08fec144-1352-11df-a1f1-0026b9348838');
        expect(nodes[0].initialValue).toBe('08fec144-1352-11df-a1f1-0026b9348838');
        expect(nodes[1].control.value).toBe('08fec150-1352-11df-a1f1-0026b9348838');
        expect(nodes[1].initialValue).toBe('08fec150-1352-11df-a1f1-0026b9348838');
    });

    it('should generate person attribute payload attachable to person object', () => {
        let adapter = TestBed.get(PersonAttribuAdapter);
        let factory: FormFactory = TestBed.get(FormFactory);
        let form = factory.createForm(adultFormSchema);

        let personWithAttributes = {
            attributes: [
                {
                    'display': 'Health Center = 14',
                    'uuid': 'f7a22a74-67b7-40e9-943c-5724c6ea9d2f',
                    'value': {
                        'uuid': '08fec150-1352-11df-a1f1-0026b9348838',
                        'display': 'MTRH Module 3'
                    },
                    'attributeType': {
                        'uuid': '8d87236c-c2cc-11de-8d13-0010c6dffd0f',
                        'display': 'Health Center'
                    }
                },
                {
                    'display': 'Contact Phone Number = 0717055994',
                    'uuid': 'e9741d1d-0094-44e7-a83d-6d66958fd8ae',
                    'value': '0717055994',
                    'attributeType': {
                        'uuid': '72a759a8-1359-11df-a1f1-0026b9348838',
                        'display': 'Contact Phone Number'
                    }
                },
                {
                    'display': 'Health Center = 14',
                    'uuid': 'f7a22a74-67b7-40e9-943c-5724c6ea9d2f',
                    'value': {
                        'uuid': '08fec144-1352-11df-a1f1-0026b9348838',
                        'display': 'MTRH Module 2'
                    },
                    'attributeType': {
                        'uuid': '7ef225db-94db-4e40-9dd8-fb121d9dc370',
                        'display': 'Health Center'
                    }
                }
            ]
        };

        adapter.populateForm(form, personWithAttributes.attributes);

        // simulate user input

        let nodes: Array<NodeBase> =
            adapter.getPersonAttributeNodes(form.rootNode);

        nodes[0].control.setValue('new-value');

        // generate payload
        let payload = adapter.generateFormPayload(form);
        expect(payload.length).toBe(1);
        expect(payload[0].attributeType).toBe(nodes[0].question.extras.questionOptions.attributeType);
        expect(payload[0].hydratedObject).toBe('new-value');

        // more user input: no voiding of person attributes check
        nodes[0].control.setValue(null);

        payload = adapter.generateFormPayload(form);
        expect(payload.length).toBe(0);

    });

});
