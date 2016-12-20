import { AbstractControl } from '@angular/forms';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
export class ExpressionRunner {
    getRunnable(expression: string, control: AfeFormArray | AfeFormGroup | AfeFormControl, helper: any, dataDependencies: any):
        Runnable {
        let runner = this;
        let runnable: Runnable = {
            run: () => {

                /* tslint:disable */
                let scope: any = {};
                if (control instanceof AfeFormArray ||
                    control instanceof AfeFormControl ||
                    control instanceof AfeFormGroup) {
                    scope[control.uuid] = control.value;
                }

                runner.getControlRelationValueString(control, scope);
                runner.getHelperMethods(helper, scope);
                runner.getDataDependencies(dataDependencies, scope);
                let paramList = '';
                let argList = '';
                for (let o in scope) {
                    paramList = paramList === '' ? paramList + o : paramList + ',' + o;
                    argList = argList === '' ? argList + 'scope.' + o : argList + ',' + 'scope.' + o;
                }
                expression = '"return ' + expression + '"';
                let funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                let funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
                //console.log(funcDeclarationCode + funcCallCode);
                try {
                    return eval(funcDeclarationCode + funcCallCode);
                } catch (e) {
                    console.error('Error running expression:' + expression + '. ', e);
                    return false;
                }
                /* tslint:enable */
            }
        };
        return runnable;
    }

    private getControlRelationValueString(control: AfeFormArray | AfeFormGroup | AfeFormControl, scope?: any) {

        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(relation => {
                if (relation.relatedTo instanceof AfeFormArray ||
                    relation.relatedTo instanceof AfeFormControl ||
                    relation.relatedTo instanceof AfeFormGroup) {
                    let related = relation.relatedTo as any;
                    let relatedAsControl = relation.relatedTo as AbstractControl;
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    } else {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                }
            });
        }

    }

    private getHelperMethods(obj: any, scope?: any) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }

    private getDataDependencies(obj: any, scope?: any) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }

}

export interface Runnable {
    run();
}
