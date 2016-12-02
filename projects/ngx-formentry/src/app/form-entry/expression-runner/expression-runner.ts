import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
export class ExpressionRunner {
    getRunnable(expression: string, control: AfeFormArray | AfeFormGroup | AfeFormControl, helper: any, dataDependencies: any):
        Runnable {
        let toRun = this.getControlRelationValueString(control);
        toRun = toRun + this.getHelperMethods(helper);
        toRun = toRun + this.getDataDependencies(dataDependencies);
        let runnable: Runnable = {
            run: () => {
                /* tslint:disable */
                return eval(toRun + expression);
                /* tslint:enable */
            }
        };
        return runnable;
    }

    private getControlRelationValueString(control: AfeFormArray | AfeFormGroup | AfeFormControl): string {
        let toRun = '';
        control.controlRelations.relations.forEach(relation => {
            if (relation.relatedTo instanceof AfeFormArray ||
                relation.relatedTo instanceof AfeFormControl ||
                relation.relatedTo instanceof AfeFormGroup) {
                let related = relation.relatedTo as any;
                toRun = toRun + ' var ' + related.uuid + '=' + relation.relatedTo.value + ';';
            }
        });
        return toRun;
    }

    private getHelperMethods(obj: any) {
        let toRun = '';
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                toRun = toRun + ' var ' + key + ' = ' + obj[key] + ';';
            }
        }
        return toRun;
    }

    private getDataDependencies(obj: any) {
        let toRun = '';
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                toRun = toRun + ' var ' + key + ' = ' +
                    JSON.stringify(obj[key], (key, val) => {
                        return (typeof val === 'function') ? '' + val : val;
                    }) + ';';
            }
        }
        return toRun;
    }

}

export interface Runnable {
    run();
}
