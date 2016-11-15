import { ValidationModel } from './validation.model';

export class DateValidationModel extends ValidationModel {

  allowFutureDates: boolean;

  constructor(validations: any) {
    super(validations);

    this.allowFutureDates = validations.allowFutureDates === 'false' ? false : true;
  }
}
