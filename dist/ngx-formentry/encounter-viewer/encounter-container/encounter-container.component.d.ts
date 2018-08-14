import { OnInit } from '@angular/core';
import { Form } from '../../form-entry/form-factory/form';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
export declare class EncounterContainerComponent implements OnInit {
    private encAdapter;
    $form: Form;
    $enc: any;
    form: any;
    encounter: any;
    constructor(encAdapter: EncounterAdapter);
    ngOnInit(): void;
}
