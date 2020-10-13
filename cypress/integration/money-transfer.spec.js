const pin = '2580';
const username = 'FLORIBERT';
const password = 'Password@1996';

const fillAmountField = value => {
  cy.wait(3000);
  cy.get('input[name="amount"]', { timeout: 3000 }).type(`${value}`);
};

const fillDetailsForm = () => {
  cy.get('input[name="reference"]', { timeout: 60000 }).type(
    'Test send money',
  );
  cy.get('input[name="description"]', { timeout: 60000 }).type(
    'Test send money description.',
  );
};

const submitAmountForm = () => {
  cy.get('.actions button.ui.positive.button', {
    timeout: 3000,
  }).click();
};

const fillRecurringForm = (startDateIndex = 3, endDateIndex = 4) => {
  cy.get('.one-tme-transfer .toggle-switch-switch').click();
  cy.get('.ui.search.dropdown>input.search').type('2nd');
  cy.get('.visible > :nth-child(1) > .text').click();

  cy.get('input[name="startDate"]').focus();
  cy.get(
    `:nth-child(${startDateIndex}) > :nth-child(3) > .suicr-content-item`,
  ).click({ force: true });

  cy.get('input[name="endDate"]').focus();
  cy.get(
    `:nth-child(${endDateIndex}) > :nth-child(3) > .suicr-content-item`,
  )
    .last()
    .click({ force: true });
};
// Opens transfer amount form and populates the amount field if a value is provided
const showAmountForm = amount => {
  cy.get(':nth-child(2) > :nth-child(2) > button', {
    timeout: 20000,
  }).click({ force: true });

  cy.get('a[href="/contacts?ref=send-money"]').click({
    force: true,
  });

  cy.get('div.contact-item', { timeout: 20000 })
    .last()
    .click({
      force: true,
    });

  if (!Number.isNaN(amount)) {
    fillAmountField(amount);
  }
};

describe('Test Transfer Money to contact', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginAs('FLORIBERT', 'Password@1996', '2580');
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/contacts?ref=send-money');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });

  it('Should send money to contact', () => {
    showAmountForm(1);
    cy.location('pathname').should('eq', '/contacts');

    submitAmountForm();
    fillDetailsForm();

    // fill pin form
    cy.enterPin(pin);

    cy.get('.ss-amount strong').should('contain.text', '1');

    cy.get('button.ui.positive.button').click();

    // wait for the toast and check it's content
    cy.get('.Toastify__toast-body', {
      timeout: 60000,
    }).should('contain', 'notification is sent to the recipient.');
  });

  it('Should not transfer the amount of money less than or equal to zero', () => {
    showAmountForm(0);

    cy.get('div.select-contact').should(
      'have.text',
      'Select a contact',
    );
    submitAmountForm();
    cy.location('pathname').should('eq', '/contacts');

    cy.get('.message-component span', { timeout: 10000 })
      .first()
      .should('have.text', 'The amount cannot be zero');
  });

  it('Should not send amount of money greater than wallet balance.', () => {
    showAmountForm(10000000000000000000011000000001);
    submitAmountForm();

    cy.get('.message-component span', { timeout: 10000 })
      .first()
      .should(
        'contain',
        'You do not have enough money in this wallet for this',
      );
  });

  it('Should raise an error if the amount field has no value.', () => {
    showAmountForm();
    submitAmountForm();

    cy.get('.message-component span', { timeout: 10000 })
      .first()
      .should(
        'contain',
        'You must enter the amount for this operation.',
      );
  });

  it('Should be able to send money from any wallet', () => {
    showAmountForm();
    fillAmountField(1);
    submitAmountForm();

    fillDetailsForm();
    cy.enterPin(pin);
    cy.get('button.ui.positive.button')
      .first()
      .click({ force: true });
  });

  xit('Should be able create recurring transactions', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();

    fillRecurringForm();
    cy.enterPin(pin);
    cy.get('button.ui.positive.button').click();

    // wait for the toast and check it's content
    cy.get('.Toastify__toast-body', { timeout: 10000 }).should(
      'contain',
      'A notification is sent to the recipient.',
    );
  });

  it('Should be able create recurring transactions and send money directly', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();

    cy.get('.send-now  .toggle-switch-switch').click();

    cy.enterPin(pin);

    cy.get('button.ui.positive.button').click();

    // wait for the toast and check it's content
    cy.get('.Toastify__toast-body', { timeout: 20000 }).should(
      'contain',
      'A notification is sent to the recipient.',
    );
  });

  it('Should not allow starting date to be greater than ending date. ', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm(4, 3);
    cy.enterPin(pin);
    cy.get('button.ui.positive.button').click();

    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Please choose an end date thats later than the start date',
    );
  });

  it('Should not submit transfer money form without a pin.', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();
    // cy.enterPin(pin);
    cy.get('button.ui.positive.button').click();

    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Please provide your PIN number.',
    );
  });

  it('Should not submit transfer money form without a correct pin.', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();
    cy.enterPin('0000');
    cy.get('button.ui.positive.button').click();

    // wait for the toast and check it's content
    cy.get('.message-component span', { timeout: 20000 }).should(
      'contain',
      'Wrong PIN',
    );
  });
});
