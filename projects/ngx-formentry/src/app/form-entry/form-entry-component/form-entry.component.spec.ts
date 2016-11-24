import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { FormEntryComponent } from './form-entry.component';
import { FormEntryModule } from '../form-entry.module';

describe('Form Entry Component', () => {
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

    it('should have a _form attribute', () => {
        let fixture = TestBed.createComponent(FormEntryComponent);

    });

    it('should have a _data attribute', () => {
        let fixture = TestBed.createComponent(FormEntryComponent);

    });

});