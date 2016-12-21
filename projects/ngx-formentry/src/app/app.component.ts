import { Component, style, state, animate, transition, trigger, OnInit } from '@angular/core';
import { QuestionFactory } from './form-entry/form-factory/question.factory';
import { FormGroup } from '@angular/forms';

import { Form } from './form-entry/form-factory/form';
import { FormFactory } from './form-entry/form-factory/form.factory';
import { ObsPayloadFactoryService } from './form-entry/services/obs-payload-factory.service';
import { MockObs } from './mock/mock-obs';
import { OrderValueAdapter } from './form-entry/value-adapters';

const adultForm = require('./adult');
const adultFormObs = require('./mock/obs');
const formOrdersPayload = require('./mock/orders');
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
    constructor(private questionFactory: QuestionFactory, private formFactory: FormFactory, private obsFactory: ObsPayloadFactoryService,
        private orderAdaptor: OrderValueAdapter) {
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

        // Traverse to get  orders' nodes
        this.orderAdaptor.populateForm(this.form, formOrdersPayload);

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
        let obs = new MockObs();
        this.form = this.formFactory.createForm(this.schema, obs.getObs());
    }

    onSubmit($event) {

        $event.preventDefault();

        if (this.form.valid) {

            // Traverse  to get all nodes
            let pages = this.obsFactory.traverse(this.form.rootNode);
            // Extract actual question nodes
            let questionNodes = this.obsFactory.getQuestionNodes(pages);
            // Get obs Payload
            let payload = this.obsFactory.getObsPayload(questionNodes);
            console.log(payload);
            // Assign a provider to be used as orderer
            this.orderAdaptor.setOrderProvider('provider-uuid');

            // generate payload
            let ordersPayload = this.orderAdaptor.generateFormPayload(this.form);
            console.log('orders Payload', ordersPayload);

        } else {

            this.form.markInvalidControls(this.form.rootNode);
        }
    }

    getPayLoad() {
    }
}
