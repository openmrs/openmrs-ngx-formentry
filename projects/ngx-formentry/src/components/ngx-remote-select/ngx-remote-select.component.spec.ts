import { Renderer2 } from '@angular/core';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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

  // --- ControlValueAccessor contract (relied on by the custom-api-dropdown control) ---

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
});
