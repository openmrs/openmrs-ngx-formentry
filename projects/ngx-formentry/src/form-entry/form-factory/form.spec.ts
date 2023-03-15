import { TestBed } from '@angular/core/testing';

import { FormFactory } from './form.factory';
import { QuestionFactory } from './question.factory';
import { FormControlService } from './form-control.service';
import { ValidationFactory } from './validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { ControlRelationsFactory } from './control-relations.factory';

import { SampleSchema } from './sample-schema';

import { Form } from './form';
import { DebugModeService } from './../services/debug-mode.service';
import { TranslateModule } from '@ngx-translate/core';

describe('Form:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        FormFactory,
        QuestionFactory,
        FormControlService,
        ValidationFactory,
        HidersDisablersFactory,
        AlertsFactory,
        ExpressionRunner,
        JsExpressionHelper,
        ControlRelationsFactory,
        DebugModeService
      ]
    });
  });

  it('should be injected', () => {
    const formFactory = TestBed.inject(FormFactory);
    const questionFactory = TestBed.inject(QuestionFactory);
    const schema = new SampleSchema().getSchema();
    const form: Form = new Form(schema, formFactory, questionFactory);

    expect(form).toBeTruthy();
  });
});
