import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { DebugModeService } from '../form-entry/services/debug-mode.service';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

import { FormErrorsService } from './services/form-errors.service';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ErrorRendererComponent } from './error-renderer/error-renderer.component';
import { HistoricalValueDirective } from './directives/historical-value.directive';
import { CollapseDirective } from './directives/collapse.directive';
import { HistoricalFieldHelperService } from './helpers/historical-field-helper-service';
import { NumberInputModule } from '../components/number-input/number-input.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RemoteFileUploadModule } from '../components/file-upload/file-upload.module';
import { DateTimePickerModule } from '../components/date-time-picker/date-time-picker.module';
import { NgxDateTimePickerModule } from '../components/ngx-datetime-picker/ngx-datetime-picker.module';
import { AfeNgSelectComponent } from '../components/afe-ng-select.component';
import { HidersDisablersFactory } from './form-factory/hiders-disablers.factory';
import { AlertsFactory } from './form-factory/show-messages.factory';
import { ExpressionRunner } from './expression-runner/expression-runner';
import { JsExpressionHelper } from './helpers/js-expression-helper';
import { FormSchemaCompiler } from './services/form-schema-compiler.service';
import { FormFactory } from './form-factory/form.factory';
import { QuestionFactory } from './form-factory/question.factory';
import { ControlRelationsFactory } from './form-factory/control-relations.factory';
import { EncounterAdapter } from './value-adapters/encounter.adapter';
import { PersonAttribuAdapter } from './value-adapters/person-attribute.adapter';
import { OrderValueAdapter } from './value-adapters/order.adapter';
import { DiagnosisValueAdapter } from './value-adapters/diagnosis.adapter';
import { ObsAdapterHelper } from './value-adapters/obs-adapter-helper';
import { ObsValueAdapter } from './value-adapters/obs.adapter';
import { NgxRemoteSelectModule } from '../components/ngx-remote-select/ngx-remote-select.module';
import { AppointmentsOverviewComponent } from '../components/appointments-overview/appointments-overview.component';
import { CheckboxModule } from '../components/check-box/checkbox.module';
import { RadioModule } from '../components/radio-button/radio.module';
import { WorkspaceLauncherModule } from '../components/workspace-launcher/workspace-launcher.module';
import { SharedModule } from '../shared.module';
import { NgxTabSetModule } from '../components/ngx-tabset/modules/ngx-tabset.module';
import { SelectModule as SelectModuleCarbon } from '../components/select/select.module';
import { InputModule } from '../components/input/input.module';
import { CustomControlWrapperModule } from '../components/custom-control-wrapper/custom-control-wrapper..module';
import { CustomComponentWrapperModule } from '../components/custom-component-wrapper/custom-component-wrapper..module';
import { TranslateModule } from '@ngx-translate/core';
import { PatientIdentifierAdapter } from './value-adapters/patient-identifier.adapter';
import { AppointmentAdapter } from './value-adapters/appointment.adapter';
import { MachineLearningComponent } from '../components/machine-learning-button/machine-learning.component';
import { MachineLearningService } from '../components/machine-learning-button/machine-learning.service';
import { PatientIdentifierValidatorDirective } from './directives/patient-identifier.directive';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModuleCarbon,
    NgSelectModule,
    NumberInputModule,
    InputModule,
    DateTimePickerModule,
    NgxRemoteSelectModule,
    // NoopAnimationsModule,
    RemoteFileUploadModule,
    CheckboxModule,
    RadioModule,
    WorkspaceLauncherModule,
    NgxDateTimePickerModule,
    SharedModule,
    CustomControlWrapperModule,
    CustomComponentWrapperModule,
    NgxTabSetModule.forRoot(),
    TranslateModule
  ],
  declarations: [
    FormRendererComponent,
    AfeNgSelectComponent,
    AppointmentsOverviewComponent,
    HistoricalValueDirective,
    ErrorRendererComponent,
    TimeAgoPipe,
    CollapseDirective,
    MachineLearningComponent,
    PatientIdentifierValidatorDirective
  ],
  providers: [
    UntypedFormBuilder,
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
    DiagnosisValueAdapter,
    DebugModeService,
    PatientIdentifierAdapter,
    AppointmentAdapter,
    MachineLearningService
  ],
  exports: [
    FormRendererComponent,
    AfeNgSelectComponent,
    ErrorRendererComponent,
    DateTimePickerModule,
    NgxDateTimePickerModule,
    TranslateModule
  ]
})
export class FormEntryModule {}
