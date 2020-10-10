// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password, pin) => {
  cy.get('input[name="PID"]').type(username);
  cy.get('input[name="Password"]').type(password);
  cy.enterPin(pin);
  cy.contains('CONNECT').click({ force: true });
});

Cypress.Commands.add('enterPin', pin => {
  cy.get('input[name="digit0"]').type(pin[0]);
  cy.get('input[name="digit1"]').type(pin[1]);
  cy.get('input[name="digit2"]').type(pin[2]);
  cy.get('input[name="digit3"]').type(pin[3]);
});

const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorageCache', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorageCache', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
