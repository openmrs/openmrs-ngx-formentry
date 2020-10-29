[![Build Status](https://travis-ci.com/AMPATH/ngx-openmrs-formentry.svg?branch=master)](https://travis-ci.com/AMPATH/ngx-openmrs-formentry)

# AMPATH POC Formentry

This a formentry module for use with AMPATH's medical records system, [AMPATH POC](https://github.com/ampath/ng2-amrs).

# Development

## Build the library by running:

`npm run build:lib`

## Then run the demo with:

`npm start`

## To publish:

Update the version in both of the `package.json` files

`git add -f dist`

`git commit -m 'Bump <Version>'`

`git tag <Version>`

Reset branch so you don't commit the dist to the src repository

```
git reset HEAD~1 --hard
git checkout <version tag>
npm login
npm publish
```
