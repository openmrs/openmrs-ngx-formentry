
import { ValidationModel } from './validation.model';

export class JsExpressionValidationModel extends ValidationModel {

  failsWhenExpression: string;

  constructor(validations: any) {
    super(validations);
    this.failsWhenExpression = validations.failsWhenExpression;
  }
}
