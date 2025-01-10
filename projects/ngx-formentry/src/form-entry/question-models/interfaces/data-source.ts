import { SelectOption } from './select-option';
import { Observable } from 'rxjs';

export interface DataSource {
  dataSourceOptions?: Record<string, unknown>;
  dataFromSourceChanged?: Observable<SelectOption[]>;
  resolveSelectedValue(value): Observable<SelectOption>;
  searchOptions(
    searchText,
    dataSourceOptions?: Record<string, unknown>
  ): Observable<SelectOption[]>;
  fileUpload(data): Observable<any>;
  fetchFile(url: string, fileType?: string): Observable<any>;
}
