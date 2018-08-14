/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ControlRelation = /** @class */ (function () {
    function ControlRelation(control, relatedTo) {
        this._control = control;
        this._relatedTo = relatedTo;
        this._registerForChangesFromRelatedControl();
    }
    Object.defineProperty(ControlRelation.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () {
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelation.prototype, "relatedTo", {
        get: /**
         * @return {?}
         */
        function () {
            return this._relatedTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelation.prototype, "lastUpdateValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lastUpdateValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} newValue
     * @return {?}
     */
    ControlRelation.prototype.updateControlBasedOnRelation = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        if (newValue !== this._lastUpdateValue) {
            this._lastUpdateValue = newValue;
            if ((/** @type {?} */ (this._control)).updateCalculatedValue) {
                (/** @type {?} */ (this._control)).updateCalculatedValue();
            }
            this._control.updateValueAndValidity();
            if ((/** @type {?} */ (this._control)).updateHiddenState) {
                (/** @type {?} */ (this._control)).updateHiddenState();
            }
            if ((/** @type {?} */ (this._control)).updateDisabledState) {
                (/** @type {?} */ (this._control)).updateDisabledState();
            }
            if ((/** @type {?} */ (this._control)).updateAlert) {
                (/** @type {?} */ (this._control)).updateAlert();
            }
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ControlRelation.prototype._registerForChangesFromRelatedControl = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._relatedTo.valueChanges.subscribe(function (value) {
            _this.updateControlBasedOnRelation(value);
        });
    };
    return ControlRelation;
}());
export { ControlRelation };
function ControlRelation_tsickle_Closure_declarations() {
    /** @type {?} */
    ControlRelation.prototype._control;
    /** @type {?} */
    ControlRelation.prototype._relatedTo;
    /** @type {?} */
    ControlRelation.prototype._lastUpdateValue;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQSxJQUFBO0lBS0kseUJBQVksT0FBd0IsRUFBRSxTQUEwQjtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQztLQUNoRDtJQUVELHNCQUFJLG9DQUFPOzs7O1FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4Qjs7O09BQUE7SUFFRCxzQkFBSSxzQ0FBUzs7OztRQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7OztPQUFBO0lBRUQsc0JBQUksNENBQWU7Ozs7UUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQ2hDOzs7T0FBQTs7Ozs7SUFFRCxzREFBNEI7Ozs7SUFBNUIsVUFBNkIsUUFBYTtRQUN0QyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBRWpDLEVBQUUsQ0FBQyxDQUFDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLG1CQUFDLElBQUksQ0FBQyxRQUFlLEVBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzlDO1lBRUQsRUFBRSxDQUFDLENBQUMsbUJBQUMsSUFBSSxDQUFDLFFBQWUsRUFBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDN0MsbUJBQUMsSUFBSSxDQUFDLFFBQWUsRUFBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDaEQ7WUFFRCxFQUFFLENBQUMsQ0FBQyxtQkFBQyxJQUFJLENBQUMsUUFBZSxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckMsbUJBQUMsSUFBSSxDQUFDLFFBQWUsRUFBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7OztJQUVPLCtEQUFxQzs7Ozs7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUMzQyxLQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUMsQ0FBQyxDQUFDOzswQkF6RFQ7SUEyREMsQ0FBQTtBQXRERCwyQkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vIGltcG9ydCB7IENhbkhpZGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG4vLyBpbXBvcnQgeyBDYW5EaXNhYmxlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9uIHtcbiAgICBwcml2YXRlIF9jb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSBfcmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSBfbGFzdFVwZGF0ZVZhbHVlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB0aGlzLl9yZWxhdGVkVG8gPSByZWxhdGVkVG87XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRm9yQ2hhbmdlc0Zyb21SZWxhdGVkQ29udHJvbCgpO1xuICAgIH1cblxuICAgIGdldCBjb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICAgIH1cblxuICAgIGdldCByZWxhdGVkVG8oKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbGF0ZWRUbztcbiAgICB9XG5cbiAgICBnZXQgbGFzdFVwZGF0ZVZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0VXBkYXRlVmFsdWU7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29udHJvbEJhc2VkT25SZWxhdGlvbihuZXdWYWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fbGFzdFVwZGF0ZVZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0VXBkYXRlVmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCh0aGlzLl9jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgICAgICAgICAodGhpcy5fY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVnaXN0ZXJGb3JDaGFuZ2VzRnJvbVJlbGF0ZWRDb250cm9sKCkge1xuXG4gICAgICB0aGlzLl9yZWxhdGVkVG8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQmFzZWRPblJlbGF0aW9uKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==