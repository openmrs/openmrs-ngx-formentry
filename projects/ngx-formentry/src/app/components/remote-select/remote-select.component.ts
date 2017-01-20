import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import * as _ from 'lodash';
@Component({
    selector: 'remote-select',
    templateUrl: 'remote-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RemoteSelectComponent),
            multi: true,
        }]
})
export class RemoteSelectComponent implements OnInit, ControlValueAccessor {
    @Input() dataSource: DataSource;
    @Input() placeholder: string = 'Search...';
    public items = [];
    value = [];
    loading = false;
    constructor() { }

    ngOnInit() {

    }

    public typed(value: any): void {
        this.loading = true;
        if (this.dataSource) {
            this.dataSource.searchOptions(value).subscribe((result) => {
                let existing = _.map(this.value, _.clone);
                let concat = existing.concat(result);
                this.items = _.uniqBy(concat, 'id');
                this.loading = false;
            });
        }
    }

    // this is the initial value set to the component
    public writeValue(value: any) {
        if (value && value !== '') {
            if (this.dataSource) {
                this.loading = true;
                this.dataSource.resolveSelectedValue(value).subscribe((result: any) => {
                    if (result instanceof Object && result.text && result.id) {
                        this.items.push(result);
                        this.value = [result];
                    }
                    this.loading = false;
                }, (error) => {
                    this.loading = false;
                });
            }
        }
    }

    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // not used, used for touch input
    public registerOnTouched() { }
    // change events from the textarea
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    removed(event) {
        this.propagateChange('');
    }
    data(event) {
        this.propagateChange(event.id);
    }

    // the method set in registerOnChange, it is just 
    // a placeholder for a method that takes one parameter, 
    // we use it to emit changes back to the form
    private propagateChange = (_: any) => { };
}
