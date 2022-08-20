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
  public existingOrders: any = {};
  private _dataSourcesContainer: DataSources;
  private _showErrors = false;
  constructor(
    public schema: any,
    public formFactory: FormFactory,
    public questionFactory: QuestionFactory
  ) {
    this._dataSourcesContainer = new DataSources();
  }

  get dataSourcesContainer(): DataSources {
    return this._dataSourcesContainer;
  }

  searchNodeByPath(node: GroupNode, path, found: Array<NodeBase>) {
    const children: NodeBase = node.children;

    for (const key in children) {
      if (children.hasOwnProperty(key)) {
        const child: NodeBase = children[key];

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

          const aChild: ArrayNode = child as ArrayNode;

          aChild.children.forEach((aChildNode) => {
            this.searchNodeByPath(aChildNode, path, found);
          });
        }
      }
    }

    return found;
  }

  searchNodeByQuestionId(
    questionId: string,
    questionType?: string
  ): Array<NodeBase> {
    const found = [];
    if (questionType) {
      this.searchNodeByQuestionType(this.rootNode, questionType, found);
    } else {
      this.findNodesByQuestionId(this.rootNode, questionId, found);
    }
    return found;
  }

  searchNodeByQuestionType(
    rootNode: any,
    questionType: string,
    found: Array<NodeBase>
  ) {
    if (rootNode instanceof GroupNode) {
      const nodeAsGroup = rootNode as GroupNode;
      // eslint-disable-next-line guard-for-in
      for (const o in nodeAsGroup.children) {
        this.searchNodeByQuestionType(
          nodeAsGroup.children[o],
          questionType,
          found
        );
      }
    }

    if (rootNode instanceof ArrayNode) {
      const nodeAsArray = rootNode as ArrayNode;

      nodeAsArray.children.forEach((node) => {
        this.searchNodeByQuestionType(node, questionType, found);
      });
    }

    if (rootNode instanceof LeafNode) {
      const questionBase: QuestionBase = rootNode.question;

      if (
        questionBase.extras &&
        questionBase.extras.type &&
        questionBase.extras.type === questionType
      ) {
        found.push(rootNode);
      }
    }
  }

  private findNodesByQuestionId(
    rootNode: NodeBase,
    questionId: string,
    results: Array<NodeBase>
  ) {
    if (rootNode.question.key === questionId) {
      results.push(rootNode);
    }

    if (rootNode instanceof GroupNode) {
      const nodeAsGroup = rootNode as GroupNode;
      // eslint-disable-next-line guard-for-in
      for (const o in nodeAsGroup.children) {
        this.findNodesByQuestionId(
          nodeAsGroup.children[o],
          questionId,
          results
        );
      }
    }

    if (rootNode instanceof ArrayNode) {
      const nodeAsArray = rootNode as ArrayNode;

      nodeAsArray.children.forEach((node) => {
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
    const children: NodeBase = node.children;

    for (const key in children) {
      if (children.hasOwnProperty(key)) {
        const child: NodeBase = children[key];

        if (child instanceof GroupNode) {
          this.markInvalidControls(child, invalidControlNodes);
        } else if (child instanceof LeafNode) {
          const questionBase: QuestionBase = (child as LeafNode).question;

          if (questionBase.key && questionBase.key.length > 0) {
            const c: AfeFormControl | AfeFormArray = child.control as
              | AfeFormControl
              | AfeFormArray;

            if (!c.valid && !c.disabled) {
              if (invalidControlNodes) {
                invalidControlNodes.push(child);
              }

              c.markAsTouched();
            }
          }
        } else if (child instanceof ArrayNode) {
          const arrayNode: ArrayNode = child as ArrayNode;

          if (
            arrayNode &&
            arrayNode.children &&
            arrayNode.children.length > 0
          ) {
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

  updateAlertsForAllControls() {
    this._updateAlertsForAllControls(this.rootNode);
  }

  private _updateAlertsForAllControls(rootNode: NodeBase) {
    if (rootNode.control) {
      if ((rootNode.control as any).updateAlert) {
        (rootNode.control as any).updateAlert();
      }
    }

    if (rootNode instanceof GroupNode) {
      const nodeAsGroup = rootNode as GroupNode;
      // eslint-disable-next-line guard-for-in
      for (const o in nodeAsGroup.children) {
        this._updateAlertsForAllControls(nodeAsGroup.children[o]);
      }
    }

    if (rootNode instanceof ArrayNode) {
      const nodeAsArray = rootNode as ArrayNode;

      nodeAsArray.children.forEach((node) => {
        this._updateAlertsForAllControls(node);
      });
    }
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
      const nodeAsGroup = rootNode as GroupNode;
      // eslint-disable-next-line guard-for-in
      for (const o in nodeAsGroup.children) {
        this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
      }
    }

    if (rootNode instanceof ArrayNode) {
      const nodeAsArray = rootNode as ArrayNode;

      nodeAsArray.children.forEach((node) => {
        this._updateHiddenDisabledStateForAllControls(node);
      });
    }
  }
}
