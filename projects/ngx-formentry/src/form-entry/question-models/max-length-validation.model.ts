import { ValidationModel } from './validation.model';

export class MaxLengthValidationModel extends ValidationModel {
  maxlength: number;

  constructor(validations: any) {
    super(validations);
    const maxlength: any = validations.maxlength;
    this.maxlength = +maxlength;
  }
}
