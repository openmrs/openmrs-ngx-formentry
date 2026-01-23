import { Injectable } from '@angular/core';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { NodeBase, GroupNode, LeafNode, ArrayNode } from './form-node';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../../abstract-controls-extension/afe-form-array';
import { Form } from './form';

@Injectable()
export class ControlRelationsFactory {
  constructor() {}

  buildRelations(rootNode: GroupNode) {
    const controlsStore: any = this.mapControlIds(rootNode, {});

    for (const key in controlsStore) {
      if (controlsStore.hasOwnProperty(key)) {
        const nodeBase: NodeBase = controlsStore[key];

        this.setRelations(controlsStore, nodeBase);
      }
    }
  }

  buildArrayNodeRelations(node: GroupNode) {
    const form: Form = node.form;

    if (!form) {
      return;
    }
    const rootNode: GroupNode = form.rootNode;

    // build relations for controls in the same array
    this.buildRelations(node);

    // build relations for control outside the array
    const rootControlsStore: any = this.mapControlIds(rootNode, {});
    const arrayControlStore: any = this.mapControlIds(node, {});

    for (const key in rootControlsStore) {
      if (rootControlsStore.hasOwnProperty(key)) {
        const child: NodeBase = rootControlsStore[key];

        if (child instanceof LeafNode) {
          const questionBase: QuestionBase = (child as LeafNode).question;

          if (questionBase.key && questionBase.key.length > 0) {
            this.setRelations(arrayControlStore, child);
          }
        }
      }
    }

    // define relations for controls outside the group to controls in this group
    this.createRelationsToArrayControls(node);

    // fire relations
    for (const id in arrayControlStore) {
      if (arrayControlStore.hasOwnProperty(id)) {
        const child: NodeBase = arrayControlStore[id];
        const control: AfeFormControl | AfeFormArray = child.control as
          | AfeFormControl
          | AfeFormArray;
        control.updateHiddenState();
        control.updateAlert();
      }
    }
  }

  createRelationsToArrayControls(node: GroupNode) {
    const form: Form = node.form;

    const rootNode: GroupNode = form.rootNode;

    // build relations for control outside the array
    const rootControlsStore: any = this.mapControlIds(rootNode, {});
    const arrayControlStore: any = this.mapControlIds(node, {});

    // loop through form controls
    for (const key in rootControlsStore) {
      if (rootControlsStore.hasOwnProperty(key)) {
        const rChild: NodeBase = rootControlsStore[key];

        const parentNodePath = node.path.substring(
          0,
          node.path.lastIndexOf('.')
        );

        if (rChild.path.indexOf(parentNodePath + '.') === -1) {
          // loop through controls in the array group
          for (const id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
              const aChild: NodeBase = arrayControlStore[id];
              const aChildId = aChild.question.key;
              if (this.hasRelation(aChildId, rChild.question)) {
                const nodes: Array<NodeBase> = node.form.searchNodeByPath(
                  rootNode,
                  parentNodePath,
                  []
                );
                if (nodes.length > 0) {
                  const an = nodes[0] as ArrayNode;
                  const rootControl = rChild.control as
                    | AfeFormControl
                    | AfeFormArray;

                  if (
                    rootControl.controlRelations.otherRelations.indexOf(an) ===
                    -1
                  ) {
                    rootControl.controlRelations.otherRelations.push(an);
                  }

                  (aChild.control as
                    | AfeFormControl
                    | AfeFormArray).addValueChangeListener((value) => {
                    if ((rootControl as any).updateCalculatedValue) {
                      (rootControl as any).updateCalculatedValue();
                    }

                    rootControl.updateValueAndValidity();
                    if ((rootControl as any).updateHiddenState) {
                      (rootControl as any).updateHiddenState();
                    }

                    if ((rootControl as any).updateAlert) {
                      (rootControl as any).updateAlert();
                    }

                    if ((rootControl as any).updateDisabledState) {
                      (rootControl as any).updateDisabledState();
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

  getRelationsForControl(
    id,
    node: GroupNode
  ): Array<AfeFormControl | AfeFormArray> {
    const relations: Array<AfeFormControl | AfeFormArray> = new Array<
      AfeFormControl | AfeFormArray
    >();

    const nodeBaseArray: Array<NodeBase> = node.form.searchNodeByQuestionId(id);

    if (nodeBaseArray.length > 0) {
      const nodeBase: NodeBase = nodeBaseArray[0];

      const controlList: any = this.mapControlIds(node, {});

      for (const key in controlList) {
        if (controlList.hasOwnProperty(key)) {
          if (
            this.hasRelation(controlList[key].question.key, nodeBase.question)
          ) {
            relations.push(controlList[key].control);
          }
        }
      }
    }
    return relations;
  }

  mapControlIds(node: GroupNode, controlsStore: any) {
    const children: NodeBase = node.children;

    for (const key in children) {
      if (children.hasOwnProperty(key)) {
        const child: NodeBase = children[key];

        if (child instanceof GroupNode) {
          this.mapControlIds(child, controlsStore);
        } else if (child instanceof LeafNode) {
          const questionBase: QuestionBase = (child as LeafNode).question;

          if (questionBase.key && questionBase.key.length > 0) {
            controlsStore[questionBase.key] = child;
          }
        } else if (child instanceof ArrayNode) {
          const questionBase: QuestionBase = (child as ArrayNode).question;

          if (questionBase.key && questionBase.key.length > 0) {
            controlsStore[questionBase.key] = child;
          }
        }
      }
    }

    return controlsStore;
  }

  setRelations(controlsStore: any, nodeBase: NodeBase) {
    const questionBase: QuestionBase = nodeBase.question;

    const id = questionBase.key;

    for (const key in controlsStore) {
      if (controlsStore.hasOwnProperty(key) && key !== id) {
        const node: NodeBase = controlsStore[key];
        const question: QuestionBase = node.question;

        if (this.hasRelation(id, question, nodeBase)) {
          this.addRelationToControl(
            node.control as AfeFormControl | AfeFormArray,
            nodeBase.control as AfeFormControl | AfeFormArray
          );
        }

        // add conditional required and conditional answered relations
        if (typeof question.required === 'object') {
          const required: any = question.required;

          if (required.type === 'conditionalRequired') {
            if (required.referenceQuestionId === id) {
              this.addRelationToControl(
                node.control as AfeFormControl | AfeFormArray,
                nodeBase.control as AfeFormControl | AfeFormArray
              );
            }
          }
        }
      }
    }
  }

  hasRelation(id: string, questionBase: QuestionBase, nodeBase?: NodeBase) {
    let hasRelation = false;

    if (questionBase.validators && questionBase.validators.length > 0) {
      questionBase.validators.forEach((element) => {
        if (element instanceof JsExpressionValidationModel) {
          const model: JsExpressionValidationModel = element as JsExpressionValidationModel;

          const failsWhenExpression: string = model.failsWhenExpression;
          if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
            hasRelation = true;
          }
        } else if (
          element instanceof ConditionalValidationModel &&
          element.type === 'conditionalAnswered' &&
          element.referenceQuestionId === id
        ) {
          hasRelation = true;
        }
      });
    }

    // add hiders and disablers relations
    if (!hasRelation) {
      if (typeof questionBase.hide === 'string') {
        const hide: string = questionBase.hide as string;

        if (hide.length > 0 && hide.indexOf(id) !== -1) {
          hasRelation = true;
        }
      } else if (typeof questionBase.hide === 'object') {
        const hideObj: any = questionBase.hide;

        if (hideObj.field === id) {
          hasRelation = true;
        }
      }

      if (questionBase.alert && typeof questionBase.alert === 'object') {
        hasRelation = true;
      }

      if (typeof questionBase.disable === 'string') {
        const disable: string = questionBase.disable as string;

        if (disable.length > 0 && disable.indexOf(id) !== -1) {
          hasRelation = true;
        }
      }
    }

    // add calculate expressions relations
    if (
      !hasRelation &&
      questionBase.calculateExpression &&
      questionBase.calculateExpression.length > 0 &&
      questionBase.calculateExpression.indexOf(id) !== -1
    ) {
      hasRelation = true;
    }

    return hasRelation;
  }

  addRelationToControl(
    control: AfeFormControl | AfeFormArray,
    related: AfeFormControl | AfeFormArray
  ) {
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
