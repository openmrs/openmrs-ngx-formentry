import { Component, OnInit, Input } from '@angular/core';
import { Form } from '../../form-entry/form-factory/form';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';

import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';

@Component({
    selector: 'encounter-renderer',
    templateUrl: './encounter-container.component.html',
    styleUrls: ['./encounter-container.component.css']
})
export class EncounterContainerComponent implements OnInit {
    public $form: Form;
    public $enc: any;

    @Input() public set form(form) {
        this.$form = form;
    }
    @Input() public set encounter(enc) {
        this.$enc = enc;
    }

    constructor(
        private encAdapter: EncounterAdapter,
        private encounterPdfViewerService: EncounterPdfViewerService) { }

    ngOnInit() {
    }

    displayPdf() {
        this.encounterPdfViewerService.displayPdf(this.$form);
    }
}
