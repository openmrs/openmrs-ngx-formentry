import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { Form } from '../form-factory/form';
export declare class ExpressionRunner {
    getRunnable(expression: string, control: AfeFormArray | AfeFormGroup | AfeFormControl, helper: any, dataDependencies: any, form?: Form): Runnable;
    private getControlRelationValueString(control, scope);
    private setControlArrayValues(control, relationsForControl, scope);
    private _getFormControlKeys(array);
    private _getValuesForKey(key, array);
    private getHelperMethods(obj, scope?);
    private getDataDependencies(obj, scope?);
}
export interface Runnable {
    run(): any;
}
