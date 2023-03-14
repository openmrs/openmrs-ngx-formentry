import { BaseOptions } from '../interfaces/base-options';
import {DataSource} from "./data-source";
export interface DiagnosisQuestionOptions extends BaseOptions {
  dataSource?: string;
  rendering: string;
  rank: 1 | 2;
  options?: Array<Record<string, string>>;
}
