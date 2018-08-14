export declare class HistoricalEncounterDataService {
    dataSources: any;
    constructor();
    registerEncounters(name: string, encounters: any): void;
    putObject(name: any, object: any): void;
    getObject(name: string): any;
    getFirstValue(path: Array<string>, object: any): any;
    getAllValues(path: any, object: any, answers: any): void;
    private _transformEncounter(encounter);
    private _transformObs(obs);
    private _augumentObs(existing, toAdd);
}
