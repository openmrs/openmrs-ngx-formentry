/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LeafNode, GroupNode, ArrayNode } from './form-node';
import { NestedQuestion, RepeatingQuestion, QuestionGroup } from '../question-models/models';
import { FormControlService } from './form-control.service';
import { QuestionFactory } from './question.factory';
import { AfeControlType, AfeFormArray } from '../../abstract-controls-extension';
import { ControlRelationsFactory } from './control-relations.factory';
import { Validations } from '../validators/validations';
import { Form } from './form';
var FormFactory = /** @class */ (function () {
    function FormFactory(controlService, questionFactroy, controlRelationsFactory) {
        this.controlService = controlService;
        this.questionFactroy = questionFactroy;
        this.controlRelationsFactory = controlRelationsFactory;
        this.hd = {
            getValue: function () {
                return 20;
            }
        };
    }
    /**
     * @param {?} schema
     * @param {?=} dataSource
     * @return {?}
     */
    FormFactory.prototype.createForm = /**
     * @param {?} schema
     * @param {?=} dataSource
     * @return {?}
     */
    function (schema, dataSource) {
        var /** @type {?} */ form = new Form(schema, this, this.questionFactroy);
        if (dataSource) {
            for (var /** @type {?} */ key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                }
            }
        }
        var /** @type {?} */ question = this.questionFactroy.createQuestionModel(schema, form);
        form.rootNode = /** @type {?} */ (this.createNode(question, null, null, form));
        this.buildRelations(form.rootNode);
        form.updateHiddenDisabledStateForAllControls();
        form.updateAlertsForAllControls();
        return form;
    };
    /**
     * @param {?} rootNode
     * @return {?}
     */
    FormFactory.prototype.buildRelations = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        Validations.JSExpressionValidatorsEnabled = false;
        this.controlRelationsFactory.buildRelations(rootNode);
        // enable js expression validations
        Validations.JSExpressionValidatorsEnabled = true;
    };
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createNode = /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        var /** @type {?} */ node = null;
        if (question instanceof NestedQuestion) {
            if (question instanceof RepeatingQuestion) {
                node = this.createArrayNode(question, parentNode, parentControl, form);
            }
            else {
                node = this.createGroupNode(question, parentNode, parentControl, form);
            }
        }
        else {
            node = this.createLeafNode(question, parentNode, parentControl, form);
        }
        return node;
    };
    /**
     * @param {?} question
     * @param {?} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createLeafNode = /**
     * @param {?} question
     * @param {?} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        var /** @type {?} */ controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        return new LeafNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
    };
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createGroupNode = /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        var /** @type {?} */ controlModel = /** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form));
        var /** @type {?} */ groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
        this.createNodeChildren(question, groupNode, (controlModel || parentControl), form);
        return groupNode;
    };
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createArrayNode = /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        var _this = this;
        var /** @type {?} */ controlModel = /** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form));
        var /** @type {?} */ arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
        arrayNode.createChildFunc = this.createArrayNodeChild;
        arrayNode.removeChildFunc = this.removeArrayNodeChild;
        arrayNode.addChildNodeCreatedListener(function (node) {
            Validations.JSExpressionValidatorsEnabled = false;
            _this.controlRelationsFactory.buildArrayNodeRelations(node);
            Validations.JSExpressionValidatorsEnabled = true;
        });
        return arrayNode;
    };
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createNodeChildren = /**
     * @param {?} question
     * @param {?} node
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, node, parentControl, form) {
        var _this = this;
        question.questions.forEach(function (element) {
            var /** @type {?} */ child = _this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        });
        return node.children;
    };
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} factory
     * @return {?}
     */
    FormFactory.prototype.createArrayNodeChild = /**
     * @param {?} question
     * @param {?} node
     * @param {?=} factory
     * @return {?}
     */
    function (question, node, factory) {
        if (factory === null || factory === undefined) {
            factory = this;
        }
        var /** @type {?} */ groupQuestion = new QuestionGroup({
            key: node.path + '.' + node.children.length + '',
            type: 'group', extras: question.extras, label: '', questions: question.questions
        });
        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }
        var /** @type {?} */ group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);
        if (node.control instanceof AfeFormArray) {
            var /** @type {?} */ nodeControl = /** @type {?} */ (node.control);
            nodeControl.setControl(nodeControl.controls.length, group.control);
        }
        return group;
    };
    /**
     * @param {?} index
     * @param {?} node
     * @return {?}
     */
    FormFactory.prototype.removeArrayNodeChild = /**
     * @param {?} index
     * @param {?} node
     * @return {?}
     */
    function (index, node) {
        var /** @type {?} */ nodeToRemove = node.children[index];
        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                var /** @type {?} */ control = /** @type {?} */ (node.control);
                var /** @type {?} */ controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    };
    FormFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormFactory.ctorParameters = function () { return [
        { type: FormControlService, },
        { type: QuestionFactory, },
        { type: ControlRelationsFactory, },
    ]; };
    return FormFactory;
}());
export { FormFactory };
function FormFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormFactory.ctorParameters;
    /** @type {?} */
    FormFactory.prototype.hd;
    /** @type {?} */
    FormFactory.prototype.controlService;
    /** @type {?} */
    FormFactory.prototype.questionFactroy;
    /** @type {?} */
    FormFactory.prototype.controlRelationsFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBWSxNQUFNLGFBQWEsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQ3RFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBZ0IsY0FBYyxFQUFFLFlBQVksRUFDbEQsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQzs7SUFVMUIscUJBQW1CLGNBQWtDLEVBQzFDLGlCQUF5Qyx1QkFBZ0Q7UUFEakYsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBQzFDLG9CQUFlLEdBQWYsZUFBZTtRQUEwQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO2tCQVBuRjtZQUNiLFFBQVEsRUFBRTtnQkFDTixNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ2I7U0FDSjtLQUlBOzs7Ozs7SUFFRCxnQ0FBVTs7Ozs7SUFBVixVQUFXLE1BQVcsRUFBRSxVQUFnQjtRQUNwQyxxQkFBTSxJQUFJLEdBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLHFCQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzdFO2FBQ0o7U0FDSjtRQUNELHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxxQkFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBYyxDQUFBLENBQUM7UUFFekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7OztJQUVELG9DQUFjOzs7O0lBQWQsVUFBZSxRQUFtQjtRQUU5QixXQUFXLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBR3RELFdBQVcsQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7S0FDcEQ7Ozs7Ozs7O0lBRUQsZ0NBQVU7Ozs7Ozs7SUFBVixVQUFXLFFBQXVDLEVBQzlDLFVBQXNCLEVBQUUsYUFBNEIsRUFBRSxJQUFXO1FBQ2pFLHFCQUFJLElBQUksR0FBYSxJQUFJLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUU7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxRTtTQUNKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7Ozs7SUFFRCxvQ0FBYzs7Ozs7OztJQUFkLFVBQWUsUUFBc0IsRUFDakMsVUFBcUIsRUFBRSxhQUE0QixFQUFFLElBQVc7UUFDaEUscUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFDbEQsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqRDs7Ozs7Ozs7SUFFRCxxQ0FBZTs7Ozs7OztJQUFmLFVBQWdCLFFBQXdCLEVBQUUsVUFBc0IsRUFDNUQsYUFBNEIsRUFBRSxJQUFXO1FBQ3pDLHFCQUFNLFlBQVkscUJBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQWlCLENBQUEsQ0FBQztRQUNwSCxxQkFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQ3hELElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsWUFBWSxJQUFJLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDcEI7Ozs7Ozs7O0lBRUQscUNBQWU7Ozs7Ozs7SUFBZixVQUFnQixRQUF3QixFQUFFLFVBQXNCLEVBQzVELGFBQTRCLEVBQUUsSUFBVztRQUQ3QyxpQkFlQztRQWJHLHFCQUFNLFlBQVkscUJBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQWlCLENBQUEsQ0FBQztRQUNwSCxxQkFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQ2pFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RCxTQUFTLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUV0RCxTQUFTLENBQUMsMkJBQTJCLENBQUMsVUFBQyxJQUFlO1lBRWxELFdBQVcsQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUM7WUFDbEQsS0FBSSxDQUFDLHVCQUF1QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELFdBQVcsQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNwQjs7Ozs7Ozs7SUFFRCx3Q0FBa0I7Ozs7Ozs7SUFBbEIsVUFBbUIsUUFBd0IsRUFBRSxJQUFlLEVBQ3hELGFBQTRCLEVBQUUsSUFBVztRQUQ3QyxpQkFPQztRQUxHLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUM5QixxQkFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7Ozs7SUFHRCwwQ0FBb0I7Ozs7OztJQUFwQixVQUFxQixRQUEyQixFQUM1QyxJQUFlLEVBQUUsT0FBcUI7UUFFdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QscUJBQU0sYUFBYSxHQUNmLElBQUksYUFBYSxDQUFDO1lBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUU7WUFDaEQsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztTQUNuRixDQUFDLENBQUM7UUFFUCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9DLGFBQWEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUNwRDtRQUVELHFCQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkMscUJBQU0sV0FBVyxxQkFBRyxJQUFJLENBQUMsT0FBdUIsQ0FBQSxDQUFDO1lBQ2pELFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7O0lBRUQsMENBQW9COzs7OztJQUFwQixVQUFxQixLQUFhLEVBQUUsSUFBZTtRQUMvQyxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdkMscUJBQU0sT0FBTyxxQkFBRyxJQUFJLENBQUMsT0FBdUIsQ0FBQSxDQUFDO2dCQUM3QyxxQkFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVFLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKO0tBQ0o7O2dCQXpJSixVQUFVOzs7O2dCQVRGLGtCQUFrQjtnQkFDbEIsZUFBZTtnQkFHZix1QkFBdUI7O3NCQVZoQzs7U0FnQmEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSwgQXJyYXlOb2RlLCBOb2RlQmFzZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSwgTmVzdGVkUXVlc3Rpb24sIFJlcGVhdGluZ1F1ZXN0aW9uLCBRdWVzdGlvbkdyb3VwXG59IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgQWZlRm9ybUdyb3VwLCBBZmVDb250cm9sVHlwZSwgQWZlRm9ybUFycmF5XG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4vY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9ucyB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvdmFsaWRhdGlvbnMnO1xuXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1GYWN0b3J5IHtcbiAgICBwdWJsaWMgaGQ6IGFueSA9IHtcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAyMDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udHJvbFNlcnZpY2U6IEZvcm1Db250cm9sU2VydmljZSxcbiAgICAgICAgcHVibGljIHF1ZXN0aW9uRmFjdHJveTogUXVlc3Rpb25GYWN0b3J5LCBwdWJsaWMgY29udHJvbFJlbGF0aW9uc0ZhY3Rvcnk6IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5KSB7XG4gICAgfVxuXG4gICAgY3JlYXRlRm9ybShzY2hlbWE6IGFueSwgZGF0YVNvdXJjZT86IGFueSk6IEZvcm0ge1xuICAgICAgICBjb25zdCBmb3JtOiBGb3JtID0gbmV3IEZvcm0oc2NoZW1hLCB0aGlzLCB0aGlzLnF1ZXN0aW9uRmFjdHJveSk7XG4gICAgICAgIGlmIChkYXRhU291cmNlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFTb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLnJlZ2lzdGVyRGF0YVNvdXJjZShrZXksIGRhdGFTb3VyY2Vba2V5XSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25GYWN0cm95LmNyZWF0ZVF1ZXN0aW9uTW9kZWwoc2NoZW1hLCBmb3JtKTtcbiAgICAgICAgZm9ybS5yb290Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShxdWVzdGlvbiwgbnVsbCwgbnVsbCwgZm9ybSkgYXMgR3JvdXBOb2RlO1xuXG4gICAgICAgIHRoaXMuYnVpbGRSZWxhdGlvbnMoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIGZvcm0udXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKCk7XG4gICAgICAgIGZvcm0udXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMoKTtcbiAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgfVxuXG4gICAgYnVpbGRSZWxhdGlvbnMocm9vdE5vZGU6IEdyb3VwTm9kZSkge1xuXG4gICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuYnVpbGRSZWxhdGlvbnMocm9vdE5vZGUpO1xuXG4gICAgICAgIC8vIGVuYWJsZSBqcyBleHByZXNzaW9uIHZhbGlkYXRpb25zXG4gICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVOb2RlKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgfCBOZXN0ZWRRdWVzdGlvbixcbiAgICAgICAgcGFyZW50Tm9kZT86IEdyb3VwTm9kZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBOb2RlQmFzZSB7XG4gICAgICAgIGxldCBub2RlOiBOb2RlQmFzZSA9IG51bGw7XG4gICAgICAgIGlmIChxdWVzdGlvbiBpbnN0YW5jZW9mIE5lc3RlZFF1ZXN0aW9uKSB7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb24gaW5zdGFuY2VvZiBSZXBlYXRpbmdRdWVzdGlvbikge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUFycmF5Tm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUdyb3VwTm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVMZWFmTm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgY3JlYXRlTGVhZk5vZGUocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICAgICAgcGFyZW50Tm9kZTogR3JvdXBOb2RlLCBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IExlYWZOb2RlIHtcbiAgICAgICAgY29uc3QgY29udHJvbE1vZGVsID0gdGhpcy5jb250cm9sU2VydmljZS5nZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbiwgcGFyZW50Q29udHJvbCwgZmFsc2UsIGZvcm0pO1xuICAgICAgICByZXR1cm4gbmV3IExlYWZOb2RlKHF1ZXN0aW9uLCBjb250cm9sTW9kZWwsIG51bGwsIGZvcm0sXG4gICAgICAgICAgICBwYXJlbnROb2RlID8gcGFyZW50Tm9kZS5wYXRoIDogdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cE5vZGUocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBwYXJlbnROb2RlPzogR3JvdXBOb2RlLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IEdyb3VwTm9kZSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKSBhcyBBZmVGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5ldyBHcm91cE5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgbnVsbCxcbiAgICAgICAgICAgIGZvcm0sIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmNyZWF0ZU5vZGVDaGlsZHJlbihxdWVzdGlvbiwgZ3JvdXBOb2RlLCAoY29udHJvbE1vZGVsIHx8IHBhcmVudENvbnRyb2wpLCBmb3JtKTtcbiAgICAgICAgcmV0dXJuIGdyb3VwTm9kZTtcbiAgICB9XG5cbiAgICBjcmVhdGVBcnJheU5vZGUocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBwYXJlbnROb2RlPzogR3JvdXBOb2RlLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IEFycmF5Tm9kZSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKSBhcyBBZmVGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5ldyBBcnJheU5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgcGFyZW50Q29udHJvbCxcbiAgICAgICAgICAgIHRoaXMsIGZvcm0sIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICBhcnJheU5vZGUuY3JlYXRlQ2hpbGRGdW5jID0gdGhpcy5jcmVhdGVBcnJheU5vZGVDaGlsZDtcbiAgICAgICAgYXJyYXlOb2RlLnJlbW92ZUNoaWxkRnVuYyA9IHRoaXMucmVtb3ZlQXJyYXlOb2RlQ2hpbGQ7XG5cbiAgICAgICAgYXJyYXlOb2RlLmFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcigobm9kZTogR3JvdXBOb2RlKSA9PiB7XG5cbiAgICAgICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGUpO1xuICAgICAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycmF5Tm9kZTtcbiAgICB9XG5cbiAgICBjcmVhdGVOb2RlQ2hpbGRyZW4ocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBub2RlOiBHcm91cE5vZGUsXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogYW55IHtcbiAgICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuY3JlYXRlTm9kZShlbGVtZW50LCBub2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIG5vZGUuc2V0Q2hpbGQoZWxlbWVudC5rZXksIGNoaWxkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuO1xuICAgIH1cblxuXG4gICAgY3JlYXRlQXJyYXlOb2RlQ2hpbGQocXVlc3Rpb246IFJlcGVhdGluZ1F1ZXN0aW9uLFxuICAgICAgICBub2RlOiBBcnJheU5vZGUsIGZhY3Rvcnk/OiBGb3JtRmFjdG9yeSk6IEdyb3VwTm9kZSB7XG5cbiAgICAgICAgaWYgKGZhY3RvcnkgPT09IG51bGwgfHwgZmFjdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmYWN0b3J5ID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBncm91cFF1ZXN0aW9uOiBRdWVzdGlvbkdyb3VwID1cbiAgICAgICAgICAgIG5ldyBRdWVzdGlvbkdyb3VwKHtcbiAgICAgICAgICAgICAgICBrZXk6IG5vZGUucGF0aCArICcuJyArIG5vZGUuY2hpbGRyZW4ubGVuZ3RoICsgJycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJywgZXh0cmFzOiBxdWVzdGlvbi5leHRyYXMsIGxhYmVsOiAnJywgcXVlc3Rpb25zOiBxdWVzdGlvbi5xdWVzdGlvbnNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChxdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuTm9uZSkge1xuICAgICAgICAgICAgZ3JvdXBRdWVzdGlvbi5jb250cm9sVHlwZSA9IHF1ZXN0aW9uLmNvbnRyb2xUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ3JvdXAgPSBmYWN0b3J5LmNyZWF0ZUdyb3VwTm9kZShncm91cFF1ZXN0aW9uLCBudWxsLCBudWxsLCBub2RlLmZvcm0pO1xuICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goZ3JvdXApO1xuXG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVDb250cm9sID0gbm9kZS5jb250cm9sIGFzIEFmZUZvcm1BcnJheTtcbiAgICAgICAgICAgIG5vZGVDb250cm9sLnNldENvbnRyb2wobm9kZUNvbnRyb2wuY29udHJvbHMubGVuZ3RoLCBncm91cC5jb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cbiAgICByZW1vdmVBcnJheU5vZGVDaGlsZChpbmRleDogbnVtYmVyLCBub2RlOiBBcnJheU5vZGUpIHtcbiAgICAgICAgY29uc3Qgbm9kZVRvUmVtb3ZlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgbm9kZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpZiAobm9kZS5jb250cm9sICE9PSBudWxsIHx8IG5vZGUuY29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQXJyYXk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbEluZGV4VG9SZW1vdmUgPSBjb250cm9sLmNvbnRyb2xzLmluZGV4T2Yobm9kZVRvUmVtb3ZlLmNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sSW5kZXhUb1JlbW92ZSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucmVtb3ZlQXQoY29udHJvbEluZGV4VG9SZW1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==