import { BaseOptions } from '../interfaces/base-options';
export interface CheckboxOptions extends BaseOptions {
    options: {
        key: string;
        value: string;
    }[];
}
