import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormEntryModule } from 'projects/ngx-formentry/src/public_api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// The custom control question in adult-1.6.json lazy-loads
// assets/web-components.bundled.js. The bundle registers the element
// asynchronously, so poll until it has rendered.
function waitForElement<T extends Element>(
  query: () => T | null,
  timeoutMs = 5000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const poll = () => {
      const element = query();
      if (element) {
        resolve(element);
      } else if (Date.now() - startedAt > timeoutMs) {
        reject(new Error('Timed out waiting for the custom control to load'));
      } else {
        setTimeout(poll, 50);
      }
    };
    poll();
  });
}

describe('Custom control web components', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let nativeEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        FormEntryModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // The custom control is created by *axLazyElementDynamic only after its
    // script's async load event, so change detection must run automatically
    // rather than via a single manual detectChanges().
    fixture.autoDetectChanges();
    nativeEl = fixture.debugElement.nativeElement;
  });

  it('loads the bundled web components and propagates the selected value into the form', async () => {
    const yesButton = await waitForElement(() =>
      nativeEl.querySelector<HTMLButtonElement>('afe-content-switcher button')
    );
    expect(yesButton.textContent).toContain('yes');
    expect(yesButton.getAttribute('aria-pressed')).toBe('false');

    yesButton.click();

    // The switcher re-renders its buttons on selection, so re-query
    // rather than asserting against the detached pre-click button.
    const selectedButton = nativeEl.querySelector<HTMLButtonElement>(
      'afe-content-switcher button'
    );
    expect(selectedButton.getAttribute('aria-pressed')).toBe('true');

    const node = component.form.searchNodeByQuestionId('customCon')[0];
    expect(node.control.value).toBe('8b715fed-97f6-4e38-8f6a-c167a42f8923');
  });
});
