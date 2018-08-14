import { NodeBase } from '../form-entry/form-factory/form-node';
import { DataSource } from '../form-entry/question-models/interfaces/data-source';
import { Observable } from 'rxjs';
import { SelectOption } from '../form-entry/question-models/interfaces/select-option';
export declare class EncounterViewerService implements DataSource {
    constructor();
    resolveSelectedValue(value: any): Observable<SelectOption>;
    searchOptions(searchText: any): Observable<SelectOption[]>;
    fileUpload(data: any): Observable<any>;
    fetchFile(url: any): Observable<any>;
    resolveSelectedValueFromSchema(answerUuid: string, schema: any): string;
    hasAnswer(node: NodeBase): boolean;
    questionsAnswered(node: any, answered?: boolean[]): boolean;
    isDate(val: any): boolean;
    convertTime(unixTimestamp: number): any;
}
