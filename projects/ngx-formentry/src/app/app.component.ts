import { Component, style, state, animate, transition, trigger, OnInit } from '@angular/core';
import { QuestionFactory } from './form-entry/form-factory/question.factory';
import { FormGroup } from '@angular/forms';

import { Form } from './form-entry/form-factory/form';
import { FormFactory } from './form-entry/form-factory/form.factory';
import { MockObs } from './mock/mock-obs';
import { ObsValueAdapter, OrderValueAdapter } from './form-entry/value-adapters';

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
    constructor(private questionFactory: QuestionFactory, private formFactory: FormFactory, private obsValueAdapater: ObsValueAdapter,
        private orderAdaptor: OrderValueAdapter) {
        this.schema = adultForm;
        this.createForm();
    }
    ngOnInit() {

        // Set obs
        this.obsValueAdapater.populateForm(this.form, adultFormObs.obs);

        // Set orders
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
            // generate obs payload
            let payload = this.obsValueAdapater.generateFormPayload(this.form);
            console.log('obs payload', payload);

            // generate orders payload
            let ordersPayload = this.orderAdaptor.generateFormPayload(this.form);
            console.log('orders Payload', ordersPayload);

        } else {

            this.form.markInvalidControls(this.form.rootNode);
        }
    }
}
