export declare class FormSchemaCompiler {
    constructor();
    compileFormSchema(formSchema: Object, referencedComponents: Array<any>): Object;
    private findSchemaByName(schemaArray, nameOfSchema);
    private getPageInSchemaByLabel(schema, pageLabel);
    private getSectionInSchemaByPageLabelBySectionLabel(schema, pageLabel, sectionLabel);
    private getQuestionByIdInSchema(schema, questionId);
    private getQuestionsArrayByQuestionIdInSchema(schema, questionId);
    private getQuestionsArrayByQuestionId(parent, object, questionId);
    private isSchemaSubObjectExpandable(object);
    private isQuestionObjectWithId(object, id);
    private getAllPlaceholderObjects(schema);
    private extractPlaceholderObjects(subSchema, objectsArray);
    private fillPlaceholderObject(placeHolderObject, referenceObject);
    private replaceAllPlaceholdersWithActualObjects(keyValReferencedForms, placeHoldersArray);
    private removeObjectFromArray(array, object);
    private removeExcludedQuestionsFromPlaceholder(placeHolder);
    private getReferencedObject(referenceData, keyValReferencedForms);
    private getReferencedForms(formSchema, formSchemasLookupArray);
}
