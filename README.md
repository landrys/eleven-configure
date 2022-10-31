# ElevenConfigure

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Notes
Had to set up cloudfront to serve this web app.  Please see `https://www.youtube.com/watch?v=mls8tiiI3uc` for reference.

First the s3 bucket was created configure.11nator, Accomplished that with aws cli. See aws-stuff sub-directory.

For Cloudfront used the aws console. Needed to do a bunc of stuff especially for https support. Certificates from aws for the subdomain. See the reference above it explains it very well. You will need to do this for other sub-domains. 

High Level.
CloudFront communicates with S3 to get app files. Cloudfront is set up to use the domain with a certificate so that it uses https. The files in S3 are uploaded from the development area using aws-cli. Need to invalidate cloudfront so the the files are reomived from cache. Di this using aws-clei from development area. 


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

