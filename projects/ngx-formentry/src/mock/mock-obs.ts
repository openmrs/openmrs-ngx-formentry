export class MockObs {
  getObs(): any {
    return {
      uuid: 'encounter-uuid',
      encounterDatetime: '2016-01-21T16:17:46.000+0300',
      patient: {
        uuid: 'patient-uuid'
      },
      form: {
        uuid: '1339a535-e38f-44cd-8cf8-f42f7c5f2ab7',
        name: 'AMPATH POC Adult Return Visit Form v0.01'
      },
      location: {
        uuid: '08feae7c-1352-11df-a1f1-0026b9348838',
        display: 'Location-1'
      },
      encounterType: {
        uuid: '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
        display: 'ADULTRETURN'
      },
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
        },
        {
          uuid: '8bcb91b0-56ad-4185-ac16-816a57f6c066',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afcafc-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a8ad1276-1350-11df-a1f1-0026b9348838',
            display: 'SHORTNESS OF BREATH'
          },
          groupMembers: null
        },
        {
          uuid: '7973f916-e37a-471d-ae43-bddd90373484',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
          },
          value: null,
          groupMembers: [
            {
              uuid: '7a907ea0-dc88-4d93-9685-8feb0761e5c8',
              display:
                'PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT: ETHAMBUTOL',
              concept: {
                uuid: 'a899e444-1350-11df-a1f1-0026b9348838',
                display: 'PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT'
              },
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              obsGroup: {
                uuid: '7973f916-e37a-471d-ae43-bddd90373484'
              },
              valueCodedName: null,
              groupMembers: null,
              voided: false,
              value: {
                uuid: 'a8971c64-1350-11df-a1f1-0026b9348838',
                display: 'ETHAMBUTOL',
                resourceVersion: '1.9'
              },
              resourceVersion: '1.8'
            },
            {
              uuid: 'e849dcc5-9e37-42db-af0b-d77e8c197571',
              display: 'NUMBER OF MILLIGRAM PER DAY: 600.0',
              concept: {
                uuid: 'a8a0744e-1350-11df-a1f1-0026b9348838',
                display: 'NUMBER OF MILLIGRAM PER DAY'
              },
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              obsGroup: {
                uuid: '7973f916-e37a-471d-ae43-bddd90373484',
                display:
                  'PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT, DETAILED: ETHAMBUTOL, 600.0'
              },
              valueCodedName: null,
              groupMembers: null,
              voided: false,
              value: 600,
              resourceVersion: '1.8'
            }
          ]
        },
        {
          uuid: '5cf1f5c7-7daf-4fd6-8b40-a6aec65a7e35',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afcafc-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a8afc8b8-1350-11df-a1f1-0026b9348838',
            display: 'COUGH FOR MORE THAN TWO WEEKS'
          },
          groupMembers: null
        },
        {
          uuid: '148ce455-3f7b-45c0-b276-66a6f62358c1',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
          },
          value: null,
          groupMembers: [
            {
              uuid: '50525f1c-56d9-4647-8ad1-b8dbc235f38e',
              display: `PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT
                          : RIFAMPICIN ISONIAZID PYRAZINAMIDE AND ETHAMBUTOL`,
              concept: {
                uuid: 'a899e444-1350-11df-a1f1-0026b9348838',
                display: 'PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT'
              },
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              accessionNumber: null,
              obsGroup: {
                uuid: '148ce455-3f7b-45c0-b276-66a6f62358c1',
                display: `PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT, DETAILED
                            : RIFAMPICIN ISONIAZID PYRAZINAMIDE AND ETHAMBUTOL, 2.0`
              },
              valueCodedName: null,
              groupMembers: null,
              voided: false,
              value: {
                uuid: 'a899f51a-1350-11df-a1f1-0026b9348838',
                display: 'RIFAMPICIN ISONIAZID PYRAZINAMIDE AND ETHAMBUTOL',
                retired: false,
                resourceVersion: '1.9'
              },
              resourceVersion: '1.8'
            },
            {
              uuid: 'fcf904f8-452e-4618-a001-f1d0891d1804',
              display: 'NUMBER OF TABLETS PER DAY: 2.0',
              concept: {
                uuid: 'a8a07386-1350-11df-a1f1-0026b9348838',
                display: 'NUMBER OF TABLETS PER DAY'
              },
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              obsGroup: {
                uuid: '148ce455-3f7b-45c0-b276-66a6f62358c1',
                display: `PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT
                    , DETAILED: RIFAMPICIN ISONIAZID PYRAZINAMIDE AND ETHAMBUTOL, 2.0`
              },
              valueCodedName: null,
              groupMembers: null,
              voided: false,
              value: 2,
              resourceVersion: '1.8'
            }
          ]
        },
        {
          uuid: '8df61319-8bd6-4c74-a065-88502b762f05',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a89c1fd4-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a89b77aa-1350-11df-a1f1-0026b9348838',
            display: 'START DRUGS'
          },
          groupMembers: null
        },
        {
          uuid: '57cedc93-8196-4d6c-a34b-5269bf23627b',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
          },
          value: null,
          groupMembers: [
            {
              uuid: '8ffbe8a8-da9a-46f2-a53b-97fd90f17313',
              display: 'TUBERCULOSIS DRUG TREATMENT START DATE: 10/01/16',
              concept: {
                uuid: 'a899e5f2-1350-11df-a1f1-0026b9348838',
                display: 'TUBERCULOSIS DRUG TREATMENT START DATE'
              },
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              obsGroup: {
                uuid: '57cedc93-8196-4d6c-a34b-5269bf23627b',
                display:
                  'PATIENT REPORTED CURRENT TUBERCULOSIS TREATMENT, DETAILED: 10/01/16'
              },
              valueCodedName: null,
              groupMembers: null,
              voided: false,
              value: '2016-01-10T00:00:00.000+0300',
              resourceVersion: '1.8'
            }
          ]
        },
        {
          uuid: 'fe7b71da-090d-42d6-afb9-b619f03ed1f3',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: '02ad9357-b996-4530-b1a4-aff91a105383'
          },
          value: {
            uuid: 'a8afcc82-1350-11df-a1f1-0026b9348838',
            display: 'CURRENTLY ON TUBERCULOSIS TREATMENT'
          },
          groupMembers: null
        },
        {
          uuid: 'c4de81ad-e667-4ead-a433-af368a1f1877',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: '2a4b87dd-977d-4ce8-a321-1f13df4a31b2'
          },
          value: null,
          groupMembers: [
            {
              uuid: '4caa0747-ae5e-4c41-9176-6007c26ef2af',
              display:
                'TUBERCULOSIS TREATMENT ADHERENCE SINCE LAST VISIT: GOOD',
              concept: {
                uuid: '479decbd-e964-41c3-9576-98b39089ebd3',
                display: 'TUBERCULOSIS TREATMENT ADHERENCE SINCE LAST VISIT'
              },
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              obsGroup: {
                uuid: 'c4de81ad-e667-4ead-a433-af368a1f1877',
                display:
                  'TUBERCULOSIS TREATMENT ADHERENCE SINCE LAST VISIT, DETAILED: GOOD'
              },
              valueCodedName: null,
              groupMembers: null,
              voided: false,
              value: {
                uuid: 'a8b0f882-1350-11df-a1f1-0026b9348838',
                display: 'GOOD',
                resourceVersion: '1.9'
              },
              resourceVersion: '1.8'
            }
          ]
        },
        {
          uuid: '101689fd-1cb1-4152-ac33-2e3c28acd4f9',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a899e282-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a899e0ac-1350-11df-a1f1-0026b9348838',
            display: 'NONE'
          },
          groupMembers: null
        },
        {
          uuid: '3b6519fb-31ee-49a5-8dac-0287bed9b33d',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a89b75d4-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a899e0ac-1350-11df-a1f1-0026b9348838',
            display: 'NONE'
          },
          groupMembers: null
        },
        {
          uuid: 'c04bc2ff-972f-4c62-abaf-3710e1a70370',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a89ae254-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a899b42e-1350-11df-a1f1-0026b9348838',
            display: 'NO'
          },
          groupMembers: null
        },
        {
          uuid: '8600c219-d27c-4bee-ae4c-d55dd17cb4a1',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a89b7e12-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a899e0ac-1350-11df-a1f1-0026b9348838',
            display: 'NONE'
          },
          groupMembers: null
        },
        {
          uuid: 'c14aed9a-35e1-4604-a9f2-e68b24753bbe',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afcc82-1350-11df-a1f1-0026b9348838'
          },
          value: {
            uuid: 'a899b35c-1350-11df-a1f1-0026b9348838',
            display: 'YES'
          },
          groupMembers: null
        },
        {
          uuid: 'fdb32127-6c64-4bde-b97b-13fb7c8accb8',
          obsDatetime: '2016-04-14T09:12:43.000+0300',
          concept: {
            uuid: 'a8a08344-1350-11df-a1f1-0026b9348838'
          },
          value: null,
          groupMembers: [
            {
              uuid: 'bdc5beb4-25bd-4b6c-ba60-cbffd4249750',
              display:
                'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT: LAMIVUDINE AND STAVUDINE',
              concept: {
                uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838',
                display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
              },
              obsDatetime: '2016-04-14T09:12:43.000+0300',
              obsGroup: {
                uuid: 'fdb32127-6c64-4bde-b97b-13fb7c8accb8',
                display: `CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT, DETAILED
                    : LAMIVUDINE AND STAVUDINE, NEVIRAPINE, EFAVIRENZ, ATAZANAVIR AND RITONAVIR, ZIDOVUDINE`
              },
              value: {
                uuid: '3d587177-984e-4eeb-93f2-3223b6c1dd7c',
                display: 'LAMIVUDINE AND STAVUDINE'
              }
            },
            {
              uuid: '2343c2c1-46bc-438a-b831-76d6eabbacc6',
              display:
                'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT: NEVIRAPINE',
              concept: {
                uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838',
                display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
              },
              obsDatetime: '2016-04-14T09:12:43.000+0300',
              obsGroup: {
                uuid: 'fdb32127-6c64-4bde-b97b-13fb7c8accb8',
                display: `CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT, DETAILED
                    : LAMIVUDINE AND STAVUDINE, NEVIRAPINE, EFAVIRENZ, ATAZANAVIR AND RITONAVIR, ZIDOVUDINE`
              },
              value: {
                uuid: 'a8967656-1350-11df-a1f1-0026b9348838',
                display: 'NEVIRAPINE'
              }
            }
          ]
        }
      ]
    };
  }

  getExpected(): any {
    return {
      encounterDatetime: '2016-01-21T16:17:46.000+0300',
      location: '08feae7c-1352-11df-a1f1-0026b9348838',
      patient: 'patient-uuid',
      form: '1339a535-e38f-44cd-8cf8-f42f7c5f2ab7',
      encounterType: '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
      provider: 'provider-uuid',
      'a8a666ba-1350-11df-a1f1-0026b9348838': '2016-02-26T00:00:00.000+0300',
      'a8afcafc-1350-11df-a1f1-0026b9348838': [
        'a8ad1276-1350-11df-a1f1-0026b9348838',
        'a8afc8b8-1350-11df-a1f1-0026b9348838'
      ],
      'a8a08344-1350-11df-a1f1-0026b9348838': [
        {
          'a899cf5e-1350-11df-a1f1-0026b9348838': [
            '3d587177-984e-4eeb-93f2-3223b6c1dd7c',
            'a8967656-1350-11df-a1f1-0026b9348838'
          ]
        }
      ],
      'a8afdb8c-1350-11df-a1f1-0026b9348838': [
        {
          'a899e444-1350-11df-a1f1-0026b9348838':
            'a8971c64-1350-11df-a1f1-0026b9348838',
          'a8a0744e-1350-11df-a1f1-0026b9348838': 600
        },
        {
          'a899e444-1350-11df-a1f1-0026b9348838':
            'a899f51a-1350-11df-a1f1-0026b9348838',
          'a8a07386-1350-11df-a1f1-0026b9348838': 2
        },
        {
          'a899e5f2-1350-11df-a1f1-0026b9348838': '2016-01-10T00:00:00.000+0300'
        }
      ],
      'a89c1fd4-1350-11df-a1f1-0026b9348838':
        'a89b77aa-1350-11df-a1f1-0026b9348838',
      '02ad9357-b996-4530-b1a4-aff91a105383':
        'a8afcc82-1350-11df-a1f1-0026b9348838',
      '2a4b87dd-977d-4ce8-a321-1f13df4a31b2': [
        {
          '479decbd-e964-41c3-9576-98b39089ebd3':
            'a8b0f882-1350-11df-a1f1-0026b9348838'
        }
      ],
      'a899e282-1350-11df-a1f1-0026b9348838':
        'a899e0ac-1350-11df-a1f1-0026b9348838',
      'a89b75d4-1350-11df-a1f1-0026b9348838':
        'a899e0ac-1350-11df-a1f1-0026b9348838',
      'a89ae254-1350-11df-a1f1-0026b9348838':
        'a899b42e-1350-11df-a1f1-0026b9348838',
      'a89b7e12-1350-11df-a1f1-0026b9348838':
        'a899e0ac-1350-11df-a1f1-0026b9348838',
      'a8afcc82-1350-11df-a1f1-0026b9348838':
        'a899b35c-1350-11df-a1f1-0026b9348838'
    };
  }
}
