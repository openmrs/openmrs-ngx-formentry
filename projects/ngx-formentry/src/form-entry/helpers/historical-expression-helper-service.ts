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
    const HD = new HistoricalEncounterDataService();
    HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
    const deps: any = {
      HD: HD
    };

    const helper = new JsExpressionHelper();
    const control: AfeFormControl = new AfeFormControl();
    const runner: ExpressionRunner = new ExpressionRunner();
    const runnable: Runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);

    return runnable.run();
  }

}
