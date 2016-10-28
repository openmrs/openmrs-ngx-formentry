import { IBaseOptions } from '../interfaces/base-options';

export class QuestionBase {
    value?: any;
    type: string;
    key: string;
    label?: string;

    constructor(options: IBaseOptions) {

        this.value = options.value;
        this.type = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
    }
}

