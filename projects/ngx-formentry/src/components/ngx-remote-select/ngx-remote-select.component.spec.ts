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
});
