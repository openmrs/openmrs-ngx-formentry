/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions, @typescript-eslint/no-unused-expressions */

import { TestBed, waitForAsync } from '@angular/core/testing';
import { AfeNgSelectComponent } from './afe-ng-select.component';
import { DummyDataSource } from '../form-entry/data-sources/dummy-data-source';

describe('Component: AFE-select-component Unit Tests', () => {
  const dummyDataSource = new DummyDataSource();
  const component = new AfeNgSelectComponent();

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create an instance of Mult select component', () => {
    expect(component).toBeTruthy();
  });

  it('should have required properties', (done) => {
    expect(component.dataSource).toBeUndefined;
    expect(component.multiple).toBeUndefined;
    expect(component.question_options.length).toBe(0);
    expect(component.selected_question_option).toBeUndefined;
    expect(component.subject).toBeUndefined;
    expect(component.extras).toBeUndefined;
    expect(component.errors.length).toBe(0);
    done();
  });

  it('should have all the required functions defined and callable', (done) => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    component.dataSource = dummyDataSource;
    spyOn(component, 'getData').and.callThrough();
    const foundResults = component.getData('k');
    expect(component.getData).toHaveBeenCalled();
    spyOn(component, 'resolveSelectedOption').and.callThrough();
    component.resolveSelectedOption('a8afc8b8-1350-11df-a1f1-0026b9348838');
    expect(component.resolveSelectedOption).toHaveBeenCalled();
    spyOn(component, 'getChangingText').and.callThrough();
    component.getChangingText('k');
    expect(component.getChangingText).toHaveBeenCalled();

    done();
  });
});
