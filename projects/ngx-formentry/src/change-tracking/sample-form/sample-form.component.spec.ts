import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SampleFormComponent } from './sample-form.component';

describe('Change tracking extensions:', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SampleFormComponent],
            imports: [ReactiveFormsModule]
        });
    });

    it('Should have sample form component should be defined', () => {
        const fixture = TestBed.createComponent(SampleFormComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    describe('Should detect form changes and update related forms', () => {

        it('Should detect form changes: CASE 1: a) cyclic relations validation', () => {
            let fixture = TestBed.createComponent(SampleFormComponent);
            fixture.detectChanges();
            let component = fixture.componentInstance;

            expect(component.control4.valid).toEqual(true);
            expect(component.form.valid).toEqual(true);
            component.control5.setValue('failed');
            fixture.detectChanges();
            expect(component.control4.valid).toEqual(false);
            expect(component.form.valid).toEqual(false);

            fixture = TestBed.createComponent(SampleFormComponent);
            fixture.detectChanges();
            component = fixture.componentInstance;

            expect(component.control5.valid).toEqual(true);
            expect(component.form.valid).toEqual(true);
            component.control4.setValue('failed');
            fixture.detectChanges();
            expect(component.control5.valid).toEqual(false);
            expect(component.form.valid).toEqual(false);



        });

        it('Should detect form changes: CASE 2: child listens to ancestor', () => {
            const fixture = TestBed.createComponent(SampleFormComponent);
            fixture.detectChanges();
            const component = fixture.componentInstance;

            expect(component.control3.valid).toEqual(true);
            expect(component.form.valid).toEqual(true);
            component.control1.setValue('failed');
            fixture.detectChanges();
            expect(component.control3.valid).toEqual(false);
            expect(component.form.valid).toEqual(false);

        });

        it('Should detect form changes: CASE 3:  Deep contols: one leaf in one branch listens ' +
            'to another leaf in a separate branch', () => {
                const fixture = TestBed.createComponent(SampleFormComponent);
                fixture.detectChanges();
                const component = fixture.componentInstance;

                expect(component.control2.valid).toEqual(true);
                expect(component.form.valid).toEqual(true);
                component.control6.setValue('failed');
                fixture.detectChanges();
                expect(component.control2.valid).toEqual(false);
                expect(component.form.valid).toEqual(false);

            });

        it('Should detect form changes: CASE 4: controls in the same group listening to each other', () => {
            const fixture = TestBed.createComponent(SampleFormComponent);
            fixture.detectChanges();
            const component = fixture.componentInstance;

            expect(component.control6.valid).toEqual(true);
            expect(component.form.valid).toEqual(true);
            component.control7.setValue('failed');
            fixture.detectChanges();
            expect(component.control6.valid).toEqual(false);
            expect(component.form.valid).toEqual(false);

        });

        it('Should detect form changes: CASE 5: controls in the same array listening to each other', () => {
            const fixture = TestBed.createComponent(SampleFormComponent);
            fixture.detectChanges();
            const component = fixture.componentInstance;

            expect(component.control10.valid).toEqual(true);
            expect(component.form.valid).toEqual(true);
            component.control11.setValue('failed');
            fixture.detectChanges();
            expect(component.control10.valid).toEqual(false);
            expect(component.form.valid).toEqual(false);

        });

        it('Should detect form changes: CASE 6: controls in the same array listening to each other', () => {
            const fixture = TestBed.createComponent(SampleFormComponent);
            fixture.detectChanges();
            const component = fixture.componentInstance;

            expect(component.control1.valid).toEqual(true);
            expect(component.form.valid).toEqual(true);
            component.removeControlNine();
            fixture.detectChanges();
            expect(component.control1.valid).toEqual(false);
            expect(component.form.valid).toEqual(false);

        });
    });

});
