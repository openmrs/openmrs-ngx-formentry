import { OnInit, AfterViewInit } from '@angular/core';
export declare class CheckboxControlComponent implements OnInit, AfterViewInit {
    options: any;
    _value: Array<any>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    value: any;
    selectOpt(option: any, event: any): void;
    private onChange;
    private onTouched;
}
