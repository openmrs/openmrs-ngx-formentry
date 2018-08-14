import { ControlValueAccessor } from '@angular/forms';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
export declare class RemoteAnswerComponent implements ControlValueAccessor {
    source: any;
    innerValue: any;
    private _dataSource;
    dataSource: DataSource;
    private onTouchedCallback;
    private onChangeCallback;
    constructor();
    value: any;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onBlur(): void;
    onChange(event: any): void;
}
