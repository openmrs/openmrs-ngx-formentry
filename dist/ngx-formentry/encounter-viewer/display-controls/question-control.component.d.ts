import { OnInit } from '@angular/core';
export declare class QuestionControlComponent implements OnInit {
    schema: any;
    value: any;
    dataSource: any;
    innerValue: any;
    private _value;
    private _schema;
    private _dataSource;
    constructor();
    ngOnInit(): void;
    isUuid(value: string): boolean;
    writeValue(v: any, arrayElement?: boolean): any;
    isDate(str: string): boolean;
}
