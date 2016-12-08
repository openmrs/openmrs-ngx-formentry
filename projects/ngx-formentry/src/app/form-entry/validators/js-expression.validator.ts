import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';

export class JsExpressionValidator {

  constructor() {}

  validate(model: JsExpressionValidationModel) {

    // convert helper functions to string
    return (control: AfeFormControl): { [key: string]: any } => {

      let expression = model.failsWhenExpression;
      let helper = new JsExpressionHelper();
      let dataDependencies = {};

      let helperFunctions = helper.helperFunctions;
      let runnable = new ExpressionRunner().getRunnable(expression, control, helperFunctions, dataDependencies);

      if (!runnable.run()) {

        return { 'js_expression': { 'expression': expression, message:  model.message } };
      }

      return null;
    };
  }
}
