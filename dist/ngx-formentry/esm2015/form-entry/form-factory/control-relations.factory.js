/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
export class ControlRelationsFactory {
    constructor() { }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    buildRelations(rootNode) {
        const /** @type {?} */ controlsStore = this.mapControlIds(rootNode, {});
        for (const /** @type {?} */ key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                const /** @type {?} */ nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    buildArrayNodeRelations(node) {
        const /** @type {?} */ form = node.form;
        if (!form) {
            return;
        }
        const /** @type {?} */ rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        const /** @type {?} */ rootControlsStore = this.mapControlIds(rootNode, {});
        const /** @type {?} */ arrayControlStore = this.mapControlIds(node, {});
        for (const /** @type {?} */ key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                const /** @type {?} */ child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    const /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        this.setRelations(arrayControlStore, child);
                    }
                }
            }
        }
        // define relations for controls outside the group to controls in this group
        this.createRelationsToArrayControls(node);
        // fire relations
        for (const /** @type {?} */ id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
                const /** @type {?} */ child = arrayControlStore[id];
                const /** @type {?} */ control = /** @type {?} */ (child.control);
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    createRelationsToArrayControls(node) {
        const /** @type {?} */ form = node.form;
        const /** @type {?} */ rootNode = form.rootNode;
        // build relations for control outside the array
        const /** @type {?} */ rootControlsStore = this.mapControlIds(rootNode, {});
        const /** @type {?} */ arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (const /** @type {?} */ key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                const /** @type {?} */ rChild = rootControlsStore[key];
                const /** @type {?} */ parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    // loop through controls in the array group
                    for (const /** @type {?} */ id in arrayControlStore) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            const /** @type {?} */ aChild = arrayControlStore[id];
                            const /** @type {?} */ aChildId = aChild.question.key;
                            if (this.hasRelation(aChildId, rChild.question)) {
                                const /** @type {?} */ nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    const /** @type {?} */ an = /** @type {?} */ (nodes[0]);
                                    const /** @type {?} */ rootControl = (/** @type {?} */ (rChild.control));
                                    if (rootControl.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl.controlRelations.otherRelations.push(an);
                                    }
                                    (/** @type {?} */ (aChild.control)).addValueChangeListener((value) => {
                                        if ((/** @type {?} */ (rootControl)).updateCalculatedValue) {
                                            (/** @type {?} */ (rootControl)).updateCalculatedValue();
                                        }
                                        rootControl.updateValueAndValidity();
                                        if ((/** @type {?} */ (rootControl)).updateHiddenState) {
                                            (/** @type {?} */ (rootControl)).updateHiddenState();
                                        }
                                        if ((/** @type {?} */ (rootControl)).updateAlert) {
                                            (/** @type {?} */ (rootControl)).updateAlert();
                                        }
                                        if ((/** @type {?} */ (rootControl)).updateDisabledState) {
                                            (/** @type {?} */ (rootControl)).updateDisabledState();
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} id
     * @param {?} node
     * @return {?}
     */
    getRelationsForControl(id, node) {
        const /** @type {?} */ relations = new Array();
        const /** @type {?} */ nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            const /** @type {?} */ nodeBase = nodeBaseArray[0];
            const /** @type {?} */ controlList = this.mapControlIds(node, {});
            for (const /** @type {?} */ key in controlList) {
                if (controlList.hasOwnProperty(key)) {
                    if (this.hasRelation(controlList[key].question.key, nodeBase.question)) {
                        relations.push(controlList[key].control);
                    }
                }
            }
        }
        return relations;
    }
    /**
     * @param {?} node
     * @param {?} controlsStore
     * @return {?}
     */
    mapControlIds(node, controlsStore) {
        const /** @type {?} */ children = node.children;
        for (const /** @type {?} */ key in children) {
            if (children.hasOwnProperty(key)) {
                const /** @type {?} */ child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    const /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    const /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    }
    /**
     * @param {?} controlsStore
     * @param {?} nodeBase
     * @return {?}
     */
    setRelations(controlsStore, nodeBase) {
        const /** @type {?} */ questionBase = nodeBase.question;
        const /** @type {?} */ id = questionBase.key;
        for (const /** @type {?} */ key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                const /** @type {?} */ node = controlsStore[key];
                const /** @type {?} */ question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl(/** @type {?} */ (node.control), /** @type {?} */ (nodeBase.control));
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    const /** @type {?} */ required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl(/** @type {?} */ (node.control), /** @type {?} */ (nodeBase.control));
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} id
     * @param {?} questionBase
     * @param {?=} nodeBase
     * @return {?}
     */
    hasRelation(id, questionBase, nodeBase) {
        let /** @type {?} */ hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(element => {
                if (element instanceof JsExpressionValidationModel) {
                    const /** @type {?} */ model = /** @type {?} */ (element);
                    const /** @type {?} */ failsWhenExpression = model.failsWhenExpression;
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
                const /** @type {?} */ hide = /** @type {?} */ (questionBase.hide);
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                const /** @type {?} */ hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                const /** @type {?} */ disable = /** @type {?} */ (questionBase.disable);
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
    }
    /**
     * @param {?} control
     * @param {?} related
     * @return {?}
     */
    addRelationToControl(control, related) {
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
    }
}
ControlRelationsFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ControlRelationsFactory.ctorParameters = () => [];
function ControlRelationsFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ControlRelationsFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ControlRelationsFactory.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTXZFLE1BQU07SUFFSixpQkFBaUI7Ozs7O0lBRWpCLGNBQWMsQ0FBQyxRQUFtQjtRQUVoQyx1QkFBTSxhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFNUQsR0FBRyxDQUFDLENBQUMsdUJBQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLHVCQUFNLFFBQVEsR0FBYSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTlDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7S0FDRjs7Ozs7SUFFRCx1QkFBdUIsQ0FBQyxJQUFlO1FBRXJDLHVCQUFNLElBQUksR0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQztTQUNSO1FBQ0QsdUJBQU0sUUFBUSxHQUFjLElBQUksQ0FBQyxR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QyxtQkFBbUIsSUFBSSxZQUFZLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUM7ZUFDOUYsWUFBWSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7S0FDcEI7Ozs7OztJQUVELG9CQUFvQixDQUFDLE9BQXNDLEVBQUUsT0FBc0M7Ozs7Ozs7Ozs7Ozs7Ozs7UUFrQmpHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7S0FFdEQ7OztZQW5URixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBDb250cm9sUmVsYXRpb24gfSBmcm9tICAnLi4vLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IEFmZUZvcm1BcnJheSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGNvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgdGhpcy5zZXRSZWxhdGlvbnMoY29udHJvbHNTdG9yZSwgbm9kZUJhc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGU6IEdyb3VwTm9kZSkge1xuXG4gICAgY29uc3QgZm9ybTogRm9ybSA9IG5vZGUuZm9ybTtcblxuICAgIGlmICghZm9ybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgaW4gdGhlIHNhbWUgYXJyYXlcbiAgICB0aGlzLmJ1aWxkUmVsYXRpb25zKG5vZGUpO1xuXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9sIG91dHNpZGUgdGhlIGFycmF5XG4gICAgY29uc3Qgcm9vdENvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuICAgIGNvbnN0IGFycmF5Q29udHJvbFN0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcblxuICAgICAgaWYgKHJvb3RDb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGFycmF5Q29udHJvbFN0b3JlLCBjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgb3V0c2lkZSB0aGUgZ3JvdXAgdG8gY29udHJvbHMgaW4gdGhpcyBncm91cFxuICAgIHRoaXMuY3JlYXRlUmVsYXRpb25zVG9BcnJheUNvbnRyb2xzKG5vZGUpO1xuXG4gICAgLy8gZmlyZSByZWxhdGlvbnNcbiAgICBmb3IgKGNvbnN0IGlkIGluIGFycmF5Q29udHJvbFN0b3JlKSB7XG4gICAgICBpZiAoYXJyYXlDb250cm9sU3RvcmUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xuICAgICAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBmb3JtIGNvbnRyb2xzXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgckNoaWxkOiBOb2RlQmFzZSA9IHJvb3RDb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZVBhdGggPSBub2RlLnBhdGguc3Vic3RyaW5nKDAsIG5vZGUucGF0aC5sYXN0SW5kZXhPZignLicpKTtcblxuICAgICAgICBpZiAockNoaWxkLnBhdGguaW5kZXhPZihwYXJlbnROb2RlUGF0aCArICcuJykgPT09IC0xKSB7XG5cbiAgICAgICAgICAvLyBsb29wIHRocm91Z2ggY29udHJvbHMgaW4gdGhlIGFycmF5IGdyb3VwXG4gICAgICAgICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xuICAgICAgICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuXG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZElkID0gYUNoaWxkLnF1ZXN0aW9uLmtleTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oYUNoaWxkSWQsIHJDaGlsZC5xdWVzdGlvbikpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzOiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UGF0aChyb290Tm9kZSwgcGFyZW50Tm9kZVBhdGgsIFtdKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgYW4gPSBub2Rlc1swXSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICBjb25zdCByb290Q29udHJvbCA9IChyQ2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChyb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmluZGV4T2YoYW4pID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLnB1c2goYW4pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAoYUNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpLmFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoKHZhbHVlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSZWxhdGlvbnNGb3JDb250cm9sKGlkLCBub2RlOiBHcm91cE5vZGUpOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4ge1xuXG4gICAgY29uc3QgcmVsYXRpb25zOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBuZXcgQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KCk7XG5cbiAgICBjb25zdCBub2RlQmFzZUFycmF5OiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChpZCk7XG5cbiAgICBpZiAobm9kZUJhc2VBcnJheS5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGNvbnN0IG5vZGVCYXNlOiBOb2RlQmFzZSA9IG5vZGVCYXNlQXJyYXlbMF07XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xMaXN0OiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sTGlzdCkge1xuICAgICAgICBpZiAoY29udHJvbExpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oY29udHJvbExpc3Rba2V5XS5xdWVzdGlvbi5rZXksIG5vZGVCYXNlLnF1ZXN0aW9uKSkge1xuICAgICAgICAgICAgcmVsYXRpb25zLnB1c2goY29udHJvbExpc3Rba2V5XS5jb250cm9sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbGF0aW9ucztcbiAgfVxuXG4gIG1hcENvbnRyb2xJZHMobm9kZTogR3JvdXBOb2RlLCBjb250cm9sc1N0b3JlOiBhbnkpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHJlbikge1xuXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG5cbiAgICAgICAgICB0aGlzLm1hcENvbnRyb2xJZHMoY2hpbGQsIGNvbnRyb2xzU3RvcmUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgQXJyYXlOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sc1N0b3JlO1xuICB9XG5cbiAgc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmU6IGFueSwgbm9kZUJhc2U6IE5vZGVCYXNlKSB7XG5cbiAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IG5vZGVCYXNlLnF1ZXN0aW9uO1xuXG4gICAgY29uc3QgaWQgPSBxdWVzdGlvbkJhc2Uua2V5O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgIT09IGlkKSB7XG5cbiAgICAgICAgY29uc3Qgbm9kZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgPSBub2RlLnF1ZXN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGlkLCBxdWVzdGlvbiwgbm9kZUJhc2UpKSB7XG4gICAgICAgICAgdGhpcy5hZGRSZWxhdGlvblRvQ29udHJvbChub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGNvbmRpdGlvbmFsIHJlcXVpcmVkIGFuZCBjb25kaXRpb25hbCBhbnN3ZXJlZCByZWxhdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBxdWVzdGlvbi5yZXF1aXJlZDtcblxuICAgICAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcblxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkLnJlZmVyZW5jZVF1ZXN0aW9uSWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxuICAgICAgICAgICAgICAgIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc1JlbGF0aW9uKGlkOiBzdHJpbmcsIHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlLCBub2RlQmFzZT86IE5vZGVCYXNlKSB7XG5cbiAgICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcblxuICAgIGlmIChxdWVzdGlvbkJhc2UudmFsaWRhdG9ycyAmJiBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwpIHtcblxuICAgICAgICAgIGNvbnN0IG1vZGVsOiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgPSBlbGVtZW50IGFzIEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbDtcblxuICAgICAgICAgIGNvbnN0IGZhaWxzV2hlbkV4cHJlc3Npb246IHN0cmluZyA9IG1vZGVsLmZhaWxzV2hlbkV4cHJlc3Npb247XG4gICAgICAgICAgaWYgKGZhaWxzV2hlbkV4cHJlc3Npb24gJiYgZmFpbHNXaGVuRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsICYmIGVsZW1lbnQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsQW5zd2VyZWQnXG4gICAgICAgICAgJiYgZWxlbWVudC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGhpZGVycyBhbmQgZGlzYWJsZXJzIHJlbGF0aW9uc1xuICAgIGlmICghaGFzUmVsYXRpb24pIHtcblxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuaGlkZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb25zdCBoaWRlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuaGlkZSBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGhpZGUubGVuZ3RoID4gMCAmJiBoaWRlLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgY29uc3QgaGlkZU9iajogYW55ID0gcXVlc3Rpb25CYXNlLmhpZGU7XG5cbiAgICAgICAgaWYgKGhpZGVPYmouZmllbGQgPT09IGlkKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgaWYgKCBxdWVzdGlvbkJhc2UuYWxlcnQgJiYgdHlwZW9mIHF1ZXN0aW9uQmFzZS5hbGVydCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5kaXNhYmxlID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnN0IGRpc2FibGU6IHN0cmluZyA9IHF1ZXN0aW9uQmFzZS5kaXNhYmxlIGFzIHN0cmluZztcblxuICAgICAgICBpZiAoZGlzYWJsZS5sZW5ndGggPiAwICYmIGRpc2FibGUuaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGNhbGN1bGF0ZSBleHByZXNzaW9ucyByZWxhdGlvbnNcbiAgICBpZiAoIWhhc1JlbGF0aW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmxlbmd0aCA+IDBcbiAgICAgICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNSZWxhdGlvbjtcbiAgfVxuXG4gIGFkZFJlbGF0aW9uVG9Db250cm9sKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCByZWxhdGVkOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSkge1xuXG4gICAgLy8gIGxldCByZWxhdGlvbnMgPSBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zO1xuICAgIC8vXG4gICAgLy8gIGxldCBoYXNSZWxhdGlvbiA9IGZhbHNlO1xuICAgIC8vXG4gICAgLy8gICByZWxhdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAvL1xuICAgIC8vICAgICBsZXQgY29udHJvbFJlbGF0aW9uOiBDb250cm9sUmVsYXRpb24gPSBlbGVtZW50IGFzIENvbnRyb2xSZWxhdGlvbjtcbiAgICAvL1xuICAgIC8vICAgICBsZXQgcmVsYXRpb246IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY29udHJvbFJlbGF0aW9uLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XG4gICAgLy9cbiAgICAvLyAgICAgaWYgKCBjb250cm9sLnV1aWQgIT09IHVuZGVmaW5lZCAmJiBjb250cm9sLnV1aWQgPT09IHJlbGF0aW9uLnV1aWQgKSB7XG4gICAgLy8gICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9KTtcblxuICAgIC8vIGlmICggIWhhc1JlbGF0aW9uICkge1xuICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5hZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZCk7XG4gICAgLy8gfVxuICB9XG59XG4iXX0=