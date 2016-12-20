import { Component, style, state, animate, transition, trigger, OnInit } from '@angular/core';
import { QuestionFactory } from './form-entry/form-factory/question.factory';
import { FormGroup } from '@angular/forms';

import { Form } from './form-entry/form-factory/form';
import { FormFactory } from './form-entry/form-factory/form.factory';
import { ObsPayloadFactoryService } from './form-entry/services/obs-payload-factory.service';

const adultForm = require('./adult');
const adultFormObs = require('./mock/obs');
@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('flyIn', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(100%)' }),
                animate(250)
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    data: any;
    schema: any;
    sections: {} = {};
    formGroup: FormGroup;
    activeTab = 0;
    form: Form;
    stack = [];
    constructor(private questionFactory: QuestionFactory, private formFactory: FormFactory, private obsFactory: ObsPayloadFactoryService) {
        this.schema = adultForm;
        this.createForm();
    }
    ngOnInit() {
        // Traverse  to get all nodes
        let pages = this.obsFactory.traverse(this.form.rootNode);
        // Extract actual question nodes
        let questionNodes = this.obsFactory.getQuestionNodes(pages);
        // Extract set obs
        this.obsFactory.setValues(questionNodes, adultFormObs.obs);
    }

    getSectionData(sectionId) {
        let data = {};
        data = this.sections[sectionId];
        return data;
    }


    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }

    createForm() {
        this.form = this.formFactory.createForm(this.schema);
    }

    onSubmit($event) {
        $event.preventDefault();
        // Traverse  to get all nodes
        let pages = this.obsFactory.traverse(this.form.rootNode);
        // Extract actual question nodes
        let questionNodes = this.obsFactory.getQuestionNodes(pages);
        // Get obs Payload
        let payload = this.obsFactory.getObsPayload(questionNodes);
        console.log(payload);
    }
}
