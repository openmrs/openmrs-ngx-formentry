/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TextInputQuestion } from './text-input-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var TextAreaInputQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaInputQuestion, _super);
    function TextAreaInputQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.placeholder = options.placeholder || '';
        _this.isExpanded = options.isExpanded || false;
        _this.rows = options.rows || 18;
        _this.renderingType = 'textarea';
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return TextAreaInputQuestion;
}(TextInputQuestion));
export { TextAreaInputQuestion };
function TextAreaInputQuestion_tsickle_Closure_declarations() {
    /** @type {?} */
    TextAreaInputQuestion.prototype.isExpanded;
    /** @type {?} */
    TextAreaInputQuestion.prototype.rows;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLElBQUE7SUFBMkMsaURBQWlCO0lBSXhELCtCQUFZLE9BQWdDO1FBQTVDLFlBRUksa0JBQU0sT0FBTyxDQUFDLFNBTWpCO1FBTEcsS0FBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxLQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1FBQzlDLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDaEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDOztLQUNwRDtnQ0FoQkw7RUFJMkMsaUJBQWlCLEVBYTNELENBQUE7QUFiRCxpQ0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi90ZXh0LWlucHV0LXF1ZXN0aW9uJztcbmltcG9ydCB7IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RleHQtYXJlYS1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIGV4dGVuZHMgVGV4dElucHV0UXVlc3Rpb24ge1xuICAgIGlzRXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgcm93czogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogVGV4dEFyZWFRdWVzdGlvbk9wdGlvbnMpIHtcblxuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IG9wdGlvbnMuaXNFeHBhbmRlZCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3dzID0gb3B0aW9ucy5yb3dzIHx8IDE4O1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAndGV4dGFyZWEnO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XG4gICAgfVxufVxuIl19