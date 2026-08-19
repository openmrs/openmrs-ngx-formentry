import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

export class ConditionalAnsweredValidator {
  constructor() {}

  validate(model: ConditionalValidationModel) {
    return (control: AfeFormControl): { [key: string]: any } => {
      const value = control.value;
      let relationValue = null;
      const referenceQuestionId: string = model.referenceQuestionId;
      const referenceQuestionAnswers: any = model.referenceQuestionAnswers;
      let successCondition: any = true;

      if (value) {
        if (
          control &&
          control.controlRelations &&
          control.controlRelations.relations
        ) {
          control.controlRelations.relations.forEach((relation) => {
            const relatedAsControl = relation.relatedTo as any;
            if (relatedAsControl.uuid === referenceQuestionId) {
              if (Array.isArray(relatedAsControl.value)) {
                relationValue = relatedAsControl.value;
              } else {
                relationValue =
                  relatedAsControl.value &&
                  typeof relatedAsControl.value === 'object' &&
                  relatedAsControl.value.value
                    ? relatedAsControl.value.value
                    : relatedAsControl.value;
              }
            }

            if (
              !relationValue ||
              (Array.isArray(relationValue) && relationValue.length === 0)
            ) {
              successCondition = false;
            } else if (typeof referenceQuestionAnswers === 'object') {
              if (Array.isArray(relationValue)) {
                const values = relationValue.map((v) =>
                  v && typeof v === 'object' && v.value ? v.value : v
                );
                if (
                  !values.some(
                    (v) => referenceQuestionAnswers.indexOf(v) !== -1
                  )
                ) {
                  successCondition = false;
                }
              } else if (
                referenceQuestionAnswers.indexOf(relationValue) === -1
              ) {
                successCondition = false;
              }
            }
          });
        }
      }

      if (!successCondition) {
        return { conditional_answered: { message: model.message } };
      }

      return null;
    };
  }
}
