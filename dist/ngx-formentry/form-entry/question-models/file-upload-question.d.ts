import { QuestionBase } from './question-base';
import { FileUploadQuestionOptions } from './interfaces/file-upload-question-options';
export declare class FileUploadQuestion extends QuestionBase {
    showTime: boolean;
    showWeeksAdder: boolean;
    dataSource?: any;
    constructor(options: FileUploadQuestionOptions);
}
