<p align="center">
    <img src="https://i.imgur.com/bF1WkFW.png" width="300">
</p>

[![NPM Version][npm-badge]][npm-url]
[![Node JS][node-badge]][node-url]
[![Angular JS][angular-badge]][angular-url]
[![License][license-badge]][license-url]

# Site
<!-- TODO: Agregar imagenes del frontend -->
<!-- ![tarjetacredito angularjs](https://i.imgur.com/B2heenX.png) -->
![tarjetacredito angularjs 1](https://i.imgur.com/Me55x8o.png)
![tarjetacredito angularjs 2](https://i.imgur.com/yHrX9sL.png)

# Install dependences
in ```tarjetacredito-angularjs/```

```bash
npm install
```
or
```bash
yarn install
```

***

# TarjetacreditoAngularjs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

***

# Create component without .spec (--skip-tests)
```javascript
ng generate component components/creditCardForm --skip-tests
```
or
```javascript
ng g c components/creditCardForm --skip-tests
```

# Create service without file .spec (--skip-tests)
```javascript
ng generate service services/creditCard --skip-tests
```
or
```javascript
ng g s services/creditCard --skip-tests
```

# Create interface (add at file name '.interface.ts')
```javascript
ng generate interface interfaces/creditCard --skip-tests
```
or
```javascript
ng g i interfaces/creditCard --skip-tests
```

# Server local
install global ```sudo npm i -g http-server```

deploy in ```/tarjetacredito-angularjs/dist/tarjetacredito-angularjs/```

```javascript
http-server
```
or
```javascript
http-server -o
```

[npm-badge]: https://img.shields.io/badge/npm-v7.6.2-brightgreen
[npm-url]: https://www.npmjs.com
[node-badge]: https://img.shields.io/badge/nodejs-v14.16.0-brightgreen
[node-url]: https://nodejs.org/download/release/v12.16.1/
[angular-badge]: https://img.shields.io/badge/angular--CLI-v11.2.4-brightgreen
[angular-url]: https://angular.io/cli/
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg
[license-url]: https://opensource.org/licenses/MIT
