import { ValidationErrors } from '@angular/forms';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export function validateConceptReferenceRange(
  control: AfeFormControl,
  schemaBounds: { min?: number | string; max?: number | string } = {}
): ValidationErrors | null {
  const value: unknown = control.value;
  if (
    control.hidden ||
    (typeof value !== 'number' && typeof value !== 'string') ||
    (typeof value === 'string' && value.trim() === '') ||
    !Number.isFinite(Number(value))
  ) {
    return null;
  }
  const range = control.conceptReferenceRange;
  const numericValue = Number(value);
  const schemaMin = numericBound(schemaBounds.min);
  const schemaMax = numericBound(schemaBounds.max);
  if (
    typeof range?.lowAbsolute === 'number' &&
    Number.isFinite(range.lowAbsolute) &&
    numericValue < range.lowAbsolute
  ) {
    return {
      min: {
        requiredValue: Math.max(range.lowAbsolute, schemaMin ?? -Infinity),
        actualValue: numericValue
      }
    };
  }
  if (
    typeof range?.hiAbsolute === 'number' &&
    Number.isFinite(range.hiAbsolute) &&
    numericValue > range.hiAbsolute
  ) {
    return {
      max: {
        requiredValue: Math.min(range.hiAbsolute, schemaMax ?? Infinity),
        actualValue: numericValue
      }
    };
  }
  return null;
}

export function numericBound(
  value: number | string | undefined
): number | undefined {
  return value !== undefined &&
    value !== null &&
    String(value).trim() !== '' &&
    Number.isFinite(Number(value))
    ? Number(value)
    : undefined;
}
