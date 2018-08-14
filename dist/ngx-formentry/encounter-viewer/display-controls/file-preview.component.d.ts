import { ControlValueAccessor } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
export declare class FilePreviewComponent implements ControlValueAccessor {
    private encounterService;
    source: any;
    innerValue: any;
    _dataSource: DataSource;
    dataSource: DataSource;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(encounterService: EncounterViewerService);
    value: any;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onBlur(): void;
    onChange(event: any): void;
}
