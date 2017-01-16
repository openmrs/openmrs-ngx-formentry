/**
 * modal.component
 */

import {
    Component, Output, OnInit, EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';

// webpack1_
declare let require: any;
const myDpStyles: string = require('./modal.component.css');
const myDpTpl: string = require('./modal.component.html');
// webpack2_

@Component({
    selector: 'picker-modal',
    template: myDpTpl,
    styles: [myDpStyles],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
    ],
})

export class ModalComponent implements OnInit {

    @Output() onOverlayClick = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    closeModal() {
        this.onOverlayClick.emit(false);
    }
}
