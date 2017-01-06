import { FormFactory } from './form.factory';
import { QuestionFactory } from './question.factory';
import { DataSources } from '../data-sources/data-sources';

// import { AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { GroupNode, ArrayNode, LeafNode, NodeBase } from './form-node';

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
}
