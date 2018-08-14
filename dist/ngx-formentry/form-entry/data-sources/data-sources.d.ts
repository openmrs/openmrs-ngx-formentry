export declare class DataSources {
    private _dataSources;
    constructor();
    readonly dataSources: any;
    registerDataSource(key: string, dataSource: any, unWrap?: boolean): void;
    clearDataSource(key: string): void;
}
