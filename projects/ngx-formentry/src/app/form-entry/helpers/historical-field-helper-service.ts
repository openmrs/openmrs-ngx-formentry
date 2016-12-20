import * as _ from 'lodash';

export class HistoricalFieldHelperService {

  public getDisplayTextFromOptions(options, valueProperty, value, displayProperty): string {

    let displayText = '';

    if (_.isArray(value)) {
      let valueConverted = 0;
      _.each(value, (val) => {
        _.each(options, (option) => {
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
      _.each(options, (option) => {

        if (option[valueProperty] === value) {
          displayText = option[displayProperty];
        }

      });
    }

    return displayText;
  }


}
