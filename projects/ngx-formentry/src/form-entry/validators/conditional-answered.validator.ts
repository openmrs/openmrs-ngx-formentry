import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

export class ConditionalAnsweredValidator {

  constructor() {}

  validate(model: ConditionalValidationModel) {

    return (control: AfeFormControl): { [key: string]: any } => {

      let value = control.value;
      let relationValue = null;
      let referenceQuestionId: string = model.referenceQuestionId;
      let referenceQuestionAnswers: any = model.referenceQuestionAnswers;
      let successCondition: any = true;

      if (value) {
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(relation => {

              let relatedAsControl = relation.relatedTo as any;
              if (relatedAsControl.uuid === referenceQuestionId) {
                if (Array.isArray(relatedAsControl.value)) {
                    relationValue = relatedAsControl.value;
                } else {
                    relationValue = relatedAsControl.value && typeof relatedAsControl.value === 'object' && relatedAsControl.value.value ?
                        relatedAsControl.value.value : relatedAsControl.value;
                }
              }

              if (!relationValue) {
                successCondition = false;
              } else if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) === -1) {
                successCondition = false;
              }
            });
        }
      }

      if (!successCondition) {
        return { 'conditional_answered': { message:  model.message  } };
      }

      return null;
    };
  }
}
