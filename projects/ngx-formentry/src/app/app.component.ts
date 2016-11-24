import { Component, style, state, animate, transition, trigger } from '@angular/core';
import { QuestionFactory } from './form-entry/form-factory/question.factory';
import { FormGroup } from '@angular/forms';
import { Form } from './form-entry/form-factory/form';
import { FormFactory } from './form-entry/form-factory/form.factory';
import '../style/app.scss';
const adultForm = require('./adult');
@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('flyIn', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(100%)' }),
                animate(250)
            ])
        ])
    ]
})
export class AppComponent {
    data: any;
    schema: any;
    sections: {} = {};
    formGroup: FormGroup;
    activeTab = 0;
    form: Form;
    constructor(private questionFactory: QuestionFactory, private formFactory: FormFactory) {
        // Do stuff
        console.log(adultForm);
        this.schema = adultForm;
        // this.sections = this.createSections(adultForm);
        this.createForm();
    }
    createSections(formSchema) {
        let sections = {};
        for (let page of formSchema.pages) {
            for (let section of page.sections) {
                let sectionData = {};
                sectionData[section.id] = {
                    form: this.formGroup,
                    questions: this.questionFactory.getSchemaQuestions(section.questions)
                };
                Object.assign(sections, sectionData);
            }
        }
        return sections;
    }
    getSectionData(sectionId) {
        let data = {};
        data = this.sections[sectionId];
        return data;
    }


    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }

    createForm() {
        this.form = this.formFactory.createForm(this.schema);
    }

    onSubmit() {
        console.log('FORM MODEL:', this.form.rootNode.control);
    }
}
