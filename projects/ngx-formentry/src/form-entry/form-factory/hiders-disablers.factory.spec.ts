import { TestBed } from '@angular/core/testing';

import { Disabler } from '../control-hiders-disablers/can-disable';
import { Hider } from '../control-hiders-disablers/can-hide';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { QuestionBase } from '../question-models/question-base';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/control-extensions';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { DebugModeService } from './../services/debug-mode.service';
import { CookieService, CookieOptions } from 'ngx-cookie';

describe('Hiders Disablers Factory:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HidersDisablersFactory,
                ExpressionRunner,
                JsExpressionHelper,
                DebugModeService,
                CookieService,
                { provide: CookieOptions, useValue: {} }
            ]
        });
    });

    it('should be injected', () => {
        let factory: HidersDisablersFactory = TestBed.get(HidersDisablersFactory);
        expect(factory).toBeTruthy();
    });

    it('should return a disabler function', () => {
        let factory: HidersDisablersFactory = TestBed.get(HidersDisablersFactory);

        /* tslint:disable */
        let model: QuestionBase = new QuestionBase({
            type: 'date',
            key: 'control1',
            disable: "control2 === 10 && arrayContains(control3, 'six')"
        });
        /* tslint:enable */

        let control: AfeFormControl = new AfeFormControl();

        control.uuid = 'control1';

        let control2: AfeFormControl = new AfeFormControl();
        control2.uuid = 'control2';
        control2.setValue(10);

        let control3: AfeFormControl = new AfeFormControl();
        control3.uuid = 'control3';
        control3.setValue(['six', 'seven']);

        control.controlRelations.addRelatedControls(control2);
        control.controlRelations.addRelatedControls(control3);

        let disabler: Disabler = factory.getJsExpressionDisabler(model, control);
        control.setDisablingFn(disabler);

        expect(control.disabled).toBe(false);
        control.updateDisabledState();
        expect(control.disabled).toBe(true);

    });

    it('should return a hider function', () => {
        let factory: HidersDisablersFactory = TestBed.get(HidersDisablersFactory);

        /* tslint:disable */
        let model: QuestionBase = new QuestionBase({
            type: 'date',
            key: 'control1',
            hide: "control2 === 10 && arrayContains(control3, 'six')"
        });
        /* tslint:enable */

        let control: AfeFormControl = new AfeFormControl();

        control.uuid = 'control1';

        let control2: AfeFormControl = new AfeFormControl();
        control2.uuid = 'control2';
        control2.setValue(10);

        let control3: AfeFormControl = new AfeFormControl();
        control3.uuid = 'control3';
        control3.setValue(['six', 'seven']);

        control.controlRelations.addRelatedControls(control2);
        control.controlRelations.addRelatedControls(control3);

        let hider: Hider = factory.getJsExpressionHider(model, control);
        control.setHidingFn(hider);

        expect(control.hidden).toBeFalsy();
        expect(control.disabled).toBeFalsy();
        control.updateHiddenState();
        expect(control.hidden).toBe(true);
        expect(control.disabled).toBe(true);

    });
});
