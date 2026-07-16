import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NgxRemoteSelectModule } from './ngx-remote-select.module';

import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import { RemoteSelectComponent } from './ngx-remote-select.component';

describe('RemoteSelectComponent', () => {
  const createComponent = () =>
    new RemoteSelectComponent(
      {} as Renderer2,
      { instant: (key: string) => key } as TranslateService
    );

  const createDataSource = (): jasmine.SpyObj<DataSource> => {
    const dataSource = jasmine.createSpyObj<DataSource>('DataSource', [
      'searchOptions',
      'resolveSelectedValue',
      'fileUpload',
      'fetchFile'
    ]);
    dataSource.searchOptions.and.returnValue(of([]));
    dataSource.resolveSelectedValue.and.returnValue(
      of({ value: 'diagnosis-uuid', label: 'Diagnosis' })
    );
    return dataSource;
  };

  // --- data source options plumbing ---

  it('passes control-specific options to searches on a shared data source', () => {
    const dataSource = createDataSource();
    const firstOptions = { conceptSourceUuid: 'source-a' };
    const secondOptions = { conceptSourceUuid: 'source-b' };
    const firstComponent = createComponent();
    const secondComponent = createComponent();

    firstComponent.dataSource = dataSource;
    firstComponent.dataSourceOptions = firstOptions;
    firstComponent.ngOnInit();
    secondComponent.dataSource = dataSource;
    secondComponent.dataSourceOptions = secondOptions;
    secondComponent.ngOnInit();

    expect(dataSource.searchOptions).toHaveBeenCalledWith('', firstOptions);
    expect(dataSource.searchOptions).toHaveBeenCalledWith('', secondOptions);
  });

  it('passes control-specific options when resolving a selected value', () => {
    const dataSource = createDataSource();
    const options = { conceptSourceUuid: 'source-a' };
    const component = createComponent();
    component.dataSource = dataSource;
    component.dataSourceOptions = options;

    component.writeValue('diagnosis-uuid');

    expect(dataSource.resolveSelectedValue).toHaveBeenCalledWith(
      'diagnosis-uuid',
      options
    );
  });

  it('uses explicit empty options instead of shared data source options', () => {
    const dataSource = createDataSource();
    dataSource.dataSourceOptions = { conceptSourceUuid: 'shared-source' };
    const component = createComponent();
    component.dataSource = dataSource;
    component.dataSourceOptions = {};

    component.ngOnInit();

    expect(dataSource.searchOptions).toHaveBeenCalledWith('', {});
  });

  it('falls back to data source options when no input is provided', () => {
    const dataSource = createDataSource();
    const options = { concept: 'concept-uuid' };
    dataSource.dataSourceOptions = options;
    const component = createComponent();
    component.dataSource = dataSource;

    component.ngOnInit();

    expect(dataSource.searchOptions).toHaveBeenCalledWith('', options);
  });

  // --- ControlValueAccessor contract ---

  it('creates an instance', () => {
    expect(createComponent()).toBeTruthy();
  });

  it('propagates the selected value to the parent form control', () => {
    const component = createComponent();
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);

    component.selected('provider-uuid');

    expect(onChange).toHaveBeenCalledWith('provider-uuid');
  });

  it('marks the control as touched on selection', () => {
    const component = createComponent();
    const onTouched = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouched);

    component.selected('provider-uuid');

    expect(onTouched).toHaveBeenCalled();
  });

  it('resolves and displays a prepopulated value on writeValue', () => {
    const dataSource = createDataSource();
    const component = createComponent();
    component.dataSource = dataSource;

    component.writeValue('diagnosis-uuid');

    const resolved = { value: 'diagnosis-uuid', label: 'Diagnosis' };
    expect(dataSource.resolveSelectedValue).toHaveBeenCalled();
    expect(component.items).toEqual([resolved] as any);
    expect(component.selectedRemoteOptions).toEqual(resolved as any);
  });

  it('does not resolve when writeValue receives an empty value', () => {
    const dataSource = createDataSource();
    const component = createComponent();
    component.dataSource = dataSource;

    component.writeValue('');

    expect(dataSource.resolveSelectedValue).not.toHaveBeenCalled();
  });

  it('disables the inner control via setDisabledState', () => {
    const component = createComponent();

    component.setDisabledState(true);
    expect(component.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });

  // --- error state: request failures are distinguishable from "no matches" ---

  it('flags a failed initial load instead of presenting it as no matches', () => {
    const dataSource = createDataSource();
    dataSource.searchOptions.and.returnValue(
      throwError(() => new Error('endpoint unreachable'))
    );
    const component = createComponent();
    component.dataSource = dataSource;
    component.ngOnInit();

    let emitted: any;
    component.remoteOptions$.subscribe((options) => (emitted = options));

    expect(component.errorLoading).toBe(true);
    expect(emitted).toEqual([]);
  });

  it('clears the error flag when a load succeeds', () => {
    const dataSource = createDataSource();
    const component = createComponent();
    component.dataSource = dataSource;
    component.errorLoading = true;
    component.ngOnInit();

    component.remoteOptions$.subscribe();

    expect(component.errorLoading).toBe(false);
  });

  it('flags a failed saved-value resolution', () => {
    const dataSource = createDataSource();
    dataSource.resolveSelectedValue.and.returnValue(
      throwError(() => new Error('endpoint unreachable'))
    );
    const component = createComponent();
    component.dataSource = dataSource;

    component.writeValue('saved-uuid');

    expect(component.errorLoading).toBe(true);
    expect(component.loading).toBe(false);
  });
});

describe('RemoteSelectComponent template (error state)', () => {
  const dataSourceStub: any = {
    searchOptions: () => of([]),
    resolveSelectedValue: () => of(undefined)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxRemoteSelectModule, TranslateModule.forRoot()]
    });
  });

  it('renders the load-failure message as an alert and hides it on recovery', () => {
    const fixture = TestBed.createComponent(RemoteSelectComponent);
    fixture.componentInstance.dataSource = dataSourceStub;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[role="alert"]'))).toBeNull();

    fixture.componentInstance.errorLoading = true;
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.css('[role="alert"]'));
    expect(alert).not.toBeNull();
    expect(alert.nativeElement.textContent).toContain('errorLoadingResults');
    expect(
      alert.nativeElement.classList.contains('ofe-remote-select-error')
    ).toBe(true);

    fixture.componentInstance.errorLoading = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[role="alert"]'))).toBeNull();
  });
});
