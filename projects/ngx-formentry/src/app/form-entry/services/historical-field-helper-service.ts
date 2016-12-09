import * as _ from 'lodash';

export class HistoricalFieldHelperService {

  getDisplayTextFromOptions(options, valueProperty, value, displayProperty): string {

    let displayText = '';

    _.each(options, (option) => {

      if (option[valueProperty] === value) {
        displayText = option[displayProperty];
      }

    });

    return displayText;
  }

}
