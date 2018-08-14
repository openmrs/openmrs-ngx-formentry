/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
var ExpressionRunner = /** @class */ (function () {
    function ExpressionRunner() {
    }
    /**
     * @param {?} expression
     * @param {?} control
     * @param {?} helper
     * @param {?} dataDependencies
     * @param {?=} form
     * @return {?}
     */
    ExpressionRunner.prototype.getRunnable = /**
     * @param {?} expression
     * @param {?} control
     * @param {?} helper
     * @param {?} dataDependencies
     * @param {?=} form
     * @return {?}
     */
    function (expression, control, helper, dataDependencies, form) {
        var /** @type {?} */ runner = this;
        var /** @type {?} */ runnable = {
            run: function () {
                /* tslint:disable */
                var /** @type {?} */ scope = {};
                if (control.uuid) {
                    scope[control.uuid] = control.value;
                }
                window['moment'] = moment;
                // scope.moment = moment;
                scope['myValue'] = control.value;
                runner.getControlRelationValueString(control, scope);
                runner.getHelperMethods(helper, scope);
                runner.getDataDependencies(dataDependencies, scope);
                if (form) {
                    // console.error('Form defined', form);
                    runner.getDataDependencies(form.dataSourcesContainer.dataSources, scope);
                }
                var /** @type {?} */ paramList = '';
                var /** @type {?} */ argList = '';
                for (var /** @type {?} */ o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                var /** @type {?} */ funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                var /** @type {?} */ funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
                try {
                    if (Object.keys(scope).indexOf('undefined') >= 0) {
                        console.warn('Missing reference found', expression, scope);
                        return false;
                    }
                    //console.info('results: ', expression, eval(funcDeclarationCode + funcCallCode));
                    return eval(funcDeclarationCode + funcCallCode);
                }
                catch (/** @type {?} */ e) {
                    // if (window['error_count']) {
                    //     window['error_count'] = window['error_count'] + 1;
                    // } else {
                    //     window['error_count'] = 1;
                    // }
                    // console.error(window['error_count'] + ' Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // console.error('Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // Uncomment the line above during debugging
                    // console.error('Error running expression:' + expression, scope);
                    return false;
                }
                /* tslint:enable */
            }
        };
        return runnable;
    };
    /**
     * @param {?} control
     * @param {?} scope
     * @return {?}
     */
    ExpressionRunner.prototype.getControlRelationValueString = /**
     * @param {?} control
     * @param {?} scope
     * @return {?}
     */
    function (control, scope) {
        var _this = this;
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(function (relation) {
                if (relation.relatedTo) {
                    var /** @type {?} */ related = /** @type {?} */ (relation.relatedTo);
                    var /** @type {?} */ relatedAsControl = /** @type {?} */ (relation.relatedTo);
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                    else {
                        scope[related.uuid] = relation.relatedTo.value && relation.relatedTo.value.value ?
                            relation.relatedTo.value.value : relation.relatedTo.value;
                    }
                }
            });
        }
        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach(function (node) {
                if (node instanceof ArrayNode) {
                    var /** @type {?} */ arrayNode = /** @type {?} */ (node);
                    var /** @type {?} */ uuid_1 = control.uuid;
                    var /** @type {?} */ controlRelationsFactory_1 = new ControlRelationsFactory();
                    var /** @type {?} */ relationsForControl_1 = [];
                    // get all related controls
                    arrayNode.children.forEach(function (child) {
                        relationsForControl_1 = relationsForControl_1.concat(controlRelationsFactory_1.getRelationsForControl(uuid_1, child));
                    });
                    _this.setControlArrayValues(/** @type {?} */ (control), relationsForControl_1, scope);
                }
            });
        }
    };
    /**
     * @param {?} control
     * @param {?} relationsForControl
     * @param {?} scope
     * @return {?}
     */
    ExpressionRunner.prototype.setControlArrayValues = /**
     * @param {?} control
     * @param {?} relationsForControl
     * @param {?} scope
     * @return {?}
     */
    function (control, relationsForControl, scope) {
        var _this = this;
        var /** @type {?} */ keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(function (key) {
            var /** @type {?} */ values = _this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    };
    /**
     * @param {?} array
     * @return {?}
     */
    ExpressionRunner.prototype._getFormControlKeys = /**
     * @param {?} array
     * @return {?}
     */
    function (array) {
        var /** @type {?} */ keys = [];
        array.forEach(function (control) {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    };
    /**
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    ExpressionRunner.prototype._getValuesForKey = /**
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    function (key, array) {
        var /** @type {?} */ values = [];
        array.forEach(function (control) {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    };
    /**
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    ExpressionRunner.prototype.getHelperMethods = /**
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    function (obj, scope) {
        for (var /** @type {?} */ key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    /**
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    ExpressionRunner.prototype.getDataDependencies = /**
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    function (obj, scope) {
        for (var /** @type {?} */ key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    return ExpressionRunner;
}());
export { ExpressionRunner };
/**
 * @record
 */
export function Runnable() { }
function Runnable_tsickle_Closure_declarations() {
    /** @type {?} */
    Runnable.prototype.run;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFcEYsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUN2QixJQUFBOzs7Ozs7Ozs7OztJQUNJLHNDQUFXOzs7Ozs7OztJQUFYLFVBQVksVUFBa0IsRUFBRSxPQUFxRCxFQUNqRixNQUFXLEVBQUUsZ0JBQXFCLEVBQUUsSUFBVztRQUUvQyxxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFNLFFBQVEsR0FBYTtZQUN2QixHQUFHLEVBQUU7O2dCQUdELHFCQUFJLEtBQUssR0FBUSxFQUFFLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztpQkFDdkM7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQzs7Z0JBRTFCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXBELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O29CQUVQLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUM1RTtnQkFFRCxxQkFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixxQkFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsU0FBUyxHQUFHLFNBQVMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNuRSxPQUFPLEdBQUcsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQy9GOztnQkFHRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsVUFBVSxHQUFHLFVBQVUsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDO2lCQUM5QztnQkFFRCxxQkFBSSxtQkFBbUIsR0FBRyxxQ0FBcUMsR0FBRyxTQUFTLEdBQUcsS0FBSyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3hHLHFCQUFJLFlBQVksR0FBRywyQkFBMkIsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFFOUYsSUFBSSxDQUFDO29CQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDO3FCQUNoQjs7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUMsQ0FBQztpQkFDbkQ7Z0JBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztvQkFjVCxNQUFNLENBQUMsS0FBSyxDQUFDO2lCQUNoQjs7YUFFSjtTQUNKLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ25COzs7Ozs7SUFFTyx3REFBNkI7Ozs7O2NBQUMsT0FBcUQsRUFBRSxLQUFVOztRQUNuRyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDL0MsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLHFCQUFNLE9BQU8scUJBQUcsUUFBUSxDQUFDLFNBQWdCLENBQUEsQ0FBQztvQkFDMUMscUJBQU0sZ0JBQWdCLHFCQUFHLFFBQVEsQ0FBQyxTQUE0QixDQUFBLENBQUM7b0JBQy9ELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO3FCQUNsRDtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUM5RSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO3FCQUNqRTtpQkFDSjthQUNKLENBQUMsQ0FBQztTQUNOO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYztlQUMzRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLHFCQUFNLFNBQVMscUJBQWMsSUFBaUIsQ0FBQSxDQUFDO29CQUMvQyxxQkFBTSxNQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFFMUIscUJBQU0seUJBQXVCLEdBQTRCLElBQUksdUJBQXVCLEVBQUUsQ0FBQztvQkFDdkYscUJBQUkscUJBQW1CLEdBQXlDLEVBQUUsQ0FBQzs7b0JBRW5FLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzt3QkFDNUIscUJBQW1CLEdBQUcscUJBQW1CLENBQUMsTUFBTSxDQUFDLHlCQUF1QixDQUFDLHNCQUFzQixDQUFDLE1BQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO3FCQUVqSCxDQUFDLENBQUM7b0JBRUgsS0FBSSxDQUFDLHFCQUFxQixtQkFBQyxPQUF3QyxHQUFFLHFCQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNwRzthQUNKLENBQUMsQ0FBQztTQUNOOzs7Ozs7OztJQUdHLGdEQUFxQjs7Ozs7O2NBQUMsT0FBc0MsRUFDaEUsbUJBQXlELEVBQUUsS0FBVTs7UUFDckUscUJBQU0sSUFBSSxHQUFrQixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUxRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNaLHFCQUFNLE1BQU0sR0FBUSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDcEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUN2QixDQUFDLENBQUM7Ozs7OztJQUdDLDhDQUFtQjs7OztjQUFDLEtBQTJDO1FBRW5FLHFCQUFNLElBQUksR0FBa0IsRUFBRSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBRWpCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0lBR1IsMkNBQWdCOzs7OztjQUFDLEdBQVcsRUFBRSxLQUEyQztRQUM3RSxxQkFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBRXZCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBRWpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0lBR1YsMkNBQWdCOzs7OztjQUFDLEdBQVEsRUFBRSxLQUFXO1FBQzFDLEdBQUcsQ0FBQyxDQUFDLHFCQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7Ozs7Ozs7SUFHRyw4Q0FBbUI7Ozs7O2NBQUMsR0FBUSxFQUFFLEtBQVc7UUFDN0MsR0FBRyxDQUFDLENBQUMscUJBQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7U0FDSjs7MkJBcktUO0lBdUtDLENBQUE7QUEvSkQsNEJBK0pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2NvbnRyb2wtZXh0ZW5zaW9ucyc7XG5pbXBvcnQgeyBBcnJheU5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmV4cG9ydCBjbGFzcyBFeHByZXNzaW9uUnVubmVyIHtcbiAgICBnZXRSdW5uYWJsZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLFxuICAgICAgICBoZWxwZXI6IGFueSwgZGF0YURlcGVuZGVuY2llczogYW55LCBmb3JtPzogRm9ybSk6XG4gICAgICAgIFJ1bm5hYmxlIHtcbiAgICAgICAgY29uc3QgcnVubmVyID0gdGhpcztcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0ge1xuICAgICAgICAgICAgcnVuOiAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgICAgICAgICAgICAgIGxldCBzY29wZTogYW55ID0ge307XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZVtjb250cm9sLnV1aWRdID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2luZG93Wydtb21lbnQnXSA9IG1vbWVudDtcbiAgICAgICAgICAgICAgICAvLyBzY29wZS5tb21lbnQgPSBtb21lbnQ7XG4gICAgICAgICAgICAgICAgc2NvcGVbJ215VmFsdWUnXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgcnVubmVyLmdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2wsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBydW5uZXIuZ2V0SGVscGVyTWV0aG9kcyhoZWxwZXIsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBydW5uZXIuZ2V0RGF0YURlcGVuZGVuY2llcyhkYXRhRGVwZW5kZW5jaWVzLCBzY29wZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdGb3JtIGRlZmluZWQnLCBmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgcnVubmVyLmdldERhdGFEZXBlbmRlbmNpZXMoZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcywgc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBwYXJhbUxpc3QgPSAnJztcbiAgICAgICAgICAgICAgICBsZXQgYXJnTGlzdCA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG8gaW4gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1MaXN0ID0gcGFyYW1MaXN0ID09PSBcIlwiID8gcGFyYW1MaXN0ICsgbyA6IHBhcmFtTGlzdCArICcsJyArIG87XG4gICAgICAgICAgICAgICAgICAgIGFyZ0xpc3QgPSBhcmdMaXN0ID09PSBcIlwiID8gYXJnTGlzdCArIFwic2NvcGVbJ1wiICsgbyArIFwiJ11cIiA6IGFyZ0xpc3QgKyBcIixzY29wZVsnXCIgKyBvICsgXCInXVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgbW9yZSB0aGFuIG9uZSByZXR1cm4gc3RhdGVtZW50c1xuICAgICAgICAgICAgICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3JldHVybicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gJ1wicmV0dXJuICcgKyBleHByZXNzaW9uICsgJ1wiJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZnVuY0RlY2xhcmF0aW9uQ29kZSA9ICd2YXIgYWZlRHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oXCInICsgcGFyYW1MaXN0ICsgJ1wiLCAnICsgZXhwcmVzc2lvbiArICcpOyc7XG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNDYWxsQ29kZSA9ICdhZmVEeW5hbWljRnVuYy5jYWxsKHRoaXMgJyArIChhcmdMaXN0ID09PSAnJyA/ICcnIDogJywnICsgYXJnTGlzdCkgKyAnKTsnO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2NvcGUpLmluZGV4T2YoJ3VuZGVmaW5lZCcpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWlzc2luZyByZWZlcmVuY2UgZm91bmQnLCBleHByZXNzaW9uLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3Jlc3VsdHM6ICcsIGV4cHJlc3Npb24sIGV2YWwoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh3aW5kb3dbJ2Vycm9yX2NvdW50J10pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHdpbmRvd1snZXJyb3JfY291bnQnXSA9IHdpbmRvd1snZXJyb3JfY291bnQnXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB3aW5kb3dbJ2Vycm9yX2NvdW50J10gPSAxO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3Iod2luZG93WydlcnJvcl9jb3VudCddICsgJyBFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24gKyAnLiAnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGUsIGNvbnRyb2wsICdFZmZlY3RpdmUgRXhwcmVzc2lvbicsIChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGFib3ZlIGR1cmluZyBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uLCBzY29wZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBydW5uYWJsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLCBzY29wZTogYW55KSB7XG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zKSB7XG4gICAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zLmZvckVhY2gocmVsYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5yZWxhdGVkVG8pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgQWJzdHJhY3RDb250cm9sO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbCAmJiBBcnJheS5pc0FycmF5KHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZVtyZWxhdGVkLnV1aWRdID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZSAmJiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA6IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9uc1xuICAgICAgICAgICAgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlOiBBcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXVpZCA9IGNvbnRyb2wudXVpZDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sUmVsYXRpb25zRmFjdG9yeTogQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgPSBuZXcgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbGF0aW9uc0ZvckNvbnRyb2w6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIHJlbGF0ZWQgY29udHJvbHNcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlOb2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25zRm9yQ29udHJvbCA9IHJlbGF0aW9uc0ZvckNvbnRyb2wuY29uY2F0KGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmdldFJlbGF0aW9uc0ZvckNvbnRyb2wodXVpZCwgY2hpbGQpKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRyb2xBcnJheVZhbHVlcyhjb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCByZWxhdGlvbnNGb3JDb250cm9sLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENvbnRyb2xBcnJheVZhbHVlcyhjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICAgICAgcmVsYXRpb25zRm9yQ29udHJvbDogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+LCBzY29wZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLl9nZXRGb3JtQ29udHJvbEtleXMocmVsYXRpb25zRm9yQ29udHJvbCk7XG5cbiAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXM6IGFueSA9IHRoaXMuX2dldFZhbHVlc0ZvcktleShrZXksIHJlbGF0aW9uc0ZvckNvbnRyb2wpO1xuICAgICAgICAgICAgc2NvcGVba2V5XSA9IHZhbHVlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Rm9ybUNvbnRyb2xLZXlzKGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4pOiBBcnJheTxzdHJpbmc+IHtcblxuICAgICAgICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICAgIGFycmF5LmZvckVhY2goY29udHJvbCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChrZXlzLmluZGV4T2YoY29udHJvbC51dWlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goY29udHJvbC51dWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0VmFsdWVzRm9yS2V5KGtleTogc3RyaW5nLCBhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KTogYW55IHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBhbnkgPSBbXTtcblxuICAgICAgICBhcnJheS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXG4gICAgICAgICAgICBpZiAoY29udHJvbC51dWlkID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhlbHBlck1ldGhvZHMob2JqOiBhbnksIHNjb3BlPzogYW55KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhRGVwZW5kZW5jaWVzKG9iajogYW55LCBzY29wZT86IGFueSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHNjb3BlW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSdW5uYWJsZSB7XG4gICAgcnVuKCk7XG59XG4iXX0=