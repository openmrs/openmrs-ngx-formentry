import { SelectOption } from './select-option';
import { Observable } from 'rxjs/Observable';

export interface DataSource {
  resolveSelectedValue(value): Observable<SelectOption>;
  searchOptions(searchText): Observable<SelectOption[]>;
}
