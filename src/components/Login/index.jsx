import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import AuthWrapper from 'components/common/AuthWrapper/AuthWrapper';
import ChangePassword from 'components/AccountManagement/Security/ChangePassword';
import LoginForm from './LoginForm';

const Login = ({
  handleChange,
  onCheckUserStatus,
  credentials,
  error,
  loadUserStatus,
  pidError,
  passwordError,
  pinError,
  clearLoginUser,
  isFormValid,
  setCredentials,
  onKeyDown,
  displayUsername,
  userLocationData,
  setPhoneValue,
  phoneValue,
  onLoginHandle,
  webUserStep,
  setWebUserStep,
  loadLoginUser,
  setOTPNumber,
  OTPNumber,
  PIN,
  setPIN,
  ussdUserStep,
  setUssdUserStep,
  loginUssdUser,
  resendOtp,
  userStatusError,
  sendOTPLoading,
}) => {
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(
    false,
  );
  const [PID, setPid] = useState(null);
  const [OTP, setOTP] = useState(null);

  const { updatePassword } = useSelector(
    state => state.userAccountManagement,
  );

  useEffect(() => {
    if (updatePassword.success) {
      setIsSettingNewPassword(false);
      setCredentials(credentials => ({
        ...credentials,
        Password: '',
      }));
    }
  }, [updatePassword, setCredentials]);

  useEffect(() => {
    if (credentials && !updatePassword.success) {
      if (credentials.PID) {
        setPid(credentials.PID);
      }
    }
  }, [credentials, updatePassword]);

  useEffect(() => {
    if (error) {
      if (error.error) {
        if (error.error[0]) {
          if (error.error[0].UserMustChangePassword === 'YES') {
            toast(global.translate(error.error[0].Description), {
              autoClose: 5000 * 6,
              type: 'error',
              toastId: 13,
            });
            setOTP(error.error[0].OTP);
            setIsSettingNewPassword(true);
          }
        }
      }
    }
  }, [error]);

  return (
    <AuthWrapper
      rightHeadlineText={
        !isSettingNewPassword
          ? global.translate('Login', 190)
          : global.translate('Change my password', 1698)
      }
    >
      <div>
        {!isSettingNewPassword ? (
          <LoginForm
            handleChange={handleChange}
            onCheckUserStatus={onCheckUserStatus}
            isLoading={loadUserStatus}
            credentials={credentials}
            error={error}
            pidError={pidError}
            pinError={pinError}
            passwordError={passwordError}
            isFormValid={isFormValid}
            clearLoginUser={clearLoginUser}
            onKeyDown={onKeyDown}
            displayUsername={displayUsername}
            userLocationData={userLocationData}
            setPhoneValue={setPhoneValue}
            phoneValue={phoneValue}
            onLoginHandle={onLoginHandle}
            setWebUserStep={setWebUserStep}
            webUserStep={webUserStep}
            loadLoginUser={loadLoginUser}
            setOTPNumber={setOTPNumber}
            OTPNumber={OTPNumber}
            PIN={PIN}
            setPIN={setPIN}
            ussdUserStep={ussdUserStep}
            setUssdUserStep={setUssdUserStep}
            loginUssdUser={loginUssdUser}
            resendOtp={resendOtp}
            userStatusError={userStatusError}
            sendOTPLoading={sendOTPLoading}
          />
        ) : (
          <div>
            <ChangePassword
              style={{ marginLeft: '-40px' }}
              OTP={OTP}
              PID={PID}
            />
          </div>
        )}
      </div>
    </AuthWrapper>
  );
};
Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  credentials: PropTypes.objectOf(PropTypes.any).isRequired,
  onCheckUserStatus: PropTypes.func.isRequired,
  clearLoginUser: PropTypes.func,
  loadUserStatus: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  pidError: PropTypes.string,
  passwordError: PropTypes.string,
  pinError: PropTypes.string,
  isFormValid: PropTypes.bool,
  setCredentials: PropTypes.func,
  onKeyDown: PropTypes.func,
};

Login.defaultProps = {
  loadUserStatus: false,
  error: null,
  pidError: null,
  passwordError: null,
  pinError: null,
  isFormValid: false,
  clearLoginUser: () => {},
  setCredentials: () => {},
  onKeyDown: () => {},
};

export default Login;
