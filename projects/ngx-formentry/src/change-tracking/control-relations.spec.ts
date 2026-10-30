import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormGroup,
  ValidatorFn
} from '@angular/forms';

import { AfeFormControl } from '../abstract-controls-extension/afe-form-control';

// Invalid while the referenced control's value is 'failed'.
function forbiddenValueValidator(refControl: AbstractControl): ValidatorFn {
  return () =>
    refControl.value === 'failed' ? { forbiddenValue: true } : null;
}

// Invalid while the referenced array is empty.
function emptyArrayValidator(refArray: UntypedFormArray): ValidatorFn {
  return () => (refArray.length === 0 ? { emptyArray: true } : null);
}

function relate(
  control: AfeFormControl,
  relatedTo: AbstractControl,
  validator: ValidatorFn
) {
  control.setValidators(validator);
  control.controlRelations.addRelatedControls(relatedTo);
}

// Builds a form with controls nested in groups and arrays at different depths,
// then wires up relations between them.
function buildForm() {
  const control1 = new AfeFormControl('first');
  const control2 = new AfeFormControl('second');
  const control3 = new AfeFormControl('third');
  const control4 = new AfeFormControl('fourth');
  const control5 = new AfeFormControl('fifth');
  const control6 = new AfeFormControl('sixth');
  const control7 = new AfeFormControl('seventh');
  const control8 = new AfeFormControl('eighth');
  const control9 = new AfeFormControl('ninth');
  const control10 = new AfeFormControl('tenth');
  const control11 = new AfeFormControl('eleventh');
  const array4 = new UntypedFormArray([control9]);

  const form = new UntypedFormGroup({
    1: control1,
    2: new UntypedFormGroup({
      3: new UntypedFormArray([control2]),
      4: new UntypedFormGroup({ 6: control3, 7: control4 }),
      5: control5
    }),
    8: new UntypedFormArray([
      new UntypedFormGroup({ 9: control6, 10: control7 }),
      control8,
      array4,
      control10,
      control11
    ])
  });

  relate(control4, control5, forbiddenValueValidator(control5));
  relate(control5, control4, forbiddenValueValidator(control4));
  relate(control3, control1, forbiddenValueValidator(control1));
  relate(control2, control6, forbiddenValueValidator(control6));
  relate(control6, control7, forbiddenValueValidator(control7));
  relate(control10, control11, forbiddenValueValidator(control11));
  relate(control1, array4, emptyArrayValidator(array4));

  return {
    form,
    control1,
    control2,
    control3,
    control4,
    control5,
    control6,
    control7,
    control10,
    control11,
    array4
  };
}

describe('ControlRelations', () => {
  it('revalidates both sides of a cyclic relation', () => {
    let f = buildForm();
    expect(f.control4.valid).toBe(true);
    expect(f.form.valid).toBe(true);
    f.control5.setValue('failed');
    expect(f.control4.valid).toBe(false);
    expect(f.form.valid).toBe(false);

    f = buildForm();
    expect(f.control5.valid).toBe(true);
    expect(f.form.valid).toBe(true);
    f.control4.setValue('failed');
    expect(f.control5.valid).toBe(false);
    expect(f.form.valid).toBe(false);
  });

  it('revalidates a nested control when a control at the root changes', () => {
    const f = buildForm();
    expect(f.control3.valid).toBe(true);
    expect(f.form.valid).toBe(true);
    f.control1.setValue('failed');
    expect(f.control3.valid).toBe(false);
    expect(f.form.valid).toBe(false);
  });

  it('revalidates a control when a control in a separate branch changes', () => {
    const f = buildForm();
    expect(f.control2.valid).toBe(true);
    expect(f.form.valid).toBe(true);
    f.control6.setValue('failed');
    expect(f.control2.valid).toBe(false);
    expect(f.form.valid).toBe(false);
  });

  it('revalidates a control when a control in the same group changes', () => {
    const f = buildForm();
    expect(f.control6.valid).toBe(true);
    expect(f.form.valid).toBe(true);
    f.control7.setValue('failed');
    expect(f.control6.valid).toBe(false);
    expect(f.form.valid).toBe(false);
  });

  it('revalidates a control when a control in the same array changes', () => {
    const f = buildForm();
    expect(f.control10.valid).toBe(true);
    expect(f.form.valid).toBe(true);
    f.control11.setValue('failed');
    expect(f.control10.valid).toBe(false);
    expect(f.form.valid).toBe(false);
  });

  it('revalidates a control when a control is removed from a related array', () => {
    const f = buildForm();
    expect(f.control1.valid).toBe(true);
    expect(f.form.valid).toBe(true);
    f.array4.removeAt(0);
    expect(f.control1.valid).toBe(false);
    expect(f.form.valid).toBe(false);
  });
});
