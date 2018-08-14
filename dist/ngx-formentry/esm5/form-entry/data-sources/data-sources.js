/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var DataSources = /** @class */ (function () {
    function DataSources() {
        this._dataSources = {};
    }
    Object.defineProperty(DataSources.prototype, "dataSources", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSources;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @param {?} dataSource
     * @param {?=} unWrap
     * @return {?}
     */
    DataSources.prototype.registerDataSource = /**
     * @param {?} key
     * @param {?} dataSource
     * @param {?=} unWrap
     * @return {?}
     */
    function (key, dataSource, unWrap) {
        if (unWrap === void 0) { unWrap = false; }
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    DataSources.prototype.clearDataSource = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        delete this._dataSources[key];
    };
    DataSources.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DataSources.ctorParameters = function () { return []; };
    return DataSources;
}());
export { DataSources };
function DataSources_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DataSources.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DataSources.ctorParameters;
    /** @type {?} */
    DataSources.prototype._dataSources;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQUt2Qzs0QkFENEIsRUFBRTtLQUU3QjtJQUVELHNCQUFJLG9DQUFXOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1Qjs7O09BQUE7Ozs7Ozs7SUFFRCx3Q0FBa0I7Ozs7OztJQUFsQixVQUFtQixHQUFXLEVBQUUsVUFBZSxFQUFFLE1BQWM7UUFBZCx1QkFBQSxFQUFBLGNBQWM7UUFDM0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7WUFFVCxHQUFHLENBQUMsQ0FBQyxxQkFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRDtTQUNKO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO0tBQ3ZDOzs7OztJQUVELHFDQUFlOzs7O0lBQWYsVUFBZ0IsR0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakM7O2dCQTFCSixVQUFVOzs7O3NCQUZYOztTQUdhLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhU291cmNlcyB7XG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldCBkYXRhU291cmNlcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXM7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJEYXRhU291cmNlKGtleTogc3RyaW5nLCBkYXRhU291cmNlOiBhbnksIHVuV3JhcCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh1bldyYXApIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVnaXN0ZXJpbmcnLCBvLCBkYXRhU291cmNlW29dKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGF0YVNvdXJjZShvLCBkYXRhU291cmNlW29dLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZXNba2V5XSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdPdmVycmlkaW5nIHJlZ2lzdGVyZWQgZGF0YSBzb3VyY2UnLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2VzW2tleV0gPSBkYXRhU291cmNlO1xuICAgIH1cblxuICAgIGNsZWFyRGF0YVNvdXJjZShrZXk6IHN0cmluZykge1xuICAgICAgICBkZWxldGUgdGhpcy5fZGF0YVNvdXJjZXNba2V5XTtcbiAgICB9XG5cbn1cbiJdfQ==