import { Component, style, state, animate, transition, trigger, OnInit } from '@angular/core';
import { Http, ResponseContentType, Headers } from '@angular/http';
import { Subscriber } from 'rxjs/Subscriber';

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
        private formErrorsService: FormErrorsService, private http: Http) {
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
        this.dataSources.registerDataSource('messages', { needsVl: true }, true);

        this.dataSources.registerDataSource('file', {
            fileUpload: (data) => {
                return Observable.of({ image: 'https://unsplash.it/1040/720' });
            },
            fetchFile: (url) => {
                return new Observable((observer: Subscriber<any>) => {
                    let objectUrl: string = null;
                    let headers = new Headers({ 'Accept': 'image/png,image/jpeg,image/gif' });
                    this.http
                        .get(url, {
                            headers,
                            responseType: ResponseContentType.Blob
                        })
                        .subscribe(m => {
                            objectUrl = URL.createObjectURL(m.blob());
                            observer.next(objectUrl);
                        });

                    return () => {
                        if (objectUrl) {
                            URL.revokeObjectURL(objectUrl);
                            objectUrl = null;
                        }
                    };
                });
            }
        });

        // Create form
        this.createForm();

        // Set encounter, obs, orders

        adultFormObs.orders = formOrdersPayload.orders;
        this.encAdapter.populateForm(this.form, adultFormObs);

        this.setUpCascadeSelectForWHOStaging();

        // Alternative is to set individually for obs and orders as show below
        // // Set obs
        // this.obsValueAdapater.populateForm(this.form, adultFormObs.obs);

        // // Set orders
        // this.orderAdaptor.populateForm(this.form, formOrdersPayload);

    }

    setUpCascadeSelectForWHOStaging() {
        let subject = new Subject();
        let source = this.dataSources.dataSources['conceptAnswers'];
        source.dataFromSourceChanged = subject.asObservable();

        let whoStageQuestion = this.form.searchNodeByQuestionId('adultWHOStage')[0];
        whoStageQuestion.control.valueChanges.subscribe((val) => {
            if (source.dataFromSourceChanged) {
                console.log('changing value for WHO', val);
                if (val === 'a89b2606-1350-11df-a1f1-0026b9348838') {
                    subject.next([{ value: 3, label: 'Stage 3 Symptom' }, { value: 4, label: 'Stage 4 Symptom' }]);
                } else {
                    subject.next([{ value: 5, label: 'Stage 5 Symptom' }, { value: 6, label: 'Stage 6 Symptom' }]);
                }
            }
        });
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
        console.log('The Form', this.form);

    }
    sampleResolve(): Observable<any> {
        let item = { value: '1', label: 'Art3mis' };
        return Observable.create((observer: Subject<any>) => {
            setTimeout(() => {
                observer.next(item);
            }, 1000);

        });
    }
    sampleSearch(): Observable<any> {
        let items: Array<any> = [{ value: '0', label: 'Aech' },
        { value: '5b6e58ea-1359-11df-a1f1-0026b9348838', label: 'Art3mis' },
        { value: '2', label: 'Daito' },
        { value: '3', label: 'Parzival' },
        { value: '4', label: 'Shoto' }];
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
