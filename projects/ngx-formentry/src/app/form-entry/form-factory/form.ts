import * as _ from 'lodash';

import { FormFactory } from './form.factory';
import { QuestionFactory } from './question.factory';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, GroupNode, LeafNode, ArrayNode } from './form-node';
import { QuestionBase } from '../question-models/question-base';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { AfeFormArray } from '../../abstract-controls-extension/afe-form-array';

export class Form {
  public rootNode: GroupNode;
  public valueProcessingInfo: any = {};
  private _dataSourcesContainer: DataSources;
  private _showErrors: boolean = false;
  constructor(public schema: any, public FormFactory: FormFactory, public questionFactory: QuestionFactory) {
    this._dataSourcesContainer = new DataSources();
  }

  get dataSourcesContainer(): DataSources {
    return this._dataSourcesContainer;
  }

  searchNodeByPath(node: GroupNode, path, found: Array<NodeBase>) {

    let children: NodeBase = node.children;

    for (let key in children) {

      if (children.hasOwnProperty(key)) {

        let child: NodeBase = children[key];

        if (child instanceof GroupNode) {

          if (path === child.path) {
            found.push(child);
            return found;
          }

          this.searchNodeByPath(child, path, found);
        } else if (child instanceof LeafNode) {

          if (path === child.path) {
            found.push(child);
            return found;
          }
        } else if (child instanceof ArrayNode) {

          if (path === child.path) {
            found.push(child);
            return found;
          }

          let aChild: ArrayNode = child as ArrayNode;

          aChild.children.forEach(aChildNode => {
            this.searchNodeByPath(aChildNode, path, found);
          });
        }
      }
    }

    return found;
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

  set showErrors(show: boolean) {
    this._showErrors = show;
  }

  get showErrors() {
    return this._showErrors;
  }

  markInvalidControls(node: GroupNode, invalidControlNodes?: any) {


    let children: NodeBase = node.children;

    for (let key in children) {

      if (children.hasOwnProperty(key)) {

        let child: NodeBase = children[key];

        if (child instanceof GroupNode) {

          this.markInvalidControls(child, invalidControlNodes);
        } else if (child instanceof LeafNode) {

          let questionBase: QuestionBase = (child as LeafNode).question;

          if (questionBase.key && questionBase.key.length > 0) {

            let c: AfeFormControl | AfeFormArray = child.control as AfeFormControl | AfeFormArray;

            if (!c.valid && !c.disable) {
              if (invalidControlNodes) {
                invalidControlNodes.push(child);
              }

              c.markAsTouched(true);
            }
          }
        } else if (child instanceof ArrayNode) {
          let arrayNode: ArrayNode = child as ArrayNode;

          if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {

            _.forEach(arrayNode.children, (groupNode: any) => {
              this.markInvalidControls(groupNode, invalidControlNodes);
            });
          }
        }
      }
    }

    return invalidControlNodes;
  }

  updateHiddenDisabledStateForAllControls() {
    this._updateHiddenDisabledStateForAllControls(this.rootNode);
  }

  private _updateHiddenDisabledStateForAllControls(rootNode: NodeBase) {
    if (rootNode.control) {
      if ((rootNode.control as any).updateDisabledState) {
        (rootNode.control as any).updateDisabledState();
      }

      if ((rootNode.control as any).updateHiddenState) {
        (rootNode.control as any).updateHiddenState();
      }
    }

    if (rootNode instanceof GroupNode) {
      let nodeAsGroup = rootNode as GroupNode;
      // tslint:disable-next-line:forin
      for (let o in nodeAsGroup.children) {
        this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
      }
    }

    if (rootNode instanceof ArrayNode) {
      let nodeAsArray = rootNode as ArrayNode;

      nodeAsArray.children.forEach(node => {
        this._updateHiddenDisabledStateForAllControls(node, );
      });
    }
  }
}
