import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Form, Loader } from 'semantic-ui-react';

import PasswordInput from 'components/common/PasswordInput';
import './style.scss';
import checkPassword from 'utils/checkPassword';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import PINInput from 'components/common/PINInput';
import AlertDanger from 'components/common/Alert/Danger';

const PasswordForm = ({
  resetPasswordData,
  onInputChange,
  screenThree,
  setPIN,
  PIN,
  resetPasswordRd,
  verifyOTP,
}) => {
  const history = useHistory();

  const { password } = resetPasswordData;
  const {
    clearError,
    handleNext,
    errors,
    resendOTP,
    resetPasswordPrequalification,
  } = screenThree;
  const { loading, error } = resetPasswordRd;
  return (
    <Container>
      {error?.Description ||
        (errors?.Description && (
          <AlertDanger
            message={global.translate(
              error?.Description || errors?.Description,
            )}
          />
        ))}
      <div className="auth-sub-text">
        {global.translate(
          'Your new password must be different from previously used passwords',
        )}
      </div>

      <Form className="form-password-reset">
        <span>{global.translate('New password')}</span>
        <Form.Field>
          <PasswordInput
            placeholder={global.translate('Password')}
            name="password"
            type="password"
            autocomplete="new-password"
            error={errors.password || false}
            value={password}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
          />
        </Form.Field>

        <div className="checklist">
          <div>
            {global.translate('The password must be at least')}{' '}
            <span
              className={
                checkPassword(password).number ? '' : 'invalid'
              }
            >
              {global.translate('8 characters long,')}
            </span>
            , {global.translate('containing an')}{' '}
            <span
              className={
                checkPassword(password).uppercase ? '' : 'invalid'
              }
            >
              {global.translate('uppercase')}
            </span>
            , {global.translate('a')}&nbsp;
            <span
              className={
                checkPassword(password).lowercase ? '' : 'invalid'
              }
            >
              {global.translate('lowercase,')}
            </span>{' '}
            <span
              className={
                checkPassword(password).digit ? '' : 'invalid'
              }
            >
              {global.translate('digit')}
            </span>{' '}
            {global.translate('and at least')}{' '}
            <span
              className={
                checkPassword(password).specialCharacter
                  ? ''
                  : 'invalid'
              }
            >
              {global.translate('a special character(!@#$%^&*)')}
            </span>
          </div>
        </div>
      </Form>
      <div className="otp-pin-input">
        <span>OTP</span>
        <PINInput
          value={PIN}
          onChange={setPIN}
          numberOfInputs={6}
          type="text"
        />
        <div className="resendOTP">
          {(((resetPasswordPrequalification &&
            resetPasswordPrequalification.loading) ||
            verifyOTP?.loading) && (
              <div className="Loader">
                <Loader active inline />
              </div>
            )) || (
              <div>
                <span>
                  {global.translate('Haven’t receive it yet')}
                </span>
                <button
                  type="button"
                  className="resendBtn"
                  onClick={() => resendOTP(true)}
                >
                  {global.translate('Resend a new code')}
                </button>
              </div>
            )}
        </div>
      </div>

      <br />
      <button
        type="button"
        className="btn-auth btn-primary"
        disabled={
          loading ||
          (resetPasswordPrequalification &&
            resetPasswordPrequalification.loading) ||
          verifyOTP.loading ||
          verifyOTP.error ||
          PIN.length < 6 ||
          !checkPassword(password).number ||
          !checkPassword(password).digit ||
          !checkPassword(password).uppercase ||
          !checkPassword(password).lowercase ||
          !checkPassword(password).specialCharacter
        }
        onClick={handleNext}
      >
        {(loading && (
          <Loader active inverted inline size="small" />
        )) ||
          global.translate('CHANGE PASSWORD')}
      </button>
      {!isAppDisplayedInWebView() && (
        <>
          <div>
            <div>{global.translate('Want to login?')} </div>
            <button
              type="button"
              className="login-link"
              onClick={() => history.push('/login')}
            >
              {global.translate('login').toUpperCase()}
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

PasswordForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  resetPasswordRd: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenThree: PropTypes.instanceOf(Object).isRequired,
  setPIN: PropTypes.func.isRequired,
  verifyOTP: PropTypes.func,
  PIN: PropTypes.string,
};

PasswordForm.defaultProps = {
  onInputChange: () => null,
  verifyOTP: () => null,
  PIN: '',
};

export default PasswordForm;
