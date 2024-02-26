export class DecimalValidationModel {
  type: string;
  message: string;
  decimalPlace = 0;
  failsWhenExpression = '';

  constructor(validations: any) {
    this.type = 'js_expression';
    this.decimalPlace = validations.decimalPlace;
  }

  setFailsWhenExpression(): void {
    this.failsWhenExpression = `!isEmpty(myValue) && String(myValue).split('.')[1].length !== ${this.decimalPlace}`;
  }

  setMessage(): void {
    this.message = `The value should have ${this.decimalPlace} decimal places`;
  }

  setValuesAndExpressions() {
    this.setMessage();
    this.setFailsWhenExpression();
  }
}
