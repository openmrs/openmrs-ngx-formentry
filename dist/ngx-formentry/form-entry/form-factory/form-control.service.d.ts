import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension';
import { NestedQuestion } from '../question-models/interfaces/nested-questions';
import { QuestionBase } from '../question-models/question-base';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { Form } from './form';
export declare class FormControlService {
    private alertsFactory;
    controls: any[];
    validationFactory: ValidationFactory;
    hidersDisablersFactory: HidersDisablersFactory;
    constructor(validationFactory: ValidationFactory, hidersDisablersFactory: HidersDisablersFactory, alertsFactory: AlertsFactory);
    generateControlModel(questionModel: QuestionBase | NestedQuestion, parentControl: AfeFormGroup, generateChildren: boolean, form?: Form): AfeFormControl | AfeFormArray | AfeFormGroup;
    generateFormGroupModel(question: QuestionBase, generateChildren: boolean, parentControl?: AfeFormGroup, form?: Form): AfeFormGroup;
    _generateFormGroupChildrenModel(questions: QuestionBase[], parentControl: AfeFormGroup, form?: Form): void;
    generateFormArray(question: QuestionBase, parentControl?: AfeFormGroup, form?: Form): AfeFormArray;
    generateFormControl(question: QuestionBase, parentControl?: AfeFormGroup, form?: Form): AfeFormControl;
    private wireAlerts(question, control, form?);
    private wireHidersDisablers(question, control, form?);
    private wireCalculator(question, control, dataSource?);
}
