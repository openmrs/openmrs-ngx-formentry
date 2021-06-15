import * as _ from 'lodash';
import { QuestionBase } from '../question-models/question-base';
import { Injectable } from "@angular/core";

@Injectable()
export class HistoricalFieldHelperService {
  public getDisplayTextFromOptions(
    question: QuestionBase,
    valueProperty: string,
    displayProperty: string
  ): string {
    let displayText = '';
    const historicalValue = question.historicalDataValue;
    if (_.isArray(historicalValue.value)) {
      let valueConverted = 0;
      _.each(historicalValue.value, (val) => {
        _.each(question.options, (option) => {
          if (option[valueProperty] === val) {
            if (valueConverted === 0) {
              displayText = displayText + option[displayProperty];
            } else {
              displayText = displayText + ', ' + option[displayProperty];
            }
            valueConverted++;
          }
        });
      });
    } else {
      _.each(question.options, (option) => {
        if (option[valueProperty] === historicalValue.value) {
          displayText = option[displayProperty];
        }
      });
    }
    return displayText;
  }
}
