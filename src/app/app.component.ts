import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UntypedFormGroup } from '@angular/forms';

import { Subscriber, Observable, Subject, of, Observer } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import {
  DataSources,
  EncounterAdapter,
  Form,
  FormErrorsService,
  FormFactory,
  ObsValueAdapter,
  OrderValueAdapter,
  PersonAttribuAdapter,
  QuestionFactory
} from '@openmrs/ngx-formentry';
import { MockObs } from './mock/mock-obs';
import { mockTranslationsData } from './mock/mock-translations';
import { PatientIdentifierAdapter } from 'projects/ngx-formentry/src/form-entry/value-adapters/patient-identifier.adapter';
import { AppointmentAdapter } from 'projects/ngx-formentry/src/form-entry/value-adapters/appointment.adapter';
import { AppointmentSummaryService } from './appointment.service';

const adultReturnVisitForm = require('./adult-1.8.json');
const adultReturnVisitFormObs = require('./mock/obs.json');
const formOrdersPayload = require('./mock/orders.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activeTab = 0;
  currentLanguage = 'en';
  encounterObject = adultReturnVisitFormObs;
  form: Form;
  formGroup: UntypedFormGroup;
  labelMap = {};
  schema: any;
  sections: {} = {};

  constructor(
    private questionFactory: QuestionFactory,
    private formFactory: FormFactory,
    private obsValueAdapater: ObsValueAdapter,
    private orderAdaptor: OrderValueAdapter,
    private encAdapter: EncounterAdapter,
    private dataSources: DataSources,
    private formErrorsService: FormErrorsService,
    private http: HttpClient,
    private translate: TranslateService,
    private personAttributeAdapter: PersonAttribuAdapter,
    private patientIdenfierAdapter: PatientIdentifierAdapter,
    private appointmentsAdapter: AppointmentAdapter,
    private patientIdentifierAdapter: PatientIdentifierAdapter,
    private appointmentSummaryService: AppointmentSummaryService
  ) {
    this.schema = adultReturnVisitForm;
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
    this.dataSources.registerDataSource('location_datasource', {
      searchOptions: this.sampleLocationSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource('provider', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource('diagnoses', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource('services', {
      searchOptions: this.sampleSearch,
      resolveSelectedValue: this.sampleResolve
    });
    this.dataSources.registerDataSource(
      'appointmentSummaryService',
      this.appointmentSummaryService
    );

    const ds = {
      dataSourceOptions: { concept: undefined },
      searchOptions: (text?: string) => {
        if (ds.dataSourceOptions && ds.dataSourceOptions.concept) {
          const items: Array<any> = [
            { value: 1, label: 'Stage 1 Symptom' },
            { value: 2, label: 'Stage 2 Symptom' }
          ];

          return new Observable((observer: Observer<object>) => {
            setTimeout(() => {
              observer.next(items);
            }, 1000);
          });
        }
      },

      resolveSelectedValue: (key: string) => {
        if (ds.dataSourceOptions && ds.dataSourceOptions.concept) {
          const item = { value: 1, label: 'Stage 1 Symptom' };
          return new Observable((observer: Observer<object>) => {
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
    this.dataSources.registerDataSource('rawPrevObs', obs.getObs());

    this.dataSources.registerDataSource(
      'patient',
      { sex: 'F', age: 35, uuid: 'bc0ad4a9-f794-11ea-b693-24770374d658' },
      true
    );

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

    this.form.valueProcessingInfo = {
      patientUuid: '00357841-034d-49a5-9c53-b94bc3626eb2',
      visitUuid: 'visitUuid',
      encounterTypeUuid: 'encounterTypeUuid',
      formUuid: 'formUuid',
      encounterUuid: 'encounterUuid',
      providerUuid: 'providerUuid',
      utcOffset: '+0300',
      locationUuid: 'some-location-uuid',
      dateAppointmentIssued: new Date().toISOString(),
      age: 37
    };

    // Set encounter, obs, orders
    adultReturnVisitFormObs.orders = formOrdersPayload.orders;
    this.encAdapter.populateForm(this.form, adultReturnVisitFormObs);

    this.setUpCascadeSelectForWHOStaging();
    if (!this.form.valid) {
      this.form.showErrors = false;
      this.form.rootNode.control.markAsDirty();
    }
    // this.appointmentsAdapter.populateForm(this.form, appointmentPayload as any);

    // populate identifiers
    const patientIdentifiers = [
      {
        uuid: 'ad8da7d9-d760-4b43-80d6-a9a1429c3432',
        identifierType: {
          uuid: 'dfacd928-0370-4315-99d7-6ec1c9f7ae76',
          display: 'OpenMRS ID'
        },
        identifier: 'M4X79',
        location: {
          uuid: '7537b643-6196-4472-a53c-b11f43efc067',
          display: 'Wema Centre Medical Clinic'
        }
      }
    ];

    this.patientIdentifierAdapter.populateForm(this.form, patientIdentifiers);
    this.form.valueProcessingInfo = {
      patientIdentifiers: patientIdentifiers
    };

    // Alternative is to set individually for obs and orders as show below
    // // Set obs
    // this.obsValueAdapater.populateForm(this.form, adultReturnVisitFormObs.obs);

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

    // Ensure patientUuid is set at form creation so concept reference ranges can be fetched
    this.form.valueProcessingInfo = {
      ...(this.form.valueProcessingInfo || {}),
      patientUuid: '00357841-034d-49a5-9c53-b94bc3626eb2'
    };

    // Get concepts with no label
    const concepts = this.traverseForUnlabeledConcepts(this.form.rootNode);

    // Fetch missing labels from concept dictionary
    this.fetchMockedConceptData(concepts).then((conceptData: any) => {
      this.labelMap = [];
      conceptData.forEach((concept: any) => {
        this.labelMap[concept.reqId] = concept.display;
      });
    });

    this.translate.currentLang = this.currentLanguage;
    this.fetchMockedTranslationsData().then((translationsData: any) => {
      this.translate.setTranslation(
        translationsData?.language,
        translationsData?.translations
      );
    });
  }

  populateSampleData() {
    // Set main form data
    const mainFormControls = this.form.rootNode.control;

    // Set visit date
    const visitDateControl = mainFormControls.get(
      'Visit Information.Visit Details.visit_date'
    );
    if (visitDateControl) {
      visitDateControl.setValue(new Date('2016-12-01'));
    }

    // Set chief complaint
    const chiefComplaintControl = mainFormControls.get(
      'Visit Information.Visit Details.chief_complaint'
    );
    if (chiefComplaintControl) {
      chiefComplaintControl.setValue(
        'Patient reports chest pain and shortness of breath'
      );
    }

    // Set subform data - Vital Signs Assessment
    const vitalsSystolicControl = mainFormControls.get(
      'Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_bp_group.vitals_systolic'
    );
    if (vitalsSystolicControl) {
      vitalsSystolicControl.setValue(140);
    }

    const vitalsDiastolicControl = mainFormControls.get(
      'Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_bp_group.vitals_diastolic'
    );
    if (vitalsDiastolicControl) {
      vitalsDiastolicControl.setValue(90);
    }

    const heartRateControl = mainFormControls.get(
      'Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_heart_rate'
    );
    if (heartRateControl) {
      heartRateControl.setValue(85);
    }

    const temperatureControl = mainFormControls.get(
      'Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_temperature'
    );
    if (temperatureControl) {
      temperatureControl.setValue(37.2);
    }

    // Set subform data - Laboratory Tests
    const hivTestControl = mainFormControls.get(
      'Laboratory Tests.Lab Orders.Test Orders.hiv_test'
    );
    if (hivTestControl) {
      hivTestControl.setValue('a8982474-1350-11df-a1f1-0026b9348838');
    }

    const cd4TestControl = mainFormControls.get(
      'Laboratory Tests.Lab Orders.Test Orders.cd4_test'
    );
    if (cd4TestControl) {
      cd4TestControl.setValue('a89dda72-1350-11df-a1f1-0026b9348838');
    }

    // Set subform data - Medication Review
    const medicationListControl = mainFormControls.get(
      'Medication Review.Medications.Current Medications.medication_list'
    );
    if (medicationListControl) {
      medicationListControl.setValue(
        'Aspirin 81mg daily, Lisinopril 10mg daily'
      );
    }
  }

  fetchMockedTranslationsData() {
    const promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        const translationsData = mockTranslationsData.find(
          (translation) => translation.language === 'en'
        );
        resolve(translationsData);
      }, 2000);
    });
    return promise;
  }

  fetchMockedConceptData(concepts) {
    const promise = new Promise(function (resolve, reject) {
      // Simulate a server response with some delay
      setTimeout(function () {
        const conceptData = [
          {
            uuid: 'a89ff9a6-1350-11df-a1f1-0026b9348838',
            display: 'Was this visit scheduled?',
            reqId: concepts[0]
          },
          {
            uuid: 'a89b6440-1350-11df-a1f1-0026b9348838',
            display: 'Scheduled visit',
            reqId: concepts[1]
          },
          {
            uuid: 'a89ff816-1350-11df-a1f1-0026b9348838',
            display: 'Unscheduled visit early',
            reqId: concepts[2]
          },
          {
            uuid: 'a89ff8de-1350-11df-a1f1-0026b9348838',
            display: 'Unscheduled visit late',
            reqId: concepts[3]
          }
        ];
        resolve(conceptData);
      }, 2000);
    });
    return promise;
  }

  traverseForUnlabeledConcepts(o, type?) {
    let concepts = [];
    if (o.children) {
      if (o.children instanceof Array) {
        const returned = this.traverseRepeatingGroupForUnlabeledConcepts(
          o.children
        );
        return returned;
      }
      if (o.children instanceof Object) {
        for (const key in o.children) {
          if (o.children.hasOwnProperty(key)) {
            const question = o.children[key].question;
            switch (question.renderingType) {
              case 'page':
              case 'section':
              case 'group':
                const childrenConcepts = this.traverseForUnlabeledConcepts(
                  o.children[key]
                );
                concepts = concepts.concat(childrenConcepts);
                break;
              case 'repeating':
                const repeatingConcepts = this.traverseRepeatingGroupForUnlabeledConcepts(
                  o.children[key].children
                );
                concepts = concepts.concat(repeatingConcepts);
                break;
              default:
                if (!question.label && question.extras.questionOptions) {
                  concepts.push(question.extras.questionOptions.concept);
                }
                if (question.extras.questionOptions.answers) {
                  question.extras.questionOptions.answers.forEach((answer) => {
                    if (!answer.label) {
                      concepts.push(answer.concept);
                    }
                  });
                }
                break;
            }
          }
        }
      }
    }
    return concepts;
  }

  traverseRepeatingGroupForUnlabeledConcepts(nodes) {
    const toReturn = [];
    for (const node of nodes) {
      toReturn.push(this.traverseForUnlabeledConcepts(node));
    }
    return toReturn;
  }

  public sampleResolve(): Observable<any> {
    const item = { value: '1', label: 'Art3mis' };
    return Observable.create((observer: Subject<any>) => {
      setTimeout(() => {
        observer.next(item);
      }, 1000);
    });
  }

  public sampleLocationSearch(
    searchText: string
  ): Observable<Array<Record<string, string>>> {
    const locations = [
      {
        value: 'ba685651-ed3b-4e63-9b35-78893060758a',
        label: 'Inpatient Ward'
      },
      {
        value: '184ac7d9-225a-41f8-bac7-c87b1327e1b0',
        label: 'Ward 1'
      },
      {
        value: '5a7f3c53-6bb4-448b-a966-5e65b397b9f3',
        label: 'Ward 2'
      },
      {
        value: '2272b8cd-b690-4878-a50c-40d22235b3f3',
        label: 'Ward 3'
      },
      {
        value: 'db0253bb-8e2e-4b2c-b60c-6c88110e3c2e',
        label: 'Duplix'
      }
    ];
    if (!searchText) {
      return of(locations);
    }
    return of(
      locations.filter((location) =>
        location.label.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

  public sampleSearch(searchText: string): Observable<any> {
    const items: Array<any> = [
      { value: '885b4ad3-fd4c-4a16-8ed3-08813e6b01fR', label: 'Art3mis' },
      { value: '885b4ad3-fd4c-4a16-8ed3-08813e6b01fa', label: 'Appointment' },
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

    this.form.valueProcessingInfo = {
      patientUuid: '00357841-034d-49a5-9c53-b94bc3626eb2',
      visitUuid: 'visitUuid',
      encounterTypeUuid: 'encounterTypeUuid',
      formUuid: 'formUuid',
      encounterUuid: 'encounterUuid',
      providerUuid: 'providerUuid',
      utcOffset: '+0300',
      locationUuid: 'some-location-uuid',
      dateAppointmentIssued: new Date().toISOString(),
      age: 37
    };

    if (this.form.valid) {
      this.form.showErrors = false;
      // const payload = this.encAdapter.generateFormPayload(this.form);
      // console.log('payload', payload);
      // const encounterFromSubform = this.encAdapter.generateFormPayloadWithSubforms(
      //   this.form
      // );
      // console.log('encounterFromSubform', encounterFromSubform);

      // Alternative is to populate for each as shown below
      // // generate obs payload
      // let payload = this.obsValueAdapater.generateFormPayload(this.form);

      // // generate orders payload
      // let ordersPayload = this.orderAdaptor.generateFormPayload(this.form);

      // generate patient identifiers
      //const patientIdenfitiers = this.patientIdenfierAdapter.generateFormPayload(this.form,this.form.valueProcessingInfo['locationUuid']);
      // generate appointment payload
      // const appointmentPayload = this.appointmentsAdapter.generateFormPayload(
      //   this.form
      // );
      // console.log('Appointment Payload', appointmentPayload);
      // const patientIdentifiers = this.patientIdentifierAdapter.generateFormPayload(
      //   this.form,
      //   this.form.valueProcessingInfo['locationUuid']
      // );
    } else {
      this.form.showErrors = true;
      this.form.markInvalidControls(this.form.rootNode);
    }
  }

  public reset($event) {
    $event.preventDefault();
    this.form.rootNode.control.reset();
  }
}
