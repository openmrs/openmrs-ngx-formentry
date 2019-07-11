import { Component, OnInit, Input, forwardRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import { SecurePipe } from './secure.pipe';
@Component({
    selector: 'app-file-upload',
    templateUrl: 'file-upload.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true,
        }],
    styles: [`img {
        margin-left: auto;margin-right: auto;display: block;
    }`
    ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
    uploading = false;
    fileUuid = null;
    pdfUploaded = false;
    formEntryMode = true;
    pdfUrl: string;
    private _dataSource: DataSource;
    @Input()
    public get dataSource(): DataSource {
        return this._dataSource;
    }
    public set dataSource(v: DataSource) {
        this._dataSource = v;
    }


    constructor(private renderer: Renderer2) { }

    ngOnInit() {
        if (this.fileUuid) {
            this.checkFileType();
        }

    }
    public onFileChange(fileList) {
        for (const file of fileList) {
            this.upload(file);
        }
    }
    upload(data) {
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe((result) => {
                this.fileUuid = result.image;
                this.checkFileType();
                this.propagateChange(this.fileUuid);
                this.uploading = false;
            }, (error) => {
                this.uploading = false;
            });
        }
    }

    // this is the initial value set to the component
    public writeValue(value: any) {
        if (value !== this.fileUuid) {
            this.fileUuid = value;
            this.checkFileType();
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
        this.fileUuid = null;
        this.pdfUploaded = false;
        this.pdfUrl = null;
        this.propagateChange(this.fileUuid);
    }

    public getPdfUrl(fileUuid: string) {
        this.dataSource.fetchFile(fileUuid, 'pdf').subscribe((file) => {
            this.pdfUploaded = true;
            this.pdfUrl = file.changingThisBreaksApplicationSecurity;
        });
    }
    public checkFileType() {
        const re = /pdf/gi;
        if (this.fileUuid.search(re) !== -1) {
            this.getPdfUrl(this.fileUuid);
        }
    }
}
