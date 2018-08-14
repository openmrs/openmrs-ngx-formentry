import { OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
export declare class RemoteFileUploadComponent implements OnInit, ControlValueAccessor {
    private renderer;
    uploading: boolean;
    innerValue: any;
    private _dataSource;
    dataSource: DataSource;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    upload(data: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(): void;
    onChange(event: any): void;
    private propagateChange;
    clearValue(): void;
}
