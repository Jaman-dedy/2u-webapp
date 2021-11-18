const phoneCodes = [
  {
    name: 'Afghanistan',
    phoneCode: '+93',
    countryCode: 'AF',
  },
  {
    name: 'Aland Islands',
    phoneCode: '+358',
    countryCode: 'AX',
  },
  {
    name: 'Albania',
    phoneCode: '+355',
    countryCode: 'AL',
  },
  {
    name: 'Algeria',
    phoneCode: '+213',
    countryCode: 'DZ',
  },
  {
    name: 'AmericanSamoa',
    phoneCode: '+1 684',
    countryCode: 'AS',
  },
  {
    name: 'Andorra',
    phoneCode: '+376',
    countryCode: 'AD',
  },
  {
    name: 'Angola',
    phoneCode: '+244',
    countryCode: 'AO',
  },
  {
    name: 'Anguilla',
    phoneCode: '+1 264',
    countryCode: 'AI',
  },
  {
    name: 'Antarctica',
    phoneCode: '+672',
    countryCode: 'AQ',
  },
  {
    name: 'Antigua and Barbuda',
    phoneCode: '+1268',
    countryCode: 'AG',
  },
  {
    name: 'Argentina',
    phoneCode: '+54',
    countryCode: 'AR',
  },
  {
    name: 'Armenia',
    phoneCode: '+374',
    countryCode: 'AM',
  },
  {
    name: 'Aruba',
    phoneCode: '+297',
    countryCode: 'AW',
  },
  {
    name: 'Australia',
    phoneCode: '+61',
    countryCode: 'AU',
  },
  {
    name: 'Austria',
    phoneCode: '+43',
    countryCode: 'AT',
  },
  {
    name: 'Azerbaijan',
    phoneCode: '+994',
    countryCode: 'AZ',
  },
  {
    name: 'Bahamas',
    phoneCode: '+1 242',
    countryCode: 'BS',
  },
  {
    name: 'Bahrain',
    phoneCode: '+973',
    countryCode: 'BH',
  },
  {
    name: 'Bangladesh',
    phoneCode: '+880',
    countryCode: 'BD',
  },
  {
    name: 'Barbados',
    phoneCode: '+1 246',
    countryCode: 'BB',
  },
  {
    name: 'Belarus',
    phoneCode: '+375',
    countryCode: 'BY',
  },
  {
    name: 'Belgium',
    phoneCode: '+32',
    countryCode: 'BE',
  },
  {
    name: 'Belize',
    phoneCode: '+501',
    countryCode: 'BZ',
  },
  {
    name: 'Benin',
    phoneCode: '+229',
    countryCode: 'BJ',
  },
  {
    name: 'Bermuda',
    phoneCode: '+1 441',
    countryCode: 'BM',
  },
  {
    name: 'Bhutan',
    phoneCode: '+975',
    countryCode: 'BT',
  },
  {
    name: 'Bolivia, Plurinational State of',
    phoneCode: '+591',
    countryCode: 'BO',
  },
  {
    name: 'Bosnia and Herzegovina',
    phoneCode: '+387',
    countryCode: 'BA',
  },
  {
    name: 'Botswana',
    phoneCode: '+267',
    countryCode: 'BW',
  },
  {
    name: 'Brazil',
    phoneCode: '+55',
    countryCode: 'BR',
  },
  {
    name: 'British Indian Ocean Territory',
    phoneCode: '+246',
    countryCode: 'IO',
  },
  {
    name: 'Brunei Darussalam',
    phoneCode: '+673',
    countryCode: 'BN',
  },
  {
    name: 'Bulgaria',
    phoneCode: '+359',
    countryCode: 'BG',
  },
  {
    name: 'Burkina Faso',
    phoneCode: '+226',
    countryCode: 'BF',
  },
  {
    name: 'Burundi',
    phoneCode: '+257',
    countryCode: 'BI',
  },
  {
    name: 'Cambodia',
    phoneCode: '+855',
    countryCode: 'KH',
  },
  {
    name: 'Cameroon',
    phoneCode: '+237',
    countryCode: 'CM',
  },
  {
    name: 'Canada',
    phoneCode: '+1',
    countryCode: 'CA',
  },
  {
    name: 'Cape Verde',
    phoneCode: '+238',
    countryCode: 'CV',
  },
  {
    name: 'Cayman Islands',
    phoneCode: '+ 345',
    countryCode: 'KY',
  },
  {
    name: 'Central African Republic',
    phoneCode: '+236',
    countryCode: 'CF',
  },
  {
    name: 'Chad',
    phoneCode: '+235',
    countryCode: 'TD',
  },
  {
    name: 'Chile',
    phoneCode: '+56',
    countryCode: 'CL',
  },
  {
    name: 'China',
    phoneCode: '+86',
    countryCode: 'CN',
  },
  {
    name: 'Christmas Island',
    phoneCode: '+61',
    countryCode: 'CX',
  },
  {
    name: 'Cocos (Keeling) Islands',
    phoneCode: '+61',
    countryCode: 'CC',
  },
  {
    name: 'Colombia',
    phoneCode: '+57',
    countryCode: 'CO',
  },
  {
    name: 'Comoros',
    phoneCode: '+269',
    countryCode: 'KM',
  },
  {
    name: 'Congo',
    phoneCode: '+242',
    countryCode: 'CG',
  },
  {
    name: 'Congo, The Democratic Republic of the Congo',
    phoneCode: '+243',
    countryCode: 'CD',
  },
  {
    name: 'Cook Islands',
    phoneCode: '+682',
    countryCode: 'CK',
  },
  {
    name: 'Costa Rica',
    phoneCode: '+506',
    countryCode: 'CR',
  },
  {
    name: "Cote d'Ivoire",
    phoneCode: '+225',
    countryCode: 'CI',
  },
  {
    name: 'Croatia',
    phoneCode: '+385',
    countryCode: 'HR',
  },
  {
    name: 'Cuba',
    phoneCode: '+53',
    countryCode: 'CU',
  },
  {
    name: 'Cyprus',
    phoneCode: '+357',
    countryCode: 'CY',
  },
  {
    name: 'Czech Republic',
    phoneCode: '+420',
    countryCode: 'CZ',
  },
  {
    name: 'Denmark',
    phoneCode: '+45',
    countryCode: 'DK',
  },
  {
    name: 'Djibouti',
    phoneCode: '+253',
    countryCode: 'DJ',
  },
  {
    name: 'Dominica',
    phoneCode: '+1 767',
    countryCode: 'DM',
  },
  {
    name: 'Dominican Republic',
    phoneCode: '+1 849',
    countryCode: 'DO',
  },
  {
    name: 'Ecuador',
    phoneCode: '+593',
    countryCode: 'EC',
  },
  {
    name: 'Egypt',
    phoneCode: '+20',
    countryCode: 'EG',
  },
  {
    name: 'El Salvador',
    phoneCode: '+503',
    countryCode: 'SV',
  },
  {
    name: 'Equatorial Guinea',
    phoneCode: '+240',
    countryCode: 'GQ',
  },
  {
    name: 'Eritrea',
    phoneCode: '+291',
    countryCode: 'ER',
  },
  {
    name: 'Estonia',
    phoneCode: '+372',
    countryCode: 'EE',
  },
  {
    name: 'Ethiopia',
    phoneCode: '+251',
    countryCode: 'ET',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    phoneCode: '+500',
    countryCode: 'FK',
  },
  {
    name: 'Faroe Islands',
    phoneCode: '+298',
    countryCode: 'FO',
  },
  {
    name: 'Fiji',
    phoneCode: '+679',
    countryCode: 'FJ',
  },
  {
    name: 'Finland',
    phoneCode: '+358',
    countryCode: 'FI',
  },
  {
    name: 'France',
    phoneCode: '+33',
    countryCode: 'FR',
  },
  {
    name: 'French Guiana',
    phoneCode: '+594',
    countryCode: 'GF',
  },
  {
    name: 'French Polynesia',
    phoneCode: '+689',
    countryCode: 'PF',
  },
  {
    name: 'Gabon',
    phoneCode: '+241',
    countryCode: 'GA',
  },
  {
    name: 'Gambia',
    phoneCode: '+220',
    countryCode: 'GM',
  },
  {
    name: 'Georgia',
    phoneCode: '+995',
    countryCode: 'GE',
  },
  {
    name: 'Germany',
    phoneCode: '+49',
    countryCode: 'DE',
  },
  {
    name: 'Ghana',
    phoneCode: '+233',
    countryCode: 'GH',
  },
  {
    name: 'Gibraltar',
    phoneCode: '+350',
    countryCode: 'GI',
  },
  {
    name: 'Greece',
    phoneCode: '+30',
    countryCode: 'GR',
  },
  {
    name: 'Greenland',
    phoneCode: '+299',
    countryCode: 'GL',
  },
  {
    name: 'Grenada',
    phoneCode: '+1 473',
    countryCode: 'GD',
  },
  {
    name: 'Guadeloupe',
    phoneCode: '+590',
    countryCode: 'GP',
  },
  {
    name: 'Guam',
    phoneCode: '+1 671',
    countryCode: 'GU',
  },
  {
    name: 'Guatemala',
    phoneCode: '+502',
    countryCode: 'GT',
  },
  {
    name: 'Guernsey',
    phoneCode: '+44',
    countryCode: 'GG',
  },
  {
    name: 'Guinea',
    phoneCode: '+224',
    countryCode: 'GN',
  },
  {
    name: 'Guinea-Bissau',
    phoneCode: '+245',
    countryCode: 'GW',
  },
  {
    name: 'Guyana',
    phoneCode: '+595',
    countryCode: 'GY',
  },
  {
    name: 'Haiti',
    phoneCode: '+509',
    countryCode: 'HT',
  },
  {
    name: 'Holy See (Vatican City State)',
    phoneCode: '+379',
    countryCode: 'VA',
  },
  {
    name: 'Honduras',
    phoneCode: '+504',
    countryCode: 'HN',
  },
  {
    name: 'Hong Kong',
    phoneCode: '+852',
    countryCode: 'HK',
  },
  {
    name: 'Hungary',
    phoneCode: '+36',
    countryCode: 'HU',
  },
  {
    name: 'Iceland',
    phoneCode: '+354',
    countryCode: 'IS',
  },
  {
    name: 'India',
    phoneCode: '+91',
    countryCode: 'IN',
  },
  {
    name: 'Indonesia',
    phoneCode: '+62',
    countryCode: 'ID',
  },
  {
    name: 'Iran, Islamic Republic of Persian Gulf',
    phoneCode: '+98',
    countryCode: 'IR',
  },
  {
    name: 'Iraq',
    phoneCode: '+964',
    countryCode: 'IQ',
  },
  {
    name: 'Ireland',
    phoneCode: '+353',
    countryCode: 'IE',
  },
  {
    name: 'Isle of Man',
    phoneCode: '+44',
    countryCode: 'IM',
  },
  {
    name: 'Israel',
    phoneCode: '+972',
    countryCode: 'IL',
  },
  {
    name: 'Italy',
    phoneCode: '+39',
    countryCode: 'IT',
  },
  {
    name: 'Jamaica',
    phoneCode: '+1 876',
    countryCode: 'JM',
  },
  {
    name: 'Japan',
    phoneCode: '+81',
    countryCode: 'JP',
  },
  {
    name: 'Jersey',
    phoneCode: '+44',
    countryCode: 'JE',
  },
  {
    name: 'Jordan',
    phoneCode: '+962',
    countryCode: 'JO',
  },
  {
    name: 'Kazakhstan',
    phoneCode: '+7 7',
    countryCode: 'KZ',
  },
  {
    name: 'Kenya',
    phoneCode: '+254',
    countryCode: 'KE',
  },
  {
    name: 'Kiribati',
    phoneCode: '+686',
    countryCode: 'KI',
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    phoneCode: '+850',
    countryCode: 'KP',
  },
  {
    name: 'Korea, Republic of South Korea',
    phoneCode: '+82',
    countryCode: 'KR',
  },
  {
    name: 'Kuwait',
    phoneCode: '+965',
    countryCode: 'KW',
  },
  {
    name: 'Kyrgyzstan',
    phoneCode: '+996',
    countryCode: 'KG',
  },
  {
    name: 'Laos',
    phoneCode: '+856',
    countryCode: 'LA',
  },
  {
    name: 'Latvia',
    phoneCode: '+371',
    countryCode: 'LV',
  },
  {
    name: 'Lebanon',
    phoneCode: '+961',
    countryCode: 'LB',
  },
  {
    name: 'Lesotho',
    phoneCode: '+266',
    countryCode: 'LS',
  },
  {
    name: 'Liberia',
    phoneCode: '+231',
    countryCode: 'LR',
  },
  {
    name: 'Libyan Arab Jamahiriya',
    phoneCode: '+218',
    countryCode: 'LY',
  },
  {
    name: 'Liechtenstein',
    phoneCode: '+423',
    countryCode: 'LI',
  },
  {
    name: 'Lithuania',
    phoneCode: '+370',
    countryCode: 'LT',
  },
  {
    name: 'Luxembourg',
    phoneCode: '+352',
    countryCode: 'LU',
  },
  {
    name: 'Macao',
    phoneCode: '+853',
    countryCode: 'MO',
  },
  {
    name: 'Macedonia',
    phoneCode: '+389',
    countryCode: 'MK',
  },
  {
    name: 'Madagascar',
    phoneCode: '+261',
    countryCode: 'MG',
  },
  {
    name: 'Malawi',
    phoneCode: '+265',
    countryCode: 'MW',
  },
  {
    name: 'Malaysia',
    phoneCode: '+60',
    countryCode: 'MY',
  },
  {
    name: 'Maldives',
    phoneCode: '+960',
    countryCode: 'MV',
  },
  {
    name: 'Mali',
    phoneCode: '+223',
    countryCode: 'ML',
  },
  {
    name: 'Malta',
    phoneCode: '+356',
    countryCode: 'MT',
  },
  {
    name: 'Marshall Islands',
    phoneCode: '+692',
    countryCode: 'MH',
  },
  {
    name: 'Martinique',
    phoneCode: '+596',
    countryCode: 'MQ',
  },
  {
    name: 'Mauritania',
    phoneCode: '+222',
    countryCode: 'MR',
  },
  {
    name: 'Mauritius',
    phoneCode: '+230',
    countryCode: 'MU',
  },
  {
    name: 'Mayotte',
    phoneCode: '+262',
    countryCode: 'YT',
  },
  {
    name: 'Mexico',
    phoneCode: '+52',
    countryCode: 'MX',
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    phoneCode: '+691',
    countryCode: 'FM',
  },
  {
    name: 'Moldova',
    phoneCode: '+373',
    countryCode: 'MD',
  },
  {
    name: 'Monaco',
    phoneCode: '+377',
    countryCode: 'MC',
  },
  {
    name: 'Mongolia',
    phoneCode: '+976',
    countryCode: 'MN',
  },
  {
    name: 'Montenegro',
    phoneCode: '+382',
    countryCode: 'ME',
  },
  {
    name: 'Montserrat',
    phoneCode: '+1664',
    countryCode: 'MS',
  },
  {
    name: 'Morocco',
    phoneCode: '+212',
    countryCode: 'MA',
  },
  {
    name: 'Mozambique',
    phoneCode: '+258',
    countryCode: 'MZ',
  },
  {
    name: 'Myanmar',
    phoneCode: '+95',
    countryCode: 'MM',
  },
  {
    name: 'Namibia',
    phoneCode: '+264',
    countryCode: 'NA',
  },
  {
    name: 'Nauru',
    phoneCode: '+674',
    countryCode: 'NR',
  },
  {
    name: 'Nepal',
    phoneCode: '+977',
    countryCode: 'NP',
  },
  {
    name: 'Netherlands',
    phoneCode: '+31',
    countryCode: 'NL',
  },
  {
    name: 'Netherlands Antilles',
    phoneCode: '+599',
    countryCode: 'AN',
  },
  {
    name: 'New Caledonia',
    phoneCode: '+687',
    countryCode: 'NC',
  },
  {
    name: 'New Zealand',
    phoneCode: '+64',
    countryCode: 'NZ',
  },
  {
    name: 'Nicaragua',
    phoneCode: '+505',
    countryCode: 'NI',
  },
  {
    name: 'Niger',
    phoneCode: '+227',
    countryCode: 'NE',
  },
  {
    name: 'Nigeria',
    phoneCode: '+234',
    countryCode: 'NG',
  },
  {
    name: 'Niue',
    phoneCode: '+683',
    countryCode: 'NU',
  },
  {
    name: 'Norfolk Island',
    phoneCode: '+672',
    countryCode: 'NF',
  },
  {
    name: 'Northern Mariana Islands',
    phoneCode: '+1 670',
    countryCode: 'MP',
  },
  {
    name: 'Norway',
    phoneCode: '+47',
    countryCode: 'NO',
  },
  {
    name: 'Oman',
    phoneCode: '+968',
    countryCode: 'OM',
  },
  {
    name: 'Pakistan',
    phoneCode: '+92',
    countryCode: 'PK',
  },
  {
    name: 'Palau',
    phoneCode: '+680',
    countryCode: 'PW',
  },
  {
    name: 'Palestinian Territory, Occupied',
    phoneCode: '+970',
    countryCode: 'PS',
  },
  {
    name: 'Panama',
    phoneCode: '+507',
    countryCode: 'PA',
  },
  {
    name: 'Papua New Guinea',
    phoneCode: '+675',
    countryCode: 'PG',
  },
  {
    name: 'Paraguay',
    phoneCode: '+595',
    countryCode: 'PY',
  },
  {
    name: 'Peru',
    phoneCode: '+51',
    countryCode: 'PE',
  },
  {
    name: 'Philippines',
    phoneCode: '+63',
    countryCode: 'PH',
  },
  {
    name: 'Pitcairn',
    phoneCode: '+872',
    countryCode: 'PN',
  },
  {
    name: 'Poland',
    phoneCode: '+48',
    countryCode: 'PL',
  },
  {
    name: 'Portugal',
    phoneCode: '+351',
    countryCode: 'PT',
  },
  {
    name: 'Puerto Rico',
    phoneCode: '+1 939',
    countryCode: 'PR',
  },
  {
    name: 'Qatar',
    phoneCode: '+974',
    countryCode: 'QA',
  },
  {
    name: 'Romania',
    phoneCode: '+40',
    countryCode: 'RO',
  },
  {
    name: 'Russia',
    phoneCode: '+7',
    countryCode: 'RU',
  },
  {
    name: 'Rwanda',
    phoneCode: '+250',
    countryCode: 'RW',
  },
  {
    name: 'Reunion',
    phoneCode: '+262',
    countryCode: 'RE',
  },
  {
    name: 'Saint Barthelemy',
    phoneCode: '+590',
    countryCode: 'BL',
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    phoneCode: '+290',
    countryCode: 'SH',
  },
  {
    name: 'Saint Kitts and Nevis',
    phoneCode: '+1 869',
    countryCode: 'KN',
  },
  {
    name: 'Saint Lucia',
    phoneCode: '+1 758',
    countryCode: 'LC',
  },
  {
    name: 'Saint Martin',
    phoneCode: '+590',
    countryCode: 'MF',
  },
  {
    name: 'Saint Pierre and Miquelon',
    phoneCode: '+508',
    countryCode: 'PM',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    phoneCode: '+1 784',
    countryCode: 'VC',
  },
  {
    name: 'Samoa',
    phoneCode: '+685',
    countryCode: 'WS',
  },
  {
    name: 'San Marino',
    phoneCode: '+378',
    countryCode: 'SM',
  },
  {
    name: 'Sao Tome and Principe',
    phoneCode: '+239',
    countryCode: 'ST',
  },
  {
    name: 'Saudi Arabia',
    phoneCode: '+966',
    countryCode: 'SA',
  },
  {
    name: 'Senegal',
    phoneCode: '+221',
    countryCode: 'SN',
  },
  {
    name: 'Serbia',
    phoneCode: '+381',
    countryCode: 'RS',
  },
  {
    name: 'Seychelles',
    phoneCode: '+248',
    countryCode: 'SC',
  },
  {
    name: 'Sierra Leone',
    phoneCode: '+232',
    countryCode: 'SL',
  },
  {
    name: 'Singapore',
    phoneCode: '+65',
    countryCode: 'SG',
  },
  {
    name: 'Slovakia',
    phoneCode: '+421',
    countryCode: 'SK',
  },
  {
    name: 'Slovenia',
    phoneCode: '+386',
    countryCode: 'SI',
  },
  {
    name: 'Solomon Islands',
    phoneCode: '+677',
    countryCode: 'SB',
  },
  {
    name: 'Somalia',
    phoneCode: '+252',
    countryCode: 'SO',
  },
  {
    name: 'South Africa',
    phoneCode: '+27',
    countryCode: 'ZA',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    phoneCode: '+500',
    countryCode: 'GS',
  },
  {
    name: 'Spain',
    phoneCode: '+34',
    countryCode: 'ES',
  },
  {
    name: 'Sri Lanka',
    phoneCode: '+94',
    countryCode: 'LK',
  },
  {
    name: 'Sudan',
    phoneCode: '+249',
    countryCode: 'SD',
  },
  {
    name: 'Suriname',
    phoneCode: '+597',
    countryCode: 'SR',
  },
  {
    name: 'Svalbard and Jan Mayen',
    phoneCode: '+47',
    countryCode: 'SJ',
  },
  {
    name: 'Swaziland',
    phoneCode: '+268',
    countryCode: 'SZ',
  },
  {
    name: 'Sweden',
    phoneCode: '+46',
    countryCode: 'SE',
  },
  {
    name: 'Switzerland',
    phoneCode: '+41',
    countryCode: 'CH',
  },
  {
    name: 'Syrian Arab Republic',
    phoneCode: '+963',
    countryCode: 'SY',
  },
  {
    name: 'Taiwan',
    phoneCode: '+886',
    countryCode: 'TW',
  },
  {
    name: 'Tajikistan',
    phoneCode: '+992',
    countryCode: 'TJ',
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    phoneCode: '+255',
    countryCode: 'TZ',
  },
  {
    name: 'Thailand',
    phoneCode: '+66',
    countryCode: 'TH',
  },
  {
    name: 'Timor-Leste',
    phoneCode: '+670',
    countryCode: 'TL',
  },
  {
    name: 'Togo',
    phoneCode: '+228',
    countryCode: 'TG',
  },
  {
    name: 'Tokelau',
    phoneCode: '+690',
    countryCode: 'TK',
  },
  {
    name: 'Tonga',
    phoneCode: '+676',
    countryCode: 'TO',
  },
  {
    name: 'Trinidad and Tobago',
    phoneCode: '+1 868',
    countryCode: 'TT',
  },
  {
    name: 'Tunisia',
    phoneCode: '+216',
    countryCode: 'TN',
  },
  {
    name: 'Turkey',
    phoneCode: '+90',
    countryCode: 'TR',
  },
  {
    name: 'Turkmenistan',
    phoneCode: '+993',
    countryCode: 'TM',
  },
  {
    name: 'Turks and Caicos Islands',
    phoneCode: '+1 649',
    countryCode: 'TC',
  },
  {
    name: 'Tuvalu',
    phoneCode: '+688',
    countryCode: 'TV',
  },
  {
    name: 'Uganda',
    phoneCode: '+256',
    countryCode: 'UG',
  },
  {
    name: 'Ukraine',
    phoneCode: '+380',
    countryCode: 'UA',
  },
  {
    name: 'United Arab Emirates',
    phoneCode: '+971',
    countryCode: 'AE',
  },
  {
    name: 'United Kingdom',
    phoneCode: '+44',
    countryCode: 'GB',
  },
  {
    name: 'United States',
    phoneCode: '+1',
    countryCode: 'US',
  },
  {
    name: 'Uruguay',
    phoneCode: '+598',
    countryCode: 'UY',
  },
  {
    name: 'Uzbekistan',
    phoneCode: '+998',
    countryCode: 'UZ',
  },
  {
    name: 'Vanuatu',
    phoneCode: '+678',
    countryCode: 'VU',
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    phoneCode: '+58',
    countryCode: 'VE',
  },
  {
    name: 'Vietnam',
    phoneCode: '+84',
    countryCode: 'VN',
  },
  {
    name: 'Virgin Islands, British',
    phoneCode: '+1 284',
    countryCode: 'VG',
  },
  {
    name: 'Virgin Islands, U.S.',
    phoneCode: '+1 340',
    countryCode: 'VI',
  },
  {
    name: 'Wallis and Futuna',
    phoneCode: '+681',
    countryCode: 'WF',
  },
  {
    name: 'Yemen',
    phoneCode: '+967',
    countryCode: 'YE',
  },
  {
    name: 'Zambia',
    phoneCode: '+260',
    countryCode: 'ZM',
  },
  {
    name: 'Zimbabwe',
    phoneCode: '+263',
    countryCode: 'ZW',
  },
];

export default phoneCodes;
