import { FormFactory } from './form.factory';
import { QuestionFactory } from '../factories/question.factory';

// import { AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { GroupNode } from './form-node';

export class Form {
    public rootNode: GroupNode;
    constructor(public schema: any, public FormFactory: FormFactory, public questionFactory: QuestionFactory) {

    }
    
}
