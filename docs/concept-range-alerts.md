## Concept Reference Range Alerts (Implementor Guide)

Concept reference range alerts warn users when a numeric answer is outside a patient-specific range for a given concept. Alerts can be critical low/high or low/high, and they display the entered value and the normal range.

### Prerequisites
- Your question must be numeric (e.g., number input).
- The form runtime must have `form.valueProcessingInfo.patientUuid` populated.
- The question must include a concept UUID under `extras.questionOptions.concept`.
- The backend must expose `GET /ws/rest/v1/conceptreferencerange`.

### Enable in a form schema
Add the following to the target question:

```json
{
  "type": "number",
  "label": "Result",
  "questionOptions": {
    "rendering": "number",
    "concept": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  },
  "alert": {
    "useConceptReferenceRange": true
  }
}
```

Notes:
- `questionOptions.concept` must be a valid concept UUID.
- When `useConceptReferenceRange` is `true`, the normal `alertWhenExpression` is ignored for this question.

### What users will see
When the user enters a numeric value and a reference range is available for the patient + concept:
- Critical low: value ≤ `lowCritical` (red, “Critical low”)
- Critical high: value ≥ `hiCritical` (red, “Critical high”)
- Low: value < `lowNormal` (amber, “Low”)
- High: value > `hiNormal` (amber, “High”)

The alert message includes the entered value (with units when provided) and shows the normal range as `(lowNormal-hiNormal) <units>`.

### How it works (behind the scenes)
- The first time a control needs a range, the UI fetches it lazily via:
  - `GET /ws/rest/v1/conceptreferencerange?patient=:uuid&concept=:uuid&v=full`
- The service caches responses per `patientUuid::conceptUuid` and shares them across subscribers to avoid duplicate calls.
- If the range is missing or the call fails, the alert remains hidden.

### Troubleshooting
- No alert shows up:
  - Ensure the control value is numeric (not empty or text).
  - Verify `form.valueProcessingInfo.patientUuid` is set in the running form.
  - Confirm the concept UUID is present on the question under `questionOptions.concept`.
  - Check backend endpoint availability and that it returns at least one result.
- Wrong units or ranges:
  - Inspect the payload from `/conceptreferencerange` for `units`, `lowNormal`, `hiNormal`, `lowCritical`, `hiCritical`.
- Multiple network calls:
  - Caching is per patient + concept. If either changes, a new fetch is expected.

### Relevant code
- Range retrieval and caching: `projects/ngx-formentry/src/form-entry/services/concept-reference-range.service.ts`
- Alert evaluation and rendering: `projects/ngx-formentry/src/form-entry/form-factory/show-messages.factory.ts`


