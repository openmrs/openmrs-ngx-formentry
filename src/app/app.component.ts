import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Subscriber ,  Observable, Subject, of } from 'rxjs';

import {
  QuestionFactory,
  Form,
  FormFactory,
  ObsValueAdapter,
  OrderValueAdapter,
  EncounterAdapter,
  DataSources,
  FormErrorsService,
  EncounterPdfViewerService
} from '../../dist/ngx-formentry';
import { MockObs } from './mock/mock-obs';

const adultForm = require('./adult-1.4.json');
const adultFormObs = require('./mock/obs.json');
const formOrdersPayload = require('./mock/orders.json');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  schema: any;
  sections: {} = {};
  formGroup: FormGroup;
  activeTab = 0;
  form: Form;
  stack = [];
  encounterObject = adultFormObs;
  showingEncounterViewer = false;
  public header = 'UMD Demo';

  constructor(
    private questionFactory: QuestionFactory,
    private formFactory: FormFactory,
    private obsValueAdapater: ObsValueAdapter,
    private orderAdaptor: OrderValueAdapter,
    private encAdapter: EncounterAdapter,
    private dataSources: DataSources,
    private encounterPdfViewerService: EncounterPdfViewerService,
    private formErrorsService: FormErrorsService,
    private http: HttpClient
  ) {
    this.schema = adultForm;
  }

  ngOnInit() {
    this.dataSources.registerDataSource('drug', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource('personAttribute', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource('problem', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource('location', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource('provider', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });

    const ds = {
      dataSourceOptions: { concept: undefined },
      searchOptions: (text?: string) => {
        if (ds.dataSourceOptions && ds.dataSourceOptions.concept) {
          const items: Array<any> = [
            { id: 1, text: 'Stage 1 Symptom' },
            { id: 2, text: 'Stage 2 Symptom' }
          ];
          return Observable.create((observer: Subject<any>) => {
            setTimeout(() => {
              observer.next(items);
            }, 1000);
          });
        }
      },

      resolveSelectedValue: (key: string) => {
        if (ds.dataSourceOptions && ds.dataSourceOptions.concept) {
          const item = { id: 1, text: 'Stage 1 Symptom' };
          return Observable.create((observer: Subject<any>) => {
            setTimeout(() => {
              observer.next(item);
            }, 1000);
          });
        }
      }
    };

    this.dataSources.registerDataSource('conceptAnswers', ds);

    const obs = new MockObs();
    this.dataSources.registerDataSource('rawPrevEnc', obs.getObs());

    this.dataSources.registerDataSource('patient', { sex: 'M' }, true);

    this.dataSources.registerDataSource('patientInfo', {
      name: 'Test Patient',
      age: '37',
      birthdate: '7/7/1982',
      mui: '447062073-5',
      nid: '1234567'
    });

    this.dataSources.registerDataSource('file', {
      fileUpload: (data) => {
        return of({ image: 'https://unsplash.it/1040/720' });
      },
      fetchFile: (url) => {
        return new Observable((observer: Subscriber<any>) => {
          let objectUrl: string = null;
          const headers = new HttpHeaders({
            Accept: 'image/png,image/jpeg,image/gif,application/pdf'
          });
          this.http
            .get('https://unsplash.it/1040/720', {
              headers,
              responseType: 'json'
            })
            .subscribe((res: any) => {
              const blob = new Blob(res.body);
              objectUrl = URL.createObjectURL(blob);
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
    const subject = new Subject();
    const source = this.dataSources.dataSources['conceptAnswers'];
    source.dataFromSourceChanged = subject.asObservable();

    const whoStageQuestion = this.form.searchNodeByQuestionId(
      'adultWHOStage'
    )[0];
    if (whoStageQuestion) {
      whoStageQuestion.control.valueChanges.subscribe((val) => {
        if (source.dataFromSourceChanged) {
          if (val === 'a89b2606-1350-11df-a1f1-0026b9348838') {
            subject.next([
              { value: 3, label: 'Stage 3 Symptom' },
              { value: 4, label: 'Stage 4 Symptom' }
            ]);
          } else {
            subject.next([
              { value: 5, label: 'Stage 5 Symptom' },
              { value: 6, label: 'Stage 6 Symptom' }
            ]);
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
    this.form = this.formFactory.createForm(
      this.schema,
      this.dataSources.dataSources
    );
  }

  public sampleResolve(): Observable<any> {
    const item = { value: '1', label: 'Art3mis' };
    return Observable.create((observer: Subject<any>) => {
      setTimeout(() => {
        observer.next(item);
      }, 1000);
    });
  }

  public sampleSearch(): Observable<any> {
    const items: Array<any> = [
      { value: '0', label: 'Aech' },
      { value: '5b6e58ea-1359-11df-a1f1-0026b9348838', label: 'Art3mis' },
      { value: '2', label: 'Daito' },
      { value: '3', label: 'Parzival' },
      { value: '4', label: 'Shoto' }
    ];

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
      const payload = this.encAdapter.generateFormPayload(this.form);
      console.log(payload)
      // Alternative is to populate for each as shown below
      // // generate obs payload
      // let payload = this.obsValueAdapater.generateFormPayload(this.form);

      // // generate orders payload
      // let ordersPayload = this.orderAdaptor.generateFormPayload(this.form);
    } else {
      this.form.showErrors = true;
      this.form.markInvalidControls(this.form.rootNode);
    }
  }

  public toggleEncounterViewer() {
    this.showingEncounterViewer === true
      ? (this.showingEncounterViewer = false)
      : (this.showingEncounterViewer = true);
  }
}
