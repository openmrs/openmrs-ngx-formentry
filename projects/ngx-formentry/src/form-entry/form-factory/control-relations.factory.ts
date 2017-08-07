import { Injectable } from '@angular/core';

// import { ControlRelation } from  '../../change-tracking/control-relation';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { NodeBase, GroupNode, LeafNode, ArrayNode } from './form-node';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../../abstract-controls-extension/afe-form-array';
import { Form } from './form';

@Injectable()
export class ControlRelationsFactory {

  constructor() { }

  buildRelations(rootNode: GroupNode) {

    let controlsStore: any = this.mapControlIds(rootNode, {});

    for (let key in controlsStore) {
      if (controlsStore.hasOwnProperty(key)) {
        let nodeBase: NodeBase = controlsStore[key];

        this.setRelations(controlsStore, nodeBase);
      }
    }
  }

  buildArrayNodeRelations(node: GroupNode) {

    let form: Form = node.form;

    if (!form) {
      return;
    }
    let rootNode: GroupNode = form.rootNode;

    // build relations for controls in the same array
    this.buildRelations(node);

    // build relations for control outside the array
    let rootControlsStore: any = this.mapControlIds(rootNode, {});
    let arrayControlStore: any = this.mapControlIds(node, {});

    for (let key in rootControlsStore) {

      if (rootControlsStore.hasOwnProperty(key)) {

        let child: NodeBase = rootControlsStore[key];

        if (child instanceof LeafNode) {

          let questionBase: QuestionBase = (child as LeafNode).question;

          if (questionBase.key && questionBase.key.length > 0) {
            this.setRelations(arrayControlStore, child);
          }
        }
      }
    }

    // define relations for controls outside the group to controls in this group
    this.createRelationsToArrayControls(node);

    // fire relations
    for (let id in arrayControlStore) {
      if (arrayControlStore.hasOwnProperty(id)) {

        let child: NodeBase = arrayControlStore[id];
        let control: AfeFormControl | AfeFormArray = child.control as AfeFormControl | AfeFormArray;
        control.updateHiddenState();
        control.updateAlert();
      }
    }
  }

  createRelationsToArrayControls(node: GroupNode) {

    let form: Form = node.form;

    let rootNode: GroupNode = form.rootNode;

    // build relations for control outside the array
    let rootControlsStore: any = this.mapControlIds(rootNode, {});
    let arrayControlStore: any = this.mapControlIds(node, {});

    // loop through form controls
    for (let key in rootControlsStore) {
      if (rootControlsStore.hasOwnProperty(key)) {

        let rChild: NodeBase = rootControlsStore[key];

        let parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));

        if (rChild.path.indexOf(parentNodePath + '.') === -1) {

          // loop through controls in the array group
          for (let id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {

              let aChild: NodeBase = arrayControlStore[id];
              let aChildId = aChild.question.key;
              if (this.hasRelation(aChildId, rChild.question)) {

                let nodes: Array<NodeBase> = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                if (nodes.length > 0) {
                  let an = nodes[0] as ArrayNode;
                  let rootControl = (rChild.control as AfeFormControl | AfeFormArray);

                  if (rootControl.controlRelations.otherRelations.indexOf(an) === -1) {
                    rootControl.controlRelations.otherRelations.push(an);
                  }

                  (aChild.control as AfeFormControl | AfeFormArray).addValueChangeListener((value) => {

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

  getRelationsForControl(id, node: GroupNode): Array<AfeFormControl | AfeFormArray> {

    let relations: Array<AfeFormControl | AfeFormArray> = new Array<AfeFormControl | AfeFormArray>();

    let nodeBaseArray: Array<NodeBase> = node.form.searchNodeByQuestionId(id);

    if (nodeBaseArray.length > 0) {

      let nodeBase: NodeBase = nodeBaseArray[0];

      let controlList: any = this.mapControlIds(node, {});

      for (let key in controlList) {
        if (controlList.hasOwnProperty(key)) {

          if (this.hasRelation(controlList[key].question.key, nodeBase.question)) {
            relations.push(controlList[key].control);
          }
        }
      }
    }
    return relations;
  }

  mapControlIds(node: GroupNode, controlsStore: any) {

    let children: NodeBase = node.children;

    for (let key in children) {

      if (children.hasOwnProperty(key)) {

        let child: NodeBase = children[key];

        if (child instanceof GroupNode) {

          this.mapControlIds(child, controlsStore);
        } else if (child instanceof LeafNode) {

          let questionBase: QuestionBase = (child as LeafNode).question;

          if (questionBase.key && questionBase.key.length > 0) {
            controlsStore[questionBase.key] = child;
          }
        } else if (child instanceof ArrayNode) {

          let questionBase: QuestionBase = (child as ArrayNode).question;

          if (questionBase.key && questionBase.key.length > 0) {
            controlsStore[questionBase.key] = child;
          }
        }
      }
    }

    return controlsStore;
  }

  setRelations(controlsStore: any, nodeBase: NodeBase) {

    let questionBase: QuestionBase = nodeBase.question;

    let id = questionBase.key;

    for (let key in controlsStore) {
      if (controlsStore.hasOwnProperty(key) && key !== id) {

        let node: NodeBase = controlsStore[key];
        let question: QuestionBase = node.question;

        if (this.hasRelation(id, question, nodeBase)) {
          this.addRelationToControl(node.control as AfeFormControl | AfeFormArray, nodeBase.control as AfeFormControl | AfeFormArray);
        }

        // add conditional required and conditional answered relations
        if (typeof question.required === 'object') {

          let required: any = question.required;

          if (required.type === 'conditionalRequired') {

            if (required.referenceQuestionId === id) {
              this.addRelationToControl(node.control as AfeFormControl | AfeFormArray,
                nodeBase.control as AfeFormControl | AfeFormArray);
            }
          }
        }
      }
    }
  }

  hasRelation(id: string, questionBase: QuestionBase, nodeBase?: NodeBase) {

    let hasRelation = false;

    if (questionBase.validators && questionBase.validators.length > 0) {

      questionBase.validators.forEach(element => {

        if (element instanceof JsExpressionValidationModel) {

          let model: JsExpressionValidationModel = element as JsExpressionValidationModel;

          let failsWhenExpression: string = model.failsWhenExpression;
          if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
            hasRelation = true;
          }
        } else if (element instanceof ConditionalValidationModel && element.type === 'conditionalAnswered'
          && element.referenceQuestionId === id) {
          hasRelation = true;
        }
      });
    }

    // add hiders and disablers relations
    if (!hasRelation) {

      if (typeof questionBase.hide === 'string') {

        let hide: string = questionBase.hide as string;

        if (hide.length > 0 && hide.indexOf(id) !== -1) {
          hasRelation = true;
        }
      } else if (typeof questionBase.hide === 'object') {

        let hideObj: any = questionBase.hide;

        if (hideObj.field === id) {
          hasRelation = true;
        }
      }

     if ( questionBase.alert && typeof questionBase.alert === 'object') {
        hasRelation = true;
      }

      if (typeof questionBase.disable === 'string') {

        let disable: string = questionBase.disable as string;

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

  addRelationToControl(control: AfeFormControl | AfeFormArray, related: AfeFormControl | AfeFormArray) {

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
