import { Component } from '@angular/core';
import { Http, ResponseContentType, Headers } from '@angular/http';
import { Subscriber } from 'rxjs';

import {
  QuestionFactory, Form, FormFactory, ObsValueAdapter, OrderValueAdapter,
  EncounterAdapter, DataSources, FormErrorsService, EncounterPdfViewerService
} from '../../dist/ngx-formentry';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';

import { MockObs } from './mock/mock-obs';

const adultForm = require('./adult-1.4.json');
const adultFormObs = require('./mock/obs.json');
const formOrdersPayload = require('./mock/orders.json');
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
	data: any;
  schema: any;
  sections: {} = {};
  formGroup: FormGroup;
  activeTab = 0;
  form: Form;
  stack = [];
  encounterObject = adultFormObs;
  showingEncounterViewer = false;
  public header: string = 'UMD Demo';

  constructor(
    private questionFactory: QuestionFactory,
    private formFactory: FormFactory, private obsValueAdapater: ObsValueAdapter,
    private orderAdaptor: OrderValueAdapter,
		private encAdapter: EncounterAdapter, private dataSources: DataSources,
		private encounterPdfViewerService: EncounterPdfViewerService,
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

		this.dataSources.registerDataSource('patient', { sex: 'M'}, true);

		this.dataSources.registerDataSource('patientInfo', {
			name: 'Test Patient', age: '37', birthdate: '7/7/1982', mui: '447062073-5', nid: '1234567'
		});

		this.dataSources.registerDataSource('file', {
				fileUpload: (data) => {
					return of({ image: 'https://unsplash.it/1040/720' });
				},
				fetchFile: (url) => {
					console.log(url, 'APP COMPONENT');
					return new Observable((observer: Subscriber<any>) => {
						let objectUrl: string = null;
							const headers = new Headers({ Accept: 'image/png,image/jpeg,image/gif' });
							this.http
								.get('https://unsplash.it/1040/720', {
									headers,
									responseType: ResponseContentType.Blob
								})
								.subscribe(m => {
									objectUrl = URL.createObjectURL(m.blob());
									console.log(objectUrl);
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

	public setUpCascadeSelectForWHOStaging() {
		let subject = new Subject();
		let source = this.dataSources.dataSources['conceptAnswers'];
		source.dataFromSourceChanged = subject.asObservable();

		let whoStageQuestion = this.form.searchNodeByQuestionId('adultWHOStage')[0];
		if (whoStageQuestion){
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
	}

	public getSectionData(sectionId) {
		let data = {};
		data = this.sections[sectionId];
		return data;
	}

	public clickTab(tabNumber) {
		this.activeTab = tabNumber;
	}

	public createForm() {
		this.form = this.formFactory.createForm(this.schema, this.dataSources.dataSources);
	}
	
	public sampleResolve(): Observable<any> {
		let item = { value: '1', label: 'Art3mis' };
		return Observable.create((observer: Subject<any>) => {
			setTimeout(() => {
				observer.next(item);
			}, 1000);
		});
	}

	public sampleSearch(): Observable<any> {
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

	public onSubmit($event) {
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

	public toggleEncounterViewer() {
		this.showingEncounterViewer === true ?
		this.showingEncounterViewer = false : this.showingEncounterViewer = true;
	}
}
