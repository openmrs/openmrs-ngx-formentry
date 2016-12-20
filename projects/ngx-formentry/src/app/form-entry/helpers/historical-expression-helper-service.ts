import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { MockObs } from '../../mock/mock-obs';
import { JsExpressionHelper } from './js-expression-helper';
import { Runnable, ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class HistoricalHelperService {

  constructor() {
  }

  public evaluate(expr: string): any {

    let obs: MockObs = new MockObs();
    let deps: any = {
      HD: new HistoricalEncounterDataService('prevEnc', obs.getObs())
    };

    let helper = new JsExpressionHelper();

    let control: AfeFormControl = new AfeFormControl();
    let runner: ExpressionRunner = new ExpressionRunner();
    let runnable: Runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);

    return runnable.run();
  }

}
