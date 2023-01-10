import { BaseOptions } from '../interfaces/base-options';

export interface RadioButtonOptions extends BaseOptions {
  allowUnselect?: boolean;
  options: { key: string; value: string }[];
}
