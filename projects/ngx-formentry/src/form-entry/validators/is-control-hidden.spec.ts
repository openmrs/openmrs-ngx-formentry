import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { isControlHidden } from './is-control-hidden';
import { RequiredValidator } from './required.validator';

describe('isControlHidden', () => {
  it('returns false when neither the control nor its ancestors are hidden', () => {
    const section = new AfeFormGroup({});
    const control = new AfeFormControl('');
    section.addControl('child', control);

    expect(isControlHidden(control)).toBe(false);
  });

  it('returns true when the control itself is hidden', () => {
    const control = new AfeFormControl('');
    control.hidden = true;

    expect(isControlHidden(control)).toBe(true);
  });

  it('returns true when an ancestor section/group is hidden', () => {
    const section = new AfeFormGroup({});
    const control = new AfeFormControl('');
    section.addControl('child', control);
    (section as any).hidden = true;

    expect(control.hidden).toBe(false);
    expect(isControlHidden(control)).toBe(true);
  });

  it('skips the required validator for a field inside a hidden section', () => {
    const section = new AfeFormGroup({});
    const control = new AfeFormControl('');
    section.addControl('child', control);
    (section as any).hidden = true;

    // Empty + required would normally fail, but the hidden section suppresses it.
    expect(new RequiredValidator().validate(control)).toBeNull();

    (section as any).hidden = false;
    expect(new RequiredValidator().validate(control)).toEqual({
      required: true
    });
  });
});
