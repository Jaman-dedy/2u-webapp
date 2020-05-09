import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input, Label } from 'semantic-ui-react';
import './style.scss';
import countries from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';

const PhoneNUmberForm = ({
  onInputChange,
  screenTwo,
  registrationData,
}) => {
  const {
    errors,
    handleNext,
    clearError,
    verifyPhoneNumber,
    userLocationData,
  } = screenTwo;

  const defaultCountry = registrationData.countryCode
    ? countries.find(
        country => country.value === registrationData.countryCode,
      )
    : countries.find(
        country => country.flag === userLocationData.CountryCode,
      );

  const [country, setCountry] = useState(defaultCountry);

  useEffect(() => {
    onInputChange({
      target: {
        name: 'countryCode',
        value: country && country.value,
      },
    });
  }, [country]);

  return (
    <Container>
      <Form className="user-phone-number">
        <span>{global.translate('Phone number')}</span>
        <Form.Field>
          <span className="country-code">
            {country && country.value}
          </span>
          <Input
            type="number"
            name="phoneNumber"
            error={!!errors.phoneNumber || false}
            value={registrationData.phoneNumber}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
            className="phone-number-input"
            placeholder="555555555"
            required
            label={
              <SelectCountryCode
                country={country}
                setCountry={setCountry}
                iconClass="inline-block small-h-margin dropdown-flag"
              />
            }
            labelPosition="left"
          />
        </Form.Field>
        {verifyPhoneNumber.error && (
          <Form.Field style={{ marginTop: '7px' }}>
            <Label prompt>
              {global.translate(verifyPhoneNumber.error.message, 57)}
            </Label>
          </Form.Field>
        )}
        <Form.Button
          type="button"
          primary
          loading={verifyPhoneNumber.loading}
          onClick={() => !verifyPhoneNumber.loading && handleNext()}
        >
          {global.translate('Verify')}
        </Form.Button>
        {global.translate('Already registered?')}?{' '}
        <Link to="/login">{global.translate('Login')}</Link>
      </Form>
    </Container>
  );
};

PhoneNUmberForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
};

export default PhoneNUmberForm;