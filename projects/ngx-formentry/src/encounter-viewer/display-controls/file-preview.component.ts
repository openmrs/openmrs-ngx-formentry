import {
    Component, OnInit, Input, forwardRef,
    OnChanges, Output, EventEmitter
  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
const noop = () => {};

@Component({
    selector: 'file-preview',
    styles: [``],
    template: `<div *ngIf="innerValue">
              <img class="img-responsive"
                [src]="innerValue | secure:this._dataSource.fetchFile" alt="image" />
                </div>`,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FilePreviewComponent),
        multi: true
      }
    ]
  })
export class FilePreviewComponent implements ControlValueAccessor {
    @Input() public source: any;
    public innerValue = null;
    private _dataSource: DataSource;
    @Input()
    public get dataSource(): DataSource {
        return this._dataSource;
    }
    public set dataSource(v: DataSource) {
        this._dataSource = v;
    }
    // Placeholders for the callbacks which are later providesd
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    constructor(private encounterService: EncounterViewerService) {}
    // get accessor
    get value(): any {
      return this.innerValue;
    }

    // set accessor including call the onchange callback
    set value(v: any) {
      if (v !== this.innerValue) {
        this.innerValue = v;
      }
    }
    // Current time string.

    public writeValue(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
      }
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
      this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
    }

    public onBlur() {
      this.onTouchedCallback();
    }

    public onChange(event: any) {
      // const files = event.srcElement.files;
      // const fileToLoad = files[0];

      // const fileReader = new FileReader();

      // fileReader.onload = (fileLoadedEvent) => {
      //   const data = fileReader.result;
      //   const fileType = data.substring('data:image/'.length, data.indexOf(';base64'));
      //   const payload = {
      //     data,
      //     extension: fileType
      //   };
      // };

      // fileReader.readAsDataURL(fileToLoad);
    }
  }
