import { Injectable } from '@angular/core';

import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import {
  Runnable,
  ExpressionRunner
} from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

@Injectable()
export class HistoricalHelperService {
  constructor() {}

  public evaluate(
    expr: string,
    dataSources: Record<string, unknown>,
    additionalScopeValues: Record<string, unknown> | null,
  ) {
    const HD = new HistoricalEncounterDataService();
    HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
    if (dataSources.hasOwnProperty('rawPrevObs')) {
      HD.registerEncounters('prevObs', dataSources['rawPrevObs']);
    }

    const deps = { HD };

    if (additionalScopeValues) {
      for (const o in additionalScopeValues) {
        const value = additionalScopeValues[o];
        if (typeof value !== 'undefined' && value !== null) {
          deps[o] = value;
        }
      }
    }

    const helper = new JsExpressionHelper();
    const control: AfeFormControl = new AfeFormControl();
    const runner: ExpressionRunner = new ExpressionRunner();
    const runnable: Runnable = runner.getRunnable(
      expr,
      control,
      helper.helperFunctions,
      deps
    );

    return runnable.run();
  }

  public evaluatePrecondition(
    expr: string,
    dataSources: any,
    historicalValue: any
  ): any {
    const additionalScope = {
      histValue: historicalValue
    };

    return this.evaluate(expr, dataSources, additionalScope);
  }
}
