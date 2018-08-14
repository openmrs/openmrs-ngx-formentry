import { OnInit } from '@angular/core';
import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { NodeBase, LeafNode } from '../form-factory/form-node';
import { FormErrorsService } from '../services/form-errors.service';
export declare class ErrorRendererComponent implements OnInit {
    private validationFactory;
    private formErrorsService;
    form: Form;
    constructor(validationFactory: ValidationFactory, formErrorsService: FormErrorsService);
    ngOnInit(): void;
    showErrors(): boolean;
    readonly errorNodes: any;
    getControlError(node: LeafNode): string[];
    announceErrorField(errorNode: LeafNode): void;
    getPageIndex(node: NodeBase): number;
}
