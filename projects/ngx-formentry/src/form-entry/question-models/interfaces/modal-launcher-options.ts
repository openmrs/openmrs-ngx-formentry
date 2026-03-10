import { BaseOptions } from '../interfaces/base-options';

export interface ModalLauncherOptions extends BaseOptions {
  buttonLabel: string;
  buttonType: string;
  modalName: string;
  additionalProps: Record<string, unknown>;
}
