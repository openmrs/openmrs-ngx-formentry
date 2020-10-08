import { ValidationModel } from './validation.model';

export class MaxValidationModel extends ValidationModel {
  max: number;

  constructor(validations: any) {
    super(validations);
    const max: any = validations.max;
    this.max = +max;
  }
}
