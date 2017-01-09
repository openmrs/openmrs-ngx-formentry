import * as _ from 'lodash';

import { FormFactory } from './form.factory';
import { QuestionFactory } from './question.factory';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, GroupNode, LeafNode, ArrayNode } from './form-node';
import { QuestionBase} from '../question-models/question-base';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../../abstract-controls-extension/afe-form-array';

export class Form {
    public rootNode: GroupNode;
    private _dataSourcesContainer: DataSources;
    constructor(public schema: any, public FormFactory: FormFactory, public questionFactory: QuestionFactory) {
        this._dataSourcesContainer = new DataSources();
    }

    get dataSourcesContainer(): DataSources {
        return this._dataSourcesContainer;
    }

    searchNodeByQuestionId(questionId: string): Array<NodeBase> {
        let found = [];
        this.findNodesByQuestionId(this.rootNode, questionId, found);
        return found;
    }

    private findNodesByQuestionId(rootNode: NodeBase, questionId: string,
        results: Array<NodeBase>) {
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }

        if (rootNode instanceof GroupNode) {
            let nodeAsGroup = rootNode as GroupNode;
            // tslint:disable-next-line:forin
            for (let o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }

        if (rootNode instanceof ArrayNode) {
            let nodeAsArray = rootNode as ArrayNode;

            nodeAsArray.children.forEach(node => {
                this.findNodesByQuestionId(node, questionId, results);
            });
        }
    }

    get valid() {

      return this.rootNode.control.valid;
    }

    markInvalidControls(node: GroupNode) {

      let children: NodeBase = node.children;

      for ( let key in children ) {

        if ( children.hasOwnProperty(key) ) {

          let child: NodeBase = children[key];

          if ( child instanceof GroupNode ) {

            this.markInvalidControls(child);
          } else if ( child instanceof LeafNode ) {

            let questionBase: QuestionBase = (child as LeafNode).question;

            if ( questionBase.key && questionBase.key.length > 0 ) {

              let c: AfeFormControl | AfeFormArray = child.control as AfeFormControl | AfeFormArray;

              if (!c.valid) {
                 c.markAsTouched(true);
              }
            }
          } else if ( child instanceof ArrayNode ) {
            let arrayNode: ArrayNode = child as ArrayNode;

            if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {

              _.forEach(arrayNode.children, (groupNode: any) => {
                this.markInvalidControls(groupNode);
              });
            }
          }
        }
      }
    }
}
