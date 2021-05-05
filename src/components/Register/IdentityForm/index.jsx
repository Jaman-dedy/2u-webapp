import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { Container, Grid, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
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
    verifyPhoneNumber,
    phonevalue,
    setPhonevalue,
    userLocationData,
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
    handleTermsAndCondition,
    startDate,
    setStartDate,
    endDate,
  } = identityData;
  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !registrationData.firstName ||
      !registrationData.lastName ||
      !phonevalue ||
      !startDate
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [registrationData, phonevalue, startDate]);

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
                  placeholder={`${global.translate(
                    'First name',
                    8,
                  )} *`}
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
                  placeholder={`${global.translate(
                    'Last name',
                    9,
                  )} *`}
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
                  placeholder={global.translate('E-mail', 28)}
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
                {global.translate('Date of birth', 442)}
              </div>
              <DatePicker
                className="wrap-date-picker"
                selected={startDate}
                onChange={date => setStartDate(date)}
                showMonthDropdown
                showYearDropdown
                maxDate={endDate}
                placeholderText={global.translate('Select a date*')}
              />
            </Grid.Column>
            <div className="clear" />
            <Grid.Column mobile={16} computer={10}>
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
                  {global.translate('NEXT', 10)}
                </button>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} computer={6}>
              <div className="btn-signup-login">
                <Link to="/login" className="btn-auth">
                  {global.translate('LOGIN', 190).toUpperCase()}
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
