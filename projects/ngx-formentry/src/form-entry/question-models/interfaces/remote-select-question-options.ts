import { BaseOptions } from '../interfaces/base-options';

export interface RemoteSelectQuestionOptions extends BaseOptions {
  dataSource: string;
  dataSourceOptions?: Record<string, unknown>;
}
