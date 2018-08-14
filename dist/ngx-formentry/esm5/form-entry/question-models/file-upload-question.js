/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var FileUploadQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(FileUploadQuestion, _super);
    function FileUploadQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.showTime = true;
        _this.showWeeksAdder = false;
        _this.renderingType = 'file';
        _this.dataSource = options.dataSource;
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return FileUploadQuestion;
}(QuestionBase));
export { FileUploadQuestion };
function FileUploadQuestion_tsickle_Closure_declarations() {
    /** @type {?} */
    FileUploadQuestion.prototype.showTime;
    /** @type {?} */
    FileUploadQuestion.prototype.showWeeksAdder;
    /** @type {?} */
    FileUploadQuestion.prototype.dataSource;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9maWxlLXVwbG9hZC1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsSUFBQTtJQUF3Qyw4Q0FBWTtJQUloRCw0QkFBWSxPQUFrQztRQUE5QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjt5QkFSVSxJQUFJOytCQUNFLEtBQUs7UUFJbEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDNUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7S0FDcEQ7NkJBYkw7RUFJd0MsWUFBWSxFQVVuRCxDQUFBO0FBVkQsOEJBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9maWxlLXVwbG9hZC1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZFF1ZXN0aW9uIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcbiAgICBzaG93VGltZSA9IHRydWU7XG4gICAgc2hvd1dlZWtzQWRkZXIgPSBmYWxzZTtcbiAgICBkYXRhU291cmNlPzogYW55O1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpbGVVcGxvYWRRdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdmaWxlJztcbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gb3B0aW9ucy5kYXRhU291cmNlO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XG4gICAgfVxufVxuIl19