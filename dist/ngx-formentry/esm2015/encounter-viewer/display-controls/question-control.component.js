/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
export class QuestionControlComponent {
    constructor() {
        this.innerValue = '';
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    set schema(schema) {
        this._schema = schema;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
    }
    /**
     * @param {?} dataSource
     * @return {?}
     */
    set dataSource(dataSource) {
        this._dataSource = dataSource;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.writeValue(this._value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isUuid(value) {
        if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    writeValue(v, arrayElement) {
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
                    const /** @type {?} */ val = this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                    if (val) {
                        this.innerValue = val.toUpperCase();
                    }
                    else {
                        this.innerValue = v;
                    }
                }
                else {
                    return this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                }
            }
            else if (_.isArray(v)) {
                const /** @type {?} */ arr = [];
                _.forEach(v, (el) => {
                    arr.push(this.writeValue(el, true));
                });
                this.innerValue = arr;
            }
            else if (this.isDate(v)) {
                if (!arrayElement) {
                    this.innerValue = this._dataSource.convertTime(v);
                }
                else {
                    return this._dataSource.convertTime(v);
                }
            }
            else {
                if (!arrayElement) {
                    this.innerValue = v;
                }
                else {
                    return v;
                }
            }
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    isDate(str) {
        return this._dataSource.isDate(str) && !_.isNumber(str);
    }
}
QuestionControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'question-control',
                styles: [`input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}`],
                template: `<div>
    {{innerValue}}
</div>`,
            },] },
];
/** @nocollapse */
QuestionControlComponent.ctorParameters = () => [];
QuestionControlComponent.propDecorators = {
    "schema": [{ type: Input },],
    "value": [{ type: Input },],
    "dataSource": [{ type: Input },],
};
function QuestionControlComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    QuestionControlComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    QuestionControlComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    QuestionControlComponent.propDecorators;
    /** @type {?} */
    QuestionControlComponent.prototype.innerValue;
    /** @type {?} */
    QuestionControlComponent.prototype._value;
    /** @type {?} */
    QuestionControlComponent.prototype._schema;
    /** @type {?} */
    QuestionControlComponent.prototype._dataSource;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBUzVCLE1BQU07SUFlRjswQkFKeUIsRUFBRTtLQUlYOzs7OztRQWRJLE1BQU0sQ0FBQyxNQUFXO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7Ozs7UUFFSixLQUFLLENBQUMsS0FBSztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7Ozs7O1FBRUYsVUFBVSxDQUFDLFVBQWU7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Ozs7O0lBU2hDLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5Qjs7Ozs7SUFDTSxNQUFNLENBQUMsS0FBYTtRQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkOzs7Ozs7O0lBSUksVUFBVSxDQUFDLENBQU0sRUFBRSxZQUFzQjtRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsdUJBQU0sR0FBRyxHQUNULElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFBRTtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztxQkFBRTtpQkFDaEY7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFBRTthQUNwRjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsdUJBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO29CQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3JDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN2QjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQUU7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVFLE1BQU0sQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0M7YUFDSjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztpQkFBRTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDVjthQUNKO1NBRUo7Ozs7OztJQUdJLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7WUFoRTdELFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixNQUFNLEVBQUUsQ0FBQywwSEFBMEgsQ0FBQztnQkFDcEksUUFBUSxFQUFFOztPQUVQO2FBQ0o7Ozs7O3VCQUVFLEtBQUs7c0JBR0wsS0FBSzsyQkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncXVlc3Rpb24tY29udHJvbCcsXG4gICAgc3R5bGVzOiBbYGlucHV0e2JvcmRlcjpub25lO2JveC1zaGFkb3c6bm9uZTtjb2xvcjojMDAwO2JhY2tncm91bmQ6I2ZmZiFpbXBvcnRhbnQ7cGFkZGluZy10b3A6MjNweDtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfWBdLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgICB7e2lubmVyVmFsdWV9fVxuPC9kaXY+YCxcbiAgfSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgc2NoZW1hKHNjaGVtYTogYW55KSB7XG4gICAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlOiBhbnkpIHtcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIH1cbiAgICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICAgIHB1YmxpYyBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuICAgIHByaXZhdGUgX3NjaGVtYTogYW55O1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICBwdWJsaWMgaXNVdWlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDM2ICYmIHZhbHVlLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgdmFsdWUuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHY6IGFueSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbikge1xuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmlzVXVpZCh2KSkge1xuICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID1cbiAgICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEodiwgdGhpcy5fc2NoZW1hKTtcbiAgICAgICAgICAgICAgaWYgKHZhbCkgeyB0aGlzLmlubmVyVmFsdWUgPSB2YWwudG9VcHBlckNhc2UoKTsgfSBlbHNlIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfVxuICAgICAgICAgICAgfSBlbHNlIHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKHYsIHRoaXMuX3NjaGVtYSk7IH1cbiAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgICAgICBfLmZvckVhY2godiwgKGVsKSA9PiB7XG4gICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMud3JpdGVWYWx1ZShlbCwgdHJ1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSBhcnI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkgeyB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpOyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc0RhdGUoc3RyOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlLmlzRGF0ZShzdHIpICYmICFfLmlzTnVtYmVyKHN0cik7XG4gICAgfVxuXG4gIH1cbiJdfQ==