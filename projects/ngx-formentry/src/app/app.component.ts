import { Component, style, state, animate, transition, trigger, OnInit } from '@angular/core';
import { QuestionFactory } from './form-entry/form-factory/question.factory';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs/Rx';

import { Form } from './form-entry/form-factory/form';
import { FormFactory } from './form-entry/form-factory/form.factory';
import { MockObs } from './mock/mock-obs';
import { ObsValueAdapter, OrderValueAdapter, EncounterAdapter } from './form-entry/value-adapters';
import { DataSources } from './form-entry/data-sources/data-sources';
import { FormErrorsService } from './form-entry/services';

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
    ],
    providers: [FormErrorsService]
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
        private orderAdaptor: OrderValueAdapter, private encAdapter: EncounterAdapter, private dataSources: DataSources,
        private formErrorsService: FormErrorsService) {
        this.schema = adultForm;

    }

    ngOnInit() {
        this.dataSources.registerDataSource('drug', { searchOptions: this.sampleSearch, resolveSelectedValue: this.sampleResolve });
        this.dataSources.registerDataSource('personAttribute',
            { searchOptions: this.sampleSearch, resolveSelectedValue: this.sampleResolve });
        this.dataSources.registerDataSource('problem', { searchOptions: this.sampleSearch, resolveSelectedValue: this.sampleResolve });
        this.dataSources.registerDataSource('location', { searchOptions: this.sampleSearch, resolveSelectedValue: this.sampleResolve });
        this.dataSources.registerDataSource('provider', { searchOptions: this.sampleSearch, resolveSelectedValue: this.sampleResolve });

        let ds = {
            dataSourceOptions: { concept: undefined },
            searchOptions: (text?: string) => {
                if (ds.dataSourceOptions && ds.dataSourceOptions.concept) {
                    let items: Array<any> = [{ id: 1, text: 'Stage 1 Symptom' }, { id: 2, text: 'Stage 2 Symptom' }];
                    return Observable.create((observer: Subject<any>) => {
                        setTimeout(() => {
                            observer.next(items);
                        }, 1000);
                    });
                }
            },
            resolveSelectedValue: (key: string) => {
                if (ds.dataSourceOptions && ds.dataSourceOptions.concept) {
                    let item = { id: 1, text: 'Stage 1 Symptom' };
                    return Observable.create((observer: Subject<any>) => {
                        setTimeout(() => {
                            observer.next(item);
                        }, 1000);
                    });
                }
            }
        };
        this.dataSources.registerDataSource('conceptAnswers', ds);

        let obs = new MockObs();
        this.dataSources.registerDataSource('rawPrevEnc', obs.getObs());

        this.dataSources.registerDataSource('patient', { sex: 'M' }, true);

        // Create form
        this.createForm();


        // Set encounter, obs, orders

        adultFormObs.orders = formOrdersPayload.orders;
        this.encAdapter.populateForm(this.form, adultFormObs);

        // Alternative is to set individually for obs and orders as show below
        // // Set obs
        // this.obsValueAdapater.populateForm(this.form, adultFormObs.obs);

        // // Set orders
        // this.orderAdaptor.populateForm(this.form, formOrdersPayload);

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
        this.form = this.formFactory.createForm(this.schema, this.dataSources.dataSources);

    }
    sampleResolve(): Observable<any> {
        let item = { id: 1, text: 'Kenya' };
        return Observable.create((observer: Subject<any>) => {
            setTimeout(() => {
                observer.next(item);
            }, 1000);

        });
    }
    sampleSearch(): Observable<any> {
        let items: Array<any> = [{ id: 1, text: 'Kenya' }, { id: 2, text: 'Uganda' }];
        return Observable.create((observer: Subject<any>) => {
            setTimeout(() => {
                observer.next(items);
            }, 1000);

        });
    }

    onSubmit($event) {

        $event.preventDefault();

        // Set valueProcessingInfo
        this.form.valueProcessingInfo = {
            patientUuid: 'patientUuid',
            visitUuid: 'visitUuid',
            encounterTypeUuid: 'encounterTypeUuid',
            formUuid: 'formUuid',
            encounterUuid: 'encounterUuid',
            providerUuid: 'providerUuid',
            utcOffset: '+0300'
        };

        if (this.form.valid) {

            this.form.showErrors = false;
            let payload = this.encAdapter.generateFormPayload(this.form);
            console.log('encounter payload', payload);

            // Alternative is to populate for each as shown below
            // // generate obs payload
            // let payload = this.obsValueAdapater.generateFormPayload(this.form);
            // console.log('obs payload', payload);

            // // generate orders payload
            // let ordersPayload = this.orderAdaptor.generateFormPayload(this.form);
            // console.log('orders Payload', ordersPayload);

        } else {
            this.form.showErrors = true;
            this.form.markInvalidControls(this.form.rootNode);
        }
    }
}
