import { TestBed } from '@angular/core/testing';

import moment from 'moment';

import { ObsAdapterHelper } from './obs-adapter-helper';
import { NodeBase, ArrayNode, GroupNode } from '../form-factory/form-node';
import adultForm from '../../adult.json';
import adultFormObs from '../../mock/obs.json';
import { FormFactory } from '../../form-entry/form-factory/form.factory';
import { FormControlService } from '../../form-entry/form-factory/form-control.service';
import { ValidationFactory } from '../../form-entry/form-factory/validation.factory';
import { QuestionFactory } from '../../form-entry/form-factory/question.factory';
import { AlertsFactory } from '../form-factory/show-messages.factory';
import { HidersDisablersFactory } from '../../form-entry/form-factory/hiders-disablers.factory';
import { ExpressionRunner } from '../../form-entry/expression-runner/expression-runner';
import { JsExpressionHelper } from '../../form-entry/helpers/js-expression-helper';
import { ControlRelationsFactory } from '../../form-entry/form-factory/control-relations.factory';
import { Form } from '../form-factory/form';
import { DebugModeService } from './../services/debug-mode.service';

describe('Obs Value Adapter Helper: ', () => {
  let formFactory: FormFactory;
  let obsAdapterHelper: ObsAdapterHelper;

  beforeEach((done) => {
    window.setTimeout(function () {
      done();
    }, 0);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ObsAdapterHelper,
        FormFactory,
        FormControlService,
        ValidationFactory,
        HidersDisablersFactory,
        AlertsFactory,
        QuestionFactory,
        ExpressionRunner,
        JsExpressionHelper,
        ControlRelationsFactory,
        DebugModeService
      ]
    });

    formFactory = TestBed.inject(FormFactory);
    obsAdapterHelper = TestBed.inject(ObsAdapterHelper);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be injected', () => {
    expect(obsAdapterHelper).toBeTruthy();
  });

  it('should find the obs that is an answer to a question', () => {
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    // CASE 1: Simple Obs
    // find tb status question
    const simpleNode = form.searchNodeByQuestionId('tbstatus')[0];
    expect(simpleNode).toBeTruthy();

    const simpleObs = [
      {
        uuid: 'some uuid',
        concept: {
          uuid: 'random uuid 2',
          display: 'tb status'
        }
      },
      {
        uuid: 'some uuid 1',
        concept: {
          uuid: '02ad9357-b996-4530-b1a4-aff91a105383',
          display: 'tb status'
        },
        value: {
          uuid: 'a899e0ac-1350-11df-a1f1-0026b9348838',
          display: 'some value'
        }
      },
      {
        uuid: 'some uuid 2',
        concept: {
          uuid: 'random uuid',
          display: 'tb status'
        }
      }
    ];

    const expectedSimpleObs = [simpleObs[1]];

    expect(
      obsAdapterHelper.findObsAnswerToQuestion(simpleNode, simpleObs)
    ).toEqual(expectedSimpleObs);

    // CASE 2: Repeating obs
    // find arv drugs concept: a89b6a62-1350-11df-a1f1-0026b9348838
    const multiselectNode = form.searchNodeByQuestionId('artStartedAdult')[0];
    expect(multiselectNode).toBeDefined();

    const multiselectObs = [
      {
        uuid: 'some uuid 2',
        concept: {
          uuid: 'random uuid',
          display: 'tb status'
        }
      },
      {
        uuid: 'some uuid',
        concept: {
          uuid: 'a89b6a62-1350-11df-a1f1-0026b9348838',
          display: 'tb status'
        },
        value: {
          uuid: '6a73f32d-1870-4527-af6e-74443251ded2',
          display: 'NVP200/ZDV300/3TC150'
        }
      },
      {
        uuid: 'some uuid 2',
        concept: {
          uuid: 'random uuid 2',
          display: 'tb status'
        }
      },
      {
        uuid: 'some other uuid',
        concept: {
          uuid: 'a89b6a62-1350-11df-a1f1-0026b9348838',
          display: 'tb status'
        },
        value: {
          uuid: '6a73f32d-1870-4527-af6e-74443251ded2',
          display: 'NVP200/ZDV300/3TC150'
        }
      },
      {
        uuid: 'other uuid',
        concept: {
          uuid: 'a8982474-1350-11df-a1f1-0026b9348838',
          display: 'viral load'
        },
        obsDatetime: '2015-01-01',
        value: 10
      }
    ];

    const expectedMultiselectObs = [multiselectObs[1], multiselectObs[3]];
    expect(
      obsAdapterHelper.findObsAnswerToQuestion(multiselectNode, multiselectObs)
    ).toEqual(expectedMultiselectObs);

    // CASE 3: Complex obs i.e obs where multiple properties are editable e.g obsDatetime
    const complexObsNode = form.searchNodeByQuestionId(
      'complex_viralLoad_test'
    )[0];
    const expectedComplexObs = [multiselectObs[4]];
    expect(
      obsAdapterHelper.findObsAnswerToQuestion(complexObsNode, multiselectObs)
    ).toEqual(expectedComplexObs);

    // CASE 4: Groups and Repeating Groups

    const groupObs = [
      {
        uuid: 'uuid',
        concept: {
          uuid: 'some-uuid'
        }
      },
      {
        uuid: 'some uuid',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
          display: 'tb history'
        },
        groupMembers: [
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'a899e5f2-1350-11df-a1f1-0026b9348838'
            }
          }
        ]
      },
      {
        uuid: 'some other uuid',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
          display: 'tb history'
        },
        groupMembers: [
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
            }
          },
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
            }
          }
        ]
      },
      {
        uuid: 'some other uuid',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
          display: 'tb history'
        },
        groupMembers: [
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
            }
          },
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
            }
          }
        ]
      },
      {
        uuid: 'some other uuid',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
          display: 'tb history'
        },
        groupMembers: [
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
            }
          },
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'a8a063c8-1350-11df-a1f1-0026b9348838'
            }
          }
        ]
      },
      {
        uuid: 'some other uuid',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
          display: 'tb history'
        },
        groupMembers: [
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'some other uuid'
            }
          },
          {
            uuid: 'nested uuid',
            concept: {
              uuid: 'some other uuid 2'
            }
          }
        ]
      },
      {
        uuid: 'some other uuid',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
          display: 'tb history'
        },
        groupMembers: [
          {
            uuid: 'random uuid',
            concept: {
              uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
            }
          },
          {
            uuid: 'random uuid',
            concept: {
              uuid: 'random uuid'
            }
          }
        ]
      }
    ];

    // example one: non-repeating group
    // tb treatement start date

    const groupNodeWithStartDate = form.searchNodeByQuestionId(
      'groupStartDateTbTreatment'
    )[0];
    const expectedTbStartDateObs = [groupObs[1]];

    expect(
      obsAdapterHelper.findObsAnswerToQuestion(groupNodeWithStartDate, groupObs)
    ).toEqual(expectedTbStartDateObs);

    // example two: repeating group
    const repeatingGroupNode = form.searchNodeByQuestionId(
      'tb_current_regimen_group'
    )[0];
    const expectedRepeatingGroupObs = [groupObs[2], groupObs[3], groupObs[4]];
    expect(
      obsAdapterHelper.findObsAnswerToQuestion(repeatingGroupNode, groupObs)
    ).toEqual(expectedRepeatingGroupObs);
  });

  it('should identify the type of obs a node represents', () => {
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    // There are types of obs node i.e simple obs node, complex obs node, multiselect obs node,
    // copmlex multiselect obs node, group obs node, repeating group obs node

    // case 1: simple obs node
    const simpleObsNode = form.searchNodeByQuestionId('scheduledVisit')[0];
    expect(obsAdapterHelper.getObsNodeType(simpleObsNode)).toEqual('simple');

    // case 2: multi-select obs node
    const multiSelectNode = form.searchNodeByQuestionId(
      'current_art_regimen_adult'
    )[0];
    expect(obsAdapterHelper.getObsNodeType(multiSelectNode)).toEqual(
      'multiselect'
    );

    // case 3: complex obs
    const complexObsNode = form.searchNodeByQuestionId(
      'complex_creatinine_test'
    )[0];
    expect(obsAdapterHelper.getObsNodeType(complexObsNode)).toEqual('complex');

    // case 4: group obs node
    const groupObsNode = form.searchNodeByQuestionId(
      'groupStartDateTbTreatment'
    )[0];
    expect(obsAdapterHelper.getObsNodeType(groupObsNode)).toEqual('group');

    // case 5: repeating obs node
    const repeatingGroupNode = form.searchNodeByQuestionId(
      'tb_current_regimen_group'
    )[0];
    expect(obsAdapterHelper.getObsNodeType(repeatingGroupNode)).toEqual(
      'repeatingGroup'
    );
  });

  it('should set the value of a simple obs node given the obs that represents its value', () => {
    // simple obs represent values such as free text, single select, numbers, dates
    // the obs array supplied is already filtered as the obs that is the answer to the given node
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    // CASE 1: select values i.e obs value is an object

    const simpleObsNode = form.searchNodeByQuestionId('scheduledVisit')[0];

    const obsValue = [
      {
        uuid: 'some uuid',
        concept: {
          uuid: 'a89ff9a6-1350-11df-a1f1-0026b9348838',
          display: 'Unscheduled early'
        },
        value: {
          uuid: 'a89b6440-1350-11df-a1f1-0026b9348838'
        },
        display: 'scheduled visit'
      }
    ];

    obsAdapterHelper.setSimpleObsNodeValue(simpleObsNode, obsValue);

    // check 1: the value of the node control should be set
    expect(simpleObsNode.control.value).toEqual(obsValue[0].value.uuid);

    // check 2: the obs object used to populate the payload should be set
    expect(simpleObsNode.initialValue).toEqual(obsValue[0]);

    // CASE 2: numbers, text values, and dates in text formats
    const numericObsNode = form.searchNodeByQuestionId('creatinine_test')[0];
    const obsWithNumeric = [
      {
        uuid: 'ac55c445-9661-4d42-86b5-4d6ec33a000',
        obsDatetime: '2016-01-21T16:17:46.000+0300',
        concept: {
          uuid: 'a897e450-1350-11df-a1f1-0026b9348838'
        },
        value: 0,
        groupMembers: null
      }
    ];

    obsAdapterHelper.setSimpleObsNodeValue(numericObsNode, obsWithNumeric);
    // check 1: the value of the node control should be set
    expect(numericObsNode.control.value).toEqual(obsWithNumeric[0].value);

    // check 2: the obs object used to populate the payload should be set
    expect(numericObsNode.initialValue).toEqual(obsWithNumeric[0]);
  });

  it('should set the value of a multi-select obs node given the obs that represents its value', () => {
    // multi-select obs represent anwsers with multiple choices.
    // they are usually represented as multiple-obs
    // the obs array supplied is already filtered as the obs that is the answer to the given node
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    const multiselectObs = [
      {
        uuid: 'uuid1',
        concept: {
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        value: {
          uuid: '6a73f32d-1870-4527-af6e-74443251ded2'
        }
      },
      {
        uuid: 'uuid2',
        concept: {
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        value: {
          uuid: '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
        }
      },
      {
        uuid: 'uuid3',
        concept: {
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        value: {
          uuid: 'a89cc876-1350-11df-a1f1-0026b9348838'
        }
      }
    ];

    const multiSelectNode = form.searchNodeByQuestionId(
      'current_art_regimen_adult'
    )[0];

    obsAdapterHelper.setMultiselectObsNodeValue(
      multiSelectNode,
      multiselectObs
    );

    // check 1: the value of the node control should be set
    expect(multiSelectNode.control.value).toEqual([
      '6a73f32d-1870-4527-af6e-74443251ded2',
      '1c4a75d0-cc91-4752-b0a5-4b833326ff7a',
      'a89cc876-1350-11df-a1f1-0026b9348838'
    ]);

    // check 2: the obs object used to populate the payload should be set
    expect(multiSelectNode.initialValue).toEqual(multiselectObs);
  });

  it('should set values for a complex obs node given the obs that represents its value', () => {
    // complex obs is a single obs but whose members other than the value, needs to be changed.
    // the obs array supplied is already filtered as the obs that is the answer to the given node
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    const complexObsNode = form.searchNodeByQuestionId(
      'complex_creatinine_test'
    )[0];
    const obs = [
      {
        uuid: 'ac55c445-9661-4d42-86b5-4d6ec33a000',
        obsDatetime: '2016-01-21T16:17:46.000+0300',
        concept: {
          uuid: 'a897e450-1350-11df-a1f1-0026b9348838'
        },
        value: 1000,
        groupMembers: null
      }
    ];

    expect(complexObsNode).toBeDefined();

    obsAdapterHelper.setComplexObsNodeValue(complexObsNode, obs);

    // check 1: the initial value for the complex obs node is set
    expect(complexObsNode.initialValue).toBe(obs[0]);

    // check 2: the value property is set
    const valueControl = form.searchNodeByQuestionId('creatinine_test')[0];
    expect(valueControl).toBeDefined();
    expect(valueControl.control.value).toEqual(obs[0].value);
    expect(valueControl.initialValue).toEqual(obs[0]);

    // check 3: the date property is set
    const dateControl = form.searchNodeByQuestionId('date_creatinine_test')[0];
    expect(dateControl.control.value).toEqual(obs[0].obsDatetime);
    expect(dateControl.initialValue).toEqual(obs[0]);
  });

  it('should set the value for a group obs node given the obs that represents its value', () => {
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    const groupObsNode = form.searchNodeByQuestionId(
      'groupStartDateTbTreatment'
    )[0];

    const groupObs = [
      {
        uuid: 'some uuid',
        obsDatetime: '2016-01-21T16:17:46.000+0300',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: [
          {
            uuid: 'some inner uuid',
            obsDatetime: '2016-01-21T16:17:46.000+0300',
            concept: {
              uuid: 'a899e5f2-1350-11df-a1f1-0026b9348838'
            },
            value: '2016-01-21T16:17:46.000+0300'
          }
        ],
        value: null
      }
    ];

    obsAdapterHelper.setGroupObsNodeValue(groupObsNode, groupObs);

    // check 1: the initial value for the group obs node is set
    expect(groupObsNode.initialValue).toBe(groupObs[0]);

    // check 2: the value for children is set
    const childNode = form.searchNodeByQuestionId('startDateOfTbTreatment')[0];
    expect(childNode).toBeDefined();
    expect(childNode.control.value).toEqual(groupObs[0].groupMembers[0].value);
    expect(childNode.initialValue).toEqual(groupObs[0].groupMembers[0]);
  });

  it(
    'should set the value for a repeating group obs node given ' +
      'the obs array representing its value',
    () => {
      const helper: ObsAdapterHelper = TestBed.inject(ObsAdapterHelper);
      const ff: FormFactory = TestBed.inject(FormFactory);
      expect(formFactory).toBeDefined();
      const form: Form = formFactory.createForm(adultForm);
      expect(form).toBeDefined();

      const repeatingObsNode = form.searchNodeByQuestionId(
        'tb_current_regimen_group'
      )[0];

      const repeatingGroupObs: any = [
        {
          uuid: 'some uuid 1',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
          },
          groupMembers: [
            {
              uuid: 'some inner uuid 1',
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              concept: {
                uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
              },
              value: {
                uuid: 'a899f51a-1350-11df-a1f1-0026b9348838'
              }
            },
            {
              uuid: 'some inner uuid 2',
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              concept: {
                uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
              },
              value: 29
            }
          ],
          value: null
        },
        {
          uuid: 'some uuid 1',
          obsDatetime: '2016-01-21T16:17:46.000+0300',
          concept: {
            uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
          },
          groupMembers: [
            {
              uuid: 'some inner uuid 1',
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              concept: {
                uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
              },
              value: {
                uuid: 'a8971c64-1350-11df-a1f1-0026b9348838'
              }
            },
            {
              uuid: 'some inner uuid 2',
              obsDatetime: '2016-01-21T16:17:46.000+0300',
              concept: {
                uuid: 'a8a0744e-1350-11df-a1f1-0026b9348838'
              },
              value: 200
            }
          ],
          value: null
        }
      ];

      obsAdapterHelper.setRepeatingGroupObsNodeValue(
        repeatingObsNode,
        repeatingGroupObs
      );

      // check 1: repeating node has initial value set
      expect(repeatingObsNode.initialValue).toBe(repeatingGroupObs);

      // check 2: repeating node has added all the children
      const node = repeatingObsNode as ArrayNode;
      expect(node.children.length).toEqual(2);
      expect(node.children[0].initialValue).toBe(repeatingGroupObs[0]);
      expect(node.children[1].initialValue).toBe(repeatingGroupObs[1]);

      // check 3: child controls have all the required values

      const node1 = node.children[0];

      // tb regimen is set
      const regimenNode1 = node1.children['tb_current'] as NodeBase;
      expect(regimenNode1).toBeDefined();
      expect(regimenNode1.initialValue).toBe(
        repeatingGroupObs[0].groupMembers[0]
      );
      expect(regimenNode1.control.value).toEqual(
        repeatingGroupObs[0].groupMembers[0].value.uuid
      );

      // quantity is set
      const quantityNode1 = node1.children['regimenTabsDay'] as NodeBase;
      expect(quantityNode1).toBeDefined();
      expect(quantityNode1.initialValue).toBe(
        repeatingGroupObs[0].groupMembers[1]
      );
      expect(quantityNode1.control.value).toEqual(
        repeatingGroupObs[0].groupMembers[1].value
      );

      const node2 = node.children[1];

      // tb regimen is set
      const regimenNode2 = node2.children['tb_current'] as NodeBase;
      expect(regimenNode2).toBeDefined();
      expect(regimenNode2.initialValue).toBe(
        repeatingGroupObs[1].groupMembers[0]
      );
      expect(regimenNode2.control.value).toEqual(
        repeatingGroupObs[1].groupMembers[0].value.uuid
      );

      // quantity is set
      const quantityNode2 = node2.children['regimenMgDay'] as NodeBase;
      expect(quantityNode2).toBeDefined();
      expect(quantityNode2.initialValue).toBe(
        repeatingGroupObs[1].groupMembers[1]
      );
      expect(quantityNode2.control.value).toEqual(
        repeatingGroupObs[1].groupMembers[1].value
      );
    }
  );

  it('should set the values for nodes given the array of obs for an encounter', () => {
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    obsAdapterHelper.setNodeValue(form.rootNode, adultFormObs.obs);

    // Simple obs are set
    const simpleNode = form.searchNodeByQuestionId('onTbTreatment')[0];
    expect(simpleNode.control.value).toEqual(
      'a899b35c-1350-11df-a1f1-0026b9348838'
    );

    // Multiselect obs are set
    const mutliselectNode = form.searchNodeByQuestionId(
      'current_art_regimen_adult'
    )[0];
    expect(mutliselectNode.control.value).toEqual([
      'a89cc876-1350-11df-a1f1-0026b9348838',
      '6a73f32d-1870-4527-af6e-74443251ded2',
      '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
    ]);

    // complex obs are set
    const complexNode = form.searchNodeByQuestionId('creatinine_test')[0];
    expect(complexNode.control.value).toEqual(1000);

    // Group obs are set
    const nodeInaGroup = form.searchNodeByQuestionId(
      'pcpProphylaxisAdherence'
    )[0];
    expect(nodeInaGroup.control.value).toEqual(
      'a8b0f882-1350-11df-a1f1-0026b9348838'
    );

    // Repeating group obs are set
    const arrayNode = form.searchNodeByQuestionId(
      'tb_current_regimen_group'
    )[0] as ArrayNode;
    expect(arrayNode.children.length).toBe(1);
    const nodeInArray = (arrayNode.children[0] as GroupNode).children[
      'tb_current'
    ] as NodeBase;
    expect(nodeInArray.control.value).toEqual(
      'a899f51a-1350-11df-a1f1-0026b9348838'
    );
  });

  // REGION: Payload Generation
  it('should generate payload obs for a simple obs node', () => {
    expect(formFactory).toBeDefined();
    let form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    // CASE 1: NEW FORM
    // In this case the generated obs have no uuids
    // Also none is being modified

    // SUB-CASE 1: numbers, free text, single selects
    const simpleField = form.searchNodeByQuestionId('syst')[0];

    // null or empty values are ignored for new case.
    // no obs is created.
    let simplePayload = obsAdapterHelper.getSimpleObsPayload(simpleField);
    expect(simplePayload).toBeNull();

    // simulate user input
    simpleField.control.setValue(200);

    simplePayload = obsAdapterHelper.getSimpleObsPayload(simpleField);

    expect(simplePayload).toEqual({
      concept: 'a8a65d5a-1350-11df-a1f1-0026b9348838',
      value: 200,
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });

    // SUB-CASE 2: Date fields
    const dateField = form.searchNodeByQuestionId('returnToClinic')[0];

    // simulate user input
    const dateValue = '2016-01-21T16:17:46.000+0300';
    dateField.control.setValue(dateValue);
    const datePayload = obsAdapterHelper.getSimpleObsPayload(dateField);

    expect(datePayload).toEqual({
      concept: 'a8a666ba-1350-11df-a1f1-0026b9348838',
      value: moment(dateValue).format('YYYY-MM-DD HH:mm:ss'),
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });

    // CASE 2: EDITING AN EXISTING ENCOUNTER
    form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    const existingObs = [
      {
        // This value will be cleared
        uuid: 'uuid 1',
        concept: {
          uuid: 'a8a65d5a-1350-11df-a1f1-0026b9348838'
        },
        value: 190
      },
      {
        // This value will be untouched
        uuid: 'uuid 2',
        concept: {
          uuid: 'a8a65e36-1350-11df-a1f1-0026b9348838'
        },
        value: 80
      },
      {
        // This value will be changed
        uuid: 'uuid 3',
        concept: {
          uuid: 'a8a666ba-1350-11df-a1f1-0026b9348838'
        },
        value: '2016-01-21T16:17:46.000+0300'
      },
      {
        // represents a single select case(or concept answer cases). value will be changed.
        uuid: 'uuid 4',
        concept: {
          uuid: 'a89ff9a6-1350-11df-a1f1-0026b9348838'
        },
        value: {
          uuid: 'a89b6440-1350-11df-a1f1-0026b9348838'
        }
      }
    ];

    // populate form with values
    obsAdapterHelper.setNodeValue(form.rootNode, existingObs);

    // simulate user changes as described above in the payload

    const field1 = form.searchNodeByQuestionId('syst')[0];
    field1.control.setValue(undefined); // clear it

    const field2 = form.searchNodeByQuestionId('diastolic')[0];
    // field 2 remains unchanged

    const field3 = form.searchNodeByQuestionId('returnToClinic')[0];
    field3.control.setValue('2016-02-28T16:17:46.000+0300'); // change the value

    const field4 = form.searchNodeByQuestionId('scheduledVisit')[0];
    field4.control.setValue('a89ff816-1350-11df-a1f1-0026b9348838');

    // Sub-Case 1: cleared fields are voided
    let payload = obsAdapterHelper.getSimpleObsPayload(field1);
    expect(payload).toEqual({
      uuid: 'uuid 1',
      voided: true
    });

    // Sub-case 2: unchanged values
    payload = obsAdapterHelper.getSimpleObsPayload(field2);
    expect(payload).toBeNull();

    // Sub-case 3: value changed
    payload = obsAdapterHelper.getSimpleObsPayload(field3);

    expect(payload).toEqual({
      uuid: 'uuid 3',
      value: moment('2016-02-28T16:17:46.000+0300').format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });

    // Sub-case 4: single selects and concept answers cases
    payload = obsAdapterHelper.getSimpleObsPayload(field4);

    expect(payload).toEqual({
      uuid: 'uuid 4',
      value: 'a89ff816-1350-11df-a1f1-0026b9348838',
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });
  });

  it('should generate payload obs for a complex obs node', () => {
    expect(formFactory).toBeDefined();
    let form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    const existingObs: Array<any> = [
      {
        uuid: 'other uuid',
        concept: {
          uuid: 'a8982474-1350-11df-a1f1-0026b9348838',
          display: 'viral load'
        },
        obsDatetime: '2016-01-21T16:17:46.000+0300',
        value: 10
      }
    ];

    // populate form with values
    obsAdapterHelper.setNodeValue(form.rootNode, existingObs);

    let complexObsNode = form.searchNodeByQuestionId(
      'complex_viralLoad_test'
    )[0];

    // CASE 1: No change
    let payload: any = obsAdapterHelper.getComplexObsPayload(complexObsNode);
    expect(payload).toBeNull();

    // CASE 2: Value changes and/or date changes
    let valueNode = form.searchNodeByQuestionId('viralLoad_test')[0];
    valueNode.control.setValue(20);
    payload = obsAdapterHelper.getComplexObsPayload(complexObsNode);

    expect(payload).toEqual({
      uuid: 'other uuid',
      obsDatetime: moment('2016-01-21T16:17:46.000+0300').format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      value: 20,
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });

    // CASE 3: date changes only
    // reset value node
    valueNode.control.setValue(10);

    let dateNode = form.searchNodeByQuestionId('date_viralLoad_test')[0];
    dateNode.control.setValue('2016-04-21T16:17:46.000+0300');
    payload = obsAdapterHelper.getComplexObsPayload(complexObsNode);

    expect(payload).toEqual({
      uuid: 'other uuid',
      obsDatetime: moment('2016-04-21T16:17:46.000+0300').format(
        'YYYY-MM-DD HH:mm:ss'
      )
    });

    // CASE 4: New form
    form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();
    complexObsNode = form.searchNodeByQuestionId('complex_viralLoad_test')[0];

    // set inputs
    valueNode = form.searchNodeByQuestionId('viralLoad_test')[0];
    valueNode.control.setValue(10);
    dateNode = form.searchNodeByQuestionId('date_viralLoad_test')[0];
    dateNode.control.setValue('2016-04-21T16:17:46.000+0300');

    payload = obsAdapterHelper.getComplexObsPayload(complexObsNode);

    expect(payload).toEqual({
      concept: 'a8982474-1350-11df-a1f1-0026b9348838',
      obsDatetime: moment('2016-04-21T16:17:46.000+0300').format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      value: 10,
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });
  });

  it('should generate payload obs for a multiselect obs node', () => {
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    let existingObs: Array<any> = [
      {
        // this will be deleted
        uuid: 'uuid 1',
        concept: {
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        value: {
          uuid: '6a73f32d-1870-4527-af6e-74443251ded2'
        }
      },
      {
        // this will be unchanged
        uuid: 'uuid 2',
        concept: {
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        value: {
          uuid: '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
        }
      }
    ];

    // populate form with values
    obsAdapterHelper.setNodeValue(form.rootNode, existingObs);

    const multiSelectNode = form.searchNodeByQuestionId(
      'current_art_regimen_adult'
    )[0];

    expect(multiSelectNode.control.value).toEqual([
      '6a73f32d-1870-4527-af6e-74443251ded2',
      '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
    ]);

    // simulate user input i.e removing 1st item, adding another item
    multiSelectNode.control.setValue([
      '1c4a75d0-cc91-4752-b0a5-4b833326ff7a',
      'a89cc876-1350-11df-a1f1-0026b9348838'
    ]);

    let payload = obsAdapterHelper.getMultiselectObsPayload(multiSelectNode);

    expect(payload).toEqual([
      {
        uuid: 'uuid 1',
        voided: true
      },
      {
        concept: 'a899cf5e-1350-11df-a1f1-0026b9348838',
        value: 'a89cc876-1350-11df-a1f1-0026b9348838',
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/)
      }
    ]);

    // CASE 2: completely clearing the field
    existingObs = [
      {
        // this will be deleted
        uuid: 'uuid 6',
        concept: {
          uuid: 'a8afcafc-1350-11df-a1f1-0026b9348838'
        },
        value: {
          uuid: 'a899e0ac-1350-11df-a1f1-0026b9348838'
        }
      }
    ];

    // populate form with values
    obsAdapterHelper.setNodeValue(form.rootNode, existingObs);
    const clearedMultiSelectNode = form.searchNodeByQuestionId('tbSymptoms')[0];
    expect(clearedMultiSelectNode.control.value).toEqual([
      'a899e0ac-1350-11df-a1f1-0026b9348838'
    ]);

    // simulate user input
    clearedMultiSelectNode.control.setValue('');

    payload = obsAdapterHelper.getMultiselectObsPayload(clearedMultiSelectNode);
    expect(payload).toEqual([
      {
        uuid: 'uuid 6',
        voided: true
      }
    ]);
  });

  it('should generate payload obs for a group obs node', () => {
    expect(formFactory).toBeDefined();
    let form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    const groupObs: any = [
      {
        uuid: 'some uuid',
        obsDatetime: '2016-01-21T16:17:46.000+0300',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: [
          {
            uuid: 'some inner uuid',
            obsDatetime: '2016-01-21T16:17:46.000+0300',
            concept: {
              uuid: 'a899e5f2-1350-11df-a1f1-0026b9348838'
            },
            value: '2016-01-21T16:17:46.000+0300'
          }
        ],
        value: null
      }
    ];

    // populate form with values
    obsAdapterHelper.setNodeValue(form.rootNode, groupObs);

    let groupObsNode = form.searchNodeByQuestionId(
      'groupStartDateTbTreatment'
    )[0];

    // CASE 1: Nothing changed
    let payload: any = obsAdapterHelper.getGroupPayload(groupObsNode);
    expect(payload).toEqual(null);

    // CASE 2: Something changed
    // simulate user input
    let childNode = form.searchNodeByQuestionId('startDateOfTbTreatment')[0];
    childNode.control.setValue('2016-04-21T16:17:46.000+0300');

    payload = obsAdapterHelper.getGroupPayload(groupObsNode);

    expect(payload).toEqual({
      groupMembers: [
        {
          uuid: 'some inner uuid',
          value: moment('2016-04-21T16:17:46.000+0300').format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          formFieldNamespace: jasmine.stringMatching(/\w+/),
          formFieldPath: jasmine.stringMatching(/\w+/)
        }
      ],
      uuid: 'some uuid',
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });

    // CASE 3: New group
    form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    groupObsNode = form.searchNodeByQuestionId('groupStartDateTbTreatment')[0];
    childNode = form.searchNodeByQuestionId('startDateOfTbTreatment')[0];

    // simulate user input
    childNode.control.setValue('2016-04-21T16:17:46.000+0300');
    payload = obsAdapterHelper.getGroupPayload(groupObsNode);

    expect(payload).toEqual({
      groupMembers: [
        {
          concept: 'a899e5f2-1350-11df-a1f1-0026b9348838',
          value: moment('2016-04-21T16:17:46.000+0300').format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          formFieldNamespace: jasmine.stringMatching(/\w+/),
          formFieldPath: jasmine.stringMatching(/\w+/)
        }
      ],
      concept: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
      formFieldNamespace: jasmine.stringMatching(/\w+/),
      formFieldPath: jasmine.stringMatching(/\w+/)
    });
  });

  it('should generate payload obs for a repeating group obs node', () => {
    spyOn(window, 'confirm').and.callFake(() => true);

    expect(formFactory).toBeDefined();
    let form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    const obs: Array<any> = [
      {
        // members will change
        uuid: 'some uuid 1',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: [
          {
            uuid: 'uuid 1',
            concept: {
              uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
            },
            value: {
              uuid: 'a899f51a-1350-11df-a1f1-0026b9348838'
            }
          },
          {
            uuid: 'uuid 2',
            concept: {
              uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
            },
            value: 25
          }
        ]
      },
      {
        // remains unchanged
        uuid: 'some uuid 2',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: [
          {
            uuid: 'uuid 3',
            concept: {
              uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
            },
            value: {
              uuid: 'a899f51a-1350-11df-a1f1-0026b9348838'
            }
          },
          {
            uuid: 'uuid 4',
            concept: {
              uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
            },
            value: 29
          }
        ]
      },
      {
        // will be removed
        uuid: 'some uuid 3',
        concept: {
          uuid: 'a8afdb8c-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: [
          {
            uuid: 'uuid 3',
            concept: {
              uuid: 'a899e444-1350-11df-a1f1-0026b9348838'
            },
            value: {
              uuid: 'a899f51a-1350-11df-a1f1-0026b9348838'
            }
          },
          {
            uuid: 'uuid 4',
            concept: {
              uuid: 'a8a07386-1350-11df-a1f1-0026b9348838'
            },
            value: 29
          }
        ]
      }
    ];

    // populate form with values
    obsAdapterHelper.setNodeValue(form.rootNode, obs);

    let groupObsNode: ArrayNode = form.searchNodeByQuestionId(
      'tb_current_regimen_group'
    )[0] as ArrayNode;

    // CASE 1: Nothing changed
    let payload: any = obsAdapterHelper.getRepeatingGroupPayload(groupObsNode);
    expect(payload).toEqual(null);

    // CASE 2: Something changed
    // simulate user input
    groupObsNode.removeAt(2);

    let newNode = groupObsNode.createChildNode();
    let newChild = newNode.children['tb_current'] as NodeBase;
    newChild.control.setValue('a8aaf3e2-1350-11df-a1f1-0026b9348838');

    const childGroupNode = groupObsNode.children[0] as GroupNode;
    const childMember = childGroupNode.children['regimenTabsDay'] as NodeBase;
    childMember.control.setValue(21);

    payload = obsAdapterHelper.getRepeatingGroupPayload(groupObsNode);

    expect(payload).toEqual([
      {
        groupMembers: [
          {
            value: 21,
            uuid: 'uuid 2',
            formFieldNamespace: jasmine.stringMatching(/\w+/),
            formFieldPath: jasmine.stringMatching(/\w+/)
          }
        ],
        uuid: 'some uuid 1',
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/)
      },
      {
        groupMembers: [
          {
            concept: 'a899e444-1350-11df-a1f1-0026b9348838',
            value: 'a8aaf3e2-1350-11df-a1f1-0026b9348838',
            formFieldNamespace: jasmine.stringMatching(/\w+/),
            formFieldPath: jasmine.stringMatching(/\w+/)
          }
        ],
        concept: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/)
      },
      {
        uuid: 'some uuid 3',
        voided: true
      }
    ]);

    // CASE 3: New form case
    form = formFactory.createForm(adultForm);
    groupObsNode = form.searchNodeByQuestionId(
      'tb_current_regimen_group'
    )[0] as ArrayNode;
    newNode = groupObsNode.createChildNode();
    newChild = newNode.children['tb_current'] as NodeBase;
    newChild.control.setValue('a8aaf3e2-1350-11df-a1f1-0026b9348838');

    payload = obsAdapterHelper.getRepeatingGroupPayload(groupObsNode);

    expect(payload).toEqual([
      {
        groupMembers: [
          {
            concept: 'a899e444-1350-11df-a1f1-0026b9348838',
            value: 'a8aaf3e2-1350-11df-a1f1-0026b9348838',
            formFieldNamespace: jasmine.stringMatching(/\w+/),
            formFieldPath: jasmine.stringMatching(/\w+/)
          }
        ],
        concept: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/)
      }
    ]);
  });

  it('should generate the obs payload for a root node given the form', () => {
    expect(formFactory).toBeDefined();
    const form: Form = formFactory.createForm(adultForm);
    expect(form).toBeDefined();

    // simulate user input

    // repeating group and simple obs case
    const groupObsNode: ArrayNode = form.searchNodeByQuestionId(
      'tb_current_regimen_group'
    )[0] as ArrayNode;
    const newNode = groupObsNode.createChildNode();
    const newChild = newNode.children['tb_current'] as NodeBase;
    newChild.control.setValue('a8aaf3e2-1350-11df-a1f1-0026b9348838');

    const dateValue = '2016-04-21T16:17:46.000+0300';

    // group and simple case
    const childNode = form.searchNodeByQuestionId('startDateOfTbTreatment')[0];
    childNode.control.setValue(dateValue);

    // complex case
    const valueNode = form.searchNodeByQuestionId('viralLoad_test')[0];
    valueNode.control.setValue(10);
    const dateNode = form.searchNodeByQuestionId('date_viralLoad_test')[0];
    dateNode.control.setValue(dateValue);

    // multiselect case
    const multiSelectNode = form.searchNodeByQuestionId(
      'current_art_regimen_adult'
    )[0];
    multiSelectNode.control.setValue(['1c4a75d0-cc91-4752-b0a5-4b833326ff7a']);

    const payload = obsAdapterHelper.getObsNodePayload(form.rootNode);

    const expectedDateValue = moment(dateValue).format('YYYY-MM-DD HH:mm:ss');

    expect(payload).toEqual([
      {
        concept: 'a899cf5e-1350-11df-a1f1-0026b9348838',
        value: '1c4a75d0-cc91-4752-b0a5-4b833326ff7a',
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/)
      },
      {
        groupMembers: [
          {
            concept: 'a899e5f2-1350-11df-a1f1-0026b9348838',
            value: expectedDateValue,
            formFieldNamespace: jasmine.stringMatching(/\w+/),
            formFieldPath: jasmine.stringMatching(/\w+/)
          }
        ],
        concept: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/)
      },
      {
        groupMembers: [
          {
            concept: 'a899e444-1350-11df-a1f1-0026b9348838',
            value: 'a8aaf3e2-1350-11df-a1f1-0026b9348838',
            formFieldNamespace: jasmine.stringMatching(/\w+/),
            formFieldPath: jasmine.stringMatching(/\w+/)
          }
        ],
        concept: 'a8afdb8c-1350-11df-a1f1-0026b9348838',
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/)
      },
      {
        concept: 'a8982474-1350-11df-a1f1-0026b9348838',
        value: 10,
        formFieldNamespace: jasmine.stringMatching(/\w+/),
        formFieldPath: jasmine.stringMatching(/\w+/),
        obsDatetime: expectedDateValue
      }
    ]);
  });
});
