/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
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
    setHistoricalValue(v) {
        this.enableHistoricalValue = v;
    }
    /**
     * @param {?=} v
     * @return {?}
     */
    showHistoricalEncounterDate(v) {
        this.showHistoricalValueDate = v === undefined ? true : v;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLE1BQU07Ozs7SUFrQ0YsWUFBWSxPQUFvQjtRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDdkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztLQUMxRDs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxDQUFVO1FBQ3pCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7S0FDbEM7Ozs7O0lBQ0QsMkJBQTJCLENBQUMsQ0FBVztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2Jhc2Utb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkJhc2UgaW1wbGVtZW50cyBCYXNlT3B0aW9ucyB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIG9yZGVyPzogbnVtYmVyO1xuICAgIHF1ZXN0aW9uT3B0aW9ucz86IGFueTtcbiAgICBxdWVzdGlvbnM/OiBhbnk7XG4gICAgcGxhY2Vob2xkZXI/OiBhbnk7XG4gICAgaGlkZGVuPzogYW55O1xuICAgIHNob3dUaW1lPzogYW55O1xuICAgIHNob3dXZWVrPzogYW55O1xuICAgIGhpc3RvcmljYWxEaXNwbGF5PzogYW55O1xuICAgIHJvd3M/OiBhbnk7XG4gICAgc2hvd1dlZWtzQWRkZXI/OiBhbnk7XG4gICAga2V5OiBzdHJpbmc7ICAgIGFsZXJ0PzogYW55O1xuXG4gICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgcmVuZGVyaW5nVHlwZTogc3RyaW5nO1xuXG4gICAgZGVmYXVsdFZhbHVlPzogYW55O1xuICAgIG9yaWdpbmFsVmFsdWU/OiBhbnk7XG4gICAgZW5hYmxlSGlzdG9yaWNhbFZhbHVlPzogYm9vbGVhbjtcbiAgICBzaG93SGlzdG9yaWNhbFZhbHVlRGF0ZT86IGJvb2xlYW47XG4gICAgaGlzdG9yaWNhbERhdGFWYWx1ZT86IGFueTtcbiAgICBleHRyYXM/OiBhbnk7XG4gICAgZGF0YVNvdXJjZT86IHN0cmluZztcbiAgICBkYXRhU291cmNlT3B0aW9ucz86IGFueTtcblxuICAgIGNvbnRyb2xUeXBlPzogQWZlQ29udHJvbFR5cGU7XG4gICAgdmFsaWRhdG9ycz86IEFycmF5PFZhbGlkYXRpb25Nb2RlbD47XG4gICAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICAgIGhpZGU/OiBzdHJpbmcgfCBib29sZWFuO1xuICAgIGRpc2FibGU/OiBzdHJpbmcgfCBib29sZWFuO1xuICAgIGNhbGN1bGF0ZUV4cHJlc3Npb24/OiBzdHJpbmc7XG4gICAgb3B0aW9ucz86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJhc2VPcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBvcHRpb25zLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFZhbHVlID0gb3B0aW9ucy5vcmlnaW5hbFZhbHVlO1xuICAgICAgICB0aGlzLmV4dHJhcyA9IG9wdGlvbnMuZXh0cmFzO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXkgfHwgJyc7XG4gICAgICAgIHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8ICcnO1xuICAgICAgICB0aGlzLnZhbGlkYXRvcnMgPSBvcHRpb25zLnZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgIHRoaXMucmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xuICAgICAgICB0aGlzLmhpZGUgPSBvcHRpb25zLmhpZGU7XG4gICAgICAgIHRoaXMuZGlzYWJsZSA9IG9wdGlvbnMuZGlzYWJsZTtcbiAgICAgICAgdGhpcy5hbGVydCA9IG9wdGlvbnMuYWxlcnQ7XG4gICAgICAgIHRoaXMuaGlzdG9yaWNhbERhdGFWYWx1ZSA9IG9wdGlvbnMuaGlzdG9yaWNhbERhdGFWYWx1ZTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVFeHByZXNzaW9uID0gb3B0aW9ucy5jYWxjdWxhdGVFeHByZXNzaW9uO1xuICAgIH1cblxuICAgIHNldEhpc3RvcmljYWxWYWx1ZSh2OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlSGlzdG9yaWNhbFZhbHVlID0gdjtcbiAgICB9XG4gICAgc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlKHY/OiBib29sZWFuKSB7XG4gICAgICB0aGlzLnNob3dIaXN0b3JpY2FsVmFsdWVEYXRlID0gdiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHY7XG4gICAgfVxufVxuIl19