const pin = '2580';
const username = 'FLORIBERT';
const password = 'Password@1996';

const APIKey = 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq';
const AppID = 'kjcSNdVw2AiMdtDubTJJ1C3Mk';
const LoginName = '2UDev';

const fillAmountField = value => {
  cy.get(
    ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
  ).click();
  cy.get('.visible > .scrolling > :nth-child(1)')
    .last()
    .click();
  cy.get('.form-information > .ui > input').type(
    value || value === 0 ? `${value}` : '1',
  );
};

const submitVoucherForm = () => {
  cy.get('.success-button').click();
};

const RECENT_STORES = [
  {
    StoreID: 'ST-29-AGO',
    StoreType: 'SUGGESTED',
    StoreName: 'Diamond',
    ShortDesc: 'You can buy any thing you want',
    Description: "Buy here even things you don't know",
    OpeningHour: '00:05',
    ClosingHour: '00:15',
    Likes: '0',
    DisLikes: '0',
    RatingCount: '100',
    Rating: '7',
    AverageRating: '0.070',
    Status: '1',
    StatusCode: '341',
    StatusText: 'Active',
    Address: 'KN 5 Rd, Kigali, Rwanda',
    Category: '1',
    CategoryCode: '1371',
    CategoryText: 'Beauty Shop',
    City: 'Kigali',
    Country: 'Rwanda',
    Owner: 'Alberto Olympio',
    AccountNumber: 'RWF-01-AGO',
    Currency: 'RWF',
    CurrencyFlag:
      'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
    CountryCode: 'rw',
    Flag:
      'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
    PhoneNumber: '250783732214',
    PhonePrefix: '250',
    PhoneNumber: '783 732 214',
    OpenOnWE: '1',
    OpenOnWEText: 'YES',
    StoreBanner:
      'https://celinemoneypicfiles.blob.core.windows.net/medias/st-29-ago0.png',
    StoreLogo:
      'https://celinemoneypicfiles.blob.core.windows.net/medias/st-29-agologo0.png',
    Latitude: '-1.9517118523',
    Longitude: '30.0878101967',
  },
  {
    StoreID: 'ST-37-AGO',
    StoreType: 'SUGGESTED',
    StoreName: 'addStoreData',
    ShortDesc: 'addStoreData',
    Description: 'addStoreData',
    OpeningHour: '00:00',
    ClosingHour: '00:15',
    Likes: '0',
    DisLikes: '0',
    RatingCount: '0',
    Rating: '0',
    AverageRating: '0',
    Status: '1',
    StatusCode: '341',
    StatusText: 'Active',
    Address: '50 KN 1 Rd, Kigali, Rwanda',
    Category: '2',
    CategoryCode: '1372',
    CategoryText: 'Coffee Shop',
    City: 'Kigali',
    Country: 'Rwanda',
    Owner: 'Alberto Olympio Junior',
    AccountNumber: 'BTC-01-AGO',
    Currency: 'BTC',
    CurrencyFlag:
      'https://celinemoneypicfiles.blob.core.windows.net/icons/btc.png',
    CountryCode: 'rw',
    Flag:
      'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
    PhoneNumber: '250999',
    PhonePrefix: '250',
    PhoneNumber: '999',
    OpenOnWE: '0',
    OpenOnWEText: 'NO',
    StoreBanner:
      'https://celinemoneypicfiles.blob.core.windows.net/medias/st-37-ago0.png',
    StoreLogo:
      'https://celinemoneypicfiles.blob.core.windows.net/medias/st-37-agologo0.png',
    Latitude: '-1.9440727000',
    Longitude: '30.0618851000',
  },
  {
    StoreID: 'ST-01-LAFOUINEBABY',
    StoreType: 'SUGGESTED',
    StoreName: 'First Store',
    ShortDesc: 'Store Leading words',
    Description:
      'This the full description of the store wich provides much context about the store ',
    OpeningHour: '07:00',
    ClosingHour: '21:00',
    Likes: '0',
    DisLikes: '0',
    RatingCount: '0',
    Rating: '0',
    AverageRating: '0',
    Status: '1',
    StatusCode: '341',
    StatusText: 'Active',
    Address: 'Kigali/Rwanda',
    Category: '28',
    CategoryCode: '1398',
    CategoryText: 'Category',
    City: 'Kigali',
    Country: 'Rwanda',
    Owner: 'LaFouine Ouinny',
    AccountNumber: 'CDF-03-LAFOUINEBABY',
    Currency: 'CDF',
    CurrencyFlag:
      'https://celinemoneypicfiles.blob.core.windows.net/icons/cd.png',
    CountryCode: 'rw',
    Flag:
      'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
    PhoneNumber: '250781234567',
    PhonePrefix: '250',
    PhoneNumber: '781 234 567',
    OpenOnWE: '0',
    OpenOnWEText: 'NO',
    StoreBanner:
      'https://celinemoneypicfiles.blob.core.windows.net/medias/st-01-lafouinebaby0.png',
    StoreLogo:
      'https://celinemoneypicfiles.blob.core.windows.net/medias/st-01-lafouinebabylogo0.png',
    Latitude: '-1.9496960000',
    Longitude: '30.1039616000',
  },
];

const CONTACT_LIST = [
  {
    ContactType: 'INTERNAL',
    ContactPID: 'AGO',
    FirstName: 'Alberto Gerardo',
    LastName: 'Olympio',
    PresenceStatus: '3',
    AccountVerified: 'NO',
    PictureURL:
      'https://celinemoneypicfiles.blob.core.windows.net/zones/ago-6.png',
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
        Balance: '827 EUR',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
      },
      {
        WalletNumber: 'RWF-01-FLORIBERT',
        WalletName: 'The Greatest of all!',
        Currency: 'RWF',
        Balance: '12,106,401 RWF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
    ],
    BankAccountCount: '0',
    BankAccounts: [],
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
        Balance: '827 EUR',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
      },
      {
        WalletNumber: 'RWF-01-FLORIBERT',
        WalletName: 'The Greatest of all!',
        Currency: 'RWF',
        Balance: '12,106,401 RWF',
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
        Balance: '827 EUR',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
      },
      {
        WalletNumber: 'RWF-01-FLORIBERT',
        WalletName: 'The Greatest of all!',
        Currency: 'RWF',
        Balance: '12,106,401 RWF',
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
        Balance: '12,106,401 RWF',
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
];

const mockConfirmTransfer = (
  response = [
    {
      OK: '200',
      TargetAccountVerified: 'YES',
      AccountName: '',
      AccountCurrency: '',
      Description:
        'Funds are available. All clear for this transaction.',
      Result: 'Success',
      AmountToBeSent: '0.01 EUR',
      Amount: '12.00 RWF',
      Fees: '0.00 RWF',
      ExternalFees: '0.00 RWF',
      ExchangeFees: '0.08 RWF',
      Taxes: '0.00 RWF',
      TotalAmount: '12.09 RWF',
      ExchangeRate: '1:0.000980',
    },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    url: '/TransferConfirmation',
    status,
    response,
  }).as('transferConfirmation');
};

const mockSendVoucher = (
  response = [
    {
      OK: '200',
      Description:
        'Funds sent and the wallets are updated. Notification is sent to all parties.',
      Result: 'Success',
      AmountSent: '11984.72 RWF',
      Amount: '12.00 EUR',
      Fees: '0.00 EUR',
      ExternalFees: '0.00 EUR',
      ExchangeFees: '0.08 EUR',
      Taxes: '0.00 EUR',
      TotalAmount: '12.09 EUR',
      ExchangeRate: '1:998.726990',
      TransferNumber: '61 87 61 97 63',
      SecurityCode: '05 02',
      VoucherQRCode:
        'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=61876197630502',
      SourceWallet: {
        WalletNumber: 'EUR-01-FLORIBERT',
        Balance: '815.039672851562',
        WalletName: 'Personal',
        Currency: 'EUR',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
      },
    },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    status,
    response,
    url: '/SendVoucher',
  }).as('sendVoucher');
};
const openStoreMenu = () => {
  cy.get(
    ':nth-child(1) > :nth-child(3) > .icons > .floating > .ellipsis',
  ).click();

  cy.get(
    '.active > .menu > :nth-child(2) > .icon-image > .itemName',
  ).click();
};
const mockGetContactList = () => {
  cy.route({
    method: 'POST',
    url: '/GetAllContactList',
    status: 200,
    data: {
      APIKey,
      AppID,
      LoginName,
    },
    response: CONTACT_LIST,
  }).as('getContactList');
};
const mockGetRecentStores = () => {
  cy.route({
    method: 'POST',
    url: '/GetRecentStoreList',
    data: {
      APIKey,
      AppID,
      LoginName,
    },
    status: 200,
    response: RECENT_STORES,
  }).as('getRecentStores');
};

const mockGetWalletList = () => {
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
};

const mockSearchStore = (
  response = [
    {
      StoreID: 'ST-20-AGO',
      StoreName: 'Web store',
      ShortDesc: 'Join us',
      Description: 'THis is the full description',
      OpeningHour: '05:00',
      ClosingHour: '19:00',
      Likes: '0',
      DisLikes: '0',
      RatingCount: '100',
      Rating: '97',
      AverageRating: '0.970',
      Status: '1',
      StatusCode: '341',
      StatusText: 'Active',
      Address: 'ON cloud',
      Category: '4',
      CategoryCode: '1374',
      CategoryText: 'Culture Center',
      City: 'Kigali',
      Country: 'Rwanda',
      Owner: 'Alberto Olympio',
      AccountNumber: 'AED-50-AGO',
      Currency: 'AED',
      CurrencyFlag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/ae.png',
      CountryCode: 'rw',
      Flag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      PhoneNumber: '987654',
      OpenOnWE: '1',
      OpenOnWEText: 'YES',
      TransCount: '0',
      LastOpsDate: '2020-03-26',
      LastOpsAmount: '0.00',
      CreationDate: '2020-03-26',
      TotalTurnOver: '0.00',
      PendingVouchers: '83',
      StoreBanner:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-20-ago-0.png',
      StoreLogo:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-20-agologo-0.png',
      Latitude: '-1.9529728',
      Longitude: '30.1006848',
    },
    {
      StoreID: 'ST-25-AGO',
      StoreName: 'DHS AGO Store',
      ShortDesc: 'DHS AGO Store',
      Description: 'DHS AGO Store',
      OpeningHour: '00:00',
      ClosingHour: '00:05',
      Likes: '106',
      DisLikes: '59',
      RatingCount: '1,030',
      Rating: '269',
      AverageRating: '0.261',
      Status: '1',
      StatusCode: '341',
      StatusText: 'Active',
      Address: 'My house',
      Category: '0',
      CategoryCode: '1370',
      CategoryText: 'Bakery',
      City: 'Kigali',
      Country: 'Rwanda',
      Owner: 'Alberto Olympio',
      AccountNumber: 'GHS-03-AGO',
      Currency: 'GHS',
      CurrencyFlag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/gh.png',
      CountryCode: 'rw',
      Flag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      PhoneNumber: '',
      OpenOnWE: '1',
      OpenOnWEText: 'YES',
      TransCount: '0',
      LastOpsDate: '2020-03-26',
      LastOpsAmount: '0.00',
      CreationDate: '2020-03-26',
      TotalTurnOver: '0.00',
      PendingVouchers: '33',
      StoreBanner:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-25-ago-0.png',
      StoreLogo:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-25-agologo-0.png',
      Latitude: '-1.9529728',
      Longitude: '30.1006848',
    },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    url: '/SearchStore',
    status,
    response,
  }).as('searchStore');
};
const selectContact = () => {
  cy.get('.contact-list > :nth-child(1) > :nth-child(1)').click();
};

const selectExternalContact = () => {
  cy.get('.contact-list > :nth-child(5) > :nth-child(1)')
    .last()
    .click();
};

const fillDetailsForm = () => {
  cy.get('input[name="reference"]', { timeout: 60000 }).type(
    'Test send voucher',
  );
  cy.get('input[name="description"]', { timeout: 60000 }).type(
    'Test send voucher.',
  );
};

const submitDetailsForm = () => {
  cy.get('.success-button').click();
};

const mockGetStoreCategories = (
  response = [
    { Category: '0', CategoryName: 'Bakery' },
    { Category: '1', CategoryName: 'Beauty Shop' },
    { Category: '2', CategoryName: 'Coffee Shop' },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    url: '/GetStoreCategoryList',
    response,
    status,
  }).as('getStoreCategories');
};

describe('TEST SEND VOUCHER', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginAs(username, password, pin);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.server();
    cy.restoreLocalStorage();
    mockGetRecentStores();
    mockGetContactList();
    mockGetStoreCategories();
    mockGetWalletList();
    cy.visit('/contacts?ref=send-voucher');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should send voucher to an internal contact.', () => {
    cy.wait('@getContactList');
    cy.location('pathname').should('eq', '/contacts');
    cy.get('.contact-list .nametext').should(
      'have.length.greaterThan',
      1,
    );
    selectContact();
    cy.wait('@getRecentStores');

    cy.get('.voucher-stores__items__item__details').should(
      'have.length.greaterThan',
      1,
    );

    cy.location('pathname').should('eq', '/vouchers');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    cy.enterPin(pin);
    mockSendVoucher();
    submitDetailsForm();
    cy.wait('@transferConfirmation');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('should not send voucher with zero amount of money.', () => {
    cy.wait('@getContactList');
    selectContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField(0);
    submitVoucherForm();
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'The amount cannot be zero',
    );
  });

  it('should not send voucher with amount greater than wallet balance.', () => {
    cy.wait('@getContactList');
    selectContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField(9289192);
    mockConfirmTransfer(
      [
        {
          Error: '2022',
          Description:
            'You do not have enough money in this wallet for this operation',
          Result: 'FAILED',
        },
      ],
      401,
    );
    submitVoucherForm();
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'You do not have enough money in this wallet for this operation',
    );
  });

  it('should send voucher to an external contact', () => {
    cy.wait('@getContactList');
    selectExternalContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    cy.enterPin(pin);
    mockSendVoucher();
    submitDetailsForm();
    cy.wait('@transferConfirmation');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should not send voucher without a PIN', () => {
    cy.wait('@getContactList');
    selectExternalContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    submitDetailsForm();
    cy.get('.ss-content').should('be.visible');
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Please enter your 4 digit PIN Number',
    );
  });

  it('should not send voucher with wrong PIN', () => {
    cy.wait('@getContactList');
    selectExternalContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    cy.enterPin('1000');
    submitDetailsForm();
    cy.get('.ss-content').should('be.visible');
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Wrong PIN',
    );
  });

  it('should be able to search through stores', () => {
    cy.wait('@getContactList');
    selectExternalContact();
    mockSearchStore();
    cy.get(
      ':nth-child(1) > :nth-child(2) > .field > .ui > input',
    ).type('Kigali');
    cy.get(
      '.form-compo2 > :nth-child(2) > .field > .ui > input',
    ).type('Web store');
    cy.get(
      '.ui.form-compo > :nth-child(2) > :nth-child(1) > .ui',
    ).click();

    cy.get(
      ':nth-child(1) > .VoucherStores > .fluid > .content',
    ).should('have.length', 1);
  });

  it('should notify the user if no stores were found matching search criteria', () => {
    cy.wait('@getContactList');
    selectExternalContact();
    mockSearchStore([
      {
        OK: '200',
        Description: 'No Store found.',
        StoreFound: 'No',
        Result: 'Success',
      },
    ]);
    cy.get(
      ':nth-child(1) > :nth-child(2) > .field > .ui > input',
    ).type('xxxxxxx');
    cy.get(
      '.form-compo2 > :nth-child(2) > .field > .ui > input',
    ).type('!NoThing!');
    cy.get('.icon-form-el > .ui > .dropdown').click();
    cy.get('.ui > .visible > :nth-child(2)').click();
    cy.get(
      '.ui.form-compo > :nth-child(2) > :nth-child(1) > .ui',
    ).click();

    cy.get('.message-component > span').should(
      'contain.text',
      'The search returns no result',
    );
  });
});
