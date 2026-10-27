import { Alert } from './can-generate-alert';

export interface ConceptReferenceRange {
  lowNormal?: number | null;
  hiNormal?: number | null;
  lowCritical?: number | null;
  hiCritical?: number | null;
  lowAbsolute?: number | null;
  hiAbsolute?: number | null;
  units?: string | null;
}

export interface ConceptReferenceRangeAlert extends Alert {
  source: 'conceptReferenceRange';
  severity: 'warning' | 'critical';
  limit?: number;
  units?: string;
}

interface RangeWarning {
  severity: ConceptReferenceRangeAlert['severity'];
  alertMessage: string;
  limit: number;
  units: string;
}

export function evaluateConceptReferenceRange(
  value: unknown,
  range?: ConceptReferenceRange
): RangeWarning | null {
  if (
    !range ||
    (typeof value !== 'number' && typeof value !== 'string') ||
    (typeof value === 'string' && value.trim() === '') ||
    !Number.isFinite(Number(value))
  ) {
    return null;
  }

  const numericValue = Number(value);
  const limits: Array<{
    limit: number | null | undefined;
    severity: ConceptReferenceRangeAlert['severity'];
    alertMessage: string;
    matches: (measurement: number, limit: number) => boolean;
  }> = [
    {
      limit: range.hiCritical,
      severity: 'critical',
      alertMessage: 'referenceRangeCriticalHigh',
      matches: (measurement, limit) => measurement >= limit
    },
    {
      limit: range.lowCritical,
      severity: 'critical',
      alertMessage: 'referenceRangeCriticalLow',
      matches: (measurement, limit) => measurement <= limit
    },
    {
      limit: range.hiNormal,
      severity: 'warning',
      alertMessage: 'referenceRangeHigh',
      matches: (measurement, limit) => measurement > limit
    },
    {
      limit: range.lowNormal,
      severity: 'warning',
      alertMessage: 'referenceRangeLow',
      matches: (measurement, limit) => measurement < limit
    }
  ];

  const warning = limits.find(
    ({ limit, matches }) =>
      typeof limit === 'number' &&
      Number.isFinite(limit) &&
      matches(numericValue, limit)
  );

  return warning
    ? {
        severity: warning.severity,
        alertMessage: warning.alertMessage,
        limit: warning.limit,
        units: range.units ?? ''
      }
    : null;
}
