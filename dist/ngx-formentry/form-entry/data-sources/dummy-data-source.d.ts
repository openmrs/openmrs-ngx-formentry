import { Option } from '../question-models/select-option';
import { DataSource } from '../question-models/interfaces/data-source';
import { Observable } from 'rxjs';
export declare class DummyDataSource implements DataSource {
    options: Observable<Option[]>;
    option: Observable<Option>;
    returnErrorOnNext: boolean;
    constructor();
    resolveSelectedValue(value: any): Observable<Option>;
    fileUpload(url: any): Observable<{
        image: string;
    }>;
    fetchFile(url: any): Observable<{
        image: string;
    }>;
    searchOptions(searchText: any): Observable<Option[]>;
    sampleData(): any;
}
