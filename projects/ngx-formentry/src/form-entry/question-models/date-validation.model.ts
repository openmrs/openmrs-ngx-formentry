import { ValidationModel } from './validation.model';

export class DateValidationModel extends ValidationModel {
  allowFutureDates = false;

  constructor(validations: any) {
    super(validations);

    this.allowFutureDates =
      validations.allowFutureDates === 'true' ? true : false;
  }
}
