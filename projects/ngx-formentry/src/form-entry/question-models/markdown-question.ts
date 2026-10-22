import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { QuestionBase } from './question-base';

export class MarkdownQuestion extends QuestionBase {
  markdown: string;

  constructor(options: { key: string; markdown: string }) {
    super({ key: options.key, type: 'markdown' });
    this.markdown = options.markdown;
    this.controlType = AfeControlType.AfeFormControl;
  }
}
