import { BaseOptions } from '../interfaces/base-options';
import { DataSource } from '../interfaces/data-source';
export interface SelectQuestionOptions extends BaseOptions {
    options: {
        key: string;
        value: string;
    }[];
    dataSource?: DataSource;
}
