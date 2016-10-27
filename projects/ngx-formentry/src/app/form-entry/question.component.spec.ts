import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { QuestionComponent } from './question.component';
import { FormEntryModule } from './form-entry.module';

describe('Question Component', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                HttpModule,
                FormsModule,
                FormEntryModule
            ],
            declarations: [
            ]
        });
    });

    it('should have a question attribute', () => {
        let fixture = TestBed.createComponent(QuestionComponent);

    });

    it('should have a form attribute', () => {
        let fixture = TestBed.createComponent(QuestionComponent);

    });

    it('should have a formArray attribute', () => {
        let fixture = TestBed.createComponent(QuestionComponent);

    });

});