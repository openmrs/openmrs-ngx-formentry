import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { HistoricalValueDirective } from './directives/historical-value-directive';
import { HistoricalFieldHelperService } from './helpers/historical-field-helper-service';
import { SelectModule } from '../components/select';
import { AfeNgSelectComponent } from '../components/afe-ng-select.component';
import { HidersDisablersFactory } from './form-factory/hiders-disablers.factory';
import { ExpressionRunner } from './expression-runner/expression-runner';
import { JsExpressionHelper } from './helpers/js-expression-helper';
import { FormSchemaCompiler } from './services/form-schema-compiler.service';
import { FormFactory } from './form-factory/form.factory';
import { QuestionFactory } from './form-factory/question.factory';
import { ControlRelationsFactory } from './form-factory/control-relations.factory';
import { ObsPayloadFactoryService } from './services/obs-payload-factory.service';
import { EncounterAdapter, PersonAttribuAdapter } from './value-adapters';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, SelectModule],
    declarations: [FormRendererComponent, AfeNgSelectComponent, HistoricalValueDirective],
    providers: [
        FormBuilder,
        FormControlService,
        ValidationFactory,
        HidersDisablersFactory,
        ExpressionRunner,
        JsExpressionHelper,
        HistoricalFieldHelperService,
        FormSchemaCompiler,
        FormFactory,
        QuestionFactory,
        ValidationFactory,
        ControlRelationsFactory,
        ObsPayloadFactoryService,
        EncounterAdapter,
        PersonAttribuAdapter
    ],
    exports: [FormRendererComponent]
})
export class FormEntryModule {

    constructor(public appRef: ApplicationRef) {

    }
    hmrOnInit(store) {
        console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
