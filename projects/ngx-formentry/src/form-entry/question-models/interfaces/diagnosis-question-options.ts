import { BaseOptions } from '../interfaces/base-options';
import { DataSource } from './data-source';
export interface DiagnosisQuestionOptions extends BaseOptions {
  dataSource?: string;
  dataSourceOptions?: Record<string, unknown>;
  rendering: string;
  rank: number;
  options?: Array<Record<string, string>>;
}
