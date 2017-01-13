import { Injectable } from '@angular/core';

import { QuestionBase} from '../question-models/question-base';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { NodeBase, GroupNode, LeafNode, ArrayNode } from './form-node';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../../abstract-controls-extension/afe-form-array';
import { Form } from './form';

@Injectable()
export class ControlRelationsFactory {

  constructor() {}

  buildRelations(rootNode: GroupNode) {

     let controlsStore: any = this.mapControlIds(rootNode, {});

    for ( let key in controlsStore ) {

      if ( controlsStore.hasOwnProperty(key) ) {
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

          if ( questionBase.key && questionBase.key.length > 0 ) {
            this.setRelations(arrayControlStore, child);
          }
        }
      }
    }

    // fire relations
    for (let id in arrayControlStore) {
      if (arrayControlStore.hasOwnProperty(id)) {

          let child: NodeBase = arrayControlStore[id];
          let control: AfeFormControl | AfeFormArray = child.control as AfeFormControl | AfeFormArray;
          control.updateHiddenState();
      }
    }
  }

  mapControlIds(node: GroupNode, controlsStore: any) {

    let children: NodeBase = node.children;

    for ( let key in children ) {

      if ( children.hasOwnProperty(key) ) {

        let child: NodeBase = children[key];

        if ( child instanceof GroupNode ) {

          this.mapControlIds(child, controlsStore);
        } else if ( child instanceof LeafNode ) {

          let questionBase: QuestionBase = (child as LeafNode).question;

          if ( questionBase.key && questionBase.key.length > 0 ) {
            controlsStore[questionBase.key] = child;
          }
        } else if ( child instanceof ArrayNode ) {

           let questionBase: QuestionBase = (child as ArrayNode).question;

           if ( questionBase.key && questionBase.key.length > 0 ) {
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

    for ( let key in controlsStore ) {
        if ( controlsStore.hasOwnProperty(key) && key !== id ) {

          let node: NodeBase = controlsStore[key];
          let question: QuestionBase = node.question;

          if ( this.hasRelation(id, question) ) {
            this.addRelationToControl( node.control as AfeFormControl | AfeFormArray, nodeBase.control as AfeFormControl | AfeFormArray );
          }
        }
    }
  }

  hasRelation(id: string, questionBase: QuestionBase) {

    let hasRelation = false;

    if (questionBase.validators && questionBase.validators.length > 0) {

      questionBase.validators.forEach(element => {

        if (element instanceof JsExpressionValidationModel) {

          let model: JsExpressionValidationModel = element as JsExpressionValidationModel;

          let failsWhenExpression: string = model.failsWhenExpression;
          if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
            hasRelation = true;
          }
        }
      });
    }

    if ( !hasRelation ) {

      if ( typeof questionBase.hide === 'string' ) {

        let hide: string = questionBase.hide as string;

        if ( hide.length > 0 && hide.indexOf(id) !== -1 ) {
          hasRelation = true;
        }
      } if ( typeof questionBase.hide === 'object' ) {

        let hideObj: any = questionBase.hide;

        if (hideObj.field === id) {
          hasRelation = true;
        }
      }

      if ( typeof questionBase.disable === 'string' ) {

        let disable: string = questionBase.disable as string;

        if ( disable.length > 0 && disable.indexOf(id) !== -1 ) {
          hasRelation = true;
        }
      }
    }

    return hasRelation;
  }

  addRelationToControl(control: AfeFormControl | AfeFormArray, related: AfeFormControl | AfeFormArray) {

    // let relations = control.controlRelations.relations;

    // let hasRelation = false;

    // relations.forEach(element => {
    //
    //   let controlRelation: ControlRelation = element as ControlRelation;
    //
    //   let relation: AfeFormControl | AfeFormArray = controlRelation.control as AfeFormControl | AfeFormArray;
    //
    //   if ( control.uuid !== undefined && control.uuid === relation.uuid ) {
    //     hasRelation = true;
    //   }
    // });

    // if ( !hasRelation ) {
    control.controlRelations.addRelatedControls(related);
    // }
  }
}
