/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class FormErrorsService {
    constructor() {
        this.announceErrorFieldSource = new Subject();
        this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
    }
    /**
     * @param {?} error
     * @return {?}
     */
    announceErrorField(error) {
        this.announceErrorFieldSource.next(error);
    }
}
FormErrorsService.control = null;
FormErrorsService.tab = null;
FormErrorsService.decorators = [
    { type: Injectable },
];
function FormErrorsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormErrorsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormErrorsService.ctorParameters;
    /** @type {?} */
    FormErrorsService.control;
    /** @type {?} */
    FormErrorsService.tab;
    /** @type {?} */
    FormErrorsService.prototype.announceErrorFieldSource;
    /** @type {?} */
    FormErrorsService.prototype.announceErrorField$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTy9CLE1BQU07O3dDQUs4QixJQUFJLE9BQU8sRUFBVTttQ0FDVCxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFOzs7Ozs7SUFDbkYsa0JBQWtCLENBQUMsS0FBYTtRQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7NEJBTDJCLElBQUk7d0JBQy9DLElBQUk7O1lBTGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL3B1YmxpY19hcGknO1xuaW1wb3J0IHsgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yc1NlcnZpY2Uge1xuXG4gIC8vIE9ic2VydmFibGUgc3RyaW5nIHNvdXJjZXNcbiAgcHVibGljIHN0YXRpYyBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCAgPSBudWxsO1xuICBwdWJsaWMgc3RhdGljIHRhYjogbnVtYmVyID0gbnVsbDtcbiAgcHVibGljIGFubm91bmNlRXJyb3JGaWVsZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHVibGljIGFubm91bmNlRXJyb3JGaWVsZCQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuYW5ub3VuY2VFcnJvckZpZWxkU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFubm91bmNlRXJyb3JGaWVsZFNvdXJjZS5uZXh0KGVycm9yKTtcbiAgfVxufVxuIl19