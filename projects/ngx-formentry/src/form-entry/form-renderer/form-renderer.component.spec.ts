import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FormEntryModule } from '../form-entry.module';
import { Form } from '../form-factory/form';
import { FormFactory } from '../form-factory/form.factory';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { WorkspaceLauncherComponent } from '../../components/workspace-launcher/workspace-launcher.component';

const schema: any = {
  name: 'Workspace Launcher Test',
  processor: 'EncounterFormProcessor',
  uuid: 'workspace-launcher-test-uuid',
  referencedForms: [],
  pages: [
    {
      label: 'Test Page',
      sections: [
        {
          label: 'Test Section',
          isExpanded: 'true',
          questions: [
            {
              id: 'orderLauncher',
              label: 'Order drugs:',
              questionOptions: {
                rendering: 'workspace-launcher',
                workspaceName: 'add-drug-order',
                buttonLabel: 'Add +',
                buttonType: 'ghost',
                workspaceProps: { patientUuid: 'test-patient-uuid' }
              }
            }
          ]
        }
      ]
    }
  ]
};

@Component({
  template: `
    <form [formGroup]="form.rootNode.control">
      <ofe-form-renderer
        [node]="form.rootNode"
        [labelMap]="{}"
      ></ofe-form-renderer>
    </form>
  `,
  standalone: false
})
class TestHostComponent {
  form: Form;

  constructor(formFactory: FormFactory) {
    this.form = formFactory.createForm(schema);
  }
}

@Component({
  template: `<form [formGroup]="form.rootNode.control">
    <ofe-form-renderer
      [node]="form.rootNode"
      [labelMap]="{}"
    ></ofe-form-renderer>
  </form>`,
  standalone: false
})
class ReferenceRangeHostComponent {
  form: Form;
  constructor(factory: FormFactory) {
    this.form = factory.createForm({
      name: 'Vitals',
      pages: [
        {
          label: 'Vitals',
          sections: [
            {
              label: 'Vitals',
              isExpanded: 'true',
              questions: [
                {
                  id: 'temperature',
                  label: 'Temperature',
                  type: 'obs',
                  questionOptions: {
                    rendering: 'number'
                  },
                  alert: {
                    useConceptReferenceRange: true,
                    alertWhenExpression: 'myValue >= 40',
                    message: 'Call the clinician'
                  }
                },
                {
                  id: 'pulse',
                  label: 'Pulse',
                  type: 'obs',
                  questionOptions: {
                    rendering: 'number'
                  }
                }
              ]
            }
          ]
        }
      ]
    });
    const control = this.form.searchNodeByQuestionId('temperature')[0].control;
    if (control instanceof AfeFormControl) {
      control.conceptReferenceRange = {
        hiNormal: 37.5,
        hiCritical: 40,
        hiAbsolute: 43,
        units: '°C'
      };
    }
  }
}

describe('Reference range warning rendering', () => {
  it('shows critical severity and units alongside the existing expression alert, defers to absolute-limit errors, then clears both', async () => {
    TestBed.configureTestingModule({
      declarations: [ReferenceRangeHostComponent],
      imports: [
        ReactiveFormsModule,
        FormEntryModule,
        TranslateModule.forRoot()
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', {
      referenceRangeCriticalHigh: 'Critically high (limit: {limit})',
      max: 'Max value should be {max}'
    });
    translate.use('en');
    const fixture = TestBed.createComponent(ReferenceRangeHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const control = fixture.componentInstance.form.searchNodeByQuestionId(
      'temperature'
    )[0].control;
    control.setValue(40);
    fixture.detectChanges();
    const warning: HTMLElement = fixture.nativeElement.querySelector(
      '.reference-range-warning'
    );
    expect(warning.textContent.trim()).toBe('Critically high (limit: 40 °C)');
    expect(warning.classList.contains('critical')).toBe(true);
    expect(warning.parentElement.getAttribute('role')).toBe('status');
    expect(warning.parentElement.id).toMatch(/^reference-range-warning-\d+$/);
    expect(
      fixture.nativeElement
        .querySelector('input#temperatureid')
        .getAttribute('aria-describedby')
    ).toBe(warning.parentElement.id);
    expect(
      fixture.nativeElement
        .querySelector('input#pulseid')
        .hasAttribute('aria-describedby')
    ).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Call the clinician');

    control.setValue(44);
    fixture.detectChanges();
    expect(control.hasError('max')).toBe(true);
    expect(
      fixture.nativeElement.querySelector('.reference-range-warning')
    ).toBeNull();

    control.markAsTouched();
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.error .text-danger')
        .textContent.trim()
    ).toBe('Max value should be 43');
    expect(
      fixture.nativeElement.querySelector('.reference-range-warning')
    ).toBeNull();

    control.setValue(37);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.reference-range-warning')
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector('[role="status"]')
    ).not.toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain(
      'Call the clinician'
    );
  });
});

describe('FormRendererComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        ReactiveFormsModule,
        FormEntryModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.autoDetectChanges();
  });

  it('passes normalized workspaceProps to the workspace launcher', async () => {
    // The tab set activates its first tab in a setTimeout after content
    // init, so wait for the zone to settle before tab content renders.
    await fixture.whenStable();

    const launcher = fixture.debugElement.query(
      By.directive(WorkspaceLauncherComponent)
    );
    expect(launcher).toBeTruthy();
    expect(launcher.componentInstance.additionalProps).toEqual({
      patientUuid: 'test-patient-uuid'
    });
  });
});
