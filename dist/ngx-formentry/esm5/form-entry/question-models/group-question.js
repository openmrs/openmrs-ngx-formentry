/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
var QuestionGroup = /** @class */ (function (_super) {
    tslib_1.__extends(QuestionGroup, _super);
    function QuestionGroup(options) {
        var _this = _super.call(this, options) || this;
        _this.isExpanded = true;
        _this.renderingType = 'group';
        _this.questions = options.questions || [];
        _this.controlType = AfeControlType.AfeFormGroup;
        return _this;
    }
    return QuestionGroup;
}(NestedQuestion));
export { QuestionGroup };
function QuestionGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    QuestionGroup.prototype.questions;
    /** @type {?} */
    QuestionGroup.prototype.isExpanded;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFL0QsSUFBQTtJQUFtQyx5Q0FBYztJQUk3Qyx1QkFBWSxPQUE2QjtRQUF6QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjsyQkFQWSxJQUFJO1FBSWIsS0FBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7UUFDN0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7O0tBQ2xEO3dCQWZMO0VBTW1DLGNBQWMsRUFVaEQsQ0FBQTtBQVZELHlCQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEdyb3VwUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2dyb3VwLXF1ZXN0aW9uLW9wdGlvbnMnO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5cbmltcG9ydCB7IE5lc3RlZFF1ZXN0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzL25lc3RlZC1xdWVzdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Hcm91cCBleHRlbmRzIE5lc3RlZFF1ZXN0aW9uIHtcbiAgICBxdWVzdGlvbnM6IFF1ZXN0aW9uQmFzZVtdO1xuICAgIGlzRXhwYW5kZWQgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogR3JvdXBRdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdncm91cCc7XG4gICAgICAgIHRoaXMucXVlc3Rpb25zID0gb3B0aW9ucy5xdWVzdGlvbnMgfHwgW107XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXA7XG4gICAgfVxufVxuIl19