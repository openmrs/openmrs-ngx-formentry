import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlGroupService } from './control-group.service';
import { FormEntryForm } from './question-models/form-entry-form';

@Component({
    selector: 'form-entry',
    template: `
        <div [formGroup]="comp.form">
            <fe-question *ngFor="let q of comp.data.questions" 
            [info]="{question: q, form: comp.form}" (valueChange)="onQuestionValueChange($event)">
            </fe-question>
        </div>
    `,
    providers: [
    ]
})
export class FormEntryComponent implements OnInit {

    // Input
    @Input() set formEntryFormData(value: FormEntryForm) {
        this._data = value;

        let cg = this._controlGroup.create(this._data.questions, 'fbGroup');
        this._form = cg.fbGroup;
        this.comp = {
            data: this._data,
            form: value.form || this._form
        };
    }

    // Outputs
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onChanges: EventEmitter<any> = new EventEmitter();

    comp: any;

    private _data: FormEntryForm;
    private _form: FormGroup;
    constructor(private _controlGroup: ControlGroupService) { }
    ngOnInit() {
        this.onSubmit.emit({ value: this._form.value, valid: this._form.valid });
        this._form.valueChanges.subscribe(data => {
            console.log('Value', data);
            this.onSubmit.emit({ value: this._form.value, valid: this._form.valid });
        });
    }
    submit() {
        this.onSubmit.emit(this._form.value);
    }
    onQuestionValueChange(event) {
        console.log('Value', event);
        this.onChanges.emit(event);
    }
}
