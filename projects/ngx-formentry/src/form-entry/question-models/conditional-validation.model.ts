import { ValidationModel } from './validation.model';

export class ConditionalValidationModel extends ValidationModel {

  referenceQuestionId: string;
  referenceQuestionAnswers: any;

  constructor(validations: any) {
    super(validations);
    this.referenceQuestionId = validations.referenceQuestionId;
    this.referenceQuestionAnswers = validations.referenceQuestionAnswers;
  }
}
