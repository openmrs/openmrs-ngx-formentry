/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { DebugModeService } from './../services/debug-mode.service';
var HidersDisablersFactory = /** @class */ (function () {
    function HidersDisablersFactory(expressionRunner, expressionHelper, _debugModeService) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
        this._debugModeService = _debugModeService;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    HidersDisablersFactory.prototype.getJsExpressionDisabler = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    function (question, control, form) {
        var /** @type {?} */ runnable = this.expressionRunner.getRunnable(/** @type {?} */ (question.disable), control, this.expressionHelper.helperFunctions, {}, form);
        var /** @type {?} */ disabler = {
            toDisable: false,
            disableWhenExpression: /** @type {?} */ (question.disable),
            reEvaluateDisablingExpression: function () {
                var /** @type {?} */ result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    };
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    HidersDisablersFactory.prototype.getJsExpressionHider = /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    function (question, control, form) {
        var /** @type {?} */ hide = question.hide;
        var /** @type {?} */ value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : /** @type {?} */ (question.hide);
        // check if debugging has been enabled
        var /** @type {?} */ debugEnabled = this._debugModeService.debugEnabled();
        var /** @type {?} */ runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        var /** @type {?} */ hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: function () {
                /* if debug is enabled then hiders to be false
                                 else run the normal eveluator i.e runnable.run()
                                 */
                if (debugEnabled === true) {
                    hider.toHide = false;
                }
                else {
                    hider.toHide = runnable.run();
                }
            }
        };
        return hider;
    };
    /**
     * @param {?} hide
     * @return {?}
     */
    HidersDisablersFactory.prototype.convertHideObjectToString = /**
     * @param {?} hide
     * @return {?}
     */
    function (hide) {
        if (hide.value instanceof Array) {
            var /** @type {?} */ arrayStr = '\'' + hide.value.join('\',\'') + '\'';
            var /** @type {?} */ exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    };
    HidersDisablersFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HidersDisablersFactory.ctorParameters = function () { return [
        { type: ExpressionRunner, },
        { type: JsExpressionHelper, },
        { type: DebugModeService, },
    ]; };
    return HidersDisablersFactory;
}());
export { HidersDisablersFactory };
function HidersDisablersFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HidersDisablersFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HidersDisablersFactory.ctorParameters;
    /** @type {?} */
    HidersDisablersFactory.prototype.expressionRunner;
    /** @type {?} */
    HidersDisablersFactory.prototype.expressionHelper;
    /** @type {?} */
    HidersDisablersFactory.prototype._debugModeService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztJQUtoRSxnQ0FBb0IsZ0JBQWtDLEVBQzdDLGtCQUNBO1FBRlcscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUI7S0FDekI7Ozs7Ozs7SUFFRCx3REFBdUI7Ozs7OztJQUF2QixVQUF3QixRQUFzQixFQUFFLE9BQXFELEVBQ2pHLElBQVc7UUFDWCxxQkFBTSxRQUFRLEdBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsbUJBQUMsUUFBUSxDQUFDLE9BQWlCLEdBQUUsT0FBTyxFQUNqRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxxQkFBTSxRQUFRLEdBQWE7WUFDdkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIscUJBQXFCLG9CQUFFLFFBQVEsQ0FBQyxPQUFpQixDQUFBO1lBQ2pELDZCQUE2QixFQUFFO2dCQUMzQixxQkFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQzthQUMvQjtTQUNKLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ25COzs7Ozs7O0lBRUQscURBQW9COzs7Ozs7SUFBcEIsVUFBcUIsUUFBc0IsRUFBRSxPQUFxRCxFQUM5RixJQUFXO1FBRVgscUJBQU0sSUFBSSxHQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEMscUJBQU0sS0FBSyxHQUFXLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQUMsUUFBUSxDQUFDLElBQWMsQ0FBQSxDQUFDOztRQUloSCxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNELHFCQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQzNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpELHFCQUFNLEtBQUssR0FBVTtZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsMEJBQTBCLEVBQUU7Ozs7Z0JBSXhCLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBRTtpQkFDekI7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSyxDQUFDLE1BQU0sR0FBSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2xDO2FBQ047U0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7SUFFRCwwREFBeUI7Ozs7SUFBekIsVUFBMEIsSUFBUztRQUVqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFaEMscUJBQU0sUUFBUSxHQUFXLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDaEUscUJBQU0sR0FBRyxHQUFHLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNaO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNYOztnQkFoRUosVUFBVTs7OztnQkFURixnQkFBZ0I7Z0JBSWhCLGtCQUFrQjtnQkFHbEIsZ0JBQWdCOztpQ0FaekI7O1NBZWEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXNhYmxlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBIaWRlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5cbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuLy8gQWRkIGFiaWxpdHkgdG8gZGlzcGxheSBhbGwgZmllbGRzIGZvciBkZWJ1Z2dpbmdcbmltcG9ydCB7IERlYnVnTW9kZVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lcixcbiAgICAgcHJpdmF0ZSBleHByZXNzaW9uSGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIsXG4gICAgIHByaXZhdGUgX2RlYnVnTW9kZVNlcnZpY2U6IERlYnVnTW9kZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBnZXRKc0V4cHJlc3Npb25EaXNhYmxlcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgZm9ybT86IEZvcm0pOiBEaXNhYmxlciB7XG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9XG4gICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUocXVlc3Rpb24uZGlzYWJsZSBhcyBzdHJpbmcsIGNvbnRyb2wsXG4gICAgICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uSGVscGVyLmhlbHBlckZ1bmN0aW9ucywge30sIGZvcm0pO1xuICAgICAgICBjb25zdCBkaXNhYmxlcjogRGlzYWJsZXIgPSB7XG4gICAgICAgICAgICB0b0Rpc2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgZGlzYWJsZVdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZyxcbiAgICAgICAgICAgIHJlRXZhbHVhdGVEaXNhYmxpbmdFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XG4gICAgICAgICAgICAgICAgZGlzYWJsZXIudG9EaXNhYmxlID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGlzYWJsZXI7XG4gICAgfVxuXG4gICAgZ2V0SnNFeHByZXNzaW9uSGlkZXIocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgICAgIGZvcm0/OiBGb3JtKTogSGlkZXIge1xuXG4gICAgICAgIGNvbnN0IGhpZGU6IGFueSA9IHF1ZXN0aW9uLmhpZGU7XG4gICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0eXBlb2YgaGlkZSA9PT0gJ29iamVjdCcgPyB0aGlzLmNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZSkgOiBxdWVzdGlvbi5oaWRlIGFzIHN0cmluZztcblxuICAgICAgICAvLyBjaGVjayBpZiBkZWJ1Z2dpbmcgaGFzIGJlZW4gZW5hYmxlZFxuXG4gICAgICAgIGNvbnN0IGRlYnVnRW5hYmxlZCA9IHRoaXMuX2RlYnVnTW9kZVNlcnZpY2UuZGVidWdFbmFibGVkKCk7XG5cbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gdGhpcy5leHByZXNzaW9uUnVubmVyLmdldFJ1bm5hYmxlKHZhbHVlLCBjb250cm9sLFxuICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XG5cbiAgICAgICAgY29uc3QgaGlkZXI6IEhpZGVyID0ge1xuICAgICAgICAgICAgdG9IaWRlOiBmYWxzZSxcbiAgICAgICAgICAgIGhpZGVXaGVuRXhwcmVzc2lvbjogdmFsdWUsXG4gICAgICAgICAgICByZUV2YWx1YXRlSGlkaW5nRXhwcmVzc2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAvKiBpZiBkZWJ1ZyBpcyBlbmFibGVkIHRoZW4gaGlkZXJzIHRvIGJlIGZhbHNlXG4gICAgICAgICAgICAgICAgIGVsc2UgcnVuIHRoZSBub3JtYWwgZXZlbHVhdG9yIGkuZSBydW5uYWJsZS5ydW4oKVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmIChkZWJ1Z0VuYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBoaWRlci50b0hpZGUgPSBmYWxzZSA7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGhpZGVyLnRvSGlkZSA9ICBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGhpZGVyO1xuICAgIH1cblxuICAgIGNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZTogYW55KSB7XG5cbiAgICAgIGlmIChoaWRlLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuICAgICAgICBjb25zdCBhcnJheVN0cjogc3RyaW5nID0gJ1xcJycgKyBoaWRlLnZhbHVlLmpvaW4oJ1xcJyxcXCcnKSArICdcXCcnO1xuICAgICAgICBjb25zdCBleHAgPSAnIWFycmF5Q29udGFpbnMoWycgKyBhcnJheVN0ciArICddLCcgKyBoaWRlLmZpZWxkICsgJyknO1xuICAgICAgICByZXR1cm4gZXhwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuIl19