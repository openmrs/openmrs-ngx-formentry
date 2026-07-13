# openmrs-ngx-formentry

`openmrs-ngx-formentry` is an Angular library for rendering and processing OpenMRS form schemas. It leverages Angular's [dynamic forms](https://angular.dev/guide/forms/dynamic-forms) functionality to provide a robust and extensible form rendering engine. It also provides a set of form controls that can be used to render form fields.

<br />
<p>
  <img src="/src/assets/screen.webp" alt="App screenshot">
</p>
<br />

## Main concepts

### Form schema

A form schema is a JSON object that describes the structure of a form. Schemas compatible with this library conform to the O3 form schema standard, which is defined [here](https://json.openmrs.org/form.schema.json). The form engine renders most of the field types defined in the standard, and it can be extended to support custom fields. Renderings the engine does not implement (such as `toggle`, `fixed-value`, `markdown`, and `content-switcher`) fall back to a plain text input.

### Question model

The question model is borrowed from Angular's [dynamic forms](https://angular.dev/guide/forms/dynamic-forms) tutorial and adapted to support the O3 form schema standard.

### Data sources

Data sources are a mechanism for injecting data into a form. They are used to populate dropdowns and other fields that require data from an external source. Data sources are useful for injecting data that is not available at build time, such as data fetched from an API. The form engine allows you to define custom data sources, which can be used to inject data from arbitrary sources.

Example use-cases for data sources supported by the form engine include:

- Fetching a list of locations from the OpenMRS REST API and using it to populate a dropdown.
- Uploading images and PDF files via the [file uploader](https://github.com/openmrs/openmrs-ngx-file-uploader) and associating them with an OpenMRS encounter.
- Resolving form labels from a REST API. This is useful for supporting internationalization.

### Expression runner

The expression runner is a service that evaluates JavaScript expressions defined in the schema. Expressions can return booleans or arbitrary calculated values. The form engine uses it to:

- Hide and show form fields based on the values of other fields.
- Disable or enable form fields based on the values of other fields.
- Run complex validation logic.
- Compute calculated values (via `calculateExpression`), such as deriving a BMI from height and weight.
- Run historical expressions.

### Validation and skip logic

The form engine supports validation and skip logic. It allows fields to be rendered conditionally based on boolean logic. It provides date based validation and validation based on JavaScript expressions. Read more about validation in the [validation guide](https://ampath-forms.vercel.app/docs/validation/date-based-validation).

### Custom components and controls

The form engine can lazy-load standard web components into a form:

- **Custom components** are display widgets attached via a `componentConfigs` array in the schema. Each entry declares the element's `tag` and the `url` of the script that registers it. The schema accepts `componentConfigs` on pages, sections, and individual questions, but the renderer currently honors only page-level entries (shown at the top of the page) and question-level entries (rendered as part of the question's control block) — section-level entries are parsed but not rendered. The loaded element receives a `config` property (the `componentConfigs` entry, including any `detail` payload) and a `dark` boolean for theming.
- **Custom controls** replace a question's native input. A question opts in by setting `"customControl": true` in its `questionOptions` and declaring a `customControlConfig` with the element's `tag` and `url`. The loaded element receives `question`, `value`, `disabled`, and `config` properties, and reports new values by dispatching an `on-change` CustomEvent whose `detail.data` carries the value.

The demo app exercises both mechanisms using the bundle in [`src/assets/web-components.bundled.js`](src/assets/web-components.bundled.js), which doubles as a reference implementation of the contract. Note that these bundled elements are demo fixtures, not production components — real deployments should host their own bundles.

## Links

- [Documentation](https://ampath-forms.vercel.app)
- [Release notes](https://github.com/openmrs/openmrs-ngx-formentry/releases)
- [Technical roadmap](https://github.com/openmrs/openmrs-ngx-formentry/issues/90)
- [Standard JSON schema for O3](https://json.openmrs.org/form.schema.json)

## Installation

```sh
yarn add @openmrs/ngx-formentry
```

Pre-release builds are published to the `next` tag on every push to `main`. Use them only when you need unreleased changes, such as when developing against the latest O3 work:

```sh
yarn add @openmrs/ngx-formentry@next
```

## Usage

To use the library in an Angular application, import `FormEntryModule` alongside `ReactiveFormsModule` in your application's module. `FormEntryModule` does not re-export `ReactiveFormsModule`, and the template below needs the `formGroup` directive:

```ts
import { ReactiveFormsModule } from '@angular/forms';
import { FormEntryModule } from '@openmrs/ngx-formentry';

@NgModule({
  imports: [ReactiveFormsModule, FormEntryModule]
})
export class AppModule {}
```

Include the library's stylesheets, plus Carbon's styles (a peer dependency), in your global styles:

```scss
@import '@carbon/styles/css/styles.min.css';
@import '@openmrs/ngx-formentry/styles/ngx-formentry.css';
@import '@openmrs/ngx-formentry/styles/picker.min.css';
```

Then add the following code to your template:

```html
<form [formGroup]="form.rootNode.control">
  <ofe-form-renderer
    [node]="form.rootNode"
    [labelMap]="labelMap"
  ></ofe-form-renderer>
</form>
```

Here, `node` refers to the form's rootNode, and `labelMap` is an object that maps concept UUIDs and answer values to display labels. The renderer uses it to resolve labels for questions and answers that do not define one in the schema. Read through the logic in the [App component](src/app/app.component.ts) to see how:

- The form schema is loaded and parsed.
- Sample data is loaded and injected into the form (via data sources).
- Translations and concepts get resolved.

## Development

### Prerequisites

- Node.js `^20.19.0 || ^22.12.0 || >=24.0.0` (the range Angular 20 supports).
- Yarn 4, provisioned via [Corepack](https://yarnpkg.com/corepack): run `corepack enable` once and the `packageManager` field in `package.json` takes care of the rest. Recent Node.js releases no longer bundle Corepack, so install it first with `npm install -g corepack` if the command is missing.

Then install the dependencies:

```sh
yarn install --immutable
```

### Building

To build the library, run:

```sh
yarn build:lib
```

### Running the demo app

To fire up a dev server, run:

```sh
yarn start
```

This should fire up a local server on port `4200`. You can then navigate to `http://localhost:4200/` to see the demo app, which showcases the library's capabilities and provides a playground for testing out new features. The code that powers this demo app is in the `src/app` directory. It renders the form schema defined in `src/app/adult-1.6.json`.

### Testing

To run the library's unit tests once, run:

```sh
yarn test
```

To run them in watch mode, run:

```sh
yarn test:watch
```

### Linking the library to an O3 frontend

To test local changes inside an O3 frontend, build the library and link the built output. Yarn's `link` command accepts a path directly:

```sh
# Build the library
yarn build:lib

# Yarn requires a lockfile in the linked folder
touch dist/ngx-formentry/yarn.lock

# Using the O3 Patient Chart's Form Entry app as an example
cd ~/openmrs-esm-patient-chart/packages/esm-form-entry-app

# Link the built library by its path
yarn link /path/to/openmrs-ngx-formentry/dist/ngx-formentry

# Fire up a dev server
cd ../..
yarn start --sources packages/esm-form-entry-app
```

## Contributing

Contributions are welcome. Please read through the [technical roadmap](https://github.com/openmrs/openmrs-ngx-formentry/issues/90) first to see what features are planned for the library. Read through our [Contributing Guidelines](https://o3-docs.openmrs.org/en-US/docs/frontend-modules/contributing) to get a better understanding of how to contribute.

## Angular version policy

This library is part of the O3 Angular form engine stack, together with [openmrs-ngx-file-uploader](https://github.com/openmrs/openmrs-ngx-file-uploader) and [esm-form-entry-app](https://github.com/openmrs/openmrs-esm-patient-chart/tree/main/packages/esm-form-entry-app). All three must use the same Angular major version, and that version must still be supported by Angular through the next RefApp release. By convention, this library's major version matches the Angular major it supports: 20.x supports Angular 20, so moving to a new Angular major means a new major release of this library. Before proposing or reviewing an Angular major version bump, read the [Angular version support policy](https://o3-docs.openmrs.org/en-US/docs/frontend-modules/angular-version-policy). It explains when to migrate, how to pick the target version, and which toolchain packages must be ready first.

## Cutting a new release

To cut a new release, start by creating a release branch:

```sh
git checkout -b chore/release-vX.Y.Z
```

Then bump the version in both the root manifest and the library manifest — releases keep the two in sync. Replace `patch` with `minor` or `major` as appropriate:

```sh
yarn version patch
yarn workspace @openmrs/ngx-formentry version patch
```

Commit the two manifests and push the branch:

```sh
git add package.json projects/ngx-formentry/package.json
git commit -m '(chore) Release vX.Y.Z' -m 'Bump the root and library manifests to X.Y.Z ahead of the vX.Y.Z release.'
git push -u origin chore/release-vX.Y.Z
```

Then create a pull request and merge it into the `main` branch. Once the PR is merged, create a new release in the GitHub releases UI and publish it. This should run the `release` job in our [main CI workflow](https://github.com/openmrs/openmrs-ngx-formentry/blob/main/.github/workflows/main.yml). Once the job completes successfully, the new release will be published to NPM and will automatically appear on our [Changelog page](https://o3-docs.openmrs.org/en-US/docs/changelog) in the docs.

## Credits

This project is based on [AMPATH](https://github.com/AMPATH)'s original [library](https://github.com/ampath/ngx-openmrs-formentry) with modifications to support O3.
