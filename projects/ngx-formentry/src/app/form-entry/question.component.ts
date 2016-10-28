import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ControlGroupService } from './control-group.service';
import { QuestionBase } from './question-models/question-base';

@Component({
    selector: 'fe-question',
    template: `
  
        <div  [formGroup]="form" class="form-group" [ngClass]="{'has-error': !form.controls[question.key].valid }">
            <label
                *ngIf="question.label"
                class="control-label"
                [attr.for]="question.key">
                {{question.label}}
            </label>

            <div [ngSwitch]="question.type">
                <select class="form-control"
                    *ngSwitchCase="'dropdown'"
                    [formControlName]="question.key"
                    (ngModelChange)="onValueChange($event)"
                    [id]="question.key + 'id'">
                    <option *ngFor="let o of question.options" [value]="o.value">{{o.name ? o.name : o.value}}</option>
                </select>

                <textarea
                    class="form-control"
                    *ngSwitchCase="'textarea'"
                    [formControlName]="question.key"
                    (ngModelChange)="onValueChange($event)"
                    [id]="question.key + 'id'">
                </textarea>

                <div *ngSwitchCase="'group'">
                  <span>Group</span>
                  <fe-question *ngFor="let q of question.questions" [info]="{question: q,
                    form: getForm(question.key)}">
                  </fe-question>
                </div>

                <div *ngSwitchCase="'repeating'">
                <button class='btn btn-primary' (click)="addRepeating(question)">Add</button>
                  <span>Repeating Group</span>
                  <div *ngFor="let po of getArray(question).controls; let i = index">
                  <fe-question *ngFor="let q of question.questions" [info]="{question: q,
                    form: po }">
                  </fe-question>
                  <button class='btn btn-sm btn-danger' (click)="removeRepeating(i)">X</button>
                  </div>
                </div>

                <input
                class="form-control"
                    *ngSwitchDefault
                    [formControlName]="question.key"
                    [attr.placeholder]="question.placeholder"
                    [type]="question.type"
                    (ngModelChange)="onValueChange($event)"
                    [id]="question.key + 'id'">
            </div>
            <div class="help-block"  *ngIf="!form.controls[question.key].valid">
                <span *ngFor="let e of errors()">{{e}}</span>
            </div>
        </div>
    `
})

export class QuestionComponent implements OnInit {
    questionMap = {};
    // Add class to the wrapper
    @HostBinding('class') get toSet() {
        return this.question;
    }

    @Input() set info(value) {
        this.question = value.question;
        this.form = value.form;
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    question: QuestionBase;
    form: FormGroup;
    formArray: FormArray;

    constructor(private controlGroupService: ControlGroupService) {
        // Do stuff
    }
    ngOnInit() {

    }
    useValue(control, value) {
        control.setValue(value);
    }
    processDisabled() {
    }
    getControl(control) {
        return true;
    }
    addRepeating(question) {
        let reference = this.controlGroupService.controls.find(a => a.id.toLowerCase() === question.key.toLowerCase());
        this.formArray = reference.control;
        if (this.formArray) {
            let control = this.controlGroupService.create(question.questions, question.key)[question.key];
            this.formArray.push(control);
        }
    }
    removeRepeating(index) {
        this.formArray.removeAt(index);
    }
    getArray(question) {
        let reference = this.controlGroupService.controls.find(a => a.id.toLowerCase() === question.key.toLowerCase());
        return reference.control;
    }
    getForm(q) {
        let reference = this.controlGroupService.controls.find(a => a.id.toLowerCase() === q.toLowerCase());
        return reference.control;
    }

}
