import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import *  as _ from 'lodash';
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

  @HostListener('click', ['$event.target'])
  setValue(target: HTMLButtonElement) {

    if (target.name === 'historyValue') {

      if (this._node && (!this.compareString(this._node.question.renderingType, 'page')
        || !this.compareString(this._node.question.renderingType, 'section'))) {

        this._node.control.setValue(this._node.question.historicalDataValue.value);

        this._node.question['historicalValue'] = this._node.question.historicalDataValue;

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

      if (node.question.enableHistoricalValue) {
        this._node = node;
        if ((this._node.question.renderingType === 'select'
          || this._node.question.renderingType === 'multi-select')
          && !_.isUndefined(this._node.question.historicalDataValue)) {
          let display = {
            text: this.historicalFieldHelper.getDisplayTextFromOptions(
              this._node.question,
              'value',
              'label'
            ),
            _date: this._node.question.historicalDataValue.valueDate
          };

          this._node.question['historicalDisplay'] = display;

        }
      }
    }
  }

}
