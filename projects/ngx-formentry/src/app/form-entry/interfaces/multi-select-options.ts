import { IBaseOptions } from '../interfaces/base-options';

export interface IMultiSelectQuestionOptions extends IBaseOptions {
   options: { key: string, value: string }[];
}