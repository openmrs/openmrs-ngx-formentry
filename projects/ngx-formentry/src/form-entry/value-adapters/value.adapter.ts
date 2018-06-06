
import { Form } from '../form-factory/form';
export interface ValueAdapter {
    generateFormPayload(form: Form); // generates the orders payload
    populateForm(form: Form, payload); // populates the form with orders
}
