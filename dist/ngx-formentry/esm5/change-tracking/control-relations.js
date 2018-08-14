/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { AbstractControl } from '@angular/forms';
import { ControlRelation } from './control-relation';
var ControlRelations = /** @class */ (function () {
    function ControlRelations(relationFor, relatedTo) {
        this._otherRelations = [];
        this._relationFor = relationFor;
        this._relations = [];
        if (relatedTo) {
            this.addRelatedControls(relatedTo);
        }
    }
    Object.defineProperty(ControlRelations.prototype, "relationsFor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._relationFor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelations.prototype, "relations", {
        get: /**
         * @return {?}
         */
        function () {
            return this._relations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelations.prototype, "otherRelations", {
        get: /**
         * @return {?}
         */
        function () {
            return this._otherRelations;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} relatedTo
     * @return {?}
     */
    ControlRelations.prototype.addRelatedControls = /**
     * @param {?} relatedTo
     * @return {?}
     */
    function (relatedTo) {
        if (relatedTo instanceof AbstractControl) {
            this.relations.push(new ControlRelation(this._relationFor, relatedTo));
        }
        if (relatedTo instanceof Array) {
            for (var /** @type {?} */ i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    };
    return ControlRelations;
}());
export { ControlRelations };
function ControlRelations_tsickle_Closure_declarations() {
    /** @type {?} */
    ControlRelations.prototype._relationFor;
    /** @type {?} */
    ControlRelations.prototype._relations;
    /** @type {?} */
    ControlRelations.prototype._otherRelations;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsSUFBQTtJQU1JLDBCQUFZLFdBQTRCLEVBQUUsU0FBK0M7K0JBRjFELEVBQUU7UUFHN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QztLQUNKO0lBRUQsc0JBQUksMENBQVk7Ozs7UUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1Qjs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBUzs7OztRQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7OztPQUFBO0lBRUQsc0JBQUksNENBQWM7Ozs7UUFBbEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUM3Qjs7O09BQUE7Ozs7O0lBRUQsNkNBQWtCOzs7O0lBQWxCLFVBQW1CLFNBQThDO1FBQzdELEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUMxRTtRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1NBQ0o7S0FDSjsyQkF6Q0w7SUEwQ0MsQ0FBQTtBQXRDRCw0QkFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbiB9IGZyb20gJy4vY29udHJvbC1yZWxhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zIHtcblxuICAgIHByaXZhdGUgX3JlbGF0aW9uRm9yOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSBfcmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25bXTtcbiAgICBwcml2YXRlIF9vdGhlclJlbGF0aW9uczogYW55ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG8/OiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXSkge1xuICAgICAgICB0aGlzLl9yZWxhdGlvbkZvciA9IHJlbGF0aW9uRm9yO1xuICAgICAgICB0aGlzLl9yZWxhdGlvbnMgPSBbXTtcblxuICAgICAgICBpZiAocmVsYXRlZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0aW9uc0ZvcigpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25Gb3I7XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IG90aGVyUmVsYXRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX290aGVyUmVsYXRpb25zO1xuICAgIH1cblxuICAgIGFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdKSB7XG4gICAgICAgIGlmIChyZWxhdGVkVG8gaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpb25zLnB1c2gobmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVsYXRlZFRvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsYXRlZFRvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChuZXcgQ29udHJvbFJlbGF0aW9uKHRoaXMuX3JlbGF0aW9uRm9yLCByZWxhdGVkVG9baV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==