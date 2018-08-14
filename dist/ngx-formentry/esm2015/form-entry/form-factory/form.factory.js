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
export class FormFactory {
    /**
     * @param {?} controlService
     * @param {?} questionFactroy
     * @param {?} controlRelationsFactory
     */
    constructor(controlService, questionFactroy, controlRelationsFactory) {
        this.controlService = controlService;
        this.questionFactroy = questionFactroy;
        this.controlRelationsFactory = controlRelationsFactory;
        this.hd = {
            getValue: () => {
                return 20;
            }
        };
    }
    /**
     * @param {?} schema
     * @param {?=} dataSource
     * @return {?}
     */
    createForm(schema, dataSource) {
        const /** @type {?} */ form = new Form(schema, this, this.questionFactroy);
        if (dataSource) {
            for (const /** @type {?} */ key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                }
            }
        }
        const /** @type {?} */ question = this.questionFactroy.createQuestionModel(schema, form);
        form.rootNode = /** @type {?} */ (this.createNode(question, null, null, form));
        this.buildRelations(form.rootNode);
        form.updateHiddenDisabledStateForAllControls();
        form.updateAlertsForAllControls();
        return form;
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    buildRelations(rootNode) {
        Validations.JSExpressionValidatorsEnabled = false;
        this.controlRelationsFactory.buildRelations(rootNode);
        // enable js expression validations
        Validations.JSExpressionValidatorsEnabled = true;
    }
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createNode(question, parentNode, parentControl, form) {
        let /** @type {?} */ node = null;
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
    }
    /**
     * @param {?} question
     * @param {?} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createLeafNode(question, parentNode, parentControl, form) {
        const /** @type {?} */ controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        return new LeafNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
    }
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createGroupNode(question, parentNode, parentControl, form) {
        const /** @type {?} */ controlModel = /** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form));
        const /** @type {?} */ groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
        this.createNodeChildren(question, groupNode, (controlModel || parentControl), form);
        return groupNode;
    }
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createArrayNode(question, parentNode, parentControl, form) {
        const /** @type {?} */ controlModel = /** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form));
        const /** @type {?} */ arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
        arrayNode.createChildFunc = this.createArrayNodeChild;
        arrayNode.removeChildFunc = this.removeArrayNodeChild;
        arrayNode.addChildNodeCreatedListener((node) => {
            Validations.JSExpressionValidatorsEnabled = false;
            this.controlRelationsFactory.buildArrayNodeRelations(node);
            Validations.JSExpressionValidatorsEnabled = true;
        });
        return arrayNode;
    }
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createNodeChildren(question, node, parentControl, form) {
        question.questions.forEach(element => {
            const /** @type {?} */ child = this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        });
        return node.children;
    }
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} factory
     * @return {?}
     */
    createArrayNodeChild(question, node, factory) {
        if (factory === null || factory === undefined) {
            factory = this;
        }
        const /** @type {?} */ groupQuestion = new QuestionGroup({
            key: node.path + '.' + node.children.length + '',
            type: 'group', extras: question.extras, label: '', questions: question.questions
        });
        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }
        const /** @type {?} */ group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);
        if (node.control instanceof AfeFormArray) {
            const /** @type {?} */ nodeControl = /** @type {?} */ (node.control);
            nodeControl.setControl(nodeControl.controls.length, group.control);
        }
        return group;
    }
    /**
     * @param {?} index
     * @param {?} node
     * @return {?}
     */
    removeArrayNodeChild(index, node) {
        const /** @type {?} */ nodeToRemove = node.children[index];
        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                const /** @type {?} */ control = /** @type {?} */ (node.control);
                const /** @type {?} */ controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    }
}
FormFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormFactory.ctorParameters = () => [
    { type: FormControlService, },
    { type: QuestionFactory, },
    { type: ControlRelationsFactory, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBWSxNQUFNLGFBQWEsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQ3RFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBZ0IsY0FBYyxFQUFFLFlBQVksRUFDbEQsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUc5QixNQUFNOzs7Ozs7SUFPRixZQUFtQixjQUFrQyxFQUMxQyxpQkFBeUMsdUJBQWdEO1FBRGpGLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUMxQyxvQkFBZSxHQUFmLGVBQWU7UUFBMEIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtrQkFQbkY7WUFDYixRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDYjtTQUNKO0tBSUE7Ozs7OztJQUVELFVBQVUsQ0FBQyxNQUFXLEVBQUUsVUFBZ0I7UUFDcEMsdUJBQU0sSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixHQUFHLENBQUMsQ0FBQyx1QkFBTSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUM3RTthQUNKO1NBQ0o7UUFDRCx1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEscUJBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQWMsQ0FBQSxDQUFDO1FBRXpFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFFRCxjQUFjLENBQUMsUUFBbUI7UUFFOUIsV0FBVyxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQztRQUNsRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUd0RCxXQUFXLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO0tBQ3BEOzs7Ozs7OztJQUVELFVBQVUsQ0FBQyxRQUF1QyxFQUM5QyxVQUFzQixFQUFFLGFBQTRCLEVBQUUsSUFBVztRQUNqRSxxQkFBSSxJQUFJLEdBQWEsSUFBSSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFFO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUU7U0FDSjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekU7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQXNCLEVBQ2pDLFVBQXFCLEVBQUUsYUFBNEIsRUFBRSxJQUFXO1FBQ2hFLHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BHLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQ2xELFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakQ7Ozs7Ozs7O0lBRUQsZUFBZSxDQUFDLFFBQXdCLEVBQUUsVUFBc0IsRUFDNUQsYUFBNEIsRUFBRSxJQUFXO1FBQ3pDLHVCQUFNLFlBQVkscUJBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQWlCLENBQUEsQ0FBQztRQUNwSCx1QkFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQ3hELElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsWUFBWSxJQUFJLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDcEI7Ozs7Ozs7O0lBRUQsZUFBZSxDQUFDLFFBQXdCLEVBQUUsVUFBc0IsRUFDNUQsYUFBNEIsRUFBRSxJQUFXO1FBQ3pDLHVCQUFNLFlBQVkscUJBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQWlCLENBQUEsQ0FBQztRQUNwSCx1QkFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQ2pFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RCxTQUFTLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUV0RCxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxJQUFlLEVBQUUsRUFBRTtZQUV0RCxXQUFXLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDO1lBQ2xELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxXQUFXLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1NBQ3BELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDcEI7Ozs7Ozs7O0lBRUQsa0JBQWtCLENBQUMsUUFBd0IsRUFBRSxJQUFlLEVBQ3hELGFBQTRCLEVBQUUsSUFBVztRQUN6QyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqQyx1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7Ozs7SUFHRCxvQkFBb0IsQ0FBQyxRQUEyQixFQUM1QyxJQUFlLEVBQUUsT0FBcUI7UUFFdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsdUJBQU0sYUFBYSxHQUNmLElBQUksYUFBYSxDQUFDO1lBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUU7WUFDaEQsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztTQUNuRixDQUFDLENBQUM7UUFFUCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9DLGFBQWEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUNwRDtRQUVELHVCQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkMsdUJBQU0sV0FBVyxxQkFBRyxJQUFJLENBQUMsT0FBdUIsQ0FBQSxDQUFDO1lBQ2pELFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7O0lBRUQsb0JBQW9CLENBQUMsS0FBYSxFQUFFLElBQWU7UUFDL0MsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLHVCQUFNLE9BQU8scUJBQUcsSUFBSSxDQUFDLE9BQXVCLENBQUEsQ0FBQztnQkFDN0MsdUJBQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RSxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixPQUFPLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7aUJBQzFDO2FBQ0o7U0FDSjtLQUNKOzs7WUF6SUosVUFBVTs7OztZQVRGLGtCQUFrQjtZQUNsQixlQUFlO1lBR2YsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBMZWFmTm9kZSwgR3JvdXBOb2RlLCBBcnJheU5vZGUsIE5vZGVCYXNlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlLCBOZXN0ZWRRdWVzdGlvbiwgUmVwZWF0aW5nUXVlc3Rpb24sIFF1ZXN0aW9uR3JvdXBcbn0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21vZGVscyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uRmFjdG9yeSB9IGZyb20gJy4vcXVlc3Rpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAsIEFmZUNvbnRyb2xUeXBlLCBBZmVGb3JtQXJyYXlcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcbmltcG9ydCB7IFZhbGlkYXRpb25zIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy92YWxpZGF0aW9ucyc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybUZhY3Rvcnkge1xuICAgIHB1YmxpYyBoZDogYW55ID0ge1xuICAgICAgICBnZXRWYWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDIwO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250cm9sU2VydmljZTogRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgcXVlc3Rpb25GYWN0cm95OiBRdWVzdGlvbkZhY3RvcnksIHB1YmxpYyBjb250cm9sUmVsYXRpb25zRmFjdG9yeTogQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkpIHtcbiAgICB9XG5cbiAgICBjcmVhdGVGb3JtKHNjaGVtYTogYW55LCBkYXRhU291cmNlPzogYW55KTogRm9ybSB7XG4gICAgICAgIGNvbnN0IGZvcm06IEZvcm0gPSBuZXcgRm9ybShzY2hlbWEsIHRoaXMsIHRoaXMucXVlc3Rpb25GYWN0cm95KTtcbiAgICAgICAgaWYgKGRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIucmVnaXN0ZXJEYXRhU291cmNlKGtleSwgZGF0YVNvdXJjZVtrZXldLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbkZhY3Ryb3kuY3JlYXRlUXVlc3Rpb25Nb2RlbChzY2hlbWEsIGZvcm0pO1xuICAgICAgICBmb3JtLnJvb3ROb2RlID0gdGhpcy5jcmVhdGVOb2RlKHF1ZXN0aW9uLCBudWxsLCBudWxsLCBmb3JtKSBhcyBHcm91cE5vZGU7XG5cbiAgICAgICAgdGhpcy5idWlsZFJlbGF0aW9ucyhmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgZm9ybS51cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMoKTtcbiAgICAgICAgZm9ybS51cGRhdGVBbGVydHNGb3JBbGxDb250cm9scygpO1xuICAgICAgICByZXR1cm4gZm9ybTtcbiAgICB9XG5cbiAgICBidWlsZFJlbGF0aW9ucyhyb290Tm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb250cm9sUmVsYXRpb25zRmFjdG9yeS5idWlsZFJlbGF0aW9ucyhyb290Tm9kZSk7XG5cbiAgICAgICAgLy8gZW5hYmxlIGpzIGV4cHJlc3Npb24gdmFsaWRhdGlvbnNcbiAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNyZWF0ZU5vZGUocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSB8IE5lc3RlZFF1ZXN0aW9uLFxuICAgICAgICBwYXJlbnROb2RlPzogR3JvdXBOb2RlLCBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IE5vZGVCYXNlIHtcbiAgICAgICAgbGV0IG5vZGU6IE5vZGVCYXNlID0gbnVsbDtcbiAgICAgICAgaWYgKHF1ZXN0aW9uIGluc3RhbmNlb2YgTmVzdGVkUXVlc3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbiBpbnN0YW5jZW9mIFJlcGVhdGluZ1F1ZXN0aW9uKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlQXJyYXlOb2RlKHF1ZXN0aW9uLCBwYXJlbnROb2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlR3JvdXBOb2RlKHF1ZXN0aW9uLCBwYXJlbnROb2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUxlYWZOb2RlKHF1ZXN0aW9uLCBwYXJlbnROb2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBjcmVhdGVMZWFmTm9kZShxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgICAgICBwYXJlbnROb2RlOiBHcm91cE5vZGUsIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogTGVhZk5vZGUge1xuICAgICAgICBjb25zdCBjb250cm9sTW9kZWwgPSB0aGlzLmNvbnRyb2xTZXJ2aWNlLmdlbmVyYXRlQ29udHJvbE1vZGVsKHF1ZXN0aW9uLCBwYXJlbnRDb250cm9sLCBmYWxzZSwgZm9ybSk7XG4gICAgICAgIHJldHVybiBuZXcgTGVhZk5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgbnVsbCwgZm9ybSxcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwTm9kZShxdWVzdGlvbjogTmVzdGVkUXVlc3Rpb24sIHBhcmVudE5vZGU/OiBHcm91cE5vZGUsXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogR3JvdXBOb2RlIHtcbiAgICAgICAgY29uc3QgY29udHJvbE1vZGVsID0gdGhpcy5jb250cm9sU2VydmljZS5nZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbiwgcGFyZW50Q29udHJvbCwgZmFsc2UsIGZvcm0pIGFzIEFmZUZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbmV3IEdyb3VwTm9kZShxdWVzdGlvbiwgY29udHJvbE1vZGVsLCBudWxsLFxuICAgICAgICAgICAgZm9ybSwgcGFyZW50Tm9kZSA/IHBhcmVudE5vZGUucGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuY3JlYXRlTm9kZUNoaWxkcmVuKHF1ZXN0aW9uLCBncm91cE5vZGUsIChjb250cm9sTW9kZWwgfHwgcGFyZW50Q29udHJvbCksIGZvcm0pO1xuICAgICAgICByZXR1cm4gZ3JvdXBOb2RlO1xuICAgIH1cblxuICAgIGNyZWF0ZUFycmF5Tm9kZShxdWVzdGlvbjogTmVzdGVkUXVlc3Rpb24sIHBhcmVudE5vZGU/OiBHcm91cE5vZGUsXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogQXJyYXlOb2RlIHtcbiAgICAgICAgY29uc3QgY29udHJvbE1vZGVsID0gdGhpcy5jb250cm9sU2VydmljZS5nZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbiwgcGFyZW50Q29udHJvbCwgZmFsc2UsIGZvcm0pIGFzIEFmZUZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbmV3IEFycmF5Tm9kZShxdWVzdGlvbiwgY29udHJvbE1vZGVsLCBwYXJlbnRDb250cm9sLFxuICAgICAgICAgICAgdGhpcywgZm9ybSwgcGFyZW50Tm9kZSA/IHBhcmVudE5vZGUucGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIGFycmF5Tm9kZS5jcmVhdGVDaGlsZEZ1bmMgPSB0aGlzLmNyZWF0ZUFycmF5Tm9kZUNoaWxkO1xuICAgICAgICBhcnJheU5vZGUucmVtb3ZlQ2hpbGRGdW5jID0gdGhpcy5yZW1vdmVBcnJheU5vZGVDaGlsZDtcblxuICAgICAgICBhcnJheU5vZGUuYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKChub2RlOiBHcm91cE5vZGUpID0+IHtcblxuICAgICAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuYnVpbGRBcnJheU5vZGVSZWxhdGlvbnMobm9kZSk7XG4gICAgICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyYXlOb2RlO1xuICAgIH1cblxuICAgIGNyZWF0ZU5vZGVDaGlsZHJlbihxdWVzdGlvbjogTmVzdGVkUXVlc3Rpb24sIG5vZGU6IEdyb3VwTm9kZSxcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBhbnkge1xuICAgICAgICBxdWVzdGlvbi5xdWVzdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jcmVhdGVOb2RlKGVsZW1lbnQsIG5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgbm9kZS5zZXRDaGlsZChlbGVtZW50LmtleSwgY2hpbGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW47XG4gICAgfVxuXG5cbiAgICBjcmVhdGVBcnJheU5vZGVDaGlsZChxdWVzdGlvbjogUmVwZWF0aW5nUXVlc3Rpb24sXG4gICAgICAgIG5vZGU6IEFycmF5Tm9kZSwgZmFjdG9yeT86IEZvcm1GYWN0b3J5KTogR3JvdXBOb2RlIHtcblxuICAgICAgICBpZiAoZmFjdG9yeSA9PT0gbnVsbCB8fCBmYWN0b3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZhY3RvcnkgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyb3VwUXVlc3Rpb246IFF1ZXN0aW9uR3JvdXAgPVxuICAgICAgICAgICAgbmV3IFF1ZXN0aW9uR3JvdXAoe1xuICAgICAgICAgICAgICAgIGtleTogbm9kZS5wYXRoICsgJy4nICsgbm9kZS5jaGlsZHJlbi5sZW5ndGggKyAnJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnLCBleHRyYXM6IHF1ZXN0aW9uLmV4dHJhcywgbGFiZWw6ICcnLCBxdWVzdGlvbnM6IHF1ZXN0aW9uLnF1ZXN0aW9uc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5Ob25lKSB7XG4gICAgICAgICAgICBncm91cFF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gcXVlc3Rpb24uY29udHJvbFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBncm91cCA9IGZhY3RvcnkuY3JlYXRlR3JvdXBOb2RlKGdyb3VwUXVlc3Rpb24sIG51bGwsIG51bGwsIG5vZGUuZm9ybSk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChncm91cCk7XG5cbiAgICAgICAgaWYgKG5vZGUuY29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1BcnJheSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUNvbnRyb2wgPSBub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUFycmF5O1xuICAgICAgICAgICAgbm9kZUNvbnRyb2wuc2V0Q29udHJvbChub2RlQ29udHJvbC5jb250cm9scy5sZW5ndGgsIGdyb3VwLmNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cblxuICAgIHJlbW92ZUFycmF5Tm9kZUNoaWxkKGluZGV4OiBudW1iZXIsIG5vZGU6IEFycmF5Tm9kZSkge1xuICAgICAgICBjb25zdCBub2RlVG9SZW1vdmUgPSBub2RlLmNoaWxkcmVuW2luZGV4XTtcblxuICAgICAgICBub2RlLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wgIT09IG51bGwgfHwgbm9kZS5jb250cm9sICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gbm9kZS5jb250cm9sIGFzIEFmZUZvcm1BcnJheTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sSW5kZXhUb1JlbW92ZSA9IGNvbnRyb2wuY29udHJvbHMuaW5kZXhPZihub2RlVG9SZW1vdmUuY29udHJvbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xJbmRleFRvUmVtb3ZlID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5yZW1vdmVBdChjb250cm9sSW5kZXhUb1JlbW92ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19