import { Component, OnInit, Input, forwardRef, Renderer } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
@Component({
    selector: 'remote-file-upload',
    templateUrl: 'file-upload.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RemoteFileUploadComponent),
            multi: true,
        }],
    styles: [`img {
        margin-left: auto;margin-right: auto;display: block;
    }`
    ]
})
export class RemoteFileUploadComponent implements OnInit, ControlValueAccessor {
    uploading = false;
    innerValue = null;
    private _dataSource: DataSource;
    @Input()
    public get dataSource(): DataSource {
        return this._dataSource;
    }
    public set dataSource(v: DataSource) {
        this._dataSource = v;
    }


    constructor(private renderer: Renderer) { }

    ngOnInit() {

    }
    upload(data) {
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe((result) => {
                console.log('Result', result);
                this.innerValue = result.image;
                this.propagateChange(this.innerValue);
                this.uploading = false;
            }, (error) => {
                this.uploading = false;
            });
        }
    }

    // this is the initial value set to the component
    public writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
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


    // the method set in registerOnChange, it is just
    // a placeholder for a method that takes one parameter,
    // we use it to emit changes back to the form
    private propagateChange = (_: any) => { };

    public clearValue() {
        this.innerValue = null;
        this.propagateChange(this.innerValue);
    }
}
