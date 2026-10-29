/**
 * modal.component
 */

import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'ofe-picker-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
  standalone: false
})
export class ModalComponent {
  @Output() overlayClick = new EventEmitter<boolean>();

  constructor() {}

  closeModal() {
    this.overlayClick.emit(false);
  }
}
