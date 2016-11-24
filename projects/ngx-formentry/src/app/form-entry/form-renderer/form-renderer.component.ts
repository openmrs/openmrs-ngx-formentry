import { Component, OnInit, Input } from '@angular/core';

import { NodeBase } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { ValidationFactory } from '../factories/validation.factory';
@Component({
    selector: 'form-renderer',
    templateUrl: 'form-renderer.component.html'
})
export class FormRendererComponent implements OnInit {

    @Input() node: NodeBase;
    @Input() parentGroup: AfeFormGroup;
    constructor(private validationFactory: ValidationFactory) {
        // console.log('Node', this.node);
    }

    ngOnInit() {
        // console.log('Node', this.node);
    }

    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }

    errors() {
        return this.getErrors(this.node);
    }

    private getErrors(node: NodeBase) {
        let errors: any = node.control.errors;

        if (errors) {

            return this.validationFactory.errors(errors, node.question);
        }

        return [];
    }

}
