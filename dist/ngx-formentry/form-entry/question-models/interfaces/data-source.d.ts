import { SelectOption } from './select-option';
import { Observable } from 'rxjs';
export interface DataSource {
    dataSourceOptions?: any;
    dataFromSourceChanged?: Observable<SelectOption[]>;
    resolveSelectedValue(value: any): Observable<SelectOption>;
    searchOptions(searchText: any): Observable<SelectOption[]>;
    fileUpload(data: any): Observable<any>;
    fetchFile(url: any): Observable<any>;
}
