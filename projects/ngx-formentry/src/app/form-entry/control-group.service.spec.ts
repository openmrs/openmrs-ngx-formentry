import { Injector } from '@angular/core';
import { ControlGroupService } from './control-group.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { TextInputQuestion } from './question-models/text-input-question';
import { QuestionGroup } from './question-models/group-question';
import { RepeatingQuestion } from './question-models/repeating-question'
describe('ControlGroupService', () => {
    let injector: Injector;
    let controlGroupService: ControlGroupService;
    let data = {
        form: this.section1,
        settings: {
            submitButtonText: 'Send',
            errorOnDirty: true,
            submitButton: false
        },
        questions: [
            new TextInputQuestion({
                type: 'text',
                key: 'things',
                label: 'Things You Like',
                value: 'Hello',
                placeholder: '',
            }),
            new TextInputQuestion({
                type: 'text',
                key: 'things1',
                label: 'Things You Like 1',
                value: 'Hello1',
                placeholder: '',
            }),
            new QuestionGroup({
                type: 'group',
                key: 'nested',
              
                questions: [
                    new TextInputQuestion({
                        type: 'text',
                        key: 'nestedText',
                        label: 'Nested In Group',
                        value: 'Nested In Group',
                        placeholder: '',
                    }),
                    new QuestionGroup({
                        type: 'group',
                        key: 'nestedDeep',
                      
                        questions: [
                            new TextInputQuestion({
                                type: 'text',
                                key: 'nestedTextDeep',
                                label: 'Nested In Deep Group',
                                value: 'Nested In Deep Group',
                                placeholder: '',
                            }),
                            new RepeatingQuestion({
                                type: 'repeating',
                                key: 'repeating1',
                                label: 'Repeated In Group',
                            
                                questions: [
                                    new TextInputQuestion({
                                        type: 'text',
                                        key: 'reatingPrvi1',
                                        label: 'Am Repeated in group',
                                        placeholder: 'Am Repeated in group',
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new RepeatingQuestion({
                type: 'repeating',
                key: 'repeating',
                label: 'Repeated',
                questions: [
                    new TextInputQuestion({
                        type: 'text',
                        key: 'reatingPrvi',
                        label: 'Am Repeated',
                        placeholder: 'Am Repeated',
                    })
                ]
            }),
            new TextInputQuestion({
                type: 'text',
                key: 'Drugi',
                label: 'I Reference',
                value: '',
                placeholder: 'I Reference',
            }),
            new TextInputQuestion({
                type: 'text',
                key: 'Prvi',
                label: 'Am Referenced',
                value: '',
                placeholder: 'Am Referenced',
            }),
        ]
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            providers: [
                FormBuilder,
                ControlGroupService
            ]
        });
        injector = getTestBed();
        controlGroupService = injector.get(ControlGroupService);

    });

    afterEach(() => {
        injector = undefined;
        controlGroupService = undefined;
    });

    it('is defined', () => {
        expect(ControlGroupService).toBeDefined();
        expect(controlGroupService instanceof ControlGroupService).toBeTruthy();
    });

    it('Should have a controls array', () => {
        controlGroupService.create(data.questions, 'fbGroup');
        let controls = controlGroupService.controls;
        expect(controls.length).toEqual(10);
    });

    it('Should have a create function that returns a form group', () => {
        let formGroup = controlGroupService.create([new TextInputQuestion({
            type: 'text',
            key: 'Drugi',
            label: 'I Reference',
            value: '',
            placeholder: 'I Reference'
        })], 'fbGroup');
        formGroup.fbGroup.controls.Drugi.updateValueAndValidity();
        expect(formGroup.fbGroup.valid).toBe(true);
        expect(formGroup.fbGroup.value).toEqual({ 'Drugi': '' });
    });
});
