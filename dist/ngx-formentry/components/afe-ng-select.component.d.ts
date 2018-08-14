import { OnInit, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Option } from '../form-entry/question-models/select-option';
import { DataSource } from '../form-entry/question-models/interfaces/data-source';
export declare class AfeNgSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
    subject: BehaviorSubject<Option[]>;
    subjectOption: BehaviorSubject<Option>;
    dataSource: DataSource;
    multiple: boolean;
    extras: any;
    question_options: any;
    selected_question_option: any;
    errors: any;
    propagateChange: (_: any) => void;
    getChangingText(event: any): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    getData(searchText: string): Observable<Option[]>;
    onValueChange(event: any): void;
    resolveSelectedOption(value: any): Observable<Option>;
    resetOptions(): void;
}
