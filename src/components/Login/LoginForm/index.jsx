/* eslint-disable react/no-unescaped-entities */

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Grid } from 'semantic-ui-react';

import AlertDanger from 'components/common/Alert/Danger';
import PhoneInput from 'react-phone-input-2';
import './style.scss';
import 'assets/styles/spinner.scss';
import PasswordForm from './PasswordForm';
import UssdUserForm from './UssdUserForm';

const LoginForm = ({
  handleChange,
  credentials,
  onCheckUserStatus,
  isLoading,
  error,
  pidError,
  passwordError,
  onKeyDown,
  displayUsername,
  userLocationData,
  setPhoneValue,
  phoneValue,
  isFormValid,
  onLoginHandle,
  webUserStep,
  setWebUserStep,
  loadLoginUser,
  verifyOTP,
  handleKeyDown,
  resendOtp,
  setOTPNumber,
  OTPNumber,
  PIN,
  setPIN,
  ussdUserStep,
  setUssdUserStep,
  loginUssdUser,
  userStatusError,
  sendOTPLoading,
}) => {
  const [showOption, setShowOptions] = useState(false);
  const [errors, setErrors] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const {
    currentUser: { authData },
  } = useSelector(({ user }) => user);

  useEffect(() => {
    if (authData?.UserShouldSetPassword === 'NO') {
      setWebUserStep(true);
    } else if (authData?.UserShouldSetPassword === 'YES') {
      setUssdUserStep(true);
    } else {
      setWebUserStep(false);
      setUssdUserStep(false);
    }
  }, [authData]);

  useEffect(() => {
    if (error) {
      setErrors(
        Array.isArray(error?.error)
          ? error?.error[0] || {}
          : error?.error || {},
      );
    }
  }, [error]);
  useEffect(() => {
    if (error) {
      setShowOptions(true);
    }
  }, [error]);

  const disableButtonFunc = () => {
    if (disableButton) {
      return true;
    }
    if (isLoading || !isFormValid || !credentials?.PID) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!credentials?.PID) {
      setWebUserStep(false);
      setUssdUserStep(false);
    }
    if (!phoneValue) {
      setWebUserStep(false);
      setUssdUserStep(false);
    }
  }, [credentials.PID, phoneValue]);

  return (
    <>
      {(error || userStatusError) && (
        <AlertDanger
          message={
            errors?.Description || userStatusError?.Description
          }
        />
      )}
      <Form
        autoComplete="off"
        className="login-form-ui"
        onKeyDown={onKeyDown}
      >
        <Grid columns={1}>
          <Grid.Row>
            {(webUserStep || !ussdUserStep) && (
              <Grid.Column>
                <div className="sub-titles">
                  {`${global.translate(
                    'Username',
                  )} ${global.translate('or')} ${global.translate(
                    'Phone number',
                  )} `}
                </div>
                {displayUsername ? (
                  <Form.Field>
                    <Form.Input
                      error={
                        pidError && {
                          content: global.translate(
                            pidError.toString(),
                          ),
                          pointing: 'above',
                        }
                      }
                      placeholder={global.translate('Username*')}
                      name="PID"
                      value={
                        (credentials.PID && credentials.PID) || ''
                      }
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Field>
                ) : (
                  <Form.Field>
                    <div className="user-phone-number">
                      <PhoneInput
                        enableSearch
                        country={userLocationData?.CountryCode}
                        value={phoneValue}
                        onChange={phone => {
                          setPhoneValue(phone);
                        }}
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true,
                        }}
                      />
                    </div>
                  </Form.Field>
                )}
              </Grid.Column>
            )}

            {webUserStep && (
              <PasswordForm
                passwordError={passwordError}
                handleChange={handleChange}
                credentials={credentials}
              />
            )}
            {ussdUserStep && (
              <UssdUserForm
                verifyOTP={verifyOTP}
                handleKeyDown={handleKeyDown}
                setOTPNumber={setOTPNumber}
                OTPNumber={OTPNumber}
                PIN={PIN}
                setPIN={setPIN}
                setUssdUserStep={setUssdUserStep}
                loadLoginUser={loadLoginUser}
                resendOtp={resendOtp}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
                sendOTPLoading={sendOTPLoading}
              />
            )}
          </Grid.Row>
        </Grid>
        <button
          loading={isLoading || loadLoginUser}
          disabled={disableButtonFunc()}
          onClick={() => {
            if (webUserStep) {
              onLoginHandle();
            }
            if (ussdUserStep) {
              loginUssdUser();
            } else {
              onCheckUserStatus();
            }
          }}
          type="submit"
          className="btn-auth btn-login"
        >
          {!ussdUserStep && !webUserStep
            ? global.translate('Next', 4).toUpperCase()
            : global.translate('Connect', 4).toUpperCase()}
          {(isLoading || loadLoginUser) && (
            <div className="loading-button" />
          )}
        </button>

        {showOption && !ussdUserStep && (
          <>
            <div className="from_login_link">
              {global.translate('Forgot your Password?')}{' '}
              <Link to="/reset-password">
                {global.translate('Click here', 1705)}
              </Link>
            </div>
            <div className="from_login_link">
              {global.translate('Forgot your Username?')}{' '}
              <Link to="/remind-username">
                {global.translate('Click here', 1705)}
              </Link>
            </div>
          </>
        )}
        {!ussdUserStep && (
          <div className="btn-signup-login">
            <div>
              {global.translate('Not yet registered?', 1201)}{' '}
            </div>
            <Link to="/register" className="btn-auth ">
              {global.translate('Sign up', 1202).toUpperCase()}
            </Link>
          </div>
        )}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  credentials: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  pidError: PropTypes.string,
  passwordError: PropTypes.string,
  clearLoginUser: PropTypes.func,
  onKeyDown: PropTypes.func,
};

LoginForm.defaultProps = {
  isLoading: false,
  error: null,
  pidError: null,
  passwordError: null,
  clearLoginUser: () => {},
  onKeyDown: () => {},
};

export default LoginForm;
