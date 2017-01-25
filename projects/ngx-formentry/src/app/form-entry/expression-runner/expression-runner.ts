import { AbstractControl } from '@angular/forms';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';

const moment = require('moment');
export class ExpressionRunner {
    getRunnable(expression: string, control: AfeFormArray | AfeFormGroup | AfeFormControl, helper: any, dataDependencies: any):
        Runnable {
        let runner = this;
        let runnable: Runnable = {
            run: () => {

                /* tslint:disable */
                let scope: any = {};
                if (control.uuid) {
                    scope[control.uuid] = control.value;
                }
                window['moment'] = moment;
                // scope.moment = moment;
                scope['myValue'] = control.value;
                runner.getControlRelationValueString(control, scope);
                runner.getHelperMethods(helper, scope);
                runner.getDataDependencies(dataDependencies, scope);
                let paramList = '';
                let argList = '';
                for (let o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }

                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }

                let funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                let funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';

                try {

                    if (Object.keys(scope).indexOf('undefined') >= 0) {
                        console.warn('Missing reference found', expression, scope);
                        return false;
                    }
                    // console.info('results: ', expression, eval(funcDeclarationCode + funcCallCode));
                    return eval(funcDeclarationCode + funcCallCode);
                } catch (e) {
                    // if (window['error_count']) {
                    //     window['error_count'] = window['error_count'] + 1;
                    // } else {
                    //     window['error_count'] = 1;
                    // }
                    // console.error(window['error_count'] + ' Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // console.error('Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));

                    // Uncomment the line above during debugging
                    // console.error('Error running expression:' + expression);

                    return false;
                }
                /* tslint:enable */
            }
        };
        return runnable;
    }

    private getControlRelationValueString(control: AfeFormArray | AfeFormGroup | AfeFormControl, scope: any) {

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
                        scope[related.uuid] = relation.relatedTo.value && relation.relatedTo.value.value ?
                            relation.relatedTo.value.value : relation.relatedTo.value;
                    }
                }
            });
        }

        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {

            control.controlRelations.otherRelations.forEach(node => {
                if (node instanceof ArrayNode) {
                    let arrayNode: ArrayNode = node as ArrayNode;
                    let uuid = control.uuid;

                    let controlRelationsFactory: ControlRelationsFactory = new ControlRelationsFactory();
                    let relationsForControl: Array<AfeFormControl | AfeFormArray> = [];
                    // get all related controls
                    arrayNode.children.forEach(child => {
                        relationsForControl = relationsForControl.concat(controlRelationsFactory.getRelationsForControl(uuid, child));
                        ;
                    });

                    this.setControlArrayValues(control as AfeFormControl | AfeFormArray, relationsForControl, scope);
                }
            });
        }
    }

    private setControlArrayValues(control: AfeFormControl | AfeFormArray,
        relationsForControl: Array<AfeFormControl | AfeFormArray>, scope: any) {
        let keys: Array<string> = this._getFormControlKeys(relationsForControl);

        keys.forEach(key => {
            let values: any = this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    }

    private _getFormControlKeys(array: Array<AfeFormControl | AfeFormArray>): Array<string> {

        let keys: Array<string> = [];
        array.forEach(control => {

            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });

        return keys;
    }

    private _getValuesForKey(key: string, array: Array<AfeFormControl | AfeFormArray>): any {
        let values: any = [];

        array.forEach(control => {

            if (control.uuid === key) {
                values.push(control.value);
            }
        });

        return values;
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
