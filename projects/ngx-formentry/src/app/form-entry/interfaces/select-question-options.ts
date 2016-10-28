import { BaseOptions } from '../interfaces/base-options';

export interface SelectQuestionOptions extends BaseOptions {
   options: { key: string, value: string }[];
}