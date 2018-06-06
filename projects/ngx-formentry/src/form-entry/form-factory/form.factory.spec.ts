import { TestBed } from '@angular/core/testing';
import { FormFactory } from './form.factory';
import { QuestionBase, TextInputQuestion, QuestionGroup, RepeatingQuestion
} from '../question-models/models';
import { AfeFormGroup, AfeControlType, AfeFormControl, AfeFormArray
 } from '../../abstract-controls-extension/control-extensions';
import { FormControlService } from './form-control.service';
import { LeafNode, GroupNode, ArrayNode } from './form-node';
import { SampleSchema } from './sample-schema';

import { QuestionFactory } from './question.factory';
import { ValidationFactory } from './validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ControlRelationsFactory } from './control-relations.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { DebugModeService } from './../services/debug-mode.service';
import { CookieService, CookieOptions } from 'ngx-cookie/core';

import { Form } from './form';

describe('Form Factory:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormFactory,
                FormControlService,
                QuestionFactory,
                ValidationFactory,
                HidersDisablersFactory,
                AlertsFactory,
                ExpressionRunner,
                JsExpressionHelper,
                ControlRelationsFactory,
                DebugModeService,
                CookieService,
                { provide: CookieOptions, useValue: {} }
            ]
        });
    });
    it('should be injected', () => {
        let factory: FormFactory = TestBed.get(FormFactory);
        expect(factory).toBeTruthy();
        expect(factory.controlService).toBeTruthy();
    });

    it('should create leaf node', () => {
        let factory: FormFactory = TestBed.get(FormFactory);

        let testQuestion = new TextInputQuestion({ type: 'text', key: 'key1', placeholder: 'text' });
        testQuestion.controlType = AfeControlType.AfeFormControl;

        let parentControl = new AfeFormGroup({});
        let parentNode = new GroupNode(new QuestionBase({ key: 'key', label: 'label', type: 'type' }),
            null, null, null, 'path.to.parent');

        let createdNode = factory.createNode(testQuestion, parentNode, parentControl);

        // case leaf with control
        expect(createdNode).toBeTruthy();
        expect(createdNode.control).toBeTruthy();
        expect(createdNode.control instanceof AfeFormControl).toBe(true);
        expect(createdNode.question).toBeTruthy();
        expect(createdNode.question).toBe(testQuestion);
        expect(createdNode.path).toBe('path.to.parent.key.key1');

        // case leaf without control
        let testQuestion2 = new TextInputQuestion({ type: 'text', key: 'key1', placeholder: 'text' });
        testQuestion2.controlType = AfeControlType.None;

        parentControl = new AfeFormGroup({});
        parentNode = new GroupNode(new QuestionBase({ key: 'key', label: 'label', type: 'type' }));
        let createdNode2 = factory.createNode(testQuestion2, parentNode, parentControl);
        expect(createdNode2).toBeTruthy();
        expect(createdNode2.control).toBeNull();
        expect(createdNode2.question).toBeTruthy();
        expect(createdNode2.question).toBe(testQuestion2);
        expect(createdNode2.path).toBe('key.key1');

    });

    it('should create a group node', () => {
        let groupQuestion: QuestionGroup = new QuestionGroup({ key: 'g1', type: 'group', label: '', questions: [] });
        let testQuestion = new TextInputQuestion({ type: 'text', key: 'key1', placeholder: 'text' });
        let testQuestion2 = new TextInputQuestion({ type: 'text', key: 'key2', placeholder: 'text' });
        let groupQuestion2: QuestionGroup = new QuestionGroup({ key: 'g2', type: 'group', label: '', questions: [] });
        let testQuestion3 = new TextInputQuestion({ type: 'text', key: 'key3', placeholder: 'text' });

        groupQuestion.questions.push(testQuestion);
        groupQuestion.questions.push(testQuestion2);
        groupQuestion.questions.push(groupQuestion2);
        groupQuestion2.questions.push(testQuestion3);

        let factory: FormFactory = TestBed.get(FormFactory);

        let createdNode = factory.createNode(groupQuestion) as GroupNode;

        expect(createdNode).toBeTruthy();
        expect(createdNode.control).toBeTruthy();
        expect(createdNode.control instanceof AfeFormGroup).toBe(true);
        expect(createdNode.question).toBe(groupQuestion);
        expect(createdNode.path).toBe(groupQuestion.key);

        // examine children
        expect(createdNode.children).toBeTruthy();
        expect(createdNode.children[testQuestion.key]).toBeTruthy();
        expect(createdNode.children[testQuestion.key] instanceof LeafNode).toBe(true);
        expect(createdNode.children[testQuestion.key].control instanceof AfeFormControl).toBe(true);
        expect(createdNode.children[testQuestion.key].question).toBe(testQuestion);
        expect(createdNode.children[testQuestion.key].path).toBe('g1.key1');

        expect(createdNode.children[testQuestion2.key]).toBeTruthy();
        expect(createdNode.children[testQuestion2.key] instanceof LeafNode).toBe(true);
        expect(createdNode.children[testQuestion2.key].control instanceof AfeFormControl).toBe(true);
        expect(createdNode.children[testQuestion2.key].question).toBe(testQuestion2);
        expect(createdNode.children[testQuestion2.key].path).toBe('g1.key2');

        expect(createdNode.children[groupQuestion2.key]).toBeTruthy();
        expect(createdNode.children[groupQuestion2.key] instanceof GroupNode).toBe(true);
        expect(createdNode.children[groupQuestion2.key].control instanceof AfeFormGroup).toBe(true);
        expect(createdNode.children[groupQuestion2.key].question).toBe(groupQuestion2);
        expect(createdNode.children[groupQuestion2.key].path).toBe('g1.g2');

        // test recursive nature
        let group2 = createdNode.children[groupQuestion2.key] as GroupNode;
        expect(group2).toBeTruthy();
        expect(group2.control).toBeTruthy();
        expect(group2.control instanceof AfeFormGroup).toBe(true);
        expect(group2.children).toBeTruthy();
        expect(group2.children[testQuestion3.key]).toBeTruthy();
        expect(group2.children[testQuestion3.key].path).toBe('g1.g2.key3');

        // test generated form model to be well generated
        let createdFormModel = createdNode.control as AfeFormGroup;
        expect(createdFormModel.get(testQuestion.key)).toBeTruthy();
        expect(createdFormModel.get(testQuestion.key) instanceof AfeFormControl).toBeTruthy();
        expect(createdFormModel.get(testQuestion2.key)).toBeTruthy();
        expect(createdFormModel.get(testQuestion2.key) instanceof AfeFormControl).toBeTruthy();
        expect(createdFormModel.get(groupQuestion2.key)).toBeTruthy();
        expect(createdFormModel.get(groupQuestion2.key) instanceof AfeFormGroup).toBeTruthy();
        expect(createdFormModel.get(groupQuestion2.key + '.' + testQuestion3.key)).toBeTruthy();
        expect(createdFormModel.get(groupQuestion2.key + '.' + testQuestion3.key) instanceof AfeFormControl).toBeTruthy();

    });

    it('should create a group node used for presentation only e.g pages', () => {
        // These nodes have no form group or form arrays
        let groupQuestion: QuestionGroup = new QuestionGroup({ key: 'g1', type: 'group', label: '', questions: [] });

        // To represent page
        let groupQuestion1: QuestionGroup = new QuestionGroup({ key: 'g1', type: 'group', label: '', questions: [] });
        groupQuestion1.controlType = AfeControlType.None;
        groupQuestion.questions.push(groupQuestion1);

        // To represent section
        let groupQuestion2: QuestionGroup = new QuestionGroup({ key: 'g1', type: 'group', label: '', questions: [] });
        groupQuestion2.controlType = AfeControlType.None;
        groupQuestion1.questions.push(groupQuestion2);

        // To represent top most obs
        let testQuestion = new TextInputQuestion({ type: 'text', key: 'key1', placeholder: 'text' });
        groupQuestion2.questions.push(testQuestion);

        let factory: FormFactory = TestBed.get(FormFactory);

        let createdNode = factory.createNode(groupQuestion) as GroupNode;


        expect(createdNode).toBeTruthy();
        expect(createdNode.control).toBeTruthy();
        expect(createdNode.control instanceof AfeFormGroup).toBe(true);
        expect(createdNode.question).toBe(groupQuestion);

        // Page  level
        expect(createdNode.children['g1'] instanceof GroupNode).toBe(true);
        expect((createdNode.children['g1'] as GroupNode).control).toBeNull();

        // Section level
        let secondLevel = createdNode.children['g1'] as GroupNode;
        expect(secondLevel.children['g1'] instanceof GroupNode).toBe(true);
        expect((secondLevel.children['g1'] as GroupNode).control).toBeNull();

        // Created control
        let thirdLevel = secondLevel.children['g1'] as GroupNode;
        expect(thirdLevel.children['key1']).toBeTruthy();
        expect((thirdLevel.children['key1'] as LeafNode).control).toBeTruthy();
        expect((thirdLevel.children['key1'] as LeafNode).control instanceof AfeFormControl).toBe(true);
        let control = (thirdLevel.children['key1'] as LeafNode).control as AfeFormControl;
        expect(control.parent).toBe(createdNode.control);
    });

    it('should create array node', () => {
        let repeatingQuestion: RepeatingQuestion =
            new RepeatingQuestion({ key: 'r1', type: 'repeating', label: 'repeating', questions: [] });

        let testQuestion = new TextInputQuestion({ type: 'text', key: 'key1', placeholder: 'text' });
        let groupQuestion: QuestionGroup = new QuestionGroup({ key: 'g1', type: 'group', label: '', questions: [] });
        let testQuestion2 = new TextInputQuestion({ type: 'text', key: 'key2', placeholder: 'text' });

        groupQuestion.questions.push(testQuestion2);
        repeatingQuestion.questions.push(testQuestion);
        repeatingQuestion.questions.push(groupQuestion);

        let factory: FormFactory = TestBed.get(FormFactory);

        let createdNode = factory.createArrayNode(repeatingQuestion, null, null);

        // check created node
        expect(createdNode).toBeTruthy();
        expect(createdNode.control).toBeTruthy();
        expect(createdNode.control instanceof AfeFormArray).toBe(true);
        expect(createdNode.question).toBe(repeatingQuestion);
        expect(createdNode.path).toBe('r1');

        // check functions
        let childNode = createdNode.createChildNode();
        expect(childNode).toBeTruthy();
        expect(createdNode.children.length).toBe(1);

        createdNode.removeAt(0);
        expect(createdNode.children.length).toBe(0);

    });

    it('should add and remove a child node to array node', () => {
        let repeatingQuestion: RepeatingQuestion =
            new RepeatingQuestion({ key: 'r1', type: 'repeating', label: 'repeating', questions: [] });

        let testQuestion = new TextInputQuestion({ type: 'text', key: 'key1', placeholder: 'text' });
        let groupQuestion: QuestionGroup = new QuestionGroup({ key: 'g1', type: 'group', label: '', questions: [] });
        let testQuestion2 = new TextInputQuestion({ type: 'text', key: 'key2', placeholder: 'text' });

        groupQuestion.questions.push(testQuestion2);
        repeatingQuestion.questions.push(testQuestion);
        repeatingQuestion.questions.push(groupQuestion);

        let factory: FormFactory = TestBed.get(FormFactory);

        let createdNode = factory.createArrayNode(repeatingQuestion, null, null);

        let childNode = factory.createArrayNodeChild(repeatingQuestion, createdNode);

        expect(childNode).toBeTruthy();
        expect(childNode.control).toBeTruthy();
        expect(childNode.control).toBeTruthy();
        expect(createdNode.children[0]).toBe(childNode);

        expect(childNode.children['key1'] as LeafNode).toBeTruthy();
        expect((childNode.children['key1'] as LeafNode).question).toBe(testQuestion);
        expect((childNode.children['key1'] as LeafNode).path).toBe('r1.0.key1');

        expect(childNode.children['g1'] as GroupNode).toBeTruthy();
        expect((childNode.children['g1'] as GroupNode).question).toBe(groupQuestion);
        expect((childNode.children['g1'] as GroupNode).path).toBe('r1.0.g1');

        let childGroup = childNode.children['g1'] as GroupNode;

        expect(childGroup.children['key2'] as LeafNode).toBeTruthy();
        expect((childGroup.children['key2'] as LeafNode).question).toBe(testQuestion2);
        expect((childGroup.children['key2'] as LeafNode).path).toBe('r1.0.g1.key2');

        // examine the model of the repeating field after adding node
        let model = createdNode.control as AfeFormArray;

        expect(model.get('0')).toBeTruthy();
        expect(model.get('0') instanceof AfeFormGroup).toBe(true);
        expect(model.get('0')).toBe(childNode.control);

        expect(model.get('0.key1')).toBe((childNode.children['key1'] as LeafNode).control);
        expect(model.get('0.g1.key2')).toBe((childGroup.children['key2'] as LeafNode).control);

        // check node after removing

        factory.removeArrayNodeChild(0, createdNode);

        expect(createdNode.children.length).toBe(0);
        expect(model.get('0')).toBeFalsy();
    });

    it('should create a form', () => {
        let testSchema = new SampleSchema().getSchema();

        let factory: FormFactory = TestBed.get(FormFactory);

        let createdForm: Form = factory.createForm(testSchema);

        expect(createdForm).toBeTruthy();
        expect(createdForm.rootNode).toBeTruthy();
        expect(createdForm.rootNode instanceof GroupNode).toBeTruthy();
        expect(createdForm.schema).toBe(testSchema);
        expect(createdForm.FormFactory).toBe(factory);
        expect(createdForm.questionFactory).toBeTruthy();

        expect(createdForm.rootNode.control).toBeTruthy();
        expect(createdForm.rootNode.control instanceof AfeFormGroup).toBe(true);

        expect(createdForm.rootNode.question).toBeTruthy();
        expect(createdForm.rootNode.question instanceof QuestionGroup).toBe(true);
        expect(createdForm.rootNode.children).toBeTruthy();

        // check pages
        expect(createdForm.rootNode.children['Triage v0.01']).toBeTruthy();
        expect(createdForm.rootNode.children['Triage v0.01'] instanceof GroupNode).toBeTruthy();
        let page1 = createdForm.rootNode.children['Triage v0.01'] as GroupNode;

        expect(page1.control).toBeFalsy();
        expect(page1.children).toBeTruthy();
        expect(page1.question).toBeTruthy();
        expect(page1.question instanceof QuestionGroup).toBe(true);

        // check sections
        let section1 = page1.children['Encounter Details'] as GroupNode;

        expect(section1).toBeTruthy();
        expect(section1.control).toBeFalsy();
        expect(section1.children).toBeTruthy();
        expect(section1.question).toBeTruthy();

        // check questions i.e visit date

        let question1 = section1.children['encDate'] as LeafNode;

        expect(question1).toBeTruthy();
        expect(question1.control).toBeTruthy();
        expect(question1.control instanceof AfeFormControl).toBe(true);
        expect(question1.question).toBeTruthy();

        // check repeating question wiring i.e otherDrug
        expect(section1.children['otherDrug']).toBeTruthy();
        expect(section1.children['otherDrug'] instanceof ArrayNode).toBeTruthy();

        let repeating1 = section1.children['otherDrug'] as ArrayNode;

        repeating1.createChildNode();

        expect(repeating1.children.length).toBe(1);
        expect((repeating1.children[0] as GroupNode).children['otherDrugDetail']).toBeTruthy();
        expect((repeating1.children[0] as GroupNode).children['otherDrugDetail'].control).toBeTruthy();

        expect(createdForm.rootNode.control.get('otherDrug.0.otherDrugDetail'))
            .toBe((repeating1.children[0] as GroupNode).children['otherDrugDetail'].control);


        // check form control structure to be correct
        let encDate = createdForm.rootNode.control.get('encDate');

        expect(encDate).toBeTruthy();
        expect(encDate).toBe(question1.control);

    });

    it('should create a form with searching-by-id functionality', () => {
        let testSchema = new SampleSchema().getSchema();
        let factory: FormFactory = TestBed.get(FormFactory);

        let createdForm: Form = factory.createForm(testSchema);

        // CASE 1: top level nodes
        //  ID 'encDate': First field in the form, date field
        let found = createdForm.searchNodeByQuestionId('encDate');

        expect(found).toBeTruthy();
        expect(found.length).toBe(1);
        expect(found[0].question.key).toBe('encDate');

        found = null;

        // CASE 2: Deeper controls

        // ID 'testGroup': A group holding vital signs
        found = createdForm.searchNodeByQuestionId('testGroup');

        expect(found).toBeTruthy();
        expect(found.length).toBe(1);
        expect(found[0].question.key).toBe('testGroup');
        expect(found[0].question.label).toBe('test group');

        // ID 'systolic': A control within vital signs group
        found = createdForm.searchNodeByQuestionId('systolic');

        expect(found).toBeTruthy();
        expect(found.length).toBe(1);
        expect(found[0].question.key).toBe('systolic');
        expect(found[0].question.label).toBe('BP:Systolic:');

        found = null;

        // CASE 3: Controls within  node arrays i.e controls created at run time
        // ID 'otherDrugDetail' a control within the repeating group 'otherDrug'

        let repeatingNode: ArrayNode;
        found = createdForm.searchNodeByQuestionId('otherDrug');

        expect(found).toBeTruthy();
        expect(found.length).toBe(1);
        expect(found[0] instanceof ArrayNode).toBe(true);

        repeatingNode = found[0] as ArrayNode;

        // simulate user adding controls at run time
        repeatingNode.createChildNode();
        repeatingNode.createChildNode();
        repeatingNode.createChildNode();

        found = null;

        found = createdForm.searchNodeByQuestionId('otherDrugDetail');
        expect(found).toBeTruthy();
        expect(found.length).toBe(3);
        expect(found[0].question.key).toBe('otherDrugDetail');
        expect(found[0].question.label).toBe('Other drugs:');
        expect(found[1].question.key).toBe('otherDrugDetail');
        expect(found[1].question.label).toBe('Other drugs:');
        expect(found[2].question.key).toBe('otherDrugDetail');
        expect(found[2].question.label).toBe('Other drugs:');

    });
});
