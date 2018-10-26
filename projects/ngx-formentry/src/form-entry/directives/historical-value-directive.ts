import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import * as _ from 'lodash';
import { NodeBase } from '../form-factory/form-node';

@Directive({
  selector: `[node]`
})

export class HistoricalValueDirective {

  @Input() _node: NodeBase;
  @Output() _nodeChange = new EventEmitter<Object>();

  historicalDisplay: string;

  constructor(private historicalFieldHelper: HistoricalFieldHelperService) {
  }

  @HostListener('click', ['$event'])
  setValue(e) {

    if (e.target.name === 'historyValue') {

      if (this._node && (!this.compareString(this._node.question.renderingType, 'page')
        || !this.compareString(this._node.question.renderingType, 'section'))) {

        this._node.control.setValue(this._node.question.historicalDataValue.value);

        this._node.question['historicalValue'] = this._node.question.historicalDataValue;
        e.stopPropagation();
        this._nodeChange.emit(this._node);

      }

    }
  }
  private compareString(a, b) {
    if (a === b) {
      return true;
    } else {
      return false;
    }
  }
  @Input()
  set node(node: NodeBase) {

    if (node) {
      this._node = node;
      if (this._node.question.enableHistoricalValue && !_.isUndefined(this._node.question.historicalDataValue)) {
        const display: any = { text: '', _date: '' };
        if ((this._node.question.renderingType === 'select'
          || this._node.question.renderingType === 'multi-select'
          || this._node.question.renderingType === 'single-select')) {

          display.text = this.historicalFieldHelper.getDisplayTextFromOptions(
            this._node.question,
            'value',
            'label'
          );
          display._date = this._node.question.historicalDataValue.valueDate;

          this._node.question['historicalDisplay'] = display;

        } else if (!_.isUndefined(this._node.question.historicalDataValue)) {

          display.text = this._node.question.historicalDataValue.value;
          display._date = this._node.question.historicalDataValue.valueDate;

          this._node.question['historicalDisplay'] = display;
        }
      }
    }
  }

}
