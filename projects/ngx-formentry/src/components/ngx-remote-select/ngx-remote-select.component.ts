import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  Renderer2,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  finalize,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { SelectOption } from '../../form-entry/question-models/interfaces/select-option';

import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ofe-remote-select',
  templateUrl: 'remote-select.component.html',
  styleUrls: ['./remote-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RemoteSelectComponent),
      multi: true
    }
  ],
  standalone: false
})
export class RemoteSelectComponent
  implements OnInit, ControlValueAccessor, OnDestroy {
  // @Input() dataSource: DataSource;
  remoteOptions$: Observable<SelectOption[]>;
  remoteOptionsLoading = false;
  remoteOptionInput$ = new Subject<string>();
  selectedRemoteOptions: SelectOption;
  items = [];
  value = [];
  loading = false;
  errorLoading = false;
  searchText = '';
  notFoundMsg = this.translate.instant('matchNotFound');
  @Input() placeholder = this.translate.instant('search');
  @Input() componentID: string;
  @Input() dataSourceOptions?: Record<string, unknown>;
  @Input() disabled = false;
  @Input() theme = 'dark';
  @Input() invalid = 'false';
  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  // Results come from server-side typeahead searches. Concept search matches
  // synonyms and index terms whose display label may not contain the typed
  // text, so ng-select must not re-filter results by label.
  keepServerResults = () => true;

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

  constructor(
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadOptions();
  }

  subscribeToDataSourceDataChanges() {
    this._dataSource.dataFromSourceChanged.subscribe((results) => {
      if (results.length > 0) {
        this.items = results;
        this.notFoundMsg = '';
      } else {
        this.notFoundMsg = 'Match not found';
        this.items = [];
      }
    });
  }

  // this is the initial value set to the component
  public writeValue(value: any) {
    if (value && value !== '') {
      if (this.dataSource) {
        this.loading = true;
        this.dataSource
          .resolveSelectedValue(value, this.effectiveDataSourceOptions())
          .subscribe(
            (result: any) => {
              this.items = [result];
              this.selectedRemoteOptions = result;
              this.loading = false;
              this.errorLoading = false;
            },
            (error) => {
              this.loading = false;
              this.errorLoading = true;
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

  // registers 'fn' fired when the control is touched so the parent control's
  // touched/validation state stays in sync with user interaction
  public registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  // called by Angular reactive forms when the bound control is enabled/disabled
  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
  // change events from the textarea
  onChange(event) {
    this.propagateChange(event.id);
    this.propagateTouched();
    // .....
    // update the form
    // this.propagateChange(this.data);
  }
  selected(event) {
    this.propagateChange(event);
    this.propagateTouched();
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
  private propagateTouched = () => {};

  trackByFn(item: SelectOption) {
    return item.value;
  }

  private loadOptions() {
    this.remoteOptions$ = concat(
      this.dataSource
        .searchOptions('', this.effectiveDataSourceOptions())
        // concat only subscribes to the typeahead stream once the initial
        // load completes, and not every datasource completes its observable
        ?.pipe(
          take(1),
          tap(() => {
            this.errorLoading = false;
          }),
          // A request failure is not the same as a successful empty search:
          // surface it through errorLoading so the control can show an error
          // state instead of a misleading "no matches".
          catchError((error) => {
            console.error('Error loading initial options:', error);
            this.errorLoading = true;
            return of([]);
          })
        ) ?? of([]), // default items
      this.remoteOptionInput$.pipe(
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
        }),
        switchMap((term) =>
          this.dataSource
            .searchOptions(term, this.effectiveDataSourceOptions())
            .pipe(
              tap(() => {
                this.errorLoading = false;
              }),
              catchError((error) => {
                console.error('Error loading options:', error);
                this.errorLoading = true;
                return of([]);
              }),
              finalize(() => {
                this.loading = false;
              })
            )
        )
      )
    );
  }

  private effectiveDataSourceOptions(): Record<string, unknown> {
    return this.dataSourceOptions ?? this.dataSource?.dataSourceOptions ?? {};
  }

  ngOnDestroy() {
    this.remoteOptionInput$.complete();
  }
}
