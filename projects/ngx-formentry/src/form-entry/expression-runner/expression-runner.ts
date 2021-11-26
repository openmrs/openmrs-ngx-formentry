import { AbstractControl } from '@angular/forms';
import {
  AfeFormControl,
  AfeFormArray,
  AfeFormGroup
} from '../../abstract-controls-extension/control-extensions';
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import { Form } from '../form-factory/form';
import * as moment_ from 'moment';
import { Injectable } from "@angular/core";

const moment = moment_;
@Injectable()
export class ExpressionRunner {
  getRunnable(
    expression: string,
    control: AfeFormArray | AfeFormGroup | AfeFormControl,
    helper: any,
    dataDependencies: any,
    form?: Form
  ): Runnable {
    const runner = this;
    const runnable: Runnable = {
      run: () => {
        /* tslint:disable */
        let scope: any = {};
        if (control.uuid) {
          scope[control.uuid] = control.value;
        }
        window['moment'] = moment;
        // scope.moment = moment;
        scope['myValue'] = control.value;
        runner.setControlQuestion(control, form, scope);
        runner.getControlRelationValueString(control, scope);
        runner.getHelperMethods(helper, scope);
        runner.getDataDependencies(dataDependencies, scope);
        if (form) {
          // console.error('Form defined', form);
          runner.getDataDependencies(
            form.dataSourcesContainer.dataSources,
            scope
          );
        }

        let paramList = '';
        let argList = '';
        for (let o in scope) {
          paramList = paramList === '' ? paramList + o : paramList + ',' + o;
          argList =
            argList === ''
              ? argList + "scope['" + o + "']"
              : argList + ",scope['" + o + "']";
        }

        // prevent more than one return statements
        if (expression.indexOf('return') === -1) {
          expression = 'return ' + expression;
        }
        const afeDynamicFunc = new Function(paramList, expression);
        scope[Symbol.iterator] = function* () {
          var k;
          for (k in this) {
            yield this[k];
          }
        };

        try {
          if (Object.keys(scope).indexOf('undefined') >= 0) {
            console.warn('Missing reference found', expression, scope);
            return false;
          }
          //console.log('Result====>',res)
          //console.log('results: ', eval(funcDeclarationCode + funcCallCode));
          return afeDynamicFunc.call(this, ...scope);
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
          // console.error('Error running expression:' + expression, scope);

          return false;
        }
        /* tslint:enable */
      }
    };
    return runnable;
  }

  private getControlRelationValueString(
    control: AfeFormArray | AfeFormGroup | AfeFormControl,
    scope: any
  ) {
    if (
      control &&
      control.controlRelations &&
      control.controlRelations.relations
    ) {
      control.controlRelations.relations.forEach((relation) => {
        if (relation.relatedTo) {
          const related = relation.relatedTo as any;
          const relatedAsControl = relation.relatedTo as AbstractControl;
          if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
            scope[related.uuid] = relation.relatedTo.value;
          } else {
            scope[related.uuid] =
              relation.relatedTo.value && relation.relatedTo.value.value
                ? relation.relatedTo.value.value
                : relation.relatedTo.value;
          }
        }
      });
    }

    if (
      control &&
      control.controlRelations &&
      control.controlRelations.otherRelations &&
      control.controlRelations.otherRelations.length > 0
    ) {
      control.controlRelations.otherRelations.forEach((node) => {
        if (node instanceof ArrayNode) {
          const arrayNode: ArrayNode = node as ArrayNode;
          const uuid = control.uuid;

          const controlRelationsFactory: ControlRelationsFactory = new ControlRelationsFactory();
          let relationsForControl: Array<AfeFormControl | AfeFormArray> = [];
          // get all related controls
          arrayNode.children.forEach((child) => {
            relationsForControl = relationsForControl.concat(
              controlRelationsFactory.getRelationsForControl(uuid, child)
            );
          });

          this.setControlArrayValues(
            control as AfeFormControl | AfeFormArray,
            relationsForControl,
            scope
          );
        }
      });
    }
  }

  private setControlQuestion(control: AfeFormArray | AfeFormGroup | AfeFormControl,
    form: Form, scope: any) {
    if (
      control &&
      control.controlRelations &&
      control.controlRelations.relations) {
      control.controlRelations.relations.forEach((relation) => {
        const related = relation.relatedTo as any;
        const question = form.searchNodeByQuestionId(related.uuid)[0]?.question?.extras;
        scope['question' + related.uuid] = question;
      });
    }
  }

  private setControlArrayValues(
    control: AfeFormControl | AfeFormArray,
    relationsForControl: Array<AfeFormControl | AfeFormArray>,
    scope: any
  ) {
    const keys: Array<string> = this._getFormControlKeys(relationsForControl);

    keys.forEach((key) => {
      const values: any = this._getValuesForKey(key, relationsForControl);
      scope[key] = values;
    });
  }

  private _getFormControlKeys(
    array: Array<AfeFormControl | AfeFormArray>
  ): Array<string> {
    const keys: Array<string> = [];
    array.forEach((control) => {
      if (keys.indexOf(control.uuid) === -1) {
        keys.push(control.uuid);
      }
    });

    return keys;
  }

  private _getValuesForKey(
    key: string,
    array: Array<AfeFormControl | AfeFormArray>
  ): any {
    const values: any = [];

    array.forEach((control) => {
      if (control.uuid === key) {
        values.push(control.value);
      }
    });

    return values;
  }

  private getHelperMethods(obj: any, scope?: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        scope[key] = obj[key];
      }
    }
  }

  private getDataDependencies(obj: any, scope?: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        scope[key] = obj[key];
      }
    }
  }
}

export interface Runnable {
  run();
}
