import { TestBed, waitForAsync } from '@angular/core/testing';

import moment from 'moment';
import { TranslateModule } from '@ngx-translate/core';

import { FormFactory } from '../form-factory/form.factory';
import { FormControlService } from '../form-factory/form-control.service';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from '../form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-factory/show-messages.factory';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import { QuestionFactory } from '../form-factory/question.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { DebugModeService } from '../services/debug-mode.service';
import { EncounterAdapter } from '../value-adapters/encounter.adapter';
import { ObsValueAdapter } from '../value-adapters/obs.adapter';
import { OrderValueAdapter } from '../value-adapters/order.adapter';
import { DiagnosisValueAdapter } from '../value-adapters/diagnosis.adapter';
import { ObsAdapterHelper } from '../value-adapters/obs-adapter-helper';
import { ArrayNode } from '../form-factory/form-node';

import adultForm from '../../adult.json';
import expectedPayload from './fixtures/adult-encounter-payload.golden.json';

/**
 * Golden-master test for the schema to payload transform that every consumer
 * relies on. It freezes the whole generated encounter payload against a
 * committed fixture, so any unintended drift fails. Regenerate the fixture (see
 * the note in the test) when a payload change is intentional.
 */
describe('Golden master: schema -> encounter payload', () => {
  let schema: any;

  beforeEach(
    waitForAsync(() => {
      schema = JSON.parse(JSON.stringify(adultForm));
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
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

  function buildPayload() {
    const adapter = TestBed.inject(EncounterAdapter);
    const factory: FormFactory = TestBed.inject(FormFactory);
    const form = factory.createForm(schema);

    form.valueProcessingInfo = {
      patientUuid: 'patient-uuid',
      visitUuid: 'visit-uuid',
      encounterTypeUuid: 'encounter-type-uuid',
      formUuid: 'form-uuid',
      encounterUuid: 'encounter-uuid',
      providerUuid: 'provider-uuid',
      utcOffset: '+0300',
      locationUuid: 'location-uuid'
    };

    // Encounter-level fields (datetime, provider, location)
    const encounterNodes = adapter.getEncounterNodes(form.rootNode);
    encounterNodes[0].control.setValue(
      moment.parseZone('2016-11-23T11:32:54+0000').toDate()
    );
    encounterNodes[1].control.setValue('provider-uuid');
    encounterNodes[2].control.setValue('location-uuid');

    // A coded obs
    form.searchNodeByQuestionId('onArt')[0].control.setValue(
      'a899b35c-1350-11df-a1f1-0026b9348838'
    );
    // A numeric obs
    form.searchNodeByQuestionId('height')[0].control.setValue(180);
    // A free-text obs
    form
      .searchNodeByQuestionId('hpiText')[0]
      .control.setValue('Golden master history of present illness.');

    // An order
    const orderNode = form.searchNodeByQuestionId('order1')[0] as ArrayNode;
    const createdOrder = orderNode.createChildNode();
    createdOrder.children['order1'].control.setValue(
      'a8982474-1350-11df-a1f1-0026b9348838'
    );

    // A diagnosis
    const primaryDiagnosisNode = form.searchNodeByQuestionId(
      'primaryDiagnosisId'
    )[0] as ArrayNode;
    primaryDiagnosisNode.createChildNode();
    const diagnosisChild = primaryDiagnosisNode.children[0];
    const diagnosisValue = {};
    diagnosisValue[primaryDiagnosisNode.question.key] =
      '116125AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    diagnosisChild.control.setValue(diagnosisValue);

    return adapter.generateFormPayload(form);
  }

  it('produces the expected payload for a representative set of field values', () => {
    const payload = buildPayload();

    // To regenerate the golden fixture after an intentional change, log the
    // payload here and copy it into fixtures/adult-encounter-payload.golden.json:
    // console.log(JSON.stringify(payload, null, 2));

    expect(payload).toEqual(expectedPayload as any);
  });
});
