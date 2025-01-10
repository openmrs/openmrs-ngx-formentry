import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { RemoteSelectQuestionOptions } from './interfaces/remote-select-question-options';

export class RemoteSelectQuestion extends QuestionBase {
  rendering: string;
  options: any[];

  constructor(options: RemoteSelectQuestionOptions) {
    super(options);
    this.renderingType = 'select';
    this.controlType = AfeControlType.AfeFormControl;
    this.dataSource = options.dataSource || '';
    this.dataSourceOptions = options.dataSourceOptions || {};
  }
}
