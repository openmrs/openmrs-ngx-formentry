import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FormEntryModule } from '../form-entry.module';
import { Form } from '../form-factory/form';
import { FormFactory } from '../form-factory/form.factory';
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

describe('FormRendererComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [ReactiveFormsModule, FormEntryModule, TranslateModule.forRoot()],
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
