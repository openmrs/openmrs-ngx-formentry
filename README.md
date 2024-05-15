# openmrs-ngx-formentry

`openmrs-ngx-formentry` is an Angular library for rendering and processing OpenMRS form schemas. It leverages Angular's [dynamic forms](https://angular.io/guide/dynamic-form) functionality to provide a robust and extensible form rendering engine. It also provides a set of form controls that can be used to render form fields.

<br />
<p>
  <img src="/src/assets/screen.webp" alt="App screenshot">
</p>
<br />

## Main concepts

### Form schema

A form schema is a JSON object that describes the structure of a form. Schemas compatible with this library conform to the O3 form schema standard, which is defined [here](https://json.openmrs.org/form.schema.json). The form engine knows how to render all the fields defined in the standard, and it can be extended to support custom fields.

### Question model

The question model is borrowed from Angular's [dynamic forms](https://angular.io/guide/dynamic-form) tutorial and adapted to support the O3 form schema standard.

### Data sources

Data sources are a mechanism for injecting data into a form. They are used to populate dropdowns and other fields that require data from an external source. Data sources are useful for injecting data that is not available at build time, such as data fetched from an API. The form engine allows you to define custom data sources, which can be used to inject data from arbitrary sources.

Example use-cases for data sources supported by the form engine include:

- Fetching a list of locations from the OpenMRS REST API and using it to populate a dropdown
- Uploading images and PDF files via the [file uploader](https://github.com/openmrs/openmrs-ngx-file-uploader) and associating them with an OpenMRS encounter.
- Resolving form labels from a REST API. This is useful for supporting internationalization.

## Expression runner

The expression runner is a service that can be used to evaluate expressions and return boolean values. It is used extensively by the form engine to:

- Hide and show form fields based on the values of other fields.
- Disable or enable form fields based on the values of other fields.
- Run complex validation logic.
- Run historical expressions.

## Validation and skip logic

The form engine supports validation and skip logic. It allows fields to be rendered conditionally based on boolean logic. It provides date based validation and validation based on JavaScript expressions. Read more about validation in the [validation guide](https://ampath-forms.vercel.app/docs/validation/date-based-validation).

## Links

- [Documentation](https://ampath-forms.vercel.app)
- [Release notes](https://github.com/openmrs/openmrs-ngx-formentry/releases)
- [Technical roadmap](https://github.com/openmrs/openmrs-ngx-formentry/issues/1)
- [Standard JSON schema for O3](https://json.openmrs.org/form.schema.json)

## Installation

```sh
yarn add @openmrs/ngx-formentry@next
```

## Usage

To use the library in an Angular application, import the `FormEntryModule` in your application's module:

```ts
import { FormEntryModule } from '@openmrs/ngx-formentry';

@NgModule({
  imports: [FormEntryModule]
})
export class AppModule {}
```

Then add the following code to your template:

```html
<form>
  <ofe-form-renderer
    [node]="form.rootNode"
    [labelMap]="labelMap"
  ></ofe-form-renderer>
</form>
```

Here, `node` refers to the form's rootNode, and `labelMap` is an object that maps node ids to their corresponding labels. Read through the logic in the [App component](src/app/app.component.ts) to see how:

- The form schema is loaded and parsed.
- Sample data is loaded and injected into the form (via data sources).
- Translations and concepts get resolved.

## Development

To build the library, run:

```sh
yarn build:lib
```

To fire up a dev server, run:

```sh
yarn start
```

This should fire up a local server on port `4200`. You can then navigate to `http://localhost:4200/` to see the demo app, which showcases the library's capabilities and provides a playground for testing out new features. The code that powers this demo app is in the `src/app` directory. It renders the form schema defined in `src/app/adult-1.6.json`.

To link the library to an O3 frontend, run the following commands:

```sh
# Build the library
yarn build:lib

# cd into the dist directory
cd dist/ngx-formentry

# Create an empty lockfile (yarn 3+ requires this)
touch yarn.lock

# Copy the absolute path to the built library
pwd | pbcopy
# Or if you're on Linux, run:
pwd | xclip -selection clipboard

# Using the O3 Patient Chart's Form Entry app as an example
cd ~/openmrs-esm-patient-chart/packages/esm-form-entry-app

# Link the library
yarn link `pbpaste`
# Or if you're on Linux, run:
yarn link `xclip -out`

# Fire up a dev server
cd ../..
yarn start --sources packages/esm-form-entry-app
```

## Contributing

Contributions are welcome. Please read through the [technical roadmap](https://github.com/openmrs/openmrs-ngx-formentry/issues/1) first to see what features are planned for the library. Read through our [Contributing Guidelines](https://o3-docs.openmrs.org/docs/frontend-modules/contributing) to get a better understanding of how to contribute.

## Cutting a new release

To cut a new release, start by creating a release branch:

```sh
git checkout -b chore/release-vX.Y.Z
```

Then update the version in the root-level `package.json` file:

```sh
yarn version --new-version <major|minor|patch> --no-git-tag-version
```

Note that this command only updates the version of the Angular wrapper app that consumes the library. To bump the library version, you must bump the version in the `package.json` file in the `projects/ngx-formentry` directory as well. To do so, run:

```sh
cd projects/ngx-formentry
yarn version --new-version <major|minor|patch> --no-git-tag-version
```

Commit the changes and push them:

```sh
git add .
git commit -m '(chore) Release vX.Y.Z'
git push
```

Then create a pull request and merge it into the `main` branch. Once the PR is merged, create a new release in the GitHub releases UI and publish it. This should run the [release](https://github.com/openmrs/openmrs-ngx-formentry/blob/main/.github/workflows/main.yml#L97-L98) job in our main CI workflow. Once the job completes successfully, the new release will be published to NPM and will automatically appear on our [Changelog page](https://o3-docs.openmrs.org/docs/changelog) in the docs.

## Credits

This project is based on [AMPATH](https://github.com/AMPATH)'s original [library](https://github.com/ampath/ngx-openmrs-formentry) with modifications to support O3.
