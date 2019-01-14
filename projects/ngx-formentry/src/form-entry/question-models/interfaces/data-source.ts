import { SelectOption } from './select-option';
import { Observable } from 'rxjs';

export interface DataSource {
  dataSourceOptions?: any;
  dataFromSourceChanged?: Observable<SelectOption[]>;
  resolveSelectedValue(value): Observable<SelectOption>;
  searchOptions(searchText): Observable<SelectOption[]>;
  fileUpload(data): Observable<any>;
  fetchFile(url): Observable<any>;
}
