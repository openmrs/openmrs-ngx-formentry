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

const expandedSectionSchema: any = {
  name: 'Aria Expanded Test',
  processor: 'EncounterFormProcessor',
  uuid: 'aria-expanded-test-uuid',
  referencedForms: [],
  pages: [
    {
      label: 'Page 1',
      sections: [
        {
          label: 'Expanded Section',
          isExpanded: 'true',
          questions: [
            {
              id: 'q1',
              label: 'Question 1',
              questionOptions: { rendering: 'text' },
              type: 'obs'
            }
          ]
        }
      ]
    }
  ]
};

const collapsedSectionSchema: any = {
  name: 'Aria Collapsed Test',
  processor: 'EncounterFormProcessor',
  uuid: 'aria-collapsed-test-uuid',
  referencedForms: [],
  pages: [
    {
      label: 'Page 1',
      sections: [
        {
          label: 'Collapsed Section',
          questions: [
            {
              id: 'q2',
              label: 'Question 2',
              questionOptions: { rendering: 'text' },
              type: 'obs'
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
  template: `
    <form [formGroup]="form.rootNode.control">
      <ofe-form-renderer
        [node]="form.rootNode"
        [labelMap]="{}"
      ></ofe-form-renderer>
    </form>
  `,
  host: { 'data-testid': 'expanded-section-host' },
  standalone: false
})
class ExpandedSectionHostComponent {
  form: Form;

  constructor(formFactory: FormFactory) {
    this.form = formFactory.createForm(expandedSectionSchema);
  }
}

@Component({
  template: `
    <form [formGroup]="form.rootNode.control">
      <ofe-form-renderer
        [node]="form.rootNode"
        [labelMap]="{}"
      ></ofe-form-renderer>
    </form>
  `,
  host: { 'data-testid': 'collapsed-section-host' },
  standalone: false
})
class CollapsedSectionHostComponent {
  form: Form;

  constructor(formFactory: FormFactory) {
    this.form = formFactory.createForm(collapsedSectionSchema);
  }
}

describe('FormRendererComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        ExpandedSectionHostComponent,
        CollapsedSectionHostComponent
      ],
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

  describe('Section accordion ARIA state', () => {
    /** Returns the accordion heading <button> from the given fixture. */
    function getHeadingButton(f: ComponentFixture<any>): HTMLButtonElement {
      return f.nativeElement.querySelector('.cds--accordion__heading');
    }

    function getContentDiv(f: ComponentFixture<any>): HTMLElement {
      return f.nativeElement.querySelector('.cds--accordion__content');
    }

    it('reports aria-expanded="true" for a section expanded via schema on first render', async () => {
      const f = TestBed.createComponent(ExpandedSectionHostComponent);
      f.autoDetectChanges();
      await f.whenStable();

      const btn = getHeadingButton(f);
      expect(btn).toBeTruthy();
      expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('reports aria-expanded="false" for a section collapsed via schema on first render', async () => {
      const f = TestBed.createComponent(CollapsedSectionHostComponent);
      f.autoDetectChanges();
      await f.whenStable();

      const btn = getHeadingButton(f);
      expect(btn).toBeTruthy();
      expect(btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('updates aria-expanded from "true" to "false" when an expanded section is toggled closed', async () => {
      const f = TestBed.createComponent(ExpandedSectionHostComponent);
      f.autoDetectChanges();
      await f.whenStable();

      const btn = getHeadingButton(f);
      expect(btn.getAttribute('aria-expanded')).toBe('true');

      btn.click();
      await f.whenStable();

      expect(btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('updates aria-expanded from "false" to "true" when a collapsed section is toggled open', async () => {
      const f = TestBed.createComponent(CollapsedSectionHostComponent);
      f.autoDetectChanges();
      await f.whenStable();

      const btn = getHeadingButton(f);
      expect(btn.getAttribute('aria-expanded')).toBe('false');

      btn.click();
      await f.whenStable();

      expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-hidden="false" on the content div when section is expanded', async () => {
      const f = TestBed.createComponent(ExpandedSectionHostComponent);
      f.autoDetectChanges();
      await f.whenStable();

      const content = getContentDiv(f);
      expect(content.getAttribute('aria-hidden')).toBe('false');
    });

    it('sets aria-hidden="true" on the content div when section is collapsed', async () => {
      const f = TestBed.createComponent(CollapsedSectionHostComponent);
      f.autoDetectChanges();
      await f.whenStable();

      const content = getContentDiv(f);
      expect(content.getAttribute('aria-hidden')).toBe('true');
    });

    it('toggles aria-hidden on the content div in both directions', async () => {
      const f = TestBed.createComponent(ExpandedSectionHostComponent);
      f.autoDetectChanges();
      await f.whenStable();

      const btn = getHeadingButton(f);
      const content = getContentDiv(f);
      expect(content.getAttribute('aria-hidden')).toBe('false');
      btn.click();
      await f.whenStable();
      expect(content.getAttribute('aria-hidden')).toBe('true');
      btn.click();
      await f.whenStable();
      expect(content.getAttribute('aria-hidden')).toBe('false');
    });
  });
});

