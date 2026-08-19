import { AfeFormControl } from './afe-form-control';

describe('AfeFormControl', () => {
  it('should not echo a setValue back to the view when emitModelToViewChange is false', () => {
    const control = new AfeFormControl('');
    let viewNotified = false;
    control.registerOnChange(() => {
      viewNotified = true;
    });

    control.setValue('some value', { emitModelToViewChange: false });

    expect(control.value).toBe('some value');
    expect(viewNotified).toBe(false);
  });

  it('should echo a setValue back to the view by default', () => {
    const control = new AfeFormControl('');
    let viewNotified = false;
    control.registerOnChange(() => {
      viewNotified = true;
    });

    control.setValue('some value');

    expect(viewNotified).toBe(true);
  });

  it('should not emit valueChanges when emitEvent is false', () => {
    const control = new AfeFormControl('');
    let emitted = false;
    control.valueChanges.subscribe(() => {
      emitted = true;
    });

    control.setValue('some value', { emitEvent: false });

    expect(control.value).toBe('some value');
    expect(emitted).toBe(false);
  });
});
