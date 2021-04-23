import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { Container, Form } from 'semantic-ui-react';
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
  } = identityData;
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (
      !registrationData.firstName ||
      !registrationData.lastName ||
      !phonevalue
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [registrationData, phonevalue]);
  const [startDate, setStartDate] = useState(null);
  const dispatch = useDispatch();

  return (
    <Container>
      <div className="sub-titles">
        {global.translate('For free account')}
      </div>
      {verifyPhoneNumber.error && (
        <AlertDanger message={verifyPhoneNumber.error.message} />
      )}
      <Form className="form-information" autoComplete="off">
        <Form.Field>
          <div className="sub-titles">
            {global.translate('First name')}
          </div>
          <Form.Input
            placeholder={`${global.translate('First name', 8)} *`}
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
        <Form.Field>
          <div className="sub-titles">
            {global.translate('Last name')}
          </div>
          <Form.Input
            placeholder={`${global.translate('Last name', 9)} *`}
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
        <Form.Field>
          <div className="sub-titles">
            {global.translate('Date of birth', 442)}
          </div>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showMonthDropdown
            showYearDropdown
            placeholderText={global.translate('Select a date')}
          />
        </Form.Field>
        <br /> <br />
        <div className="button-actions">
          <button
            type="submit"
            className="btn-auth btn-primary"
            disabled={disableButton}
            onClick={() =>
              verifyPhoneNumber.loading === false && handleNext()
            }
          >
            {verifyPhoneNumber.loading && (
              <div className="loading-button" />
            )}
            {global.translate('NEXT', 10)}
          </button>
          <Link className="btn-auth btn-signup-login" to="/login">
            {global.translate('LOGIN', 190)}
          </Link>
        </div>
      </Form>
      <TermsAndConditions
        open={openTermsAndConditionModal}
        setOpen={setOpenTermsAndConditionModal}
        handleTermsAndCondition={handleTermsAndCondition}
      />
    </Container>
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
