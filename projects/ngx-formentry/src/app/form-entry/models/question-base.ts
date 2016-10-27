import { IBaseOptions } from '../interfaces/base-options';
export class QuestionBase {
    value?: any;
    type: string;
    key: string;
    label?: string;
    order?: number;
    emitChanges?: boolean;

    constructor(options: IBaseOptions) {

        this.value = options.value;
        this.type = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.emitChanges = options.emitChanges || true;
    }
}

