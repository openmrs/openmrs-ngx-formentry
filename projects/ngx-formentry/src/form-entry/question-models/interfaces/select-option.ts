export interface SelectOption {
  value: any;
  label: string;
  /**
   * Optional terminology code (e.g. an ICD-11 code) displayed before the
   * label in remote-select options and selected values. Purely presentational;
   * only `value` is persisted.
   */
  code?: string;
}
