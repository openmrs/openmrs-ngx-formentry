import {Component, OnInit, Input} from '@angular/core';
import { EncounterViewerService } from '../encounter-viewer.service';
import * as _ from 'lodash';

@Component({
    selector: 'question-control',
    styleUrls: ['./question-control.component.css'],
    templateUrl: './question-control.component.html',
  })
export class QuestionControlComponent {
    @Input() public set schema(schema: any) {
      this._schema = schema;
    }
    @Input() public set value(value) {
      this._value = value;
    }
    @Input() public set dataSource(dataSource: any) {
      this._dataSource = dataSource;
    }
    // The internal data model
    public innerValue: any = '';
    private _value: any;
    private _schema: any;
    private _dataSource: EncounterViewerService;
    constructor() {}

    ngOnInit() {
      this.writeValue(this._value);
    }
    public isUuid(value: string) {
      if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
        return true;
      } else {
        return false;
      }
    }
    // Current time string.

    public writeValue(v: any, arrayElement?: boolean) {
      if (v !== this.innerValue) {
          if (this.isUuid(v)) {
            if (!arrayElement) {
              const val =
              this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
              if (val) { this.innerValue = val.toUpperCase(); } else { this.innerValue = v; }
            } else { return this._dataSource.resolveSelectedValueFromSchema(v, this._schema); }
          } else if (_.isArray(v)) {
            const arr = [];
            _.forEach(v, (el) => {
              arr.push(this.writeValue(el, true));
            });
            this.innerValue = arr;
          } else if (this.isDate(v)) {
              if (!arrayElement) { this.innerValue = this._dataSource.convertTime(v); } else {
                  return  this._dataSource.convertTime(v);
              }
          } else {
              if (!arrayElement) { this.innerValue = v; } else {
                return v;
              }
          }

      }
    }

    public isDate(str: string) {
      return this._dataSource.isDate(str) && !_.isNumber(str);
    }

  }
