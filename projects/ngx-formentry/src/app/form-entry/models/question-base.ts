
import { Validation } from './validation';
export class QuestionBase<T>{
    value?: T;
    type: string;
    key: string;
    label?: string;
    order?: number;
    emitChanges?: boolean;
    settings?: {};
    validation?: Array<Validation>;
    constructor(options: QuestionBase<any>) {
        this.value = options.value;
        this.type = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.emitChanges = options.emitChanges || true;
        this.validation = options.validation || [];
    }
}

