
[![Build Status](https://travis-ci.org/AMPATH/ngx-openmrs-formentry.svg?branch=master)](https://travis-ci.org/AMPATH/ngx-openmrs-formentry)

# NgxOpenmrsFormentry

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Build the library by running

```npm run build:lib ```

## The run the demo with

```npm start```

## To publish

Update the version in all the package.jsons

```git add -f dist ```

```git commit -m 'Bump <Version>' ```

```git tag  <Version> ```
Reset branch so you don't commit the dist to the src repository

```git reset HEAD~1 --hard``
```git checkout <version tag> ```
```npm login ```
```npm publish ```

