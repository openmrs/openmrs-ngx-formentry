import {Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

import { QuestionBase } from '../question-models/question-base';
import { HistoricalFieldHelperService } from '../services/historical-field-helper-service';
import  *  as _  from 'lodash';

@Directive({
  selector: `[historicalValue]`
})

@Directive({
  selector: `[node]`,
  properties: {
    'node': QuestionBase
  }
})

export class HistoricalValueDirective {

  @Input() question: QuestionBase;
  @Output() questionChange = new EventEmitter<Object>();

  historicalDisplay: string;

  constructor(private historicalFieldHelper: HistoricalFieldHelperService) {}

  @HostListener('click', ['$event.target'])
  setValue(target: HTMLButtonElement) {

    if (target.name === 'historyValue') {

      this.question.defaultValue = this.question.originalValue;

      this.questionChange.emit(this.question);

    }
  }

  @Input()
  set node(question: QuestionBase) {

    if (question) {
      this.question = question;

      if (this.question.hasOwnProperty('hasHistoricalValue')) {

        if (this.question.renderingType === 'select' && !_.isUndefined(this.question.originalValue)) {

          this.question['historicalDisplay'] = this.historicalFieldHelper.getDisplayTextFromOptions(
            this.question.options,
            'value',
            this.question.originalValue.value,
            'label'
          );

        }
      }
    }
  }

}
