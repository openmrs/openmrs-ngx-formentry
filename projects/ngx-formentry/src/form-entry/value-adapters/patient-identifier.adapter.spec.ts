import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormFactory } from '../form-factory/form.factory';
import { FormControlService } from '../form-factory/form-control.service';
import { ValidationFactory } from '../form-factory/validation.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { HidersDisablersFactory } from '../form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-factory/show-messages.factory';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { QuestionFactory } from '../form-factory/question.factory';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import { NodeBase } from '../form-factory/form-node';
import { DebugModeService } from '../services/debug-mode.service';
import { PatientIdentifierAdapter } from './patient-identifier.adapter';

const adultForm = require('../../adult.json');
const mockLocationUuid = "some-location-uuid";
describe('Patient identifier Value Adapter:', () => {
    let adultFormSchema: any;
    beforeEach(() => {
        adultFormSchema = JSON.parse(JSON.stringify(adultForm));
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot({
                defaultLanguage: 'en',
            })],
            providers: [
                FormFactory,
                FormControlService,
                ValidationFactory,
                HidersDisablersFactory,
                PatientIdentifierAdapter,
                ExpressionRunner,
                JsExpressionHelper,
                AlertsFactory,
                QuestionFactory,
                ControlRelationsFactory,
                DebugModeService
            ]
        });
    });

    it('should be injectable', () => {
        const adapter = TestBed.inject(PatientIdentifierAdapter);
        const factory: FormFactory = TestBed.inject(FormFactory);
        expect(adapter).toBeTruthy();
        expect(factory).toBeTruthy();
        expect(adultForm).toBeTruthy();
        const createdForm = factory.createForm(adultFormSchema);
        expect(createdForm).toBeTruthy();
    });

    it('should return all patient identifier nodes', () => {
        const adapter = TestBed.inject(PatientIdentifierAdapter);
        const factory: FormFactory = TestBed.inject(FormFactory);
        const form = factory.createForm(adultFormSchema);

        const nodes: Array<NodeBase> = adapter.getPatientIdentifierNodes(
            form.rootNode
        );
        expect(nodes.length).toBe(1);
        expect(nodes[0].question.extras.questionOptions.identifierType).toBe(
            'dfacd928-0370-4315-99d7-6ec1c9f7ae76'
        );
    });

    it('should generate patient identifier payload attachable to patient object', () => {
        const adapter = TestBed.inject(PatientIdentifierAdapter);
        const factory: FormFactory = TestBed.inject(FormFactory);
        const form = factory.createForm(adultFormSchema);

        const patientIdentifiers = {
            "identifiers": [
                {
                    "uuid": "18d1571b-e4f6-47ec-8809-413248df8dc9",
                    "identifier": "MGGE49",
                    "identifierType": {
                        "uuid": "dfacd928-0370-4315-99d7-6ec1c9f7ae76",
                        "display": "OpenMRS ID"
                    },
                    "location": {
                        "uuid": "6a74c45d-2b1e-431c-a15e-33b4d60c0c6c",
                        "display": "10 Engineer VCT"
                    }
                },
                {
                    "uuid": "270a119d-73bc-43d3-8243-3593dfe4d1d1",
                    "identifier": "0987654223",
                    "identifierType": {
                        "uuid": "05ee9cf4-7242-4a17-b4d4-00f707265c8a",
                        "display": "Unique Patient Number"
                    },
                    "location": null
                }
            ]
        };

        adapter.populateForm(form, patientIdentifiers.identifiers);

        // simulate user input

        const nodes: Array<NodeBase> = adapter.getPatientIdentifierNodes(
            form.rootNode
        );

        // generate payload
        let payload = adapter.generateFormPayload(form, mockLocationUuid);
        expect(payload.length).toBe(1);
        expect(payload[0].patientIdentifier).toBe(
          nodes[0].question.extras.questionOptions.patientIdentifier
        );
        expect(payload[0].identifierType).toBe('dfacd928-0370-4315-99d7-6ec1c9f7ae76');
        expect(payload[0].identifier).toBe('MGGE49');
        expect(payload[0].location).toBe(mockLocationUuid);
        expect(payload[0].preferred).toBeFalse()

        // more user input: no voiding of patient identifier check
        nodes[0].control.setValue(null);

        payload = adapter.generateFormPayload(form,mockLocationUuid);
        expect(payload.length).toBe(0);
    });


});
