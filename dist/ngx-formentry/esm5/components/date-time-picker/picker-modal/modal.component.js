/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * modal.component
 */
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
var ModalComponent = /** @class */ (function () {
    function ModalComponent() {
        this.onOverlayClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype.closeModal = /**
     * @return {?}
     */
    function () {
        this.onOverlayClick.emit(false);
    };
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'picker-modal',
                    template: "<section class=\"x-modal\">\n    <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n    <section class=\"modal-main\" id=\"section-modal-main\">\n        <ng-content></ng-content>\n    </section>\n</section>\n",
                    styles: [":host{z-index:9999999999}*,::after,::before{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);box-shadow:0 5px 15px rgba(0,0,0,.3)}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [],
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return []; };
    ModalComponent.propDecorators = {
        "onOverlayClick": [{ type: Output },],
    };
    return ModalComponent;
}());
export { ModalComponent };
function ModalComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ModalComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ModalComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ModalComponent.propDecorators;
    /** @type {?} */
    ModalComponent.prototype.onOverlayClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCxTQUFTLEVBQUUsTUFBTSxFQUFVLFlBQVksRUFDdkMsdUJBQXVCLEVBQzFCLE1BQU0sZUFBZSxDQUFDOztJQTJCbkI7OEJBRjJCLElBQUksWUFBWSxFQUFXO0tBR3JEOzs7O0lBRUQsaUNBQVE7OztJQUFSO0tBQ0M7Ozs7SUFFRCxtQ0FBVTs7O0lBQVY7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuQzs7Z0JBM0JKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLHNPQU1iO29CQUNHLE1BQU0sRUFBRSxDQUFDLG1UQUFtVCxDQUFDO29CQUM3VCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsVUFBVSxFQUFFLEVBQ1g7aUJBQ0o7Ozs7O21DQUlJLE1BQU07O3lCQWhDWDs7U0E4QmEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbW9kYWwuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE91dHB1dCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIHdlYnBhY2sxX1xuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuLy8gY29uc3QgbXlEcFN0eWxlczogc3RyaW5nID0gcmVxdWlyZSgnLi9tb2RhbC5jb21wb25lbnQuY3NzJyk7XG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL21vZGFsLmNvbXBvbmVudC5odG1sJyk7XG4vLyB3ZWJwYWNrMl9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwaWNrZXItbW9kYWwnLFxuICAgIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJ4LW1vZGFsXCI+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1vdmVybGF5XCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiPjwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbiBjbGFzcz1cIm1vZGFsLW1haW5cIiBpZD1cInNlY3Rpb24tbW9kYWwtbWFpblwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zZWN0aW9uPlxuPC9zZWN0aW9uPlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7ei1pbmRleDo5OTk5OTk5OTk5fSosOjphZnRlciw6OmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1vZGFsLW1haW57cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxOS42JTtyaWdodDphdXRvO3RvcDphdXRvO3otaW5kZXg6MTExO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNkN2RhZDc7Ym9yZGVyLXJhZGl1czo2cHg7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO2JveC1zaGFkb3c6MCA1cHggMTVweCByZ2JhKDAsMCwwLC4zKX1gXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAT3V0cHV0KCkgb25PdmVybGF5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBjbG9zZU1vZGFsKCkge1xuICAgICAgICB0aGlzLm9uT3ZlcmxheUNsaWNrLmVtaXQoZmFsc2UpO1xuICAgIH1cbn1cbiJdfQ==