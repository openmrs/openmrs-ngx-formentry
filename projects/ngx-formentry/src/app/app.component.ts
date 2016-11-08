import { Component, style, state, animate, transition, trigger } from '@angular/core';
import { QuestionFactory } from './form-entry/factories/question.factory';
import { FormGroup } from '@angular/forms';
import '../style/app.scss';
const form = require('./adult');
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
  constructor(private questionFactory: QuestionFactory) {
    // Do stuff
    console.log(form);
    this.schema = form;
    this.sections = this.createSections(form);
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
}
