import { ValidationModel } from './validation.model';

export class DisallowDecimalsValidationModel extends ValidationModel {
  disallowDecimals: boolean;
  failsWhenExpression: string;
  message: string;

  constructor(validations: any) {
    super(validations);
    this.disallowDecimals = validations.disallowDecimals;
  }

  setMessage(): void {
    this.message = 'Decimal values are not allowed';
  }

  setFailsWhenExpression(): void {
    this.failsWhenExpression = `!isEmpty(myValue) && (myValue).toString().includes('.')`;
  }

  setValuesAndExpressions() {
    this.setMessage();
    this.setFailsWhenExpression();
  }
}
