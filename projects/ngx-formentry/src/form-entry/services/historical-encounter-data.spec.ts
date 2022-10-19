import { TestBed } from '@angular/core/testing';
import { HistoricalEncounterDataService } from './historical-encounter-data.service';
import { MockObs } from '../../mock/mock-obs';

const obs = new MockObs();

describe('Historical Encounter Data Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HistoricalEncounterDataService,
          useFactory: () => {
            const HD = new HistoricalEncounterDataService();
            HD.registerEncounters('prevEnc', obs.getObs());
            return HD;
          },
          deps: []
        }
      ]
    });
  });

  it('should be defined', () => {
    const service: HistoricalEncounterDataService = TestBed.inject(
      HistoricalEncounterDataService
    );
    expect(service).toBeTruthy();
  });

  it('should have "prevEnc" registered as key', () => {
    const service: HistoricalEncounterDataService = TestBed.inject(
      HistoricalEncounterDataService
    );
    expect(service.getObject('prevEnc').getSingleObject()).toEqual(
      obs.getExpected()
    );
  });

  it('should register in reverse chronological order and utilise getAllObjects() correctly', () => {
    const encArray = [
      {
        uuid: 'encounter-uuid-kasa',
        encounterDatetime: '2016-01-01T16:17:46.000+0300',
        provider: {
          uuid: 'provider-uuid',
          display: '5566790 - H Dengue Provider'
        },
        obs: [
          {
            uuid: 'ac55c445-9661-4d42-86b5-4d6ec33a6274',
            obsDatetime: '2016-01-21T16:17:46.000+0300',
            concept: {
              uuid: 'a8a666ba-1350-11df-a1f1-0026b9348838'
            },
            value: '2016-02-26T00:00:00.000+0300',
            groupMembers: null
          }
        ]
      },
      {
        uuid: 'encounter-uuid-kisi',
        encounterDatetime: '2016-01-21T16:17:46.000+0300',
        provider: {
          uuid: 'provider-uuid',
          display: '5566790 - H Dengue Provider'
        },
        obs: [
          {
            uuid: 'ac55c445-9661-4d42-86b5-4d6ec33a6274',
            obsDatetime: '2016-01-21T16:17:46.000+0300',
            concept: {
              uuid: 'a8a666ba-1350-11df-a1f1-0026b9348838'
            },
            value: '2016-02-15T00:00:00.000+0300',
            groupMembers: null
          }
        ]
      },
      {
        uuid: 'encounter-uuid-koso',
        encounterDatetime: '2016-01-11T16:17:46.000+0300',
        provider: {
          uuid: 'provider-uuid',
          display: '5566790 - H Dengue Provider'
        },
        obs: [
          {
            uuid: 'ac55c445-9661-4d42-86b5-4d6ec33a6274',
            obsDatetime: '2016-01-21T16:17:46.000+0300',
            concept: {
              uuid: 'a8a666ba-1350-11df-a1f1-0026b9348838'
            },
            value: '2016-02-28T00:00:00.000+0300',
            groupMembers: null
          }
        ]
      }
    ];

    const service: HistoricalEncounterDataService = new HistoricalEncounterDataService();
    service.registerEncounters('prevEncs', encArray);
    const store: Array<any> = service.getObject('prevEncs').getAllObjects();
    expect(store.length).toEqual(encArray.length);
    expect(store[0].encounterDatetime).toEqual(encArray[1].encounterDatetime);
    expect(store[1].encounterDatetime).toEqual(encArray[2].encounterDatetime);
  });

  it('should have getObject() and getSingleObject() working', () => {
    const service: HistoricalEncounterDataService = TestBed.inject(
      HistoricalEncounterDataService
    );
    expect(service.getObject('prevEnc').getSingleObject()).toEqual(
      obs.getExpected()
    );
  });

  it('getValue() should get the correct value', () => {
    const service: HistoricalEncounterDataService = TestBed.inject(
      HistoricalEncounterDataService
    );
    const _obs: any = obs.getObs();
    expect(
      service.getObject('prevEnc').getValue('encounterDatetime').value
    ).toEqual(_obs.encounterDatetime);
    expect(service.getObject('prevEnc').getValue('location').value).toEqual(
      _obs.location.uuid
    );
    expect(service.getObject('prevEnc').getValue('patient').value).toEqual(
      _obs.patient.uuid
    );
    expect(service.getObject('prevEnc').getValue('form').value).toEqual(
      _obs.form.uuid
    );
    expect(
      service.getObject('prevEnc').getValue('encounterType').value
    ).toEqual(_obs.encounterType.uuid);
    expect(
      service
        .getObject('prevEnc')
        .getValue(
          '2a4b87dd-977d-4ce8-a321-1f13df4a31b2.479decbd-e964-41c3-9576-98b39089ebd3'
        ).value
    ).toEqual('a8b0f882-1350-11df-a1f1-0026b9348838');
    expect(
      service
        .getObject('prevEnc')
        .getValue(
          'a8afdb8c-1350-11df-a1f1-0026b9348838.a8a0744e-1350-11df-a1f1-0026b9348838'
        ).value
    ).toEqual(600);
    expect(
      service
        .getObject('prevEnc')
        .getValue(
          'a8afdb8c-1350-11df-a1f1-0026b9348838.a899e5f2-1350-11df-a1f1-0026b9348838'
        )
    ).toEqual({
      value: '2016-01-10T00:00:00.000+0300',
      valueDate: jasmine.stringMatching(/2016-01-21T\d{2}:\d{2}:\d{2}/)
    });
  });
});
