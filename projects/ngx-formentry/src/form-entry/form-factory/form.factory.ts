import { Injectable } from '@angular/core';
// import { AbstractControl } from '@angular/forms';

import { LeafNode, GroupNode, ArrayNode, NodeBase } from './form-node';
import {
  QuestionBase,
  NestedQuestion,
  RepeatingQuestion,
  QuestionGroup
} from '../question-models/models';
import { FormControlService } from './form-control.service';
import { QuestionFactory } from './question.factory';
import {
  AfeFormGroup,
  AfeControlType,
  AfeFormArray
} from '../../abstract-controls-extension';
import { ControlRelationsFactory } from './control-relations.factory';
import { Validations } from '../validators/validations';

import { Form } from './form';

@Injectable()
export class FormFactory {
  private nodeIndex = 0;
  public hd: any = {
    getValue: () => {
      return 20;
    }
  };

  constructor(
    public controlService: FormControlService,
    public questionFactroy: QuestionFactory,
    public controlRelationsFactory: ControlRelationsFactory
  ) {}

  createForm(schema: any, dataSource?: any): Form {
    const form: Form = new Form(schema, this, this.questionFactroy);
    if (dataSource) {
      for (const key in dataSource) {
        if (dataSource.hasOwnProperty(key)) {
          form.dataSourcesContainer.registerDataSource(
            key,
            dataSource[key],
            false
          );
        }
      }
    }
    const question = this.questionFactroy.createQuestionModel(schema, form);
    form.rootNode = this.createNode(question, null, null, form) as GroupNode;

    this.buildRelations(form.rootNode);
    form.updateHiddenDisabledStateForAllControls();
    form.updateAlertsForAllControls();
    return form;
  }

  buildRelations(rootNode: GroupNode) {
    Validations.JSExpressionValidatorsEnabled = false;
    this.controlRelationsFactory.buildRelations(rootNode);

    // enable js expression validations
    Validations.JSExpressionValidatorsEnabled = true;
  }

  createNode(
    question: QuestionBase | NestedQuestion,
    parentNode?: GroupNode,
    parentControl?: AfeFormGroup,
    form?: Form
  ): NodeBase {
    let node: NodeBase = null;
    if (question instanceof NestedQuestion) {
      if (question instanceof RepeatingQuestion) {
        node = this.createArrayNode(question, parentNode, parentControl, form);
      } else {
        node = this.createGroupNode(question, parentNode, parentControl, form);
      }
    } else {
      node = this.createLeafNode(question, parentNode, parentControl, form);
    }
    node.nodeIndex = this.nodeIndex;
    this.nodeIndex++;
    return node;
  }

  createLeafNode(
    question: QuestionBase,
    parentNode: GroupNode,
    parentControl?: AfeFormGroup,
    form?: Form
  ): LeafNode {
    const controlModel = this.controlService.generateControlModel(
      question,
      parentControl,
      false,
      form
    );
    return new LeafNode(
      question,
      controlModel,
      null,
      form,
      parentNode ? parentNode.path : undefined
    );
  }

  createGroupNode(
    question: NestedQuestion,
    parentNode?: GroupNode,
    parentControl?: AfeFormGroup,
    form?: Form
  ): GroupNode {
    const controlModel = this.controlService.generateControlModel(
      question,
      parentControl,
      false,
      form
    ) as AfeFormGroup;
    const groupNode = new GroupNode(
      question,
      controlModel,
      null,
      form,
      parentNode ? parentNode.path : undefined
    );
    this.createNodeChildren(
      question,
      groupNode,
      controlModel || parentControl,
      form
    );
    return groupNode;
  }

  createArrayNode(
    question: NestedQuestion,
    parentNode?: GroupNode,
    parentControl?: AfeFormGroup,
    form?: Form
  ): ArrayNode {
    const controlModel = this.controlService.generateControlModel(
      question,
      parentControl,
      false,
      form
    ) as AfeFormGroup;
    const arrayNode = new ArrayNode(
      question,
      controlModel,
      parentControl,
      this,
      form,
      parentNode ? parentNode.path : undefined
    );
    arrayNode.createChildFunc = this.createArrayNodeChild;
    arrayNode.removeChildFunc = this.removeArrayNodeChild;

    arrayNode.addChildNodeCreatedListener((node: GroupNode) => {
      Validations.JSExpressionValidatorsEnabled = false;
      this.controlRelationsFactory.buildArrayNodeRelations(node);
      Validations.JSExpressionValidatorsEnabled = true;
    });
    return arrayNode;
  }

  createNodeChildren(
    question: NestedQuestion,
    node: GroupNode,
    parentControl?: AfeFormGroup,
    form?: Form
  ): any {
    question.questions.forEach((element) => {
      const child = this.createNode(element, node, parentControl, form);
      node.setChild(element.key, child);
    });
    return node.children;
  }

  createArrayNodeChild(
    question: RepeatingQuestion,
    node: ArrayNode,
    factory?: FormFactory,
    position?: number
  ): GroupNode {
    if (factory === null || factory === undefined) {
      factory = this;
    }
    const groupQuestion: QuestionGroup = new QuestionGroup({
      key: node.path + '.' + node.children.length + '',
      type: 'group',
      extras: question.extras,
      label: '',
      questions: question.questions
    });

    if (question.controlType === AfeControlType.None) {
      groupQuestion.controlType = question.controlType;
    }

    const group = factory.createGroupNode(groupQuestion, null, null, node.form);

    if (position >= 0) {
      node.children.splice(position, 0, group);
    } else {
      node.children.push(group);
    }

    if (node.control instanceof AfeFormArray) {
      const nodeControl = node.control as AfeFormArray;
      nodeControl.setControl(nodeControl.controls.length, group.control);
    }

    return group;
  }

  removeArrayNodeChild(index: number, node: ArrayNode) {
    const nodeToRemove = node.children[index];

    node.children.splice(index, 1);
    if (node.control !== null || node.control !== undefined) {
      if (node.control instanceof AfeFormArray) {
        const control = node.control as AfeFormArray;
        const controlIndexToRemove = control.controls.indexOf(
          nodeToRemove.control
        );
        if (controlIndexToRemove >= 0) {
          control.removeAt(controlIndexToRemove);
        }
      }
    }
  }
}
