import { ValidationModel } from './validation.model';

export class MinValidationModel extends ValidationModel {
  min: number;

  constructor(validations: any) {
    super(validations);
    const min: any = validations.min;
    this.min = +min;
  }
}
