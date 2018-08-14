/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
export class FormSchemaCompiler {
    constructor() {
    }
    /**
     * @param {?} formSchema
     * @param {?} referencedComponents
     * @return {?}
     */
    compileFormSchema(formSchema, referencedComponents) {
        // get all referenced forms
        const /** @type {?} */ refForms = this.getReferencedForms(formSchema, referencedComponents);
        if (_.isEmpty(refForms)) {
            return formSchema;
        }
        // get all place-holders from the form schema
        const /** @type {?} */ placeHolders = this.getAllPlaceholderObjects(formSchema);
        if (_.isEmpty(placeHolders)) {
            return formSchema;
        }
        // replace all placeHolders
        this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
        return formSchema;
    }
    /**
     * @param {?} schemaArray
     * @param {?} nameOfSchema
     * @return {?}
     */
    findSchemaByName(schemaArray, nameOfSchema) {
        if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
            return;
        }
        let /** @type {?} */ foundSchema = {};
        _.each(schemaArray, (schema) => {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        });
        return foundSchema;
    }
    /**
     * @param {?} schema
     * @param {?} pageLabel
     * @return {?}
     */
    getPageInSchemaByLabel(schema, pageLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
            return;
        }
        let /** @type {?} */ foundPage = {};
        _.each(schema.pages, (page) => {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        });
        return foundPage;
    }
    /**
     * @param {?} schema
     * @param {?} pageLabel
     * @param {?} sectionLabel
     * @return {?}
     */
    getSectionInSchemaByPageLabelBySectionLabel(schema, pageLabel, sectionLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
            return;
        }
        const /** @type {?} */ foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
        if (_.isEmpty(foundPage)) {
            return;
        }
        let /** @type {?} */ foundSection = {};
        _.each(foundPage.sections, (section) => {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        });
        return foundSection;
    }
    /**
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    getQuestionByIdInSchema(schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        if (Array.isArray(schema)) {
            let /** @type {?} */ question;
            for (let /** @type {?} */ i = 0; i < schema.length; i++) {
                if (!_.isEmpty(schema[i])) {
                    question = this.getQuestionByIdInSchema(schema[i], questionId);
                }
                if (!_.isEmpty(question)) {
                    break;
                }
            }
            return question;
        }
        else if (typeof schema === 'object') {
            if (this.isQuestionObjectWithId(schema, questionId)) {
                return schema;
            }
            else if (this.isSchemaSubObjectExpandable(schema)) {
                const /** @type {?} */ toExpand = (schema.pages || schema.sections || schema.questions);
                return this.getQuestionByIdInSchema(toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    /**
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    getQuestionsArrayByQuestionIdInSchema(schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        return this.getQuestionsArrayByQuestionId(schema, schema, questionId);
    }
    /**
     * @param {?} parent
     * @param {?} object
     * @param {?} questionId
     * @return {?}
     */
    getQuestionsArrayByQuestionId(parent, object, questionId) {
        if (Array.isArray(object)) {
            let /** @type {?} */ returnedValue;
            for (let /** @type {?} */ i = 0; i < object.length; i++) {
                if (!_.isEmpty(object[i])) {
                    returnedValue = this.getQuestionsArrayByQuestionId(object, object[i], questionId);
                }
                if (!_.isEmpty(returnedValue)) {
                    break;
                }
            }
            return returnedValue;
        }
        else if (typeof object === 'object') {
            if (this.isQuestionObjectWithId(object, questionId)) {
                return parent;
            }
            else if (this.isSchemaSubObjectExpandable(object)) {
                const /** @type {?} */ toExpand = (object.pages || object.sections || object.questions);
                return this.getQuestionsArrayByQuestionId(toExpand, toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    /**
     * @param {?} object
     * @return {?}
     */
    isSchemaSubObjectExpandable(object) {
        if (typeof object === 'object') {
            const /** @type {?} */ objectKeys = Object.keys(object);
            if (_.includes(objectKeys, 'pages') ||
                _.includes(objectKeys, 'sections') ||
                _.includes(objectKeys, 'questions')) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} object
     * @param {?} id
     * @return {?}
     */
    isQuestionObjectWithId(object, id) {
        return object['id'] === id;
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    getAllPlaceholderObjects(schema) {
        const /** @type {?} */ referencedObjects = [];
        this.extractPlaceholderObjects(schema, referencedObjects);
        return referencedObjects;
    }
    /**
     * @param {?} subSchema
     * @param {?} objectsArray
     * @return {?}
     */
    extractPlaceholderObjects(subSchema, objectsArray) {
        if (_.isEmpty(subSchema)) {
            return;
        }
        if (Array.isArray(subSchema)) {
            for (let /** @type {?} */ i = 0; i < subSchema.length; i++) {
                if (!_.isEmpty(subSchema[i])) {
                    this.extractPlaceholderObjects(subSchema[i], objectsArray);
                }
            }
        }
        else if (typeof subSchema === 'object') {
            if (!_.isEmpty(subSchema.reference)) {
                objectsArray.push(subSchema);
            }
            else if (this.isSchemaSubObjectExpandable(subSchema)) {
                const /** @type {?} */ toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                this.extractPlaceholderObjects(toExpand, objectsArray);
            }
        }
    }
    /**
     * @param {?} placeHolderObject
     * @param {?} referenceObject
     * @return {?}
     */
    fillPlaceholderObject(placeHolderObject, referenceObject) {
        for (const /** @type {?} */ member in referenceObject) {
            if (_.isEmpty(placeHolderObject[member])) {
                placeHolderObject[member] = referenceObject[member];
            }
        }
        return placeHolderObject;
    }
    /**
     * @param {?} keyValReferencedForms
     * @param {?} placeHoldersArray
     * @return {?}
     */
    replaceAllPlaceholdersWithActualObjects(keyValReferencedForms, placeHoldersArray) {
        _.each(placeHoldersArray, (placeHolder) => {
            const /** @type {?} */ referencedObject = this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
            if (_.isEmpty(referencedObject)) {
                console.error('Form compile: Error finding referenced object', placeHolder.reference);
            }
            else {
                placeHolder = this.fillPlaceholderObject(placeHolder, referencedObject);
                placeHolder = this.removeExcludedQuestionsFromPlaceholder(placeHolder);
                delete placeHolder['reference'];
            }
        });
        return placeHoldersArray;
    }
    /**
     * @param {?} array
     * @param {?} object
     * @return {?}
     */
    removeObjectFromArray(array, object) {
        const /** @type {?} */ indexOfObject = array.indexOf(object);
        if (indexOfObject === -1) {
            return;
        }
        array.splice(indexOfObject, 1);
    }
    /**
     * @param {?} placeHolder
     * @return {?}
     */
    removeExcludedQuestionsFromPlaceholder(placeHolder) {
        if (Array.isArray(placeHolder.reference.excludeQuestions)) {
            _.each(placeHolder.reference.excludeQuestions, (excludedQuestionId) => {
                const /** @type {?} */ questionsArray = this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                const /** @type {?} */ question = this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                this.removeObjectFromArray(questionsArray, question);
            });
        }
        return placeHolder;
    }
    /**
     * @param {?} referenceData
     * @param {?} keyValReferencedForms
     * @return {?}
     */
    getReferencedObject(referenceData, keyValReferencedForms) {
        if (_.isEmpty(referenceData.form)) {
            console.error('Form compile: reference missing form attribute', referenceData);
            return;
        }
        if (_.isEmpty(keyValReferencedForms[referenceData.form])) {
            console.error('Form compile: referenced form alias not found', referenceData);
            return;
        }
        if (!_.isEmpty(referenceData.questionId)) {
            return this.getQuestionByIdInSchema(keyValReferencedForms[referenceData.form], referenceData.questionId);
        }
        if (!_.isEmpty(referenceData.page) && !_.isEmpty(referenceData.section)) {
            return this.getSectionInSchemaByPageLabelBySectionLabel(keyValReferencedForms[referenceData.form], referenceData.page, referenceData.section);
        }
        if (!_.isEmpty(referenceData.page)) {
            return this.getPageInSchemaByLabel(keyValReferencedForms[referenceData.form], referenceData.page);
        }
        console.error('Form compile: Unsupported reference type', referenceData.reference);
    }
    /**
     * @param {?} formSchema
     * @param {?} formSchemasLookupArray
     * @return {?}
     */
    getReferencedForms(formSchema, formSchemasLookupArray) {
        const /** @type {?} */ referencedForms = formSchema.referencedForms;
        if (_.isEmpty(referencedForms)) {
            return;
        }
        const /** @type {?} */ keyValReferencedForms = {};
        _.each(referencedForms, (reference) => {
            keyValReferencedForms[reference.alias] =
                this.findSchemaByName(formSchemasLookupArray, reference.formName);
        });
        return keyValReferencedForms;
    }
}
FormSchemaCompiler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormSchemaCompiler.ctorParameters = () => [];
function FormSchemaCompiler_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormSchemaCompiler.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormSchemaCompiler.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNO0lBQ0o7S0FFQzs7Ozs7O0lBRU0saUJBQWlCLENBQUMsVUFBa0IsRUFBRSxvQkFBZ0M7O1FBRTNFLHVCQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDbkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQUU7O1FBRy9DLHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQUU7O1FBR25ELElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztJQUlaLGdCQUFnQixDQUFDLFdBQXVCLEVBQUUsWUFBb0I7UUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ2xFLHFC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Z0IsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckUsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLHFCQUFxQixDQUFDOzs7O1lBM1BoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVNjaGVtYUNvbXBpbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIHB1YmxpYyBjb21waWxlRm9ybVNjaGVtYShmb3JtU2NoZW1hOiBPYmplY3QsIHJlZmVyZW5jZWRDb21wb25lbnRzOiBBcnJheTxhbnk+KTogT2JqZWN0IHtcbiAgICAvLyBnZXQgYWxsIHJlZmVyZW5jZWQgZm9ybXNcbiAgICBjb25zdCByZWZGb3JtczogT2JqZWN0ID0gdGhpcy5nZXRSZWZlcmVuY2VkRm9ybXMoZm9ybVNjaGVtYSwgcmVmZXJlbmNlZENvbXBvbmVudHMpO1xuICAgIGlmIChfLmlzRW1wdHkocmVmRm9ybXMpKSB7IHJldHVybiBmb3JtU2NoZW1hOyB9XG5cbiAgICAvLyBnZXQgYWxsIHBsYWNlLWhvbGRlcnMgZnJvbSB0aGUgZm9ybSBzY2hlbWFcbiAgICBjb25zdCBwbGFjZUhvbGRlcnMgPSB0aGlzLmdldEFsbFBsYWNlaG9sZGVyT2JqZWN0cyhmb3JtU2NoZW1hKTtcbiAgICBpZiAoXy5pc0VtcHR5KHBsYWNlSG9sZGVycykpIHsgcmV0dXJuIGZvcm1TY2hlbWE7IH1cblxuICAgIC8vIHJlcGxhY2UgYWxsIHBsYWNlSG9sZGVyc1xuICAgIHRoaXMucmVwbGFjZUFsbFBsYWNlaG9sZGVyc1dpdGhBY3R1YWxPYmplY3RzKHJlZkZvcm1zLCBwbGFjZUhvbGRlcnMpO1xuICAgIHJldHVybiBmb3JtU2NoZW1hO1xuICB9XG5cblxuICBwcml2YXRlIGZpbmRTY2hlbWFCeU5hbWUoc2NoZW1hQXJyYXk6IEFycmF5PGFueT4sIG5hbWVPZlNjaGVtYTogc3RyaW5nKTogT2JqZWN0IHtcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYUFycmF5KSB8fCBfLmlzRW1wdHkobmFtZU9mU2NoZW1hKSkgeyByZXR1cm47IH1cbiAgICBsZXQgZm91bmRTY2hlbWE6IGFueSA9IHt9O1xuICAgIF8uZWFjaChzY2hlbWFBcnJheSwgKHNjaGVtYTogYW55KSA9PiB7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IG5hbWVPZlNjaGVtYSkge1xuICAgICAgICBmb3VuZFNjaGVtYSA9IHNjaGVtYTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmRTY2hlbWE7XG4gIH1cblxuICBwcml2YXRlIGdldFBhZ2VJblNjaGVtYUJ5TGFiZWwoc2NoZW1hOiBhbnksIHBhZ2VMYWJlbDogc3RyaW5nKTogT2JqZWN0IHtcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHBhZ2VMYWJlbCkpIHsgcmV0dXJuOyB9XG4gICAgbGV0IGZvdW5kUGFnZTogT2JqZWN0ID0ge307XG4gICAgXy5lYWNoKHNjaGVtYS5wYWdlcywgKHBhZ2UpID0+IHtcbiAgICAgIGlmIChwYWdlLmxhYmVsID09PSBwYWdlTGFiZWwpIHtcbiAgICAgICAgZm91bmRQYWdlID0gcGFnZTtcbiAgICAgIH1cbiAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gZm91bmRQYWdlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTZWN0aW9uSW5TY2hlbWFCeVBhZ2VMYWJlbEJ5U2VjdGlvbkxhYmVsXG4gICAgKHNjaGVtYTogT2JqZWN0LCBwYWdlTGFiZWw6IHN0cmluZywgc2VjdGlvbkxhYmVsOiBzdHJpbmcpOiBPYmplY3Qge1xuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hKSB8fCBfLmlzRW1wdHkocGFnZUxhYmVsKSB8fCBfLmlzRW1wdHkoc2VjdGlvbkxhYmVsKSkgeyByZXR1cm47IH1cbiAgICBjb25zdCBmb3VuZFBhZ2U6IGFueSA9IHRoaXMuZ2V0UGFnZUluU2NoZW1hQnlMYWJlbChzY2hlbWEsIHBhZ2VMYWJlbCk7XG4gICAgaWYgKF8uaXNFbXB0eShmb3VuZFBhZ2UpKSB7IHJldHVybjsgfVxuICAgIGxldCBmb3VuZFNlY3Rpb246IE9iamVjdCA9IHt9O1xuICAgIF8uZWFjaChmb3VuZFBhZ2Uuc2VjdGlvbnMsIChzZWN0aW9uKSA9PiB7XG4gICAgICBpZiAoc2VjdGlvbi5sYWJlbCA9PT0gc2VjdGlvbkxhYmVsKSB7XG4gICAgICAgIGZvdW5kU2VjdGlvbiA9IHNlY3Rpb247XG4gICAgICB9XG4gICAgfVxuICAgICk7XG4gICAgcmV0dXJuIGZvdW5kU2VjdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25CeUlkSW5TY2hlbWEoc2NoZW1hOiBhbnksIHF1ZXN0aW9uSWQ6IHN0cmluZyk6IEFycmF5PGFueT4ge1xuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hKSB8fCBfLmlzRW1wdHkocXVlc3Rpb25JZCkpIHsgcmV0dXJuOyB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xuICAgICAgbGV0IHF1ZXN0aW9uOiBBcnJheTxhbnk+O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2hlbWEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkoc2NoZW1hW2ldKSkge1xuICAgICAgICAgIHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShzY2hlbWFbaV0sIHF1ZXN0aW9uSWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghXy5pc0VtcHR5KHF1ZXN0aW9uKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvbk9iamVjdFdpdGhJZChzY2hlbWEsIHF1ZXN0aW9uSWQpKSB7XG4gICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKHNjaGVtYSkpIHtcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAoc2NoZW1hLnBhZ2VzIHx8IHNjaGVtYS5zZWN0aW9ucyB8fCBzY2hlbWEucXVlc3Rpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UXVlc3Rpb25CeUlkSW5TY2hlbWEodG9FeHBhbmQsIHF1ZXN0aW9uSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZEluU2NoZW1hKHNjaGVtYTogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHF1ZXN0aW9uSWQpKSB7IHJldHVybjsgfVxuICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKHNjaGVtYSwgc2NoZW1hLCBxdWVzdGlvbklkKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBnZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZChwYXJlbnQ6IGFueSwgb2JqZWN0OiBhbnksIHF1ZXN0aW9uSWQ6IHN0cmluZyk6IEFycmF5PGFueT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIGxldCByZXR1cm5lZFZhbHVlOiBBcnJheTxhbnk+O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkob2JqZWN0W2ldKSkge1xuICAgICAgICAgIHJldHVybmVkVmFsdWUgPSB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKG9iamVjdCwgb2JqZWN0W2ldLCBxdWVzdGlvbklkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV8uaXNFbXB0eShyZXR1cm5lZFZhbHVlKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXR1cm5lZFZhbHVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh0aGlzLmlzUXVlc3Rpb25PYmplY3RXaXRoSWQob2JqZWN0LCBxdWVzdGlvbklkKSkge1xuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShvYmplY3QpKSB7XG4gICAgICAgIGNvbnN0IHRvRXhwYW5kID0gKG9iamVjdC5wYWdlcyB8fCBvYmplY3Quc2VjdGlvbnMgfHwgb2JqZWN0LnF1ZXN0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKHRvRXhwYW5kLCB0b0V4cGFuZCwgcXVlc3Rpb25JZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvLyBvYmplY3QgaXMgcGFnZSBvciBzZWN0aW9uIG9yIHF1ZXN0aW9uXG4gIHByaXZhdGUgaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKG9iamVjdDogT2JqZWN0KTogQm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgICAgIGlmIChfLmluY2x1ZGVzKG9iamVjdEtleXMsICdwYWdlcycpIHx8XG4gICAgICAgIF8uaW5jbHVkZXMob2JqZWN0S2V5cywgJ3NlY3Rpb25zJykgfHxcbiAgICAgICAgXy5pbmNsdWRlcyhvYmplY3RLZXlzLCAncXVlc3Rpb25zJykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNRdWVzdGlvbk9iamVjdFdpdGhJZChvYmplY3Q6IE9iamVjdCwgaWQ6IGFueSk6IEJvb2xlYW4ge1xuICAgIHJldHVybiBvYmplY3RbJ2lkJ10gPT09IGlkO1xuXG4gIH1cblxuICBwcml2YXRlIGdldEFsbFBsYWNlaG9sZGVyT2JqZWN0cyhzY2hlbWE6IE9iamVjdCk6IEFycmF5PGFueT4ge1xuICAgIGNvbnN0IHJlZmVyZW5jZWRPYmplY3RzOiBBcnJheTxhbnk+ID0gW107XG4gICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHNjaGVtYSwgcmVmZXJlbmNlZE9iamVjdHMpO1xuICAgIHJldHVybiByZWZlcmVuY2VkT2JqZWN0cztcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdFBsYWNlaG9sZGVyT2JqZWN0cyhzdWJTY2hlbWE6IGFueSwgb2JqZWN0c0FycmF5OiBBcnJheTxPYmplY3Q+KTogdm9pZCB7XG4gICAgaWYgKF8uaXNFbXB0eShzdWJTY2hlbWEpKSB7IHJldHVybjsgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YlNjaGVtYSkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViU2NoZW1hLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KHN1YlNjaGVtYVtpXSkpIHtcbiAgICAgICAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc3ViU2NoZW1hW2ldLCBvYmplY3RzQXJyYXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3ViU2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKCFfLmlzRW1wdHkoc3ViU2NoZW1hLnJlZmVyZW5jZSkpIHtcbiAgICAgICAgb2JqZWN0c0FycmF5LnB1c2goc3ViU2NoZW1hKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVtYVN1Yk9iamVjdEV4cGFuZGFibGUoc3ViU2NoZW1hKSkge1xuICAgICAgICBjb25zdCB0b0V4cGFuZCA9IChzdWJTY2hlbWEucGFnZXMgfHwgc3ViU2NoZW1hLnNlY3Rpb25zIHx8IHN1YlNjaGVtYS5xdWVzdGlvbnMpO1xuICAgICAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHModG9FeHBhbmQsIG9iamVjdHNBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaWxsUGxhY2Vob2xkZXJPYmplY3QocGxhY2VIb2xkZXJPYmplY3Q6IE9iamVjdCwgcmVmZXJlbmNlT2JqZWN0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGZvciAoY29uc3QgbWVtYmVyIGluIHJlZmVyZW5jZU9iamVjdCkge1xuICAgICAgaWYgKF8uaXNFbXB0eShwbGFjZUhvbGRlck9iamVjdFttZW1iZXJdKSkge1xuICAgICAgICBwbGFjZUhvbGRlck9iamVjdFttZW1iZXJdID0gcmVmZXJlbmNlT2JqZWN0W21lbWJlcl07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwbGFjZUhvbGRlck9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgcmVwbGFjZUFsbFBsYWNlaG9sZGVyc1dpdGhBY3R1YWxPYmplY3RzXG4gICAgKGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0LCBwbGFjZUhvbGRlcnNBcnJheTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xuICAgIF8uZWFjaChwbGFjZUhvbGRlcnNBcnJheSwgKHBsYWNlSG9sZGVyKSA9PiB7XG4gICAgICBjb25zdCByZWZlcmVuY2VkT2JqZWN0OiBPYmplY3QgPVxuICAgICAgICB0aGlzLmdldFJlZmVyZW5jZWRPYmplY3QocGxhY2VIb2xkZXIucmVmZXJlbmNlLCBrZXlWYWxSZWZlcmVuY2VkRm9ybXMpO1xuXG4gICAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZWRPYmplY3QpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogRXJyb3IgZmluZGluZyByZWZlcmVuY2VkIG9iamVjdCcsIHBsYWNlSG9sZGVyLnJlZmVyZW5jZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGFjZUhvbGRlciA9IHRoaXMuZmlsbFBsYWNlaG9sZGVyT2JqZWN0KHBsYWNlSG9sZGVyLCByZWZlcmVuY2VkT2JqZWN0KTtcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLnJlbW92ZUV4Y2x1ZGVkUXVlc3Rpb25zRnJvbVBsYWNlaG9sZGVyKHBsYWNlSG9sZGVyKTtcbiAgICAgICAgZGVsZXRlIHBsYWNlSG9sZGVyWydyZWZlcmVuY2UnXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGxhY2VIb2xkZXJzQXJyYXk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU9iamVjdEZyb21BcnJheShhcnJheTogQXJyYXk8YW55Piwgb2JqZWN0OiBPYmplY3QpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleE9mT2JqZWN0ID0gYXJyYXkuaW5kZXhPZihvYmplY3QpO1xuICAgIGlmIChpbmRleE9mT2JqZWN0ID09PSAtMSkgeyByZXR1cm47IH1cblxuICAgIGFycmF5LnNwbGljZShpbmRleE9mT2JqZWN0LCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRXhjbHVkZWRRdWVzdGlvbnNGcm9tUGxhY2Vob2xkZXIocGxhY2VIb2xkZXI6IGFueSk6IE9iamVjdCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGxhY2VIb2xkZXIucmVmZXJlbmNlLmV4Y2x1ZGVRdWVzdGlvbnMpKSB7XG4gICAgICBfLmVhY2gocGxhY2VIb2xkZXIucmVmZXJlbmNlLmV4Y2x1ZGVRdWVzdGlvbnMsIChleGNsdWRlZFF1ZXN0aW9uSWQpID0+IHtcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zQXJyYXk6IEFycmF5PGFueT4gPSB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkSW5TY2hlbWEoXG4gICAgICAgICAgcGxhY2VIb2xkZXIsIGV4Y2x1ZGVkUXVlc3Rpb25JZCk7XG5cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHF1ZXN0aW9uc0FycmF5KSkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHF1ZXN0aW9uc0FycmF5LCBleGNsdWRlZFF1ZXN0aW9uSWQpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlT2JqZWN0RnJvbUFycmF5KHF1ZXN0aW9uc0FycmF5LCBxdWVzdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHBsYWNlSG9sZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZWZlcmVuY2VkT2JqZWN0KHJlZmVyZW5jZURhdGE6IGFueSwga2V5VmFsUmVmZXJlbmNlZEZvcm1zOiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5mb3JtKSkge1xuICAgICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiByZWZlcmVuY2UgbWlzc2luZyBmb3JtIGF0dHJpYnV0ZScsIHJlZmVyZW5jZURhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXy5pc0VtcHR5KGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dKSkge1xuICAgICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiByZWZlcmVuY2VkIGZvcm0gYWxpYXMgbm90IGZvdW5kJywgcmVmZXJlbmNlRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEucXVlc3Rpb25JZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKFxuICAgICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSxcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5xdWVzdGlvbklkKTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnBhZ2UpICYmICFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5zZWN0aW9uKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VjdGlvbkluU2NoZW1hQnlQYWdlTGFiZWxCeVNlY3Rpb25MYWJlbChcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXG4gICAgICAgIHJlZmVyZW5jZURhdGEucGFnZSxcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5zZWN0aW9uXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnBhZ2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRQYWdlSW5TY2hlbWFCeUxhYmVsKFxuICAgICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSxcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5wYWdlXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IFVuc3VwcG9ydGVkIHJlZmVyZW5jZSB0eXBlJywgcmVmZXJlbmNlRGF0YS5yZWZlcmVuY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZWZlcmVuY2VkRm9ybXMoZm9ybVNjaGVtYTogYW55LCBmb3JtU2NoZW1hc0xvb2t1cEFycmF5OiBBcnJheTxhbnk+KTogT2JqZWN0IHtcbiAgICBjb25zdCByZWZlcmVuY2VkRm9ybXM6IEFycmF5PGFueT4gPSBmb3JtU2NoZW1hLnJlZmVyZW5jZWRGb3JtcztcblxuICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlZEZvcm1zKSkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0ID0ge307XG5cbiAgICBfLmVhY2gocmVmZXJlbmNlZEZvcm1zLCAocmVmZXJlbmNlOiBhbnkpID0+IHtcbiAgICAgIGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2UuYWxpYXNdID1cbiAgICAgICAgdGhpcy5maW5kU2NoZW1hQnlOYW1lKGZvcm1TY2hlbWFzTG9va3VwQXJyYXksIHJlZmVyZW5jZS5mb3JtTmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGtleVZhbFJlZmVyZW5jZWRGb3JtcztcbiAgfVxufVxuIl19