import { QuestionBase } from './question-base';
import { FileUploadQuestionOptions } from './interfaces/file-upload-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class FileUploadQuestion extends QuestionBase {
    showTime: boolean = true;
    showWeeksAdder: boolean = false;
    dataSource?: any;
    constructor(options: FileUploadQuestionOptions) {
        super(options);
        this.renderingType = 'file';
        this.dataSource = options.dataSource;
        this.controlType = AfeControlType.AfeFormControl;
    }
}
