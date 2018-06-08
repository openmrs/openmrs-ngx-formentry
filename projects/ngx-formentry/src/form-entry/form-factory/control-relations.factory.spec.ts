import { TestBed } from '@angular/core/testing';
import { ControlRelationsFactory } from './control-relations.factory';
import { FormFactory } from './form.factory';
import { NodeBase } from './form-node';
import { AfeFormControl, AfeFormArray } from '../../abstract-controls-extension';
import { FormControlService } from './form-control.service';
import { SampleSchema } from './sample-schema';

import { QuestionFactory } from './question.factory';
import { ValidationFactory } from './validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { DebugModeService } from './../services/debug-mode.service';



describe('Control Relations Factory:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ControlRelationsFactory,
                FormFactory,
                FormControlService,
                QuestionFactory,
                ValidationFactory,
                HidersDisablersFactory,
                ExpressionRunner,
                JsExpressionHelper,
                AlertsFactory,
                DebugModeService
            ]
        });
    });

    it('should be defined', () => {
        const factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);
        expect(factory).toBeTruthy();
    });

    it('should add relations to control', () => {

      const factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);

      const control = new AfeFormControl();
      const related = new AfeFormControl();

      expect(control.controlRelations.relations.length).toBe(0);
      factory.addRelationToControl(control, related);
      expect(control.controlRelations.relations.length).toBe(1);

    });

    it('should build control relations', () => {

      const factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);

      const testSchema = new SampleSchema().getSchema();

      const formFactory: FormFactory = TestBed.get(FormFactory);

      const createdForm = formFactory.createForm(testSchema);

      factory.buildRelations(createdForm.rootNode);

      const controlStore: any = factory.mapControlIds(createdForm.rootNode, {});

      expect(Object.keys(controlStore).length > 0).toBe(true);

      let hasRelations = false;

      const keys = Object.keys(controlStore);
       keys.forEach(key => {
         const nodeBase: NodeBase = controlStore[key];
         if ( (nodeBase.control as AfeFormControl | AfeFormArray).controlRelations.relations.length > 0 ) {
           hasRelations = true;
         }
       });
      expect(hasRelations).toBe(true);
    });
});
