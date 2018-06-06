import { AbstractControl } from '@angular/forms';

import { ControlRelation } from './control-relation';

export class ControlRelations {

    private _relationFor: AbstractControl;
    private _relations: ControlRelation[];
    private _otherRelations: any = [];

    constructor(relationFor: AbstractControl, relatedTo?: AbstractControl | AbstractControl[]) {
        this._relationFor = relationFor;
        this._relations = [];

        if (relatedTo) {
            this.addRelatedControls(relatedTo);
        }
    }

    get relationsFor(): AbstractControl {
        return this._relationFor;
    }

    get relations(): ControlRelation[] {
        return this._relations;
    }

    get otherRelations() {
      return this._otherRelations;
    }

    addRelatedControls(relatedTo: AbstractControl | AbstractControl[]) {
        if (relatedTo instanceof AbstractControl) {
            this.relations.push(new ControlRelation(this._relationFor, relatedTo));
        }

        if (relatedTo instanceof Array) {
            for (let i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    }
}
