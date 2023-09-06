import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { SelectOption } from '../../form-entry/question-models/interfaces/select-option';

import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import * as _ from 'lodash';
@Component({
  selector: 'ofe-remote-select',
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
  items = [];
  value = [];
  loading = false;
  searchText = '';
  notFoundMsg = 'match no found';
  @Input() placeholder = 'Search...';
  @Input() componentID: string;
  @Input() disabled = false;
  @Input() theme = 'dark';
  @Output() done: EventEmitter<any> = new EventEmitter<any>();

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

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.loadOptions();
  }

  subscribeToDataSourceDataChanges() {
    this._dataSource.dataFromSourceChanged.subscribe((results) => {
      if (results.length > 0) {
        this.items = results;
        this.notFoundMsg = '';
      } else {
        this.notFoundMsg = 'Not found';
        this.items = [];
      }
    });
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
  public registerOnTouched() {}
  // change events from the textarea
  onChange(event) {
    this.propagateChange(event.id);
    // .....
    // update the form
    // this.propagateChange(this.data);
  }
  selected(event) {
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
  private propagateChange = (change: any) => {};

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
        switchMap((term) =>
          this.dataSource.searchOptions(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.loading = false))
          )
        )
      )
    );
  }
}
