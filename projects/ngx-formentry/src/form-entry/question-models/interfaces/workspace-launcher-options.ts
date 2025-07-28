import { BaseOptions } from '../interfaces/base-options';

export interface WorkspaceLauncherOptions extends BaseOptions {
  buttonLabel: string;
  buttonType: string;
  workspaceName: string;
  additionalProps: Record<string, unknown>;
}
