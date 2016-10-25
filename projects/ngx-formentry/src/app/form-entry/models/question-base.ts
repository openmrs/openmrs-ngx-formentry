import { Validation } from './validation';
export class QuestionBase<T>{
    type: string;
    key: string;
    label?: string;
    // placeholder?: string
    value?: T;
    order?: number;
    emitChanges?: boolean;
    settings?: {};
    // options?: Array<{ value: string | number, name: string, disabled: boolean }>
    validation?: Array<Validation>;
    constructor(options: QuestionBase<any>) {
        this.type = options.type;
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.emitChanges = options.emitChanges || true;
        this.validation = options.validation || [];
        this.order = options.order === undefined ? 1 : options.order;
    }
}

