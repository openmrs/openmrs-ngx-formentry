import { Form } from '../form-factory/form';
export interface ValueAdapter {
    generateFormPayload(form: Form): any;
    populateForm(form: Form, payload: any): any;
}
