/* eslint-disable no-undef */
const pin = '2580';
const username = 'FLORIBERT';
const password = 'Password@1996';

const showExchangeForm = (walletNumber = 4) => {
  cy.get('.sidebar-submenu > ul > :nth-child(5)').click({
    force: true,
  });
  if (walletNumber) {
    cy.get(':nth-child(3) > .rightItems > .dropdown').click();

    cy.get(`.visible > .scrolling > :nth-child(${walletNumber})`)
      .last()
      .click();
  }
};

const fillAmount = (amount = 1000) => {
  cy.get('.form-information > .ui > input').type(`${amount}`);
};

const submitForm = error => {
  cy.route({
    method: 'POST',
    url: '/TransferConfirmation',
    status: error ? 401 : 200,
    response: error
      ? [
          {
            Error: '2022',
            Description:
              'You do not have enough money in this wallet for this operation(10000000000)',
            Result: 'FAILED',
          },
        ]
      : [
          {
            OK: '200',
            TargetAccountVerified: 'YES',
            AccountName: '',
            AccountCurrency: '',
            Description:
              'Funds are available. All clear for this transaction.',
            Result: 'Success',
            AmountToBeSent: '1.11 USD',
            Amount: '1000.00 RWF',
            Fees: '0.00 RWF',
            ExternalFees: '0.00 RWF',
            ExchangeFees: '6.80 RWF',
            Taxes: '0.34 RWF',
            TotalAmount: '1007.14 RWF',
            ExchangeRate: '1:0.001110',
          },
        ],
  }).as('confirmation');
  cy.get('.actions button.ui.positive.button').click();
};

const confirmExchange = () => {
  cy.route({
    method: 'POST',
    url: '/TransferFunds2UWallet',
    status: 200,
    response: [
      {
        OK: '200',
        Result: 'Success',
        AmountSent: '0.00 BTC',
        Amount: '1000.00 RWF',
        Fees: '0.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '6.80 RWF',
        Taxes: '0.34 RWF',
        TotalAmount: '1007.14 RWF',
        ExchangeRate: '1:0.000000',
        SourceWallet: {
          WalletNumber: 'RWF-01-FLORIBERT',
          Balance: '12107444',
          WalletName: 'The Greatest of all!',
          Currency: 'RWF',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
        },
        TargetWallet: {
          WalletNumber: 'BTC-01-FLORIBERT',
          Balance: '499998.03125',
          WalletName: 'Bit Balance',
          Currency: 'BTC',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/btc.png',
        },
        ReccurentTransactionsSet: 'NO',
        Description:
          'Money sent. A notification is sent to the recipient. The recipient wallet (BTC-01-FLORIBERT) is credited with0.00 BTC',
      },
    ],
  }).as('exchange');

  cy.get('.actions button.ui.positive.button').click();
};
describe('Test currency exchange', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginAs(username, password, pin);
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'POST',
      url: '/GetUserWalletList',
      status: 200,
      response: [
        {
          AccountNumber: 'BTC-01-FLORIBERT',
          AccountName: 'Bit Balance',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=BTC-01-FLORIBERT',
          Balance: '499,998.03',
          CurrencyCode: 'BTC',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/btc.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'EUR-01-FLORIBERT',
          AccountName: 'Personal',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=EUR-01-FLORIBERT',
          Balance: '827.13',
          CurrencyCode: 'EUR',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'RWF-01-FLORIBERT',
          AccountName: 'The Greatest of all!',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=RWF-01-FLORIBERT',
          Balance: '12,217,518.00',
          CurrencyCode: 'RWF',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          Default: 'YES',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'USD-01-FLORIBERT',
          AccountName: 'Personal',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=USD-01-FLORIBERT',
          Balance: '323.77',
          CurrencyCode: 'USD',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
      ],
    }).as('getUserWallet');
    cy.route({
      method: 'POST',
      url: '/GetAllContactList',
      status: 200,
      response: [
        {
          ContactType: 'INTERNAL',
          ContactPID: 'AGO',
          FirstName: 'Alberto Gerardo',
          LastName: 'Olympio',
          PresenceStatus: '0',
          AccountVerified: 'NO',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/ago-4.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/agomedium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/agosmall-0.png',
          CountryCode: 'SN',
          PhoneNumber: '221777979343',
          MainPhonePrefix: '221',
          MainPhoneNumber: '77 797 93 43',
          MainPhoneFlag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/sn.png',
          Phones: [
            {
              Phone: '221777979343',
              PhonePrefix: '221',
              PhoneNumber: '77 797 93 43',
              NumberCountryCode: 'SN',
              PhoneFlag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/sn.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: 'alberto@ossix.technology',
          DefaultWallet: {
            WalletNumber: 'USD-01-AGO',
            WalletName:
              'Investments in the cloud bor are good you broke me first',
            Currency: 'USD',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
          },
          WalletsCount: '3',
          Wallets: [
            {
              WalletNumber: 'EUR-01-AGO',
              WalletName: 'Operations',
              Currency: 'EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-AGO',
              WalletName: 'Rwanda Op',
              Currency: 'RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-AGO',
              WalletName:
                'Investments in the cloud bor are good you broke me first',
              Currency: 'USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          Favorite: 'NO',
          MySharedWalletsCount: '3',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '827 EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,217,518 RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'USD',
              Balance: '324 USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          BankAccountCount: '0',
          BankAccounts: [],
        },
        {
          ContactType: 'INTERNAL',
          ContactPID: 'MWIBUTSA',
          FirstName: 'Mwibutsa',
          LastName: 'Floribert',
          PresenceStatus: '0',
          AccountVerified: 'NO',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/mwibutsa-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/mwibutsamedium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/mwibutsasmall-0.png',
          CountryCode: 'RW',
          PhoneNumber: '2500787740316',
          MainPhonePrefix: '250',
          MainPhoneNumber: '078 774 0316',
          MainPhoneFlag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          Phones: [
            {
              Phone: '2500787740316',
              PhonePrefix: '250',
              PhoneNumber: '078 774 0316',
              NumberCountryCode: 'RW',
              PhoneFlag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: 'floribert.mwibutsa@gmail.com',
          DefaultWallet: {
            WalletNumber: 'RWF-01-MWIBUTSA',
            WalletName: 'Personal',
            Currency: 'RWF',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          },
          WalletsCount: '3',
          Wallets: [
            {
              WalletNumber: 'EUR-01-MWIBUTSA',
              WalletName: 'Personal',
              Currency: 'EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-MWIBUTSA',
              WalletName: 'Personal',
              Currency: 'RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-MWIBUTSA',
              WalletName: 'Personal',
              Currency: 'USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          Favorite: 'NO',
          MySharedWalletsCount: '3',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '827 EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,217,518 RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'USD',
              Balance: '324 USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          BankAccountCount: '0',
          BankAccounts: [],
        },
      ],
    });
    cy.restoreLocalStorage();
    cy.visit('/contacts');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });

  it('should change currency', () => {
    showExchangeForm();
    fillAmount();
    submitForm();

    cy.enterPin(pin);
    confirmExchange();
    cy.get('.pin-input-form').should('not.be.visible');
  });

  it('should not change to the same wallet currency', () => {
    showExchangeForm(3);
    fillAmount();
    submitForm();

    cy.get('.message-component > span').should(
      'contain.text',
      'The source wallet and the target wallet must not be the same',
    );
  });

  it('should not change if the amount of money is less than or equal to zero', () => {
    showExchangeForm();
    fillAmount(0);
    submitForm();

    cy.get('.message-component > span').should(
      'contain.text',
      'The Exchange amount cannot be zero',
    );
  });

  it('should not change if the amount of money is greater than wallet balance', () => {
    showExchangeForm();
    fillAmount(10000000000);
    submitForm('error');

    cy.get('.message-component > span').should(
      'contain.text',
      'You do not have enough money in this wallet for this operation(10000000000)',
    );
  });

  it('should not change if no target wallet is selected', () => {
    showExchangeForm(0);
    fillAmount(1000);
    submitForm();

    cy.get('.message-component > span').should(
      'contain.text',
      'Please provide the target wallet number.',
    );
  });
});
