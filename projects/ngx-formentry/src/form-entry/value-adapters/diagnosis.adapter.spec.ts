import {TestBed} from '@angular/core/testing';

const adultForm = require('../../adult.json');
const adultFormOrders = require('../../mock/orders.json');
import {FormFactory} from '../../form-entry/form-factory/form.factory';
import {FormControlService} from '../../form-entry/form-factory/form-control.service';
import {ValidationFactory} from '../../form-entry/form-factory/validation.factory';
import {QuestionFactory} from '../../form-entry/form-factory/question.factory';
import {OrderValueAdapter} from './order.adapter';
import {HidersDisablersFactory} from '../../form-entry/form-factory/hiders-disablers.factory';
import {AlertsFactory} from '../form-factory/show-messages.factory';
import {ExpressionRunner} from '../../form-entry/expression-runner/expression-runner';
import {JsExpressionHelper} from '../../form-entry/helpers/js-expression-helper';
import {ControlRelationsFactory} from '../../form-entry/form-factory/control-relations.factory';
import {DebugModeService} from './../services/debug-mode.service';
import {Diagnosis, DiagnosisValueAdapter} from './diagnosis.adapter';

describe('Diagnosis Value Adapter', () => {
  let formFactory: FormFactory;
  let diagnosisValueAdapter: DiagnosisValueAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        FormFactory,
        FormControlService,
        ValidationFactory,
        QuestionFactory,
        OrderValueAdapter,
        DiagnosisValueAdapter,
        HidersDisablersFactory,
        AlertsFactory,
        ExpressionRunner,
        JsExpressionHelper,
        ControlRelationsFactory,
        DebugModeService
      ]
    });

    formFactory = TestBed.inject(FormFactory);
    diagnosisValueAdapter = TestBed.inject(DiagnosisValueAdapter);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const newDiagnoses: Array<Diagnosis> = [
    {
      uuid: 'diagnosis-1-uuid4',
      display: 'Malarial Fever',
      certainty: 'CONFIRMED',
      rank: 1,
      diagnosis: {
        coded: {
          uuid: '116125AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Malarial Fever',
        },
      },
      voided: false,
    },
    {
      uuid: 'diagnosis-2-uuid5',
      display: 'Puerperal Fever',
      certainty: 'PROVISIONAL',
      rank: 2,
      diagnosis: {
        coded: {
          uuid: '113511AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Puerperal Fever',
        },
      },
      voided: false,
    }
  ];

  it('should be defined', () => {
    expect(diagnosisValueAdapter).toBeTruthy();
  });

  describe('generateFormPayload', () => {
    it('should populate form with additional diagnoses and generate payload', () => {
      const form = formFactory.createForm(adultForm);
      diagnosisValueAdapter.formDiagnosisNodes = [];
      diagnosisValueAdapter.populateForm(form, adultFormOrders.diagnoses);

      let index = 0;

      for (const diagnosis of newDiagnoses) {
        const node = diagnosisValueAdapter.formDiagnosisNodes[diagnosis.rank - 1];
        node.createChildNode();
        const value = {};
        value[node.question.key] = diagnosis.diagnosis.coded.uuid;
        const childNode = node.children[index];
        childNode.control.setValue(value);
        //index++;
      }

      // Confirm controls where populated with data;
      expect(diagnosisValueAdapter.formDiagnosisNodes[0].control.value[0].primaryDiagnosisId).toEqual('116125AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      expect(diagnosisValueAdapter.formDiagnosisNodes[1].control.value[0].secondaryDiagnosisId).toEqual('113511AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

      // Confirm payload was generated;
      const payload = diagnosisValueAdapter.generateFormPayload(form);
      expect(payload.find(p => p.diagnosis.coded == '116125AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')).toBeTruthy();
      expect(payload.find(p => p.diagnosis.coded == '113511AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')).toBeTruthy();

      // Confirm deleted diagnoses were added to the payload
      expect(payload.find(p => p.diagnosis.coded == '5945AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' && p.voided)).toBeTruthy();
    });
  });

  describe('Populate Form', () => {
    it('should populate form with diagnoses from existing payload', () => {
      const form = formFactory.createForm(adultForm);
      diagnosisValueAdapter.populateForm(form, adultFormOrders.diagnoses);

      expect(diagnosisValueAdapter.formDiagnosisNodes.filter(n => {
          return n.control.value.find(v => {
            return v.secondaryDiagnosisId == '5945AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' && v.secondaryDiagnosisId.display == 'FEVER';
          });
        }
      )).toBeTruthy();
    });
  });
});
