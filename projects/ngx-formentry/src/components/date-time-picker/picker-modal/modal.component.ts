/**
 * modal.component
 */

import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

// webpack1_
declare let require: any;
// const myDpStyles: string = require('./modal.component.css');
// const myDpTpl: string = require('./modal.component.html');
// webpack2_

@Component({
  selector: 'ofe-picker-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: []
})
export class ModalComponent {
  @Output() overlayClick = new EventEmitter<boolean>();

  constructor() {}

  closeModal() {
    this.overlayClick.emit(false);
  }
}
