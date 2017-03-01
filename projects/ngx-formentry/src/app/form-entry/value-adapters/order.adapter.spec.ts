
import { TestBed, inject } from '@angular/core/testing';
const adultForm = require('../../adult');
const adultFormOrders = require('../../mock/orders');
import { FormFactory } from '../../form-entry/form-factory/form.factory';
import { FormControlService } from '../../form-entry/form-factory/form-control.service';
import { ValidationFactory } from '../../form-entry/form-factory/validation.factory';
import { QuestionFactory } from '../../form-entry/form-factory/question.factory';
import { OrderValueAdapter } from './order.adapter';
import { HidersDisablersFactory } from '../../form-entry/form-factory/hiders-disablers.factory';
import { ExpressionRunner } from '../../form-entry/expression-runner/expression-runner';
import { JsExpressionHelper } from '../../form-entry/helpers/js-expression-helper';
import { ControlRelationsFactory } from '../../form-entry/form-factory/control-relations.factory';


describe('Orders Value Adapter', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                FormFactory,
                FormControlService,
                ValidationFactory,
                QuestionFactory,
                OrderValueAdapter,
                HidersDisablersFactory,
                ExpressionRunner,
                JsExpressionHelper,
                ControlRelationsFactory

            ]
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    let newOrders = [
        {
            uuid: 'order-1-uuid4',
            orderNumber: 'ORD-13738',
            concept: 'a8982474-1350-11df-a1f1-0026b9348838'
        },
        {
            uuid: 'order-1-uuid5',
            orderNumber: 'ORD-13739',
            concept: 'a89dda72-1350-11df-a1f1-0026b9348838'
        }
    ];

    it('should be defined',
        inject([OrderValueAdapter], (s: OrderValueAdapter) => {
            expect(s).toBeTruthy();

        })
    );



    describe('generateFormPayload', () => {
        it('should populate form with additional orders and generate payload', inject([OrderValueAdapter, FormFactory],
            (s: OrderValueAdapter, f: FormFactory) => {
                let form = f.createForm(adultForm);
                s.formOrderNodes = [];
                s.populateForm(form, adultFormOrders);

                // setting order provider
                let valueProcessingInfo = { providerUuid: 'provider-uuid' };
                form.valueProcessingInfo = valueProcessingInfo;

                let index = 0;
                for (let order of newOrders) {
                    let node = s.formOrderNodes[0];
                    node.createChildNode();
                    let value = {};
                    value[node.question.key] = order.concept;
                    let childNode = node.children[index];
                    childNode.control.setValue(value);
                    childNode['orderNumber'] = order.orderNumber;
                    index++;
                }

                // Confirm controls where populated with data;
                expect(s.formOrderNodes[0].control.value[0]).toEqual({ order1: 'a8982474-1350-11df-a1f1-0026b9348838' });
                expect(s.formOrderNodes[0].control.value[1]).toEqual({ order1: 'a89dda72-1350-11df-a1f1-0026b9348838' });

                // Confirm payload was generated;
                let payload = s.generateFormPayload(form);

                expect(payload[0].concept).toEqual('a89dda72-1350-11df-a1f1-0026b9348838');
                expect(payload[0].type).toEqual('testorder');
                expect(payload[0].careSetting).toEqual('6f0c9a92-6f24-11e3-af88-005056821db0');
                expect(payload[0].orderer).toEqual('provider-uuid');

                // Confirm deleted orders were added to the payload
                expect(payload[1].uuid).toEqual('order-2-uuid');
                expect(payload[1].voided).toEqual(true);

            }));
    });

    describe('populateForm', () => {
        it('should populate form with orders from existing payload', inject([OrderValueAdapter, FormFactory],
            (s: OrderValueAdapter, f: FormFactory) => {
                let form = f.createForm(adultForm);
                s.populateForm(form, adultFormOrders);
                expect(s.formOrderNodes[0].control.value[0]).toEqual({ order1: 'a8982474-1350-11df-a1f1-0026b9348838' });
                expect(s.formOrderNodes[0].control.value[1]).toEqual({ order1: 'a898fe80-1350-11df-a1f1-0026b9348838' });
            }));

    });
});
