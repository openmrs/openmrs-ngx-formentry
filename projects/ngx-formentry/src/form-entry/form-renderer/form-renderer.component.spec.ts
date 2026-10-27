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
import { FormRendererComponent } from './form-renderer.component';
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
              id: 'markDown',
              questionOptions: { rendering: 'markdown' },
              value: ['- bulleted item\n- second item\n\n1. first\n2. second']
            },
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

  it('renders markdown unordered and ordered lists with markers', async () => {
    await fixture.whenStable();

    const unorderedList = fixture.nativeElement.querySelector(
      '.afe-markdown ul'
    );
    const orderedList = fixture.nativeElement.querySelector('.afe-markdown ol');
    const listItem = unorderedList.querySelector('li');

    expect(unorderedList).toBeTruthy();
    expect(orderedList).toBeTruthy();
    expect(getComputedStyle(unorderedList).listStyleType).toBe('disc');
    expect(getComputedStyle(orderedList).listStyleType).toBe('decimal');
    expect(getComputedStyle(listItem).display).toBe('list-item');
  });
});

const section = (id: string, label: string) => ({
  label: `${label} Section`,
  isExpanded: 'true',
  questions: [
    {
      id,
      label,
      type: 'obs',
      questionOptions: { rendering: 'text', concept: `${id}-concept` }
    }
  ]
});

const navSchema: any = {
  name: 'Nav Skip Hidden Pages',
  processor: 'EncounterFormProcessor',
  uuid: 'nav-skip-hidden-uuid',
  pages: [
    { label: 'Page One', sections: [section('p1q', 'Page One')] },
    {
      label: 'Hidden Page',
      hide: { hideWhenExpression: 'true' },
      sections: [section('p2q', 'Hidden Page')]
    },
    { label: 'Page Three', sections: [section('p3q', 'Page Three')] }
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
class NavHostComponent {
  form: Form;

  constructor(formFactory: FormFactory) {
    this.form = formFactory.createForm(navSchema);
  }
}

describe('FormRendererComponent page navigation (hidden pages)', () => {
  let fixture: ComponentFixture<NavHostComponent>;
  let renderer: FormRendererComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NavHostComponent],
      imports: [ReactiveFormsModule, FormEntryModule, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    fixture = TestBed.createComponent(NavHostComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();

    // The root form renderer is the first FormRendererComponent instance.
    renderer = fixture.debugElement.query(
      By.directive(FormRendererComponent)
    ).componentInstance;
  });

  it('reports the hidden middle page as hidden', () => {
    expect(renderer.isPageHidden(0)).toBe(false);
    expect(renderer.isPageHidden(1)).toBe(true);
    expect(renderer.isPageHidden(2)).toBe(false);
  });

  it('next skips the hidden page', () => {
    // from Page One (0) the next visible page is Page Three (2), skipping (1)
    expect(renderer.nextVisiblePageIndex(0)).toBe(2);
    // nothing visible after Page Three
    expect(renderer.nextVisiblePageIndex(2)).toBe(-1);
  });

  it('previous skips the hidden page', () => {
    // from Page Three (2) the previous visible page is Page One (0)
    expect(renderer.previousVisiblePageIndex(2)).toBe(0);
    // nothing visible before Page One
    expect(renderer.previousVisiblePageIndex(0)).toBe(-1);
  });
});
