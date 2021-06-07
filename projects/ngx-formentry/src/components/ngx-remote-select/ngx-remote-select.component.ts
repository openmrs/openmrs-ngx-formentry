import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SelectOption } from '../../form-entry/question-models/interfaces/select-option'

import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import * as _ from 'lodash';
@Component({
  selector: 'ngx-remote-select',
  templateUrl: 'remote-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RemoteSelectComponent),
      multi: true
    }
  ]
})
export class RemoteSelectComponent implements OnInit, ControlValueAccessor {
  // @Input() dataSource: DataSource;
  remoteOptions$: Observable<SelectOption[]>;
  remoteOptionsLoading = false;
  remoteOptionInput$ = new Subject<string>();
  selectedRemoteOptions: SelectOption;
  @Input() placeholder = 'Search...';
  @Input() componentID: string;
  items = [];
  value = [];
  loading = false;
  searchText = '';
  notFoundMsg = 'match no found';
  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(SelectComponent, { static: true }) private selectC: SelectComponent;

  private _dataSource: DataSource;
  @Input()
  public get dataSource(): DataSource {
    return this._dataSource;
  }
  public set dataSource(v: DataSource) {
    this._dataSource = v;
    if (this._dataSource && this._dataSource.dataFromSourceChanged) {
      this.subscribeToDataSourceDataChanges();
    }
  }

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.loadOptions();
  }

  subscribeToDataSourceDataChanges() {
    this._dataSource.dataFromSourceChanged.subscribe((results) => {
      if (results.length > 0) {
        this.items = results;
        this.notFoundMsg = '';
        // console.log('updating items', results, this.selectC.value);
        console.log('Results Changed', results)
        //this.restoreSelectedValue(this.selectC.value, results);
      } else {
        this.notFoundMsg = 'Not found';
        this.items = [];
      }
    });
  }

  public typed(value: any): void {
    this.search(value);
  }
  search(value: string) {
    if (this.dataSource) {
      this.searchText = value;
      this.notFoundMsg = 'Loading.........';
      this.dataSource.searchOptions(value).subscribe(
        (result) => {
          if (result.length > 0) {
            const existing = _.map(this.value, _.clone);
            const concat = existing.concat(result);
            this.items = _.uniqBy(concat, 'value');
          }
          this.notFoundMsg = '';
        },
        (error) => {
          this.notFoundMsg = 'Errored';
        }
      );
    }
  }

  restoreSelectedValue(value, results) {
    let found = false;
    _.each(results, (item) => {
      if (item.value === value) {
        setTimeout(() => {
          this.selectC.select(value);
          this.selectC.value = value;
        });
        found = true;
      }
    });
    if (!found) {
      // console.log('not found after loading items', value, results);
      setTimeout(() => {
        this.selectC.select('');
        this.selectC.value = '';
      });
    }
  }

  canSearch(searchText: string) {
    return (
      (searchText.length - this.searchText.length >= 2 ||
        (searchText.length - this.searchText.length <= 2 &&
          searchText !== '')) &&
      this.loading === false
    );
  }

  // this is the initial value set to the component
  public writeValue(value: any) {
    if (value && value !== '') {
      if (this.dataSource) {
        this.loading = true;
        this.dataSource.resolveSelectedValue(value).subscribe(
          (result: any) => {
            this.items = [result];
            this.selectedRemoteOptions = result;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
      }
    }
  }
  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // not used, used for touch input
  public registerOnTouched() { }
  // change events from the textarea
  onChange(event) {
    this.propagateChange(event.id);
    // .....
    // update the form
    // this.propagateChange(this.data);
  }
  removed(event) {
    console.log('Removed');
    this.propagateChange('');
  }
  selected(event) {
    console.log('Removed',event)
    this.propagateChange(event);
  }

  compareItems = (item, selected) => {
    if (item.value && selected.value) {
      return item.value === selected.value;
    }
    return false;
  };

  // the method set in registerOnChange, it is just
  // a placeholder for a method that takes one parameter,
  // we use it to emit changes back to the form
  private propagateChange = (change: any) => { };

  trackByFn(item: SelectOption) {
    return item.value;
  }

  private loadOptions() {
    this.remoteOptions$ = concat(
      of([]), // default items
      this.remoteOptionInput$.pipe(
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
        }),
        switchMap(term => this.dataSource.searchOptions(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.loading = false)
        ))
      )
    );
  }

}
