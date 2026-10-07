import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
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

const workspaceLauncherSchema: any = {
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

const multiPageSchema: any = {
  name: 'Multi Page Test',
  processor: 'EncounterFormProcessor',
  uuid: 'multi-page-test-uuid',
  referencedForms: [],
  pages: [
    {
      label: 'Page 1',
      sections: [
        {
          label: 'Section 1',
          isExpanded: 'true',
          questions: [
            {
              id: 'field1',
              label: 'Field 1',
              questionOptions: { rendering: 'text' }
            }
          ]
        }
      ]
    },
    {
      label: 'Page 2',
      sections: [
        {
          label: 'Section 2',
          isExpanded: 'true',
          questions: [
            {
              id: 'field2',
              label: 'Field 2',
              questionOptions: { rendering: 'text' }
            }
          ]
        }
      ]
    },
    {
      label: 'Page 3',
      sections: [
        {
          label: 'Section 3',
          isExpanded: 'true',
          questions: [
            {
              id: 'field3',
              label: 'Field 3',
              questionOptions: { rendering: 'text' }
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
    this.form = formFactory.createForm(workspaceLauncherSchema);
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
  standalone: false
})
class MultiPageHostComponent {
  form: Form;

  constructor(formFactory: FormFactory) {
    this.form = formFactory.createForm(multiPageSchema);
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
});

describe('FormRendererComponent – tab scrolling (O3-5977)', () => {
  let fixture: ComponentFixture<MultiPageHostComponent>;
  let formRenderer: FormRendererComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MultiPageHostComponent],
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

    fixture = TestBed.createComponent(MultiPageHostComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();

    const rendererDebug = fixture.debugElement.query(
      By.directive(FormRendererComponent)
    );
    formRenderer = rendererDebug.componentInstance;
  });

  it('tabSelected() calls scrollIntoView with block "nearest", not "start"', fakeAsync(() => {
    const mockHeader = document.createElement('h4');
    const scrollSpy = spyOn(mockHeader, 'scrollIntoView');

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === 'div.pane > h4') {
        return mockHeader;
      }
      return null;
    });

    formRenderer.tabSelected(1);
    tick(200); // exceed TAB_SELECTION_DELAY_MS (100)

    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest'
    });
  }));

  it('repeated tab switches do not accumulate scroll offset on the host page', fakeAsync(() => {
    const mockHeader = document.createElement('h4');
    const scrollSpy = spyOn(mockHeader, 'scrollIntoView');

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === 'div.pane > h4') {
        return mockHeader;
      }
      return null;
    });

    // Simulate switching through 3 tabs
    formRenderer.tabSelected(0);
    tick(200);
    formRenderer.tabSelected(1);
    tick(200);
    formRenderer.tabSelected(2);
    tick(200);

    // Every call must use 'nearest' — never 'start'
    expect(scrollSpy).toHaveBeenCalledTimes(3);
    scrollSpy.calls.all().forEach((call) => {
      expect(call.args[0]).toEqual({
        behavior: 'smooth',
        block: 'nearest'
      });
    });

    // window.scrollY should remain unchanged (the host page should not move)
    expect(window.scrollY).toBe(0);
  }));

  it('tabSelected() still invokes scrollIntoView when a section header exists', fakeAsync(() => {
    const mockHeader = document.createElement('h4');
    const scrollSpy = spyOn(mockHeader, 'scrollIntoView');

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === 'div.pane > h4') {
        return mockHeader;
      }
      return null;
    });

    formRenderer.tabSelected(1);
    tick(200);

    expect(scrollSpy).toHaveBeenCalledTimes(1);
  }));

  it('tabSelected() does not throw when no section header is found', fakeAsync(() => {
    spyOn(document, 'querySelector').and.returnValue(null);

    expect(() => {
      formRenderer.tabSelected(1);
      tick(200);
    }).not.toThrow();
  }));

  it('loadPreviousTab() does not modify document.body.scrollTop', () => {
    const scrollTopSetter = jasmine.createSpy('scrollTopSetter');
    const originalDescriptor =
      Object.getOwnPropertyDescriptor(document.body, 'scrollTop') ||
      Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop');

    Object.defineProperty(document.body, 'scrollTop', {
      get: () => 0,
      set: scrollTopSetter,
      configurable: true
    });

    // Start on the second tab so loadPreviousTab has somewhere to go
    formRenderer.activeTab = 1;
    formRenderer.loadPreviousTab();

    expect(formRenderer.activeTab).toBe(0);
    // The removed dead code would have called document.body.scrollTop = 0
    expect(scrollTopSetter).not.toHaveBeenCalled();

    // Restore original descriptor
    if (originalDescriptor) {
      Object.defineProperty(document.body, 'scrollTop', originalDescriptor);
    }
  });

  it('loadNextTab() does not modify document.body.scrollTop', () => {
    const scrollTopSetter = jasmine.createSpy('scrollTopSetter');
    const originalDescriptor =
      Object.getOwnPropertyDescriptor(document.body, 'scrollTop') ||
      Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop');

    Object.defineProperty(document.body, 'scrollTop', {
      get: () => 0,
      set: scrollTopSetter,
      configurable: true
    });

    formRenderer.activeTab = 0;
    formRenderer.loadNextTab();

    expect(formRenderer.activeTab).toBe(1);
    // The removed dead code would have called document.body.scrollTop = 0
    expect(scrollTopSetter).not.toHaveBeenCalled();

    // Restore original descriptor
    if (originalDescriptor) {
      Object.defineProperty(document.body, 'scrollTop', originalDescriptor);
    }
  });
});
