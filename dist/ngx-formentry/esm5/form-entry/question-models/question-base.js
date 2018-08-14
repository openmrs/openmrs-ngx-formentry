/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var QuestionBase = /** @class */ (function () {
    function QuestionBase(options) {
        this.defaultValue = options.defaultValue;
        this.originalValue = options.originalValue;
        this.extras = options.extras;
        this.renderingType = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.required = options.required;
        this.hide = options.hide;
        this.disable = options.disable;
        this.alert = options.alert;
        this.historicalDataValue = options.historicalDataValue;
        this.calculateExpression = options.calculateExpression;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    QuestionBase.prototype.setHistoricalValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.enableHistoricalValue = v;
    };
    /**
     * @param {?=} v
     * @return {?}
     */
    QuestionBase.prototype.showHistoricalEncounterDate = /**
     * @param {?=} v
     * @return {?}
     */
    function (v) {
        this.showHistoricalValueDate = v === undefined ? true : v;
    };
    return QuestionBase;
}());
export { QuestionBase };
function QuestionBase_tsickle_Closure_declarations() {
    /** @type {?} */
    QuestionBase.prototype.type;
    /** @type {?} */
    QuestionBase.prototype.order;
    /** @type {?} */
    QuestionBase.prototype.questionOptions;
    /** @type {?} */
    QuestionBase.prototype.questions;
    /** @type {?} */
    QuestionBase.prototype.placeholder;
    /** @type {?} */
    QuestionBase.prototype.hidden;
    /** @type {?} */
    QuestionBase.prototype.showTime;
    /** @type {?} */
    QuestionBase.prototype.showWeek;
    /** @type {?} */
    QuestionBase.prototype.historicalDisplay;
    /** @type {?} */
    QuestionBase.prototype.rows;
    /** @type {?} */
    QuestionBase.prototype.showWeeksAdder;
    /** @type {?} */
    QuestionBase.prototype.key;
    /** @type {?} */
    QuestionBase.prototype.alert;
    /** @type {?} */
    QuestionBase.prototype.label;
    /** @type {?} */
    QuestionBase.prototype.renderingType;
    /** @type {?} */
    QuestionBase.prototype.defaultValue;
    /** @type {?} */
    QuestionBase.prototype.originalValue;
    /** @type {?} */
    QuestionBase.prototype.enableHistoricalValue;
    /** @type {?} */
    QuestionBase.prototype.showHistoricalValueDate;
    /** @type {?} */
    QuestionBase.prototype.historicalDataValue;
    /** @type {?} */
    QuestionBase.prototype.extras;
    /** @type {?} */
    QuestionBase.prototype.dataSource;
    /** @type {?} */
    QuestionBase.prototype.dataSourceOptions;
    /** @type {?} */
    QuestionBase.prototype.controlType;
    /** @type {?} */
    QuestionBase.prototype.validators;
    /** @type {?} */
    QuestionBase.prototype.required;
    /** @type {?} */
    QuestionBase.prototype.hide;
    /** @type {?} */
    QuestionBase.prototype.disable;
    /** @type {?} */
    QuestionBase.prototype.calculateExpression;
    /** @type {?} */
    QuestionBase.prototype.options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLElBQUE7SUFrQ0ksc0JBQVksT0FBb0I7UUFFNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7S0FDMUQ7Ozs7O0lBRUQseUNBQWtCOzs7O0lBQWxCLFVBQW1CLENBQVU7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFDRCxrREFBMkI7Ozs7SUFBM0IsVUFBNEIsQ0FBVztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7dUJBNURMO0lBNkRDLENBQUE7QUF6REQsd0JBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvYmFzZS1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi92YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQmFzZSBpbXBsZW1lbnRzIEJhc2VPcHRpb25zIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgb3JkZXI/OiBudW1iZXI7XG4gICAgcXVlc3Rpb25PcHRpb25zPzogYW55O1xuICAgIHF1ZXN0aW9ucz86IGFueTtcbiAgICBwbGFjZWhvbGRlcj86IGFueTtcbiAgICBoaWRkZW4/OiBhbnk7XG4gICAgc2hvd1RpbWU/OiBhbnk7XG4gICAgc2hvd1dlZWs/OiBhbnk7XG4gICAgaGlzdG9yaWNhbERpc3BsYXk/OiBhbnk7XG4gICAgcm93cz86IGFueTtcbiAgICBzaG93V2Vla3NBZGRlcj86IGFueTtcbiAgICBrZXk6IHN0cmluZzsgICAgYWxlcnQ/OiBhbnk7XG5cbiAgICBsYWJlbD86IHN0cmluZztcbiAgICByZW5kZXJpbmdUeXBlOiBzdHJpbmc7XG5cbiAgICBkZWZhdWx0VmFsdWU/OiBhbnk7XG4gICAgb3JpZ2luYWxWYWx1ZT86IGFueTtcbiAgICBlbmFibGVIaXN0b3JpY2FsVmFsdWU/OiBib29sZWFuO1xuICAgIHNob3dIaXN0b3JpY2FsVmFsdWVEYXRlPzogYm9vbGVhbjtcbiAgICBoaXN0b3JpY2FsRGF0YVZhbHVlPzogYW55O1xuICAgIGV4dHJhcz86IGFueTtcbiAgICBkYXRhU291cmNlPzogc3RyaW5nO1xuICAgIGRhdGFTb3VyY2VPcHRpb25zPzogYW55O1xuXG4gICAgY29udHJvbFR5cGU/OiBBZmVDb250cm9sVHlwZTtcbiAgICB2YWxpZGF0b3JzPzogQXJyYXk8VmFsaWRhdGlvbk1vZGVsPjtcbiAgICByZXF1aXJlZD86IGJvb2xlYW47XG4gICAgaGlkZT86IHN0cmluZyB8IGJvb2xlYW47XG4gICAgZGlzYWJsZT86IHN0cmluZyB8IGJvb2xlYW47XG4gICAgY2FsY3VsYXRlRXhwcmVzc2lvbj86IHN0cmluZztcbiAgICBvcHRpb25zPzogYW55O1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQmFzZU9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlO1xuICAgICAgICB0aGlzLm9yaWdpbmFsVmFsdWUgPSBvcHRpb25zLm9yaWdpbmFsVmFsdWU7XG4gICAgICAgIHRoaXMuZXh0cmFzID0gb3B0aW9ucy5leHRyYXM7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICAgICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleSB8fCAnJztcbiAgICAgICAgdGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgJyc7XG4gICAgICAgIHRoaXMudmFsaWRhdG9ycyA9IG9wdGlvbnMudmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgdGhpcy5yZXF1aXJlZCA9IG9wdGlvbnMucmVxdWlyZWQ7XG4gICAgICAgIHRoaXMuaGlkZSA9IG9wdGlvbnMuaGlkZTtcbiAgICAgICAgdGhpcy5kaXNhYmxlID0gb3B0aW9ucy5kaXNhYmxlO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gb3B0aW9ucy5hbGVydDtcbiAgICAgICAgdGhpcy5oaXN0b3JpY2FsRGF0YVZhbHVlID0gb3B0aW9ucy5oaXN0b3JpY2FsRGF0YVZhbHVlO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUV4cHJlc3Npb24gPSBvcHRpb25zLmNhbGN1bGF0ZUV4cHJlc3Npb247XG4gICAgfVxuXG4gICAgc2V0SGlzdG9yaWNhbFZhbHVlKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5lbmFibGVIaXN0b3JpY2FsVmFsdWUgPSB2O1xuICAgIH1cbiAgICBzaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUodj86IGJvb2xlYW4pIHtcbiAgICAgIHRoaXMuc2hvd0hpc3RvcmljYWxWYWx1ZURhdGUgPSB2ID09PSB1bmRlZmluZWQgPyB0cnVlIDogdjtcbiAgICB9XG59XG4iXX0=