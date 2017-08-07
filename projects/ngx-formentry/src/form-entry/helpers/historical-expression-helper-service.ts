import { Injectable } from '@angular/core';

import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import { Runnable, ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

@Injectable()
export class HistoricalHelperService {

  constructor() {
  }

  public evaluate(expr: string, dataSources: any): any {
    let HD = new HistoricalEncounterDataService();
    HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
    let deps: any = {
      HD: HD
    };

    let helper = new JsExpressionHelper();
    let control: AfeFormControl = new AfeFormControl();
    let runner: ExpressionRunner = new ExpressionRunner();
    let runnable: Runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);

    return runnable.run();
  }

}
