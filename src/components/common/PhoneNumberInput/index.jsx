import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import countries from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';
import './style.scss';

const PhoneNUmberForm = ({
  onChange,
  defaultCountryCode,
  PhoneNumberCode,
  value,
  error,
  label,
}) => {
  let defaultCountry =
    defaultCountryCode &&
    countries.find(country => country.key === defaultCountryCode);

  defaultCountry =
    defaultCountry ||
    (defaultCountryCode &&
      countries.find(
        country => country.value === defaultCountryCode,
      ));

  const [country, setCountry] = useState(
    defaultCountry || { value: '', key: '', text: '', flag: '' },
  );

  useEffect(() => {
    onChange({
      target: {
        name: 'PhoneNumberCode',
        value: country ? country.value : '',
      },
    });
  }, [country]);

  useEffect(() => {
    setCountry(
      countries.find(country => country.value === defaultCountryCode),
    );
  }, [defaultCountryCode]);

  useEffect(() => {
    if (
      PhoneNumberCode &&
      PhoneNumberCode === defaultCountry &&
      defaultCountry.value
    ) {
      setCountry(defaultCountry);
    }
  }, [PhoneNumberCode, defaultCountry, defaultCountryCode]);

  useEffect(() => {
    if (defaultCountryCode && !country?.value) {
      let defaultCountry = countries.find(
        country => country.key === defaultCountryCode,
      );
      defaultCountry =
        defaultCountry ||
        countries.find(
          country => country?.value === defaultCountryCode,
        );
      setCountry(defaultCountry);
    }
  }, [defaultCountryCode, country?.value]);

  return (
    <>
      <div>{global.translate(label)}</div>
      <Form>
        <div className="user-phone-number">
          <SelectCountryCode
            country={country}
            setCountry={setCountry}
            iconClass="dropdown-flag"
          />
          <div className="phone-country-code">
            <span>{country && country.value}</span>
          </div>
          <input
            type="number"
            name="PhoneNumber"
            error={!!error || false}
            value={value}
            onChange={e => {
              onChange(e);
            }}
            className="phone-number-input"
            placeholder="e.g.: 78-000-0000"
            required
          />
        </div>
      </Form>
    </>
  );
};

PhoneNUmberForm.defaultProps = {
  defaultCountryCode: '',
  PhoneNumberCode: '',
  value: '',
  error: false,
  label: 'Phone Number',
  style: {},
};

export default PhoneNUmberForm;
