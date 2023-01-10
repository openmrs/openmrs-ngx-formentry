import { TestBed } from '@angular/core/testing';
const adultForm = require('../../adult.json');
const adultFormOrders = require('../../mock/orders.json');
import { FormFactory } from '../../form-entry/form-factory/form.factory';
import { FormControlService } from '../../form-entry/form-factory/form-control.service';
import { ValidationFactory } from '../../form-entry/form-factory/validation.factory';
import { QuestionFactory } from '../../form-entry/form-factory/question.factory';
import { OrderValueAdapter } from './order.adapter';
import { HidersDisablersFactory } from '../../form-entry/form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-factory/show-messages.factory';
import { ExpressionRunner } from '../../form-entry/expression-runner/expression-runner';
import { JsExpressionHelper } from '../../form-entry/helpers/js-expression-helper';
import { ControlRelationsFactory } from '../../form-entry/form-factory/control-relations.factory';
import { DebugModeService } from './../services/debug-mode.service';

describe('Orders Value Adapter', () => {
  let formFactory: FormFactory;
  let orderValueAdapter: OrderValueAdapter;

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
        AlertsFactory,
        ExpressionRunner,
        JsExpressionHelper,
        ControlRelationsFactory,
        DebugModeService
      ]
    });

    formFactory = TestBed.inject(FormFactory);
    orderValueAdapter = TestBed.inject(OrderValueAdapter);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const newOrders = [
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

  it('should be defined', () => {
    expect(orderValueAdapter).toBeTruthy();
  });

  describe('generateFormPayload', () => {
    it('should populate form with additional orders and generate payload', () => {
      const form = formFactory.createForm(adultForm);
      orderValueAdapter.formOrderNodes = [];
      orderValueAdapter.populateForm(form, adultFormOrders);

      // setting order provider
      const valueProcessingInfo = { providerUuid: 'provider-uuid' };
      form.valueProcessingInfo = valueProcessingInfo;

      let index = 0;

      for (const order of newOrders) {
        const node = orderValueAdapter.formOrderNodes[0];
        node.createChildNode();
        const value = {};
        value[node.question.key] = order.concept;
        const childNode = node.children[index];
        childNode.control.setValue(value);
        childNode['orderNumber'] = order.orderNumber;
        index++;
      }

      // Confirm controls where populated with data;
      expect(orderValueAdapter.formOrderNodes[0].control.value[0]).toEqual({
        order1: 'a8982474-1350-11df-a1f1-0026b9348838'
      });
      expect(orderValueAdapter.formOrderNodes[0].control.value[1]).toEqual({
        order1: 'a89dda72-1350-11df-a1f1-0026b9348838'
      });

      // Confirm payload was generated;
      const payload = orderValueAdapter.generateFormPayload(form);

      expect(payload[0].concept).toEqual(
        'a89dda72-1350-11df-a1f1-0026b9348838'
      );
      expect(payload[0].type).toEqual('testorder');
      expect(payload[0].careSetting).toEqual(
        '6f0c9a92-6f24-11e3-af88-005056821db0'
      );
      expect(payload[0].orderer).toEqual('provider-uuid');

      // Confirm deleted orders were added to the payload
      expect(payload[1].uuid).toEqual('order-2-uuid');
      expect(payload[1].voided).toEqual(true);
    });
  });

  describe('populateForm', () => {
    it('should populate form with orders from existing payload', () => {
      const form = formFactory.createForm(adultForm);
      orderValueAdapter.populateForm(form, adultFormOrders);
      expect(orderValueAdapter.formOrderNodes[0].control.value[0]).toEqual({
        order1: 'a8982474-1350-11df-a1f1-0026b9348838'
      });
      expect(orderValueAdapter.formOrderNodes[0].control.value[1]).toEqual({
        order1: 'a898fe80-1350-11df-a1f1-0026b9348838'
      });
    });
  });
});
