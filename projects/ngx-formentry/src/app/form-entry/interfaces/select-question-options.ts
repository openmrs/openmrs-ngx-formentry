import { IBaseOptions } from '../interfaces/base-options';

export interface ISelectQuestionOptions extends IBaseOptions {
   options: { key: string, value: string }[];
}