import { BaseOptions } from '../interfaces/base-options';
export interface UiSelectQuestionOptions extends BaseOptions {
    options: {
        key: string;
        value: string;
    }[];
    searchFunction: Function;
    resolveFunction: Function;
}
