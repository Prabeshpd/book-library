import '@testing-library/cypress/add-commands';

import { Method as HttpMethod } from 'axios';
import { RouteHandler, RouteMatcher } from 'cypress/types/net-stubbing';

import { APPLICATION_LOADER, APPLICATION_NAV_SELECTOR } from '../constants/selectors';
import { REGISTRATION_SELECTOR } from '../e2e/registration/selectors';
import { LOGIN_SELECTOR } from '../e2e/login/selectors';

Cypress.Commands.add('hasToastMessage', (type: 'success' | 'error', message: string) => {
  const toastId = type === 'success' ? 'toast-success' : 'toast-error';

  cy.get(`[id=${toastId}]`).should('contain', message);
});

Cypress.Commands.add('hasActiveSpinner', () => {
  cy.get(`[aria-label=${APPLICATION_LOADER}]`).should('be.visible');
});

Cypress.Commands.add('register', (user: any) => {
  cy.visit('/register');
  cy.findByTestId(REGISTRATION_SELECTOR.inputName).type('Default User');
  cy.findByTestId(REGISTRATION_SELECTOR.inputEmail).type('defaultUser@gmail.com');
  cy.findByTestId(REGISTRATION_SELECTOR.inputPassword).type('password');

  cy.findByTestId(REGISTRATION_SELECTOR.submitButton).click();
});

Cypress.Commands.add('login', (user: any) => {
  cy.visit('/login');
  cy.findByTestId(LOGIN_SELECTOR.inputEmail).type(user.email);
  cy.findByTestId(LOGIN_SELECTOR.inputPassword).type(user.password);

  cy.findByTestId(LOGIN_SELECTOR.submitButton).click();
});

Cypress.Commands.add('navigateTo', (pageName: string) => {
  switch (pageName) {
    case 'books':
      return cy.findByTestId(APPLICATION_NAV_SELECTOR.books).click();

    case 'profile':
      return cy.findByTestId(APPLICATION_NAV_SELECTOR.profile).click();

    default:
      throw new Error('Page does not exist in application');
  }
});

Cypress.Commands.add('findByTableHeaderColumn', (columnName: string) => {
  cy.get(`td[headers=${columnName}]`);
});

Cypress.Commands.add(
  'interceptWithDelay',
  (method: HttpMethod, url: RouteMatcher, delayTime: number, response?: RouteHandler): void => {
    cy.intercept(method, url, (req) => {
      return Cypress.Promise.delay(delayTime, response).then(req.reply);
    });
  },
);
