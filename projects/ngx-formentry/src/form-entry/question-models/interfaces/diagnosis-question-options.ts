import { BaseOptions } from '../interfaces/base-options';
export interface DiagnosisQuestionOptions extends BaseOptions {
  dataSource?: string;
  rendering: string;
  rank: number;
  options?: Array<Record<string, string>>;
}
