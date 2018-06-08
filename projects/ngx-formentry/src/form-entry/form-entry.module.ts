import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DebugModeService } from '../form-entry/services/debug-mode.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormErrorsService } from './services';
import { HammerConfig } from './helpers/hammer-config';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ErrorRendererComponent } from './error-renderer/error-renderer.component';
import { HistoricalValueDirective } from './directives/historical-value-directive';
import { HistoricalFieldHelperService } from './helpers/historical-field-helper-service';
import { SelectModule } from '../components/select';
import { RemoteFileUploadModule } from '../components/file-upload/file-upload.module';
import { DateTimePickerModule } from '../components/date-time-picker';
import { AfeNgSelectComponent } from '../components/afe-ng-select.component';
import { HidersDisablersFactory } from './form-factory/hiders-disablers.factory';
import { AlertsFactory } from './form-factory/show-messages.factory';
import { ExpressionRunner } from './expression-runner/expression-runner';
import { JsExpressionHelper } from './helpers/js-expression-helper';
import { FormSchemaCompiler } from './services/form-schema-compiler.service';
import { FormFactory } from './form-factory/form.factory';
import { QuestionFactory } from './form-factory/question.factory';
import { ControlRelationsFactory } from './form-factory/control-relations.factory';
import {
    EncounterAdapter, PersonAttribuAdapter, OrderValueAdapter,
    ObsValueAdapter, ObsAdapterHelper
} from './value-adapters';
import { RemoteSelectModule } from '../components/remote-select/remote-select.module';
import { DataSources } from './data-sources/data-sources';
import {
    AppointmentsOverviewComponent
} from '../components/appointments-overview/appointments-overview.component';
import { EncounterViewerModule } from '../encounter-viewer/encounter-viewer.module';
import { CheckboxModule } from '../components/check-box/checkbox.module';
@NgModule({
    imports: [CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CollapseModule,
        SelectModule,
        DateTimePickerModule,
        RemoteSelectModule,
        RemoteFileUploadModule,
        EncounterViewerModule,
        CheckboxModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule
    ],
    declarations: [
        FormRendererComponent,
        AfeNgSelectComponent,
        AppointmentsOverviewComponent,
        HistoricalValueDirective,
        ErrorRendererComponent
    ],
    providers: [
        FormBuilder,
        FormControlService,
        FormErrorsService,
        ValidationFactory,
        HidersDisablersFactory,
        AlertsFactory,
        ExpressionRunner,
        JsExpressionHelper,
        HistoricalFieldHelperService,
        FormSchemaCompiler,
        FormFactory,
        QuestionFactory,
        ValidationFactory,
        ControlRelationsFactory,
        ObsAdapterHelper,
        ObsValueAdapter,
        EncounterAdapter,
        PersonAttribuAdapter,
        OrderValueAdapter,
        DebugModeService,
        DataSources
    ],
    exports: [FormRendererComponent, AfeNgSelectComponent,
        ErrorRendererComponent, DateTimePickerModule, EncounterViewerModule]
})
export class FormEntryModule {

}
