import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { Grid, Form } from 'semantic-ui-react';
import ReactFlagsSelect from 'react-flags-select';
import DatePicker from 'react-datepicker';
import ReactFlagsSelect from 'react-flags-select';
import AlertDanger from 'components/common/Alert/Danger';
import { clearPhoneNumber } from 'redux/actions/users/verifyPhoneNumber';
import TermsAndConditions from '../TermAndConditions';

import './style.scss';
import 'assets/styles/spinner.scss';

const IdentityForm = ({
  registrationData,
  onInputChange,
  identityData,
}) => {
  const {
    handleNext,
    clearError,
    errors,
    verifyPhoneNumber,
    phonevalue,
    setPhonevalue,
    userLocationData,
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
    handleTermsAndCondition,
    startDate,
    setStartDate,
    setNationalityCountry,
    nationalityCountry,
  } = identityData;
  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !registrationData.firstName ||
      !registrationData.lastName ||
      !phonevalue ||
      !startDate ||
      errors.phoneNumber
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [registrationData, phonevalue, startDate, errors]);

  const date = new Date();
  const minDate = date.setFullYear(date.getFullYear() - 100);

  return (
    <div>
      {verifyPhoneNumber.error && (
        <AlertDanger message={verifyPhoneNumber.error.message} />
      )}
      <Form autoComplete="off">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column mobile={16} computer={8}>
              <Form.Field>
                <div className="sub-titles">
                  {global.translate('First name')}
                </div>
                <Form.Input
                  placeholder={`${global.translate('First name')} *`}
                  name="firstName"
                  type="text"
                  required
                  value={registrationData.firstName}
                  onChange={e => {
                    onInputChange(e);
                    clearError(e);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <Form.Field>
                <div className="sub-titles">
                  {global.translate('Last name')}
                </div>
                <Form.Input
                  placeholder={`${global.translate('Last name')} *`}
                  name="lastName"
                  type="text"
                  required
                  value={registrationData.lastName}
                  onChange={e => {
                    onInputChange(e);
                    clearError(e);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <div className="clear" />
            <Grid.Column mobile={16} computer={8}>
              <Form.Field>
                <div className="sub-titles">
                  {global.translate('Phone number')}
                </div>
                <div className="user-phone-number">
                  <PhoneInput
                    enableSearch
                    country={userLocationData?.CountryCode}
                    value={phonevalue}
                    onChange={phone => {
                      setPhonevalue(phone);
                      clearPhoneNumber()(dispatch);
                    }}
                  />
                </div>
              </Form.Field>
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <Form.Field className="field-email">
                <div className="sub-titles">
                  {global.translate('Email')}
                </div>
                <Form.Input
                  placeholder={global.translate('E-mail')}
                  name="email"
                  type="email"
                  value={registrationData.email}
                  onChange={e => {
                    onInputChange(e);
                    clearError(e);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <div className="clear" />
            <Grid.Column mobile={16} computer={8}>
              <div className="sub-titles">
                {global.translate('Date of birth')}
              </div>
              <DatePicker
                className="wrap-date-picker"
                selected={
                  startDate ||
                  new Date().setFullYear(
                    new Date().getFullYear() - 18,
                  )
                }
                onChange={date => setStartDate(date)}
                showMonthDropdown
                showYearDropdown
                maxDate={new Date().setFullYear(
                  new Date().getFullYear() - 13,
                )}
                minDate={minDate}
                placeholderText={global.translate('Select a date')}
                dropdownMode="select"
              />
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <div className="sub-titles">
                {global.translate('Select your country')}
              </div>
              <ReactFlagsSelect
                selected={nationalityCountry?.toUpperCase()}
                onSelect={code => setNationalityCountry(code)}
                searchable
                placeholder={global.translate('Select your country')}
                className="select-my-country"
              />
            </Grid.Column>
            <div className="clear" />
            <Grid.Column mobile={16} computer={16}>
              <div>
                <button
                  type="submit"
                  className="btn-auth btn-login btn-secondary"
                  disabled={disableButton}
                  onClick={() =>
                    verifyPhoneNumber.loading === false &&
                    handleNext()
                  }
                >
                  {verifyPhoneNumber.loading && (
                    <div className="loading-button" />
                  )}
                  {global.translate('NEXT')}
                </button>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} computer={16}>
              <div className="btn-signup-login">
                {global.translate('Already have an account?')}
                <Link to="/login" className="btn-auth">
                  {global.translate('LOGIN').toUpperCase()}
                </Link>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <TermsAndConditions
        open={openTermsAndConditionModal}
        setOpen={setOpenTermsAndConditionModal}
        handleTermsAndCondition={handleTermsAndCondition}
      />
    </div>
  );
};

IdentityForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  identityData: PropTypes.instanceOf(Object).isRequired,
};

IdentityForm.defaultProps = {
  onInputChange: () => null,
};

export default IdentityForm;
