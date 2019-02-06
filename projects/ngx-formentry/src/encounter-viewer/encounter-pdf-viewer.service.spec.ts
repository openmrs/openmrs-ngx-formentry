import { TestBed, async } from '@angular/core/testing';

import { EncounterPdfViewerService } from './encounter-pdf-viewer.service';
import { EncounterViewerService } from './encounter-viewer.service';
import { EncounterAdapter } from '../form-entry/value-adapters/encounter.adapter';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { ObsAdapterHelper } from '../form-entry/value-adapters/obs-adapter-helper';
import { OrderValueAdapter } from '../form-entry/value-adapters/order.adapter';
import { Form } from '../form-entry/form-factory/form';
import { FormFactory } from '../form-entry/form-factory/form.factory';
import {
  QuestionFactory,
  ControlRelationsFactory,
  ValidationFactory
} from '../form-entry/form-factory';
import { FormControlService } from '../form-entry/form-factory/form-control.service';
import { HidersDisablersFactory } from '../form-entry/form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-entry/form-factory/show-messages.factory';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
import { JsExpressionHelper } from '../form-entry/helpers/js-expression-helper';
import { DebugModeService } from '../form-entry/services/debug-mode.service';
import { DataSources } from '../form-entry/data-sources/data-sources';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

const adultForm = require('../../../../src/app/adult-1.4.json');
const adultFormObs = require('../../../../src/app/mock/obs.json');
const adultFormOrders = require('../../../../src/app/mock/orders.json');

function sampleResolve(): Observable<any> {
  const item = { value: '1', label: 'Art3mis' };
  return Observable.create((observer: Subject<any>) => {
    setTimeout(() => {
      observer.next(item);
    }, 1000);
  });
}

function sampleSearch(): Observable<any> {
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

describe('EncounterPdfViewerService: ', () => {
  let service: EncounterPdfViewerService;
  let encAdapter: any;
  let obsAdapter: any;
  let formFactory: any;
  let form: Form;
  let adultFormSchema: any;
  let pages: any;
  let dataSources: DataSources;

  beforeEach(async () => {
    adultFormSchema = JSON.parse(JSON.stringify(adultForm));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EncounterViewerService,
        EncounterAdapter,
        ObsValueAdapter,
        ObsAdapterHelper,
        OrderValueAdapter,
        FormFactory,
        FormControlService,
        QuestionFactory,
        ValidationFactory,
        ControlRelationsFactory,
        HidersDisablersFactory,
        ExpressionRunner,
        JsExpressionHelper,
        DebugModeService,
        AlertsFactory,
        DataSources
      ]
    });

    const encounter = {
      encounterDatetime: '2016-12-14T11:26:23.000+0300',
      encounterType: {
        uuid: '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
        display: 'ADULTRETURN'
      },
      form: {
        uuid: '81f92a8a-ff5c-415d-a34c-b5bdca2406be',
        name: 'AMPATH POC Adult Return Visit Form v1.0'
      },
      location: {
        uuid: '18c343eb-b353-462a-9139-b16606e6b6c2',
        display: 'Location Test'
      },
      obs: adultFormObs.obs,
      orders: adultFormOrders.orders,
      patient: {
        uuid: 'patient-uuid',
        identifiers: []
      },
      encounterProviders: [
        {
          provider: {
            uuid: 'ef59ac9d-9cca-46c5-ab04-b4d708584e13',
            display: 'Florida Jepngetich Kiplagat'
          }
        }
      ],
      uuid: '3841e9e6-b6cb-4667-b495-89331c6a973a'
    };

    formFactory = TestBed.get(FormFactory);
    encAdapter = TestBed.get(EncounterAdapter);
    obsAdapter = TestBed.get(ObsValueAdapter);
    service = TestBed.get(EncounterPdfViewerService);

    dataSources = TestBed.get(DataSources);

    // wire data sources
    dataSources.registerDataSource('location', {
      searchOptions: sampleSearch,
      resolveSelectedValue: sampleResolve
    });
    dataSources.registerDataSource('provider', {
      searchOptions: sampleSearch,
      resolveSelectedValue: sampleResolve
    });

    dataSources.registerDataSource('patientInfo', {
      name: 'Test Patient',
      age: '37',
      birthdate: '7/7/1982',
      mui: '447062073-5',
      nid: '1234567'
    });

    // set encounter, obs, orders
    form = formFactory.createForm(adultFormSchema, dataSources.dataSources);
    encAdapter.populateForm(form, adultFormObs);

    pages = obsAdapter.traverse(form.rootNode);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getPages', () => {
    it('returns an array of observables if remoteSelectsOnly is set to true', async(() => {
      const result = service.getPages(pages, form, true);

      expect(result).toEqual(jasmine.any(Array));
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(jasmine.any(Observable));
    }));

    it('returns an array of pages whose sections have answered questions if remoteAns is set to true', () => {
      const result = service.getPages(pages, form, false, true);
      const pageLabel1 = result[0].table.body[0][0].text;
      const pageLabel2 = result[1].table.body[0][0].text;
      const pageLabel3 = result[2].table.body[0][0].text;
      const pageLabel4 = result[3].table.body[0][0].text;
      const pageLabel5 = result[4].table.body[0][0].text;
      const pageLabel6 = result[5].table.body[0][0].text;
      const pageLabel7 = result[6].table.body[0][0].text;

      expect(result).toEqual(jasmine.any(Array));
      expect(result.length).toEqual(7);
      expect(pageLabel1).toEqual('Encounter Details');
      expect(pageLabel2).toEqual('Medication History');
      expect(pageLabel3).toEqual('Med Side Effects');
      expect(pageLabel4).toEqual('Current Symptoms');
      expect(pageLabel5).toEqual('Test Results');
      expect(pageLabel6).toEqual('Medication Plan');
      expect(pageLabel7).toEqual('Plan');
    });
  });

  describe('#getSections', () => {
    it('returns an array containing the observable results of resolving nodes that depend on remote data sources', async(() => {
      const remoteAns = [{ value: '1', label: 'Art3mis' }];
      let result = [];

      for (const page of pages) {
        result = result.concat(
          service.getSections(page.page, form, false, remoteAns)
        );
      }

      expect(result).toEqual(jasmine.any(Array));
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(jasmine.any(Observable));
    }));

    it('returns an array of sections whose questions have answers when resolve and remoteAns are both true', () => {
      let result = [];
      const remoteAns = [{ value: '1', label: 'Art3mis' }];

      for (const page of pages) {
        result = result.concat(
          service.getSections(page.page, form, true, remoteAns)
        );
      }

      const sectionLabel1 = result[0][0].table.body[0][0].text;
      const sectionLabel2 = result[1][0].table.body[0][0].text;
      const sectionLabel3 = result[2][0].table.body[0][0].text;
      const sectionLabel4 = result[3][0].table.body[0][0].text;
      const sectionLabel5 = result[4][0].table.body[0][0].text;
      const sectionLabel6 = result[5][0].table.body[0][0].text;
      const sectionLabel7 = result[6][0].table.body[0][0].text;
      const sectionLabel8 = result[7][0].table.body[0][0].text;
      const sectionLabel9 = result[8][0].table.body[0][0].text;
      const sectionLabel10 = result[9][0].table.body[0][0].text;
      const sectionLabel11 = result[10][0].table.body[0][0].text;
      const sectionLabel12 = result[11][0].table.body[0][0].text;
      const sectionLabel13 = result[12][0].table.body[0][0].text;
      const sectionLabel14 = result[13][0].table.body[0][0].text;
      const sectionLabel15 = result[14][0].table.body[0][0].text;

      expect(result).toEqual(jasmine.any(Array));
      expect(result.length).toEqual(15);

      expect(sectionLabel1).toEqual('Encounter Details');
      expect(sectionLabel2).toEqual('ART History');
      expect(sectionLabel3).toEqual('PCP Prophylaxis History');
      expect(sectionLabel4).toEqual('TB Prophylaxis History');
      expect(sectionLabel5).toEqual('Tuberculosis History');
      expect(sectionLabel6).toEqual('Other Medications');
      expect(sectionLabel7).toEqual('Side Effects/Toxicity');
      expect(sectionLabel8).toEqual('TB Screening Questions');
      expect(sectionLabel9).toEqual('Chemistry Lab Tests');
      expect(sectionLabel10).toEqual('ART Plan');
      expect(sectionLabel11).toEqual('PCP Prophylaxis Plan');
      expect(sectionLabel12).toEqual('TB Prophylaxis Plan');
      expect(sectionLabel13).toEqual('TB Treatment Plan');
      expect(sectionLabel14).toEqual('Test Orders');
      expect(sectionLabel15).toEqual('Next Appointment');
    });
  });

  it('#getSectionData returns a questions object containing an array of questions and answers', async(() => {
    pages[0].page[0].section[0].control.value =
      'Thu Dec 01 2016 11:33:57 GMT+0300 (East Africa Time)';

    const remoteAns = [{ value: '1', label: 'Art3mis' }];
    const result = [];

    for (const page of pages) {
      for (const section of page.page) {
        if (section.section) {
          result.push((service.getSectionData(section.section, remoteAns, form)));
        }
      }
    }

    const artHistoryResults = result[10].stack;

    expect(result.length).toBeGreaterThan(0);
    expect(artHistoryResults.length).toEqual(6);
    expect(artHistoryResults[0].text[0]).toEqual(
      'Is the patient on any ART?: '
    );
    expect(artHistoryResults[0].text[1].text).toEqual('YES');
    expect(artHistoryResults[1].text[0]).toEqual('Reason for use: ');
    expect(artHistoryResults[1].text[1].text).toEqual('TREATMENT');
    expect(artHistoryResults[2].text[0]).toEqual(
      'If patient started ART since last visit, enter start date: '
    );
    expect(artHistoryResults[2].text[1].text).toEqual('1 Dec 2016');
    expect(artHistoryResults[3].text[0]).toEqual(
      'Line of ART patient is taking: '
    );
    expect(artHistoryResults[3].text[1].text).toEqual('FIRST LINE REGIMEN');
    expect(artHistoryResults[4].text[0]).toEqual(
      'Patient\'s ART regimen, adults: '
    );
    expect(artHistoryResults[4].text[1].text).toEqual(
      '3TC300mg/TDF300mg,NVP200/ZDV300/3TC150,TDF300mg/3TC300mg/EFV600mg'
    );
  }));

  it('#getRemoteSectionData returns an array containing the observable results of resolving remote-select nodes', () => {
    let result = [];

    for (const page of pages) {
      for (const section of page.page) {
        result = result.concat(service.getRemoteSectionData(section.section));
      }
    }

    expect(result).toEqual(jasmine.any(Array));
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toEqual(jasmine.any(Observable));
  });

  // tslint:disable-next-line:max-line-length
  it('#generatePdfDefinition(form) emits a docDefinition object obtained from combining all the observable results of resolving remote nodes', async(() => {
    const docDef$ = service.generatePdfDefinition(form);

    expect(docDef$).toBeTruthy();
    expect(docDef$).toEqual(jasmine.any(BehaviorSubject));
  }));

  it('#resolveValue resolves answers recursively', () => {
    // uuid
    expect(
      service.resolveValue('a899b35c-1350-11df-a1f1-0026b9348838', form)
    ).toEqual('YES');

    // date
    expect(service.resolveValue('2016-12-01T00:00:00.000+0300', form)).toEqual(
      '1 Dec 2016'
    );

    // array
    const arrayValue = [
      'a89cc876-1350-11df-a1f1-0026b9348838',
      '6a73f32d-1870-4527-af6e-74443251ded2',
      '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
    ];

    expect(service.resolveValue(arrayValue, form)).toContain(
      '3TC300mg/TDF300mg'
    );
    expect(service.resolveValue(arrayValue, form)).toContain(
      'NVP200/ZDV300/3TC150'
    );
    expect(service.resolveValue(arrayValue, form)).toContain(
      'TDF300mg/3TC300mg/EFV600mg'
    );

    // number
    expect(service.resolveValue(1000, form)).toEqual(1000);

    // boolean
    expect(service.resolveValue(false, form)).toEqual(false);
    expect(service.resolveValue(true, form)).toEqual(true);

    // object
    expect(
      service.resolveValue(
        {
          creatinine_test: 1000,
          date_creatinine_test: '2016-01-21T16:17:46.000+0300'
        },
        form
      )
    ).toEqual([
      [
        ['creatinine_test', 1000],
        ['date_creatinine_test', '2016-01-21T16:17:46.000+0300']
      ]
    ]);
  });

  it('#isDate(val) determines whether the val is a valid ISO 8601 date', () => {
    const testValue1 = '2019-01-01T00:00:00.00Z';
    const testValue2 = '2019-01-01';
    const testValue3 = '20190101';
    const testValue4 = 'is not a real date';

    expect(service.isDate(testValue1)).toBeTruthy();
    expect(service.isDate(testValue2)).toBeTruthy();
    expect(service.isDate(testValue3)).toBeTruthy();
    expect(service.isDate(testValue4)).toBeFalsy();
  });

  it('#isUuid(value) determines whether value is a valid uuid', () => {
    const testValue1 = '0cd16e94-c6dd-4211-bbae-b9bc4487ca08';
    const testValue2 = 'abcde';

    expect(service.isUuid(testValue1)).toBeTruthy();
    expect(service.isUuid(testValue2)).toBeFalsy();
  });

  it('#titleize(str) converts the first letter of each word to uppercase and the remainder to lowercase', () => {
    const testStr = 'test string';
    const testStr2 = 'TEST STRING';
    const testStr3 = 'Test String';

    expect(service.titleize(testStr)).toBe('Test String');
    expect(service.titleize(testStr2)).toBe('Test String');
    expect(service.titleize(testStr3)).toBe('Test String');
  });
});
