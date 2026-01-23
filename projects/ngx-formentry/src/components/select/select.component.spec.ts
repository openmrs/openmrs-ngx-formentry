import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';

@Component({
    template: `
    <ofe-select (valueChange)="onChange($event)" [(ngModel)]="model">
      <option value="option1">Option 1</option>
    </ofe-select>
  `,
    standalone: false
})
class SelectComponentTest {
  model = null;
  value = null;

  onChange(event) {
    this.value = event;
  }
}

describe('SelectComponent', () => {
  let fixture, wrapper, element;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, SelectComponentTest],
      imports: [FormsModule]
    });
  });

  it('should work', () => {
    fixture = TestBed.createComponent(SelectComponent);
    expect(fixture.componentInstance instanceof SelectComponent).toBe(true);
  });

  it('should call onChange on change select and propagate the change back to the form', () => {
    fixture = TestBed.createComponent(SelectComponentTest);
    wrapper = fixture.componentInstance;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.cds--select-input'));
    spyOn(wrapper, 'onChange').and.callThrough();
    de.triggerEventHandler('change', { target: { value: 'option1' } });
    fixture.detectChanges();
    expect(wrapper.onChange).toHaveBeenCalled();
    expect(wrapper.model).toBe('option1');
    expect(wrapper.value).toBe('option1');
    expect(de.nativeElement.textContent).toContain('Option 1');
  });

  it('should set label to test', () => {
    fixture = TestBed.overrideComponent(SelectComponentTest, {
      set: {
        template: `<ofe-select label="test"></ofe-select>`
      }
    }).createComponent(SelectComponentTest);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('ofe-select')).nativeElement;
    expect(element.querySelector('.cds--label').textContent).toEqual('test');
  });

  it('should set helperText to test', () => {
    fixture = TestBed.overrideComponent(SelectComponentTest, {
      set: {
        template: `<ofe-select helperText="test"></ofe-select>`
      }
    }).createComponent(SelectComponentTest);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('ofe-select')).nativeElement;
    expect(
      element.querySelector('.cds--form__helper-text').textContent
    ).toEqual('test');
  });

  it('should set display to inline', () => {
    fixture = TestBed.overrideComponent(SelectComponentTest, {
      set: {
        template: `<ofe-select display="inline"></ofe-select>`
      }
    }).createComponent(SelectComponentTest);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('ofe-select')).nativeElement;
    expect(element.querySelector('.cds--select--inline')).toBeTruthy();
  });

  it('should set option to disabled', () => {
    fixture = TestBed.overrideComponent(SelectComponentTest, {
      set: {
        template: `
                <ofe-select>
                    <option value="option1" disabled> Option 1 </option>
                </ofe-select>`
      }
    }).createComponent(SelectComponentTest);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('ofe-select')).nativeElement;
    expect(element.querySelector('option').disabled).toBe(true);
  });

  it('should display ibm-icon-warning-filled16 and display invalid text', () => {
    fixture = TestBed.overrideComponent(SelectComponentTest, {
      set: {
        template: `<ofe-select [invalid]=true invalidText="test"></ofe-select>`
      }
    }).createComponent(SelectComponentTest);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('ofe-select')).nativeElement;
    expect(
      element.querySelector('.cds--text-input__invalid-icon')
    ).toBeTruthy();
    expect(element.querySelector('.cds--form-requirement').textContent).toEqual(
      'test'
    );
  });

  it('should set class cds--skeleton', () => {
    fixture = TestBed.overrideComponent(SelectComponentTest, {
      set: {
        template: `<ofe-select [skeleton]=true></ofe-select>`
      }
    }).createComponent(SelectComponentTest);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('ofe-select')).nativeElement;
    expect(element.querySelector('.cds--skeleton')).toBeTruthy();
  });
});
