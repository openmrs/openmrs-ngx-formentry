import { ValidationModel } from './validation.model';

export class MinLengthValidationModel extends ValidationModel {
 minlength: number;

  constructor(validations: any) {
    super(validations);
    const minlength: any = validations.minlength;
    this.minlength = +minlength;
  }
}