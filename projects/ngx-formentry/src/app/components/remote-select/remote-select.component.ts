import { Component, OnInit, Input, forwardRef, ViewChild, Output, EventEmitter, Renderer } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
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
    items = [];
    value = [];
    loading = false;
    searchText: string = '';
    notFoundMsg = 'match no found';
    @Output() done: EventEmitter<any> = new EventEmitter<any>();

    characters = [];
    @ViewChild(SelectComponent) private selectC: SelectComponent;

    constructor(private renderer: Renderer) { }

    ngOnInit() {

    }

    public typed(value: any): void {
        this.search(value);
    }
    search(value: string) {
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value)
                .subscribe((result) => {
                    if (result.length > 0) {
                        let existing = _.map(this.value, _.clone);
                        let concat = existing.concat(result);
                        this.items = _.uniqBy(concat, 'value');
                    }
                    this.notFoundMsg = '';
                }, (error) => {
                    this.notFoundMsg = 'Errored';
                });
        }
    }

    canSearch(searchText: string) {
        return (searchText.length - this.searchText.length >= 3 ||
            (searchText.length - this.searchText.length <= 3 && searchText !== '')) && this.loading === false;
    }

    // this is the initial value set to the component
    public writeValue(value: any) {
        if (value && value !== '') {
            if (this.dataSource) {
                this.loading = true;
                this.dataSource.resolveSelectedValue(value).subscribe((result: any) => {
                    this.items = [result];
                    setTimeout(() => {
                        this.selectC.select(result.value);
                        this.selectC.value = result.value;
                    });
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
        console.log('Removed');
        this.propagateChange('');
    }
    selected(event) {
        this.propagateChange(event.value);
    }

    // the method set in registerOnChange, it is just 
    // a placeholder for a method that takes one parameter, 
    // we use it to emit changes back to the form
    private propagateChange = (_: any) => { };
}
