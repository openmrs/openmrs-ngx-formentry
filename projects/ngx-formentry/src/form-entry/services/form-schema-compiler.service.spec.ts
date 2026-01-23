import { TestBed } from '@angular/core/testing';
import { FormSchemaCompiler } from './form-schema-compiler.service';
import * as _ from 'lodash';

describe('FormSchemaCompiler Service:', () => {
  const formSchemaAdult: any = require('../../mock/schema/adult-return.json');
  const expectedSchema: any = require('../../mock/schema/compiled-adult-return.json');
  const componentArt: any = require('../../mock/schema/component_art.json');
  const componentHosp: any = require('../../mock/schema/component_hospitalization.json');
  const componentPreclinic: any = require('../../mock/schema/component_preclinic-review.json');
  const referencedComponents: Array<any> = [
    componentArt,
    componentHosp,
    componentPreclinic
  ];
  const hasReference = (value: any): boolean => {
    if (!value || typeof value !== 'object') {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(value, 'reference')) {
      return true;
    }
    if (Array.isArray(value)) {
      return value.some(hasReference);
    }
    return Object.values(value).some(hasReference);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormSchemaCompiler]
    });
  });

  it('should have FormSchemaCompiler defined and compileFormSchema defined as a public property', () => {
    const formSchemaCompiler: FormSchemaCompiler = TestBed.inject(
      FormSchemaCompiler
    );
    expect(formSchemaCompiler).toBeTruthy();
    expect(formSchemaCompiler.compileFormSchema).toBeTruthy();
  });

  it('should extract all pages from referenced components and append it to the compiled schema', () => {
    const formSchemaCompiler: FormSchemaCompiler = TestBed.inject(
      FormSchemaCompiler
    );
    const fs: any = _.cloneDeep(formSchemaAdult);
    const compiled: any = formSchemaCompiler.compileFormSchema(
      fs,
      referencedComponents
    );
    expect(compiled.pages).toBeDefined();
    expect(compiled.pages.length > 0).toBeDefined();
    // check the correct number of pages
    expect(compiled.pages.length === expectedSchema.pages.length).toBeDefined();
  });

  it('should extract all questions from referenced components and map them to the compiled schema', () => {
    const formSchemaCompiler: FormSchemaCompiler = TestBed.inject(
      FormSchemaCompiler
    );
    const fs: any = _.cloneDeep(formSchemaAdult);
    const compiledSchema: any = formSchemaCompiler.compileFormSchema(
      fs,
      referencedComponents
    );

    expect(compiledSchema.pages.length).toBe(expectedSchema.pages.length);
    expect(hasReference(compiledSchema)).toBe(false);
  });

  it('should remove all excluded question defined in the base form', () => {
    const formSchemaCompiler: FormSchemaCompiler = TestBed.inject(
      FormSchemaCompiler
    );
    const fs: any = _.cloneDeep(formSchemaAdult);
    const excludedQuestion: any = {
      label: 'Social History',
      sections: [
        {
          reference: {
            form: 'pcr',
            page: 'Pre-clinic Review',
            section: 'Social History',
            excludeQuestions: ['civil_status_question']
          }
        }
      ]
    };
    // adding an excluded question in a new section at the first page
    fs.pages.unshift(excludedQuestion);
    // compiling schema
    const compiled: any = formSchemaCompiler.compileFormSchema(
      fs,
      referencedComponents
    );
    expect(compiled.pages.length > 0).toBeTruthy();
    expect(compiled.pages[0].sections.length > 0).toBeTruthy();
    // now check if all questions has been compiled
    const socialHistorySection: any = compiled.pages[0].sections[0];
    expect(socialHistorySection.questions.length > 0).toBeTruthy();
    // now check if the question has been excluded
    const found = _.find(socialHistorySection.questions, (question: any) => {
      return question.id === 'civil_status_question';
    });
    expect(found).not.toEqual(true);
  });

  it('should return the main form without compilation if referenced components are missing', () => {
    const formSchemaCompiler: FormSchemaCompiler = TestBed.inject(
      FormSchemaCompiler
    );
    const fs: any = _.cloneDeep(formSchemaAdult);
    const compiled: any = formSchemaCompiler.compileFormSchema(fs, []);
    expect(_.isEqual(compiled, fs)).toBeTruthy();
    expect(compiled.pages.length > 0).toBeTruthy();
  });
});
