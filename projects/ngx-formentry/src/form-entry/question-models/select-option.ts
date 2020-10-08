import { SelectOption } from './interfaces/select-option';
export class Option {
  label: string;
  value: any;
  constructor(options: SelectOption) {
    this.label = options.label;
    this.value = options.value;
  }
}
