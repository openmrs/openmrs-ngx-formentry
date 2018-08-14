/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ValidationModel } from './validation.model';
export class DateValidationModel extends ValidationModel {
    /**
     * @param {?} validations
     */
    constructor(validations) {
        super(validations);
        this.allowFutureDates = false;
        this.allowFutureDates = validations.allowFutureDates === 'true' ? true : false;
    }
}
function DateValidationModel_tsickle_Closure_declarations() {
    /** @type {?} */
    DateValidationModel.prototype.allowFutureDates;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsTUFBTSwwQkFBMkIsU0FBUSxlQUFlOzs7O0lBSXRELFlBQVksV0FBZ0I7UUFDMUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUhGLEtBQUs7UUFLdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2hGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgRGF0ZVZhbGlkYXRpb25Nb2RlbCBleHRlbmRzIFZhbGlkYXRpb25Nb2RlbCB7XG5cbiAgYWxsb3dGdXR1cmVEYXRlcyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25zOiBhbnkpIHtcbiAgICBzdXBlcih2YWxpZGF0aW9ucyk7XG5cbiAgICB0aGlzLmFsbG93RnV0dXJlRGF0ZXMgPSB2YWxpZGF0aW9ucy5hbGxvd0Z1dHVyZURhdGVzID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gIH1cbn1cbiJdfQ==