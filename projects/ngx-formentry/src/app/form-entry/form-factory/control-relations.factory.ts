import { Injectable } from '@angular/core';

import { QuestionBase} from '../question-models/question-base';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { NodeBase, GroupNode, LeafNode, ArrayNode } from './form-node';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../../abstract-controls-extension/afe-form-array';

@Injectable()
export class ControlRelationsFactory {

  controlsStore: any = {};

  constructor() {}

  get controlStore() {
    return this.controlStore;
  }

  buildRelations(rootNode: GroupNode) {

    this.mapControlIds(rootNode);

    for ( let key in this.controlsStore ) {

      if ( this.controlsStore.hasOwnProperty(key) ) {
        this.setRelations(key);
      }
    }
  }

  mapControlIds(node: GroupNode) {

    let children: NodeBase = node.children;

    for ( let key in children ) {

      if ( children.hasOwnProperty(key) ) {

        let child: NodeBase = children[key];

        if ( child instanceof GroupNode ) {

          this.mapControlIds(child);
        } else if ( child instanceof LeafNode ) {

          let questionBase: QuestionBase = (child as LeafNode).question;

          if ( questionBase.key && questionBase.key.length > 0 ) {
            this.controlsStore[questionBase.key] = child;
          }
        } else if ( child instanceof ArrayNode ) {

           let questionBase: QuestionBase = (child as ArrayNode).question;

           if ( questionBase.key && questionBase.key.length > 0 ) {
             this.controlsStore[questionBase.key] = child;
           }
        }
      }
    }
  }

  setRelations(id: string) {

    let nodeBase: NodeBase = this.controlsStore[id];

    for ( let key in this.controlsStore ) {
        if ( this.controlsStore.hasOwnProperty(key) && key !== id ) {

          let node: NodeBase = this.controlsStore[key];
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
