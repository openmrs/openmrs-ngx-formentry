# AMPATH POC Formentry

Ampath forms is a forms engine that is inspired and built to work with OpenMRS and its encounter/obs model. That being said it tries not to assume that it will be used with an OpenMRS context and does not take responsibility for fetching any dynamic data from OpenMRS that responsibility should be handled by the consuming application by providing data sources to the engine

The form engine is built on top Angular forms and provides extensions to support our specific data collection requirements. A good place to start for you to understand Ampath forms is the Angular tutorial on [building dynamic forms](https://angular.io/guide/dynamic-form) (We highly recommend that you work through the tutorial)

## Main Concepts

### Question Model

The question model is lifted from the Angular tutorial and adapted to support our form schema.

### Datasources

The concept of datasources is an attempt at eliminating need for the library to know about the OpenMRS backend for cases where you need to ;

- Resolve uuid to labels by hitting an OpenMRS endpoint (Mostly used for values which provide concept uuids and allows us fetch the label from a remote endpoint)
- Fetch options for a select drop down by searching via rest (Used for concepts and drugs)
- Upload documents and relate them to an encounter(Basically allows us to upload images and then set the url as an obs value which may not be ideal)

The engine does not care about where the data sources get their data, only that they return observables which the engine can subscribe to for the data it needs. Which means you can provide dummy observables to the engine and it will happily consume them (That is how the example consumer app in the repository works without having an OpenMRS backend)

### Expression runner

The expression run is basically that it takes in an expression , runs it and returns true or false. It is used for hiding/showing , disabling/enabling controls and in running complex validation logic.

### Control Relations

This is an important component that allows validation and skip logic. It is done after the question model has been transformed into an angular form schema and basically just goes through each control and identifies which fields cares about subscribes to their changes.

### Validation and Skip logic

We use Javascript expressions through the expression runner to achieve complex cross field validations and skip logic.

### Calculations

The engine contains a suite of helpers to allow fields to calculate their values based on the values of other field this is also dependant on the expression runner.

### Control Interfaces

CanHide - This is used in a control to provide an implementation for hiding a control

CanDisable - This is used in a control to provide an implementation for disabling a control

CanGenerateAlert - This is used in a control to provide an implementation for generating FYI alerts that won’t prevent you from saving the form

CanCalculate - This is used in a control to provide an implementation for calculating the value of the field base on other values in the form

### Custom Controls

Angular provides various controls for handling forms FormControl - for simple fields , FormGroup - grouped fields and FormArray for repeating fields. Afe\* controls are custom implementations of these fields to add some custom behaviour necessary for the form engine.

AfeFormControl

AfeFormGroup

AfeFormArray

### Custom Components

The form engine supports using custom widgets and controls. The widgets and controls are standards web components customized to work with the engine by implimeneting a set a of inputs.

The custom widgets take recieve this inputs

- `config` which provides the the widgets configs
- `dark` which will be used to toggle the them to match the engine when this is true the widget should have a background color of `#f4f4f4` and `#ffffff` otherwise

Custom Controls will receive

- `question` - Json of the question as defined in the schema
- `value` - current value of the control
- `disabled` - disabled state of the control
- `config` - the config of the control

When developing the engine expects custom components to be served at localhost:8000 see example components at https://github.com/enyachoke/afe-ref-custom-components. Otherwise project will complain about the proxy

`[HPM] Error occurred while trying to proxy request /lib/web-components.bundled.js?module from localhost:4200 to http://localhost:8000 (ECONNREFUSED) (https://nodejs.org/api/errors.html#errors_common_system_errors)`

Which is should be fine if your are not working on custom components (Make sure to not include them in the schema)

### Developing

`$ git clone https://github.com/AMPATH/ngx-openmrs-formentry`

`$ cd ngx-openmrs-formentry `

`$ npm install`

`$ npm start `

### Build the library by running:

`$ npm run build:lib`

### Usage

`app.component.ts`

```Javascript
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Subscriber } from 'rxjs';
import { Observable, Subject, of } from 'rxjs';

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

}
```

`app.component.html`

```html
<div *ngIf="form && form.rootNode">
  <form [formGroup]="form.rootNode.control">
    <ofe-form-renderer
      (onAction)="actionClicked($event)"
      [node]="form.rootNode"
    ></ofe-form-renderer>
  </form>
</div>
```

See `src/app/adult-1.4.json` for and `src/app/mock/obs.json` for sample encounter payload

### To publish:

Update the version in both of the `package.json` files

`$ git add -f dist`

`$ git commit -m 'Bump <Version>'`

`$ git tag <Version>`

Reset branch so you don't commit the dist to the src repository

```

$ git reset HEAD~1 --hard

$ git checkout <version tag>

$ npm login

$ npm publish

```
