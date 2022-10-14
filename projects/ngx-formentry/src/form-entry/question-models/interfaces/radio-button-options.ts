import { BaseOptions } from '../interfaces/base-options';

export interface RadioButtonOptions extends BaseOptions {
  options: { key: string; value: string }[];
}
