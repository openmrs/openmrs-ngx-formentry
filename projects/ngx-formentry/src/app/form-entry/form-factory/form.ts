import { FormFactory } from './form.factory';
import { QuestionFactory } from './question.factory';
import { DataSources } from '../data-sources/data-sources';

// import { AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { GroupNode } from './form-node';

export class Form {
    public rootNode: GroupNode;
    private _dataSourcesContainer: DataSources;
    constructor(public schema: any, public FormFactory: FormFactory, public questionFactory: QuestionFactory) {
        this._dataSourcesContainer = new DataSources();
    }

    get dataSourcesContainer(): DataSources {
        return this._dataSourcesContainer;
    }
}
