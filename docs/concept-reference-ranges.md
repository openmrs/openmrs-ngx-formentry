# Patient-specific reference ranges

The form entry app retrieves the reference range that applies to a patient and observation concept, and sets it on each numeric question's control as `control.conceptReferenceRange` after the form is created. The library does not make its own requests, and it doesn't read reference ranges from the form schema.

Absolute limits always validate the answer, including when only one bound is configured. Schema `min` and `max` validators still apply, so adding a reference range cannot widen a stricter schema limit. An answer equal to an absolute limit is allowed.

To show normal and critical warnings as well, set `alert.useConceptReferenceRange` to the boolean `true`:

```json
{
  "id": "temperature",
  "label": "Temperature",
  "type": "obs",
  "questionOptions": {
    "rendering": "number",
    "concept": "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  },
  "alert": {
    "useConceptReferenceRange": true,
    "alertWhenExpression": "myValue >= 40",
    "message": "Call the clinician"
  }
}
```

Normal and critical warnings appear alongside an existing expression alert. A value outside an absolute or schema limit shows only the validation error. Omitting the option, or setting it to `false`, disables those warnings without disabling absolute validation. The runtime supports `number`, `numeric`, and `decimal` questions, including nested and repeated questions.

Critical limits include equality (`<= lowCritical`, `>= hiCritical`). Normal warnings use strict comparisons (`< lowNormal`, `> hiNormal`). Critical warnings take priority over normal warnings. Each configured limit works independently, including zero. Empty answers and missing ranges do not produce a range warning. Required-field and schema validation still apply.

The host supplies the patient-specific limits at runtime. For example:

```ts
control.conceptReferenceRange = {
  lowNormal: 36,
  hiNormal: 37.5,
  lowCritical: 35,
  hiCritical: 40,
  lowAbsolute: 25,
  hiAbsolute: 43,
  units: '°C'
};
control.updateValueAndValidity();
control.updateAlert();
```

Changing a range replaces its absolute limits while keeping schema validators. This lets the host refresh the range when the measurement date changes.

## Historical measurements

Age-dependent ranges should use age when the measurement was taken. The form entry app uses the date each answer will be saved with: its own observation date when it has a valid one, otherwise the encounter date. It requests answers dated at the saved encounter date with the encounter context, saved answers with a different date with their observation context, and everything else with an explicit date. It refreshes ranges when an encounter or observation date changes, and holds a submission until pending requests finish.

Historical matching requires REST module 3.3.0 or later on Platform 2.8.5 or later. REST also declares this support for Platform 2.7.9 to 2.7.x, but those Platform versions don't include the API it relies on. The configured criteria must also use the supplied date, for example `$patient.getAge($date)`. `$patient.getAge()` continues to use today's age. Supplying a date does not rewrite existing criteria or add historical support to older backends.

Range selection stays in the backend. The frontend does not evaluate age criteria or combine overlapping range definitions.
