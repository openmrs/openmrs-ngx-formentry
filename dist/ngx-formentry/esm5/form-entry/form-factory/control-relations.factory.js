/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var ControlRelationsFactory = /** @class */ (function () {
    function ControlRelationsFactory() {
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    ControlRelationsFactory.prototype.buildRelations = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var /** @type {?} */ controlsStore = this.mapControlIds(rootNode, {});
        for (var /** @type {?} */ key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                var /** @type {?} */ nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ControlRelationsFactory.prototype.buildArrayNodeRelations = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ form = node.form;
        if (!form) {
            return;
        }
        var /** @type {?} */ rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        var /** @type {?} */ rootControlsStore = this.mapControlIds(rootNode, {});
        var /** @type {?} */ arrayControlStore = this.mapControlIds(node, {});
        for (var /** @type {?} */ key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var /** @type {?} */ child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    var /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        this.setRelations(arrayControlStore, child);
                    }
                }
            }
        }
        // define relations for controls outside the group to controls in this group
        this.createRelationsToArrayControls(node);
        // fire relations
        for (var /** @type {?} */ id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
                var /** @type {?} */ child = arrayControlStore[id];
                var /** @type {?} */ control = /** @type {?} */ (child.control);
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ControlRelationsFactory.prototype.createRelationsToArrayControls = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ form = node.form;
        var /** @type {?} */ rootNode = form.rootNode;
        // build relations for control outside the array
        var /** @type {?} */ rootControlsStore = this.mapControlIds(rootNode, {});
        var /** @type {?} */ arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (var /** @type {?} */ key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var /** @type {?} */ rChild = rootControlsStore[key];
                var /** @type {?} */ parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    var _loop_1 = function (id) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            var /** @type {?} */ aChild = arrayControlStore[id];
                            var /** @type {?} */ aChildId = aChild.question.key;
                            if (this_1.hasRelation(aChildId, rChild.question)) {
                                var /** @type {?} */ nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    var /** @type {?} */ an = /** @type {?} */ (nodes[0]);
                                    var /** @type {?} */ rootControl_1 = (/** @type {?} */ (rChild.control));
                                    if (rootControl_1.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl_1.controlRelations.otherRelations.push(an);
                                    }
                                    (/** @type {?} */ (aChild.control)).addValueChangeListener(function (value) {
                                        if ((/** @type {?} */ (rootControl_1)).updateCalculatedValue) {
                                            (/** @type {?} */ (rootControl_1)).updateCalculatedValue();
                                        }
                                        rootControl_1.updateValueAndValidity();
                                        if ((/** @type {?} */ (rootControl_1)).updateHiddenState) {
                                            (/** @type {?} */ (rootControl_1)).updateHiddenState();
                                        }
                                        if ((/** @type {?} */ (rootControl_1)).updateAlert) {
                                            (/** @type {?} */ (rootControl_1)).updateAlert();
                                        }
                                        if ((/** @type {?} */ (rootControl_1)).updateDisabledState) {
                                            (/** @type {?} */ (rootControl_1)).updateDisabledState();
                                        }
                                    });
                                }
                            }
                        }
                    };
                    var this_1 = this;
                    // loop through controls in the array group
                    for (var /** @type {?} */ id in arrayControlStore) {
                        _loop_1(id);
                    }
                }
            }
        }
    };
    /**
     * @param {?} id
     * @param {?} node
     * @return {?}
     */
    ControlRelationsFactory.prototype.getRelationsForControl = /**
     * @param {?} id
     * @param {?} node
     * @return {?}
     */
    function (id, node) {
        var /** @type {?} */ relations = new Array();
        var /** @type {?} */ nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            var /** @type {?} */ nodeBase = nodeBaseArray[0];
            var /** @type {?} */ controlList = this.mapControlIds(node, {});
            for (var /** @type {?} */ key in controlList) {
                if (controlList.hasOwnProperty(key)) {
                    if (this.hasRelation(controlList[key].question.key, nodeBase.question)) {
                        relations.push(controlList[key].control);
                    }
                }
            }
        }
        return relations;
    };
    /**
     * @param {?} node
     * @param {?} controlsStore
     * @return {?}
     */
    ControlRelationsFactory.prototype.mapControlIds = /**
     * @param {?} node
     * @param {?} controlsStore
     * @return {?}
     */
    function (node, controlsStore) {
        var /** @type {?} */ children = node.children;
        for (var /** @type {?} */ key in children) {
            if (children.hasOwnProperty(key)) {
                var /** @type {?} */ child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    var /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    var /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    };
    /**
     * @param {?} controlsStore
     * @param {?} nodeBase
     * @return {?}
     */
    ControlRelationsFactory.prototype.setRelations = /**
     * @param {?} controlsStore
     * @param {?} nodeBase
     * @return {?}
     */
    function (controlsStore, nodeBase) {
        var /** @type {?} */ questionBase = nodeBase.question;
        var /** @type {?} */ id = questionBase.key;
        for (var /** @type {?} */ key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                var /** @type {?} */ node = controlsStore[key];
                var /** @type {?} */ question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl(/** @type {?} */ (node.control), /** @type {?} */ (nodeBase.control));
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    var /** @type {?} */ required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl(/** @type {?} */ (node.control), /** @type {?} */ (nodeBase.control));
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {?} id
     * @param {?} questionBase
     * @param {?=} nodeBase
     * @return {?}
     */
    ControlRelationsFactory.prototype.hasRelation = /**
     * @param {?} id
     * @param {?} questionBase
     * @param {?=} nodeBase
     * @return {?}
     */
    function (id, questionBase, nodeBase) {
        var /** @type {?} */ hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(function (element) {
                if (element instanceof JsExpressionValidationModel) {
                    var /** @type {?} */ model = /** @type {?} */ (element);
                    var /** @type {?} */ failsWhenExpression = model.failsWhenExpression;
                    if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
                        hasRelation = true;
                    }
                }
                else if (element instanceof ConditionalValidationModel && element.type === 'conditionalAnswered'
                    && element.referenceQuestionId === id) {
                    hasRelation = true;
                }
            });
        }
        // add hiders and disablers relations
        if (!hasRelation) {
            if (typeof questionBase.hide === 'string') {
                var /** @type {?} */ hide = /** @type {?} */ (questionBase.hide);
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                var /** @type {?} */ hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                var /** @type {?} */ disable = /** @type {?} */ (questionBase.disable);
                if (disable.length > 0 && disable.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
        }
        // add calculate expressions relations
        if (!hasRelation && questionBase.calculateExpression && questionBase.calculateExpression.length > 0
            && questionBase.calculateExpression.indexOf(id) !== -1) {
            hasRelation = true;
        }
        return hasRelation;
    };
    /**
     * @param {?} control
     * @param {?} related
     * @return {?}
     */
    ControlRelationsFactory.prototype.addRelationToControl = /**
     * @param {?} control
     * @param {?} related
     * @return {?}
     */
    function (control, related) {
        //  let relations = control.controlRelations.relations;
        //
        //  let hasRelation = false;
        //
        //   relations.forEach(element => {
        //
        //     let controlRelation: ControlRelation = element as ControlRelation;
        //
        //     let relation: AfeFormControl | AfeFormArray = controlRelation.control as AfeFormControl | AfeFormArray;
        //
        //     if ( control.uuid !== undefined && control.uuid === relation.uuid ) {
        //       hasRelation = true;
        //     }
        //   });
        // if ( !hasRelation ) {
        control.controlRelations.addRelatedControls(related);
        // }
    };
    ControlRelationsFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ControlRelationsFactory.ctorParameters = function () { return []; };
    return ControlRelationsFactory;
}());
export { ControlRelationsFactory };
function ControlRelationsFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ControlRelationsFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ControlRelationsFactory.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDOztJQVFyRTtLQUFpQjs7Ozs7SUFFakIsZ0RBQWM7Ozs7SUFBZCxVQUFlLFFBQW1CO1FBRWhDLHFCQUFNLGFBQWEsR0FBUSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1RCxHQUFHLENBQUMsQ0FBQyxxQkFBTSxHQUFHLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMscUJBQU0sUUFBUSxHQUFhLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDNUM7U0FDRjtLQUNGOzs7OztJQUVELHlEQUF1Qjs7OztJQUF2QixVQUF3QixJQUFlO1FBRXJDLHFCQUFNLElBQUksR0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQztTQUNSO1FBQ0QscUJBQU0sUUFBUSxHQUFjLElB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cEI7YUFDRjtTQUNGOztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLFlBQVksQ0FBQyxtQkFBbUIsSUFBSSxZQUFZLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUM7ZUFDOUYsWUFBWSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7S0FDcEI7Ozs7OztJQUVELHNEQUFvQjs7Ozs7SUFBcEIsVUFBcUIsT0FBc0MsRUFBRSxPQUFzQzs7Ozs7Ozs7Ozs7Ozs7OztRQWtCakcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztLQUV0RDs7Z0JBblRGLFVBQVU7Ozs7a0NBWFg7O1NBWWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBDb250cm9sUmVsYXRpb24gfSBmcm9tICAnLi4vLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IEFmZUZvcm1BcnJheSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGNvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgdGhpcy5zZXRSZWxhdGlvbnMoY29udHJvbHNTdG9yZSwgbm9kZUJhc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGU6IEdyb3VwTm9kZSkge1xuXG4gICAgY29uc3QgZm9ybTogRm9ybSA9IG5vZGUuZm9ybTtcblxuICAgIGlmICghZm9ybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgaW4gdGhlIHNhbWUgYXJyYXlcbiAgICB0aGlzLmJ1aWxkUmVsYXRpb25zKG5vZGUpO1xuXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9sIG91dHNpZGUgdGhlIGFycmF5XG4gICAgY29uc3Qgcm9vdENvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuICAgIGNvbnN0IGFycmF5Q29udHJvbFN0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcblxuICAgICAgaWYgKHJvb3RDb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGFycmF5Q29udHJvbFN0b3JlLCBjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgb3V0c2lkZSB0aGUgZ3JvdXAgdG8gY29udHJvbHMgaW4gdGhpcyBncm91cFxuICAgIHRoaXMuY3JlYXRlUmVsYXRpb25zVG9BcnJheUNvbnRyb2xzKG5vZGUpO1xuXG4gICAgLy8gZmlyZSByZWxhdGlvbnNcbiAgICBmb3IgKGNvbnN0IGlkIGluIGFycmF5Q29udHJvbFN0b3JlKSB7XG4gICAgICBpZiAoYXJyYXlDb250cm9sU3RvcmUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xuICAgICAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBmb3JtIGNvbnRyb2xzXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgckNoaWxkOiBOb2RlQmFzZSA9IHJvb3RDb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZVBhdGggPSBub2RlLnBhdGguc3Vic3RyaW5nKDAsIG5vZGUucGF0aC5sYXN0SW5kZXhPZignLicpKTtcblxuICAgICAgICBpZiAockNoaWxkLnBhdGguaW5kZXhPZihwYXJlbnROb2RlUGF0aCArICcuJykgPT09IC0xKSB7XG5cbiAgICAgICAgICAvLyBsb29wIHRocm91Z2ggY29udHJvbHMgaW4gdGhlIGFycmF5IGdyb3VwXG4gICAgICAgICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xuICAgICAgICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuXG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZElkID0gYUNoaWxkLnF1ZXN0aW9uLmtleTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oYUNoaWxkSWQsIHJDaGlsZC5xdWVzdGlvbikpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzOiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UGF0aChyb290Tm9kZSwgcGFyZW50Tm9kZVBhdGgsIFtdKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgYW4gPSBub2Rlc1swXSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICBjb25zdCByb290Q29udHJvbCA9IChyQ2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChyb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmluZGV4T2YoYW4pID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLnB1c2goYW4pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAoYUNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpLmFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoKHZhbHVlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSZWxhdGlvbnNGb3JDb250cm9sKGlkLCBub2RlOiBHcm91cE5vZGUpOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4ge1xuXG4gICAgY29uc3QgcmVsYXRpb25zOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBuZXcgQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KCk7XG5cbiAgICBjb25zdCBub2RlQmFzZUFycmF5OiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChpZCk7XG5cbiAgICBpZiAobm9kZUJhc2VBcnJheS5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGNvbnN0IG5vZGVCYXNlOiBOb2RlQmFzZSA9IG5vZGVCYXNlQXJyYXlbMF07XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xMaXN0OiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sTGlzdCkge1xuICAgICAgICBpZiAoY29udHJvbExpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oY29udHJvbExpc3Rba2V5XS5xdWVzdGlvbi5rZXksIG5vZGVCYXNlLnF1ZXN0aW9uKSkge1xuICAgICAgICAgICAgcmVsYXRpb25zLnB1c2goY29udHJvbExpc3Rba2V5XS5jb250cm9sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbGF0aW9ucztcbiAgfVxuXG4gIG1hcENvbnRyb2xJZHMobm9kZTogR3JvdXBOb2RlLCBjb250cm9sc1N0b3JlOiBhbnkpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHJlbikge1xuXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG5cbiAgICAgICAgICB0aGlzLm1hcENvbnRyb2xJZHMoY2hpbGQsIGNvbnRyb2xzU3RvcmUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgQXJyYXlOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sc1N0b3JlO1xuICB9XG5cbiAgc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmU6IGFueSwgbm9kZUJhc2U6IE5vZGVCYXNlKSB7XG5cbiAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IG5vZGVCYXNlLnF1ZXN0aW9uO1xuXG4gICAgY29uc3QgaWQgPSBxdWVzdGlvbkJhc2Uua2V5O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgIT09IGlkKSB7XG5cbiAgICAgICAgY29uc3Qgbm9kZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgPSBub2RlLnF1ZXN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGlkLCBxdWVzdGlvbiwgbm9kZUJhc2UpKSB7XG4gICAgICAgICAgdGhpcy5hZGRSZWxhdGlvblRvQ29udHJvbChub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGNvbmRpdGlvbmFsIHJlcXVpcmVkIGFuZCBjb25kaXRpb25hbCBhbnN3ZXJlZCByZWxhdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBxdWVzdGlvbi5yZXF1aXJlZDtcblxuICAgICAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcblxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkLnJlZmVyZW5jZVF1ZXN0aW9uSWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxuICAgICAgICAgICAgICAgIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc1JlbGF0aW9uKGlkOiBzdHJpbmcsIHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlLCBub2RlQmFzZT86IE5vZGVCYXNlKSB7XG5cbiAgICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcblxuICAgIGlmIChxdWVzdGlvbkJhc2UudmFsaWRhdG9ycyAmJiBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwpIHtcblxuICAgICAgICAgIGNvbnN0IG1vZGVsOiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgPSBlbGVtZW50IGFzIEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbDtcblxuICAgICAgICAgIGNvbnN0IGZhaWxzV2hlbkV4cHJlc3Npb246IHN0cmluZyA9IG1vZGVsLmZhaWxzV2hlbkV4cHJlc3Npb247XG4gICAgICAgICAgaWYgKGZhaWxzV2hlbkV4cHJlc3Npb24gJiYgZmFpbHNXaGVuRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsICYmIGVsZW1lbnQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsQW5zd2VyZWQnXG4gICAgICAgICAgJiYgZWxlbWVudC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGhpZGVycyBhbmQgZGlzYWJsZXJzIHJlbGF0aW9uc1xuICAgIGlmICghaGFzUmVsYXRpb24pIHtcblxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuaGlkZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb25zdCBoaWRlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuaGlkZSBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGhpZGUubGVuZ3RoID4gMCAmJiBoaWRlLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgY29uc3QgaGlkZU9iajogYW55ID0gcXVlc3Rpb25CYXNlLmhpZGU7XG5cbiAgICAgICAgaWYgKGhpZGVPYmouZmllbGQgPT09IGlkKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgaWYgKCBxdWVzdGlvbkJhc2UuYWxlcnQgJiYgdHlwZW9mIHF1ZXN0aW9uQmFzZS5hbGVydCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5kaXNhYmxlID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnN0IGRpc2FibGU6IHN0cmluZyA9IHF1ZXN0aW9uQmFzZS5kaXNhYmxlIGFzIHN0cmluZztcblxuICAgICAgICBpZiAoZGlzYWJsZS5sZW5ndGggPiAwICYmIGRpc2FibGUuaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGNhbGN1bGF0ZSBleHByZXNzaW9ucyByZWxhdGlvbnNcbiAgICBpZiAoIWhhc1JlbGF0aW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmxlbmd0aCA+IDBcbiAgICAgICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNSZWxhdGlvbjtcbiAgfVxuXG4gIGFkZFJlbGF0aW9uVG9Db250cm9sKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCByZWxhdGVkOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSkge1xuXG4gICAgLy8gIGxldCByZWxhdGlvbnMgPSBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zO1xuICAgIC8vXG4gICAgLy8gIGxldCBoYXNSZWxhdGlvbiA9IGZhbHNlO1xuICAgIC8vXG4gICAgLy8gICByZWxhdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAvL1xuICAgIC8vICAgICBsZXQgY29udHJvbFJlbGF0aW9uOiBDb250cm9sUmVsYXRpb24gPSBlbGVtZW50IGFzIENvbnRyb2xSZWxhdGlvbjtcbiAgICAvL1xuICAgIC8vICAgICBsZXQgcmVsYXRpb246IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY29udHJvbFJlbGF0aW9uLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XG4gICAgLy9cbiAgICAvLyAgICAgaWYgKCBjb250cm9sLnV1aWQgIT09IHVuZGVmaW5lZCAmJiBjb250cm9sLnV1aWQgPT09IHJlbGF0aW9uLnV1aWQgKSB7XG4gICAgLy8gICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9KTtcblxuICAgIC8vIGlmICggIWhhc1JlbGF0aW9uICkge1xuICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5hZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZCk7XG4gICAgLy8gfVxuICB9XG59XG4iXX0=