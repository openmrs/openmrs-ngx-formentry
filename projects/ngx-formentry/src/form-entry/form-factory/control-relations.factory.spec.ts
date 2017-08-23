import { TestBed } from '@angular/core/testing';
import { ControlRelationsFactory } from './control-relations.factory';
import { FormFactory } from './form.factory';
import { NodeBase } from './form-node';
import { AfeFormControl, AfeFormArray } from '../../abstract-controls-extension/control-extensions';
import { FormControlService } from './form-control.service';
import { SampleSchema } from './sample-schema';

import { QuestionFactory } from './question.factory';
import { ValidationFactory } from './validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { DebugModeService } from './../services/debug-mode.service';
import { CookieService, CookieOptions } from 'angular2-cookie/core';



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
                DebugModeService,
                CookieService,
                { provide: CookieOptions, useValue: {} }
            ]
        });
    });

    it('should be defined', () => {
        let factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);
        expect(factory).toBeTruthy();
    });

    it('should add relations to control', () => {

      let factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);

      let control = new AfeFormControl();
      let related = new AfeFormControl();

      expect(control.controlRelations.relations.length).toBe(0);
      factory.addRelationToControl(control, related);
      expect(control.controlRelations.relations.length).toBe(1);

    });

    it('should build control relations', () => {

      let factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);

      let testSchema = new SampleSchema().getSchema();

      let formFactory: FormFactory = TestBed.get(FormFactory);

      let createdForm = formFactory.createForm(testSchema);

      factory.buildRelations(createdForm.rootNode);

      let controlStore: any = factory.mapControlIds(createdForm.rootNode, {});

      expect(Object.keys(controlStore).length > 0).toBe(true);

      let hasRelations = false;

      let keys = Object.keys(controlStore);
       keys.forEach(key => {
         let nodeBase: NodeBase = controlStore[key];
         if ( (nodeBase.control as AfeFormControl | AfeFormArray).controlRelations.relations.length > 0 ) {
           hasRelations = true;
         }
       });
      expect(hasRelations).toBe(true);
    });
});
