import { BaseOptions } from '../interfaces/base-options';
import {DataSource} from "./data-source";
export interface DiagnosisQuestionOptions extends BaseOptions {
  dataSource?: DataSource;
  rendering: string;
  rank: 1 | 2;
  options?: { key: string; value: string }[];
}
