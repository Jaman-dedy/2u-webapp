/* eslint-disable no-undef */
const pin = '2580';
const username = 'FLORIBERT';
const password = 'Password@1996';

const selectCrountryAndProvider = (providerIndex = 12) => {
  cy.get('.country > .dropdown').click();
  cy.route({
    url: '/MNOList',
    method: 'POST',
    status: 200,
    response: [
      {
        CountryCode: 'RW',
        OperatorID: '00',
        OperatorName: '2UMoney',
        Category: '0',
        LogoNumber: '0',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/000.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '010',
        OperatorName: 'IMBANK Rwanda',
        Category: '4',
        LogoNumber: '21',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/021.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '040',
        OperatorName: 'Banque de Kigali (BK)',
        Category: '4',
        LogoNumber: '22',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/022.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '070',
        OperatorName: 'GT BANK Rwanda',
        Category: '4',
        LogoNumber: '23',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/023.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '100',
        OperatorName: 'Ecobank',
        Category: '4',
        LogoNumber: '24',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/024.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '115',
        OperatorName: 'Access Bank',
        Category: '4',
        LogoNumber: '25',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/025.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '130',
        OperatorName: 'Cogebanque',
        Category: '4',
        LogoNumber: '26',
        AccountPattern: '#####-###########-##',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/026.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '145',
        OperatorName: 'Urwego Opportunity Bank',
        Category: '4',
        LogoNumber: '27',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/027.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '160',
        OperatorName: 'KCB Rwanda',
        Category: '4',
        LogoNumber: '28',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/028.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '192',
        OperatorName: 'Aquity Bank',
        Category: '4',
        LogoNumber: '29',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/029.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '400',
        OperatorName: 'Banque Populaire du Rwanda',
        Category: '4',
        LogoNumber: '30',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/030.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '63510',
        OperatorName: 'MTN Rwanda',
        Category: '21',
        LogoNumber: '1',
        AccountPattern: '###-###-###',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/001.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '63514',
        OperatorName: 'Airtel Rwanda',
        Category: '21',
        LogoNumber: '3',
        AccountPattern: '###-###-###',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/003.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '750',
        OperatorName: 'BRD',
        Category: '4',
        LogoNumber: '31',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/031.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '800',
        OperatorName: 'Zigama Credit and Savings',
        Category: '4',
        LogoNumber: '32',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/032.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '900',
        OperatorName: 'Bank Of Africa',
        Category: '4',
        LogoNumber: '33',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/033.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '950',
        OperatorName: 'Unguka Bank',
        Category: '4',
        LogoNumber: '35',
        AccountPattern: '',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/035.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
    ],
  }).as('rwandaProviders');

  cy.get(`.visible > .scrolling > :nth-child(20)`).click();
  cy.get('.currency > .dropdown').click();

  cy.get(
    `.active > .visible > .scrolling > :nth-child(${providerIndex})`,
  ).click();
};
const fillAmount = value => {
  cy.get('input[name="amount"]', { timeout: 3000 }).type(`${value}`);
};

const showAmountForm = savedAccount => {
  cy.get(':nth-child(2) > :nth-child(2) > button', {
    timeout: 20000,
  }).click({ force: true });

  if (savedAccount) {
    cy.get('div.contact-item', { timeout: 20000 })
      .first()
      .click({
        force: true,
      });
  } else {
    cy.get('div.contact-item', { timeout: 20000 })
      .last()
      .click({
        force: true,
      });
  }
  cy.wait('@getUserWallet');
};

const submitForm = (status, response) => {
  cy.route({
    url: '/TransferConfirmation',
    method: 'POST',
    status: status || 200,
    response: response || [
      {
        OK: '200',
        TargetAccountVerified: 'YES',
        AccountName: 'Alain BURINDI MUHINDO',
        AccountCurrency: 'RWF',
        Description:
          'Funds are available. All clear for this transaction.',
        Result: 'Success',
        AmountToBeSent: '1.00 RWF',
        Amount: '1.00 RWF',
        Fees: '2500.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.00 RWF',
        Taxes: '125.00 RWF',
        TotalAmount: '2626.00 RWF',
        ExchangeRate: '1:1.000000',
      },
    ],
  }).as('transferConfirmation');
  cy.get('button.ui.positive.button').click();
};

const mockTransferToOther = response => {
  cy.route({
    url: '/TransferToOther',
    method: 'POST',
    status: 200,
    response: response || [
      {
        OK: '200',
        Description:
          'Transfer from wallet RWF-01-FLORIBERT (2UMoney)',
        Result: 'Success',
        AmountToBeSent: '1.00 RWF',
        Amount: '1.00 RWF',
        Fees: '2500.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.00 RWF',
        Taxes: '125.00 RWF',
        TotalAmount: '2626.00 RWF',
        ExchangeRate: '1:1.000000',
        WalletData: {
          SourceWallet: 'RWF-01-FLORIBERT',
          Currency: 'RWF',
          Balance: '12098423.00 RWF',
        },
      },
    ],
  });
};

describe('Test send to other networks', () => {
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
            'https://celinemoneypicfiles.blob.core.windows.net/zones/ago-8.png',
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
              Phone: '+221777979343',
              PhonePrefix: '221',
              PhoneNumber: '77 797 93 43',
              NumberCountryCode: 'sn',
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
          WalletsCount: '2',
          Wallets: [
            {
              WalletNumber: 'EUR-01-AGO',
              WalletName: 'Operations',
              Currency: 'EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'SLL-01-AGO',
              WalletName: 'Rokel Demo',
              Currency: 'SLL',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/sl.png',
            },
          ],
          Favorite: 'NO',
          MySharedWalletsCount: '2',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '815 EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,094,732 RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
          ],
          BankAccountCount: '1',
          BankAccounts: [
            {
              OwnerID: 'AGO',
              CountryCode: 'RW',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
              BankCode: '130',
              AccountNumber: '00001-01301057081-63',
              Currency: 'RWF',
              CurrencyFlag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
              BankName: 'Cogebanque',
              BankLogo:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/026.png',
            },
          ],
        },
        {
          ContactType: 'INTERNAL',
          ContactPID: 'CRYCETRULY',
          FirstName: 'Cryce',
          LastName: 'Truly',
          PresenceStatus: '0',
          AccountVerified: 'NO',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/crycetruly-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/crycetrulymedium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/crycetrulysmall-0.png',
          CountryCode: 'UG',
          PhoneNumber: '758939187',
          MainPhonePrefix: '758',
          MainPhoneNumber: '939187',
          MainPhoneFlag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/ug.png',
          Phones: [
            {
              Phone: '+250785577134',
              PhonePrefix: '250',
              PhoneNumber: '785 577 134',
              NumberCountryCode: 'rw',
              PhoneFlag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: 'crycetruly@gmail.com',
          DefaultWallet: {
            WalletNumber: 'UGX-01-CRYCETRULY',
            WalletName: 'Personal',
            Currency: 'UGX',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/ug.png',
          },
          Favorite: 'NO',
          MySharedWalletsCount: '2',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '815 EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,094,732 RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
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
          PresenceStatus: '4',
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
              Balance: '815 EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,094,732 RWF',
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
          ContactPID: 'RWAJON',
          FirstName: 'Jonathan',
          LastName: 'rwabahizi',
          PresenceStatus: '4',
          AccountVerified: 'NO',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/rwajon-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/rwajonmedium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/rwajonsmall-0.png',
          CountryCode: 'RW',
          PhoneNumber: '250781146646',
          MainPhonePrefix: '250',
          MainPhoneNumber: '781 146 646',
          MainPhoneFlag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          Phones: [
            {
              Phone: '250781146646',
              PhonePrefix: '250',
              PhoneNumber: '781 146 646',
              NumberCountryCode: 'RW',
              PhoneFlag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: 'jonathanrwabahizi@gmail.com',
          DefaultWallet: {
            WalletNumber: 'RWF-02-RWAJON',
            WalletName: 'Personal',
            Currency: 'RWF',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          },
          Favorite: 'NO',
          MySharedWalletsCount: '2',
          MySharedWallets: [
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,094,732 RWF',
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
          ContactType: 'EXTERNAL',
          Favorite: 'NO',
          FirstName: 'Shadboo',
          LastName: 'Surubu',
          CountryCode: 'RW',
          PhonePrefix: '250',
          Phone: '781 475 108',
          PhoneNumber: '250781475108',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250781475108-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250781475108medium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250781475108small-0.png',
          Currency: '',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          BankAccountCount: '0',
          BankAccounts: [],
        },
        {
          ContactType: 'EXTERNAL',
          Favorite: 'NO',
          FirstName: 'Tuyisunge',
          LastName: 'Epaphrodis',
          CountryCode: 'RW',
          PhonePrefix: '250',
          Phone: '782 148 861',
          PhoneNumber: '250782148861',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250782148861-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250782148861medium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250782148861small-0.png',
          Currency: '',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          BankAccountCount: '0',
          BankAccounts: [],
        },
        {
          ContactType: 'EXTERNAL',
          Favorite: 'NO',
          FirstName: 'Ramiles',
          LastName: 'Tuyiri',
          CountryCode: 'RW',
          PhonePrefix: '250',
          Phone: '783 286 616',
          PhoneNumber: '250783286616',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250783286616-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250783286616medium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250783286616small-0.png',
          Currency: '',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          BankAccountCount: '0',
          BankAccounts: [],
        },
        {
          ContactType: 'EXTERNAL',
          Favorite: 'NO',
          FirstName: 'Fake',
          LastName: 'Contact2',
          CountryCode: 'RW',
          PhonePrefix: '250',
          Phone: '787 740 316',
          PhoneNumber: '250787740316',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250787740316-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250787740316medium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250787740316small-0.png',
          Currency: '',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          BankAccountCount: '0',
          BankAccounts: [],
        },
        {
          ContactType: 'EXTERNAL',
          Favorite: 'NO',
          FirstName: 'Boniface',
          LastName: 'Nsabimana',
          CountryCode: 'RW',
          PhonePrefix: '250',
          Phone: '788 877 391',
          PhoneNumber: '250788877391',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250788877391-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250788877391medium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/250788877391small-0.png',
          Currency: '',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          BankAccountCount: '0',
          BankAccounts: [],
        },
      ],
    });
    cy.restoreLocalStorage();
    cy.visit('/contacts?ref=to-others');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  it('should send money to a phone number', () => {
    showAmountForm();
    selectCrountryAndProvider();
    cy.get('.form-control').type('781368921');
    fillAmount(1);
    submitForm();
    cy.get('strong')
      .eq(3)
      .should('contain.text', 'Alain BURINDI MUHINDO');

    submitForm();

    cy.get('.modal-title > strong').should(
      'contain.text',
      'Tuyisunge',
    );

    cy.enterPin(pin);
    mockTransferToOther();
    submitForm();
    cy.get('.modal-title > strong').should('not.be.visible');
  });

  it('should display an error if the account number is not found', () => {
    showAmountForm();
    selectCrountryAndProvider();
    cy.get('.form-control').type('78393');
    fillAmount(1);
    submitForm(undefined, [
      {
        OK: '200',
        AccountName: '',
        TargetAccountVerified: 'NO',
        AccountCurrency: '',
        VerificationError: 'HTTP/1.1 400 Bad Request',
        Description: 'User Account not found.(25078393)',
        Result: 'Success',
        AmountToBeSent: '1.00 RWF',
        Amount: '1.00 RWF',
        Fees: '2500.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.00 RWF',
        Taxes: '125.00 RWF',
        TotalAmount: '2626.00 RWF',
        ExchangeRate: '1:1.000000',
      },
    ]);
    cy.get('.message-component > span').should(
      'contain.text',
      'Account not found',
    );
  });

  it('should display an error if the phone number is not provided', () => {
    showAmountForm();
    selectCrountryAndProvider();
    fillAmount(1);
    submitForm();
    cy.get('.message-component > span').should(
      'contain.text',
      'You must provide the phone number',
    );
  });

  it('should display an error if the account number is not provided', () => {
    showAmountForm();
    selectCrountryAndProvider(2);
    fillAmount(1);
    submitForm();
    cy.get('.message-component > span').should(
      'contain.text',
      'You must provide the account number',
    );
  });

  it('should display an error if the account no provider is selected', () => {
    showAmountForm();
    submitForm();
    cy.get('.message-component > span').should(
      'contain.text',
      'You must select a provider for this operation',
    );
  });

  it('should send money to a bank account number', () => {
    showAmountForm();
    selectCrountryAndProvider(7);
    cy.get('.new-bank-account').type('00001-01301057081-63');
    fillAmount(1);
    submitForm(undefined, [
      {
        OK: '200',
        TargetAccountVerified: 'YES',
        AccountName: 'ECOLE FRANCAISE ANTOINE DE SAINT EXUPERY',
        AccountCurrency: 'RWF',
        Description:
          'Funds are available. All clear for this transaction.',
        Result: 'Success',
        AmountToBeSent: '1.00 RWF',
        Amount: '1.00 RWF',
        Fees: '1000.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.00 RWF',
        Taxes: '50.00 RWF',
        TotalAmount: '1051.00 RWF',
        ExchangeRate: '1:1.000000',
      },
    ]);
    cy.get('strong')
      .eq(3)
      .should(
        'contain.text',
        'ECOLE FRANCAISE ANTOINE DE SAINT EXUPERY',
      );

    submitForm();

    cy.get('.modal-title > strong').should(
      'contain.text',
      'Tuyisunge',
    );

    cy.enterPin(pin);
    mockTransferToOther();
    submitForm();
    cy.get('.modal-title > strong').should('not.be.visible');
  });

  it('should send money to a selected bank account', () => {
    showAmountForm(true);
    selectCrountryAndProvider(7);
    cy.get('.select-bank-account > .dropdown').click();
    cy.get(`.active > .visible > .scrolling > :nth-child(1)`).click();
    fillAmount(1);
    submitForm(undefined, [
      {
        OK: '200',
        TargetAccountVerified: 'YES',
        AccountName: 'ECOLE FRANCAISE ANTOINE DE SAINT EXUPERY',
        AccountCurrency: 'RWF',
        Description:
          'Funds are available. All clear for this transaction.',
        Result: 'Success',
        AmountToBeSent: '1.00 RWF',
        Amount: '1.00 RWF',
        Fees: '1000.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.00 RWF',
        Taxes: '50.00 RWF',
        TotalAmount: '1051.00 RWF',
        ExchangeRate: '1:1.000000',
      },
    ]);
    cy.get('strong')
      .eq(3)
      .should(
        'contain.text',
        'ECOLE FRANCAISE ANTOINE DE SAINT EXUPERY',
      );

    submitForm();

    cy.get('.modal-title > strong').should(
      'contain.text',
      'Alberto Gerardo',
    );

    cy.enterPin(pin);
    mockTransferToOther();
    submitForm();
    cy.get('.modal-title > strong').should('not.be.visible');
  });

  it('should send money to 2umoney', () => {
    showAmountForm(true);
    cy.get('.positive').should('contain.text', 'Verify');
    selectCrountryAndProvider(1);

    cy.get('.positive').should('contain.text', 'Transfer money');

    fillAmount(5);

    submitForm(undefined, [
      {
        OK: '200',
        TargetAccountVerified: 'YES',
        AccountName: '',
        AccountCurrency: '',
        Description:
          'Funds are available. All clear for this transaction.',
        Result: 'Success',
        AmountToBeSent: '5.00 RWF',
        Amount: '5.00 RWF',
        Fees: '0.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.00 RWF',
        Taxes: '0.00 RWF',
        TotalAmount: '5.00 RWF',
        ExchangeRate: '1:1.000000',
      },
    ]);

    cy.get('.modal-title > strong').should(
      'contain.text',
      'Alberto Gerardo',
    );

    cy.enterPin(pin);
    mockTransferToOther([
      {
        OK: '200',
        Description:
          'Transfer from wallet RWF-01-FLORIBERT (2UMoney)',
        Result: 'Success',
        AmountToBeSent: '5.00 RWF',
        Amount: '5.00 RWF',
        Fees: '1000.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.00 RWF',
        Taxes: '50.01 RWF',
        TotalAmount: '1055.01 RWF',
        ExchangeRate: '1:1.000000',
        WalletData: {
          SourceWallet: 'RWF-01-FLORIBERT',
          Currency: 'RWF',
          Balance: '12094732.00 RWF',
        },
      },
    ]);
    submitForm();
    cy.get('.modal-title > strong').should('not.be.visible');
  });
});
