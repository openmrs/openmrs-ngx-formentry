import { AbstractControl } from '@angular/forms';

/**
 * A control is considered hidden for validation purposes when it, or any of its
 * ancestor controls, is hidden. Walking the ancestor chain means questions
 * inside a hidden section/group are skipped by validators even though only the
 * section control itself carries the `hidden` flag.
 */
export function isControlHidden(
  control: AbstractControl | null | undefined
): boolean {
  let current: any = control;

  while (current) {
    if (current.hidden === true) {
      return true;
    }
    current = current.parent;
  }

  return false;
}
