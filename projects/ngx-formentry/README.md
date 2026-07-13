# @openmrs/ngx-formentry

An Angular library for rendering and processing OpenMRS form schemas. It powers the Angular form engine in [OpenMRS 3 (O3)](https://o3-docs.openmrs.org) and renders schemas that conform to the [O3 form schema standard](https://json.openmrs.org/form.schema.json).

## Installation

```sh
yarn add @openmrs/ngx-formentry
```

## Usage

Import `FormEntryModule` alongside `ReactiveFormsModule`, include the exported stylesheets (`@openmrs/ngx-formentry/styles/ngx-formentry.css` and `@openmrs/ngx-formentry/styles/picker.min.css`) plus Carbon's styles, then render a form with the `<ofe-form-renderer>` component.

See the [repository README](https://github.com/openmrs/openmrs-ngx-formentry#usage) for a complete setup guide, main concepts, and a demo application.

## Links

- [Repository](https://github.com/openmrs/openmrs-ngx-formentry)
- [Documentation](https://ampath-forms.vercel.app)
- [Release notes](https://github.com/openmrs/openmrs-ngx-formentry/releases)
