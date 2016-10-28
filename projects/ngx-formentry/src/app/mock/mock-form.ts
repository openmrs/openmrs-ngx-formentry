import { TextInputQuestion } from '../form-entry/question-models/text-input-question';
import { QuestionGroup } from '../form-entry/question-models/group-question';
import { RepeatingQuestion } from '../form-entry/question-models/repeating-question';
import { FormGroup } from '@angular/forms';
export class MockForm {
    section1: FormGroup;
    data = {
        form: this.section1,
        questions: [
            new TextInputQuestion({
                type: 'text',
                key: 'things',
                label: 'Things You Like',
                value: 'Hello',
                placeholder: ''
            }),
            new TextInputQuestion({
                type: 'text',
                key: 'things1',
                label: 'Things You Like 1',
                value: 'Hello',
                placeholder: ''
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
                        placeholder: ''
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
                                placeholder: ''
                            }),
                            new RepeatingQuestion({
                                type: 'repeating',
                                key: 'repeating',
                                label: 'Repeated In Group',
                                questions: [
                                    new TextInputQuestion({
                                        type: 'text',
                                        key: 'reatingPrvi4',
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
                key: 'repeating1',
                label: 'Repeated',
                questions: [
                    new TextInputQuestion({
                        type: 'text',
                        key: 'reatingPrvi2',
                        label: 'Am Repeated',
                        placeholder: 'Am Repeated'
                    }),
                    new TextInputQuestion({
                        type: 'text',
                        key: 'reatingPrvi1',
                        label: 'Am Repeated Second',
                        placeholder: 'Am Repeated Second'
                    })
                ]
            }),
            new TextInputQuestion({
                type: 'text',
                key: 'Drugi',
                label: 'I Reference',
                value: '',
                placeholder: 'I Reference'
            }),
            new TextInputQuestion({
                type: 'text',
                key: 'Prvi',
                label: 'Am Referenced',
                value: '',
                placeholder: 'Am Referenced'
            }),
        ]
    };
    getMockForm() {
        return this.data;
    }
}
