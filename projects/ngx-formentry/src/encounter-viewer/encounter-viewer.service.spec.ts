import { EncounterViewerService } from './encounter-viewer.service';
import { TestBed, inject } from '@angular/core/testing';
import {
  NodeBase,
  LeafNode,
  GroupNode
} from '../form-entry/form-factory/form-node';
import { QuestionBase } from '../form-entry/question-models/question-base';
import { BaseOptions } from '../form-entry/question-models/models';

describe('Encounter Viewer Service:', () => {
  let service;
  let groupQuestion: QuestionBase;
  let leafQuestion: QuestionBase;
  let leafnodeWithValue: LeafNode;
  let leafnodeWithoutValue: LeafNode;
  let groupNodeWithChildrenValue: GroupNode;
  let groupNodeWithChildrenWithoutValue: GroupNode;
  const groupOptions = {
    label: 'Mock Question',
    type: 'section',
    key: 'Mock Question'
  };

  const leafOptions = {
    label: 'Mock Question',
    type: 'multi-select',
    key: 'Mock Question'
  };

  const schema = require('../mock/schema/compiled-adult-return.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncounterViewerService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(EncounterViewerService);
    groupQuestion = new QuestionBase(groupOptions);
    leafQuestion = new QuestionBase(leafOptions);

    const gwcv = new GroupNode(groupQuestion);
    gwcv.setChild('child1', leafnodeWithValue);
    groupNodeWithChildrenValue = gwcv;

    const gwtv = new GroupNode(groupQuestion);
    gwtv.setChild('child1', leafnodeWithoutValue);
    groupNodeWithChildrenWithoutValue = gwtv;

    leafnodeWithValue = new LeafNode(leafQuestion);
    leafnodeWithValue.initialValue = 'mockvalue';

    leafnodeWithoutValue = new LeafNode(leafQuestion);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('convert time to suitable format', () => {
    let date = Date.parse('Tue Dec 19 2017 09:24:10');
    expect(service.convertTime(date)).toEqual('19 Dec 2017 9:24AM (EAT)');
    date = Date.parse('Tue Dec 19 2017 00:00:00');
    expect(service.convertTime(date)).toEqual('19 Dec 2017');
  });

  it('should find the answer label in the form schema', () => {
    const questionUuid = '35ed8aad-d6fa-429e-961a-c877e1ad4953';
    let answerUuid = 'a89c2f42-1350-11df-a1f1-0026b9348838';
    let label = service.resolveSelectedValueFromSchema(answerUuid, schema);
    expect(label).toBe('Ampath');
    answerUuid = '0f8b7f4e-1656-46b7-bc93-d1fe4f193f5d';
    label = service.resolveSelectedValueFromSchema(answerUuid, schema);
    expect(label).toBeUndefined();
  });
});
