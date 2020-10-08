import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

export class ConditionalRequiredValidator {
  constructor() {}

  validate(model: ConditionalValidationModel) {
    // convert helper functions to string
    return (control: AfeFormControl): { [key: string]: any } => {
      const value = control.value;
      let relationValue = null;
      const referenceQuestionId: string = model.referenceQuestionId;
      const referenceQuestionAnswers: any = model.referenceQuestionAnswers;
      let isRequired: boolean;

      if (
        control &&
        control.controlRelations &&
        control.controlRelations.relations
      ) {
        control.controlRelations.relations.forEach((relation) => {
          const relatedAsControl = relation.relatedTo as any;
          if (relatedAsControl.uuid === referenceQuestionId) {
            if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
              relationValue = relation.relatedTo.value;
            } else {
              relationValue =
                relation.relatedTo.value && relation.relatedTo.value.value
                  ? relation.relatedTo.value.value
                  : relation.relatedTo.value;
            }
          }
        });
      }

      if (
        typeof referenceQuestionAnswers === 'object' &&
        referenceQuestionAnswers.indexOf(relationValue) !== -1
      ) {
        isRequired = true;
      }

      if (isRequired && !value) {
        return { conditional_required: { message: model.message } };
      }

      return null;
    };
  }
}
