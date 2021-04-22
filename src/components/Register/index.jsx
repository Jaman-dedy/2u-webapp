import './style.scss';

import PropTypes from 'prop-types';
import React from 'react';

import AuthWrapper from '../common/AuthWrapper/AuthWrapper';
import Congratulation from './Congratulation';
import IdentityForm from './IdentityForm';
import OTPForm from './OTPForm';
import PasswordForm from './PasswordForm';
import PIDForm from './PIDForm';
import PINForm from './PINForm';
import ReferralForm from './ReferralForm';

const Register = ({
  registrationData,
  setRegistrationData,
  handleInputChange,
  formErrors,
  screenNumber,
  setScreenNumber,
  identityData,
  verifyOtp,
  userNameData,
  passwordData,
  pinData,
  congratulationPage,
  referralScreen,
}) => {
  const renderForm = () => {
    const onClickHandler = () =>
      setScreenNumber(screenNumber - 1 || 1);
    switch (screenNumber) {
      case 1:
        return (
          <IdentityForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            identityData={identityData}
          />
        );
      case 2:
        return (
          <OTPForm
            formErrors={formErrors}
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            verifyOtp={verifyOtp}
            onClickHandler={onClickHandler}
          />
        );
      case 3:
        return (
          <PIDForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            userNameData={userNameData}
          />
        );
      case 4:
        return (
          <PasswordForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            passwordData={passwordData}
            onClickHandler={onClickHandler}
          />
        );
      case 5:
        return (
          <PINForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            pinData={pinData}
            onClickHandler={onClickHandler}
          />
        );
      case 6:
        return (
          <ReferralForm
            registrationData={registrationData}
            onInputChange={handleInputChange}
            referralScreen={referralScreen}
            onClickHandler={onClickHandler}
          />
        );
      case 7:
        return (
          <Congratulation
            registrationData={registrationData}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            congratulationPage={congratulationPage}
          />
        );
      default:
        return null;
    }
  };

  const setTitle = () => {
    switch (screenNumber) {
      case 1:
        return global.translate('Register for a free account', 1413);
      case 2:
        return global.translate('Phone verification', 15);
      case 3:
        return global.translate('Username', 1992);
      case 4:
        return global.translate('Password', 2);
      case 5:
        return global.translate('PIN Number', 537);
      case 6:
        return global.translate('Someone told you about us?', 1412);
      case 7:
        return global.translate('Congratulations', 950);

      default:
        return global.translate('Register for a free account', 1413);
    }
  };

  return screenNumber === 7 ? (
    renderForm()
  ) : (
    <AuthWrapper rightHeadlineText={global.translate(setTitle())}>
      <div className="form-content">{renderForm()}</div>
      <div className="dots">
        {Array(7)
          .fill()
          .map((value, index) => (
            <div
              key={Math.random() * 1000}
              className={`dot ${
                index + 1 === screenNumber ? 'active' : null
              }`}
            />
          ))}
      </div>
    </AuthWrapper>
  );
};

Register.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  setRegistrationData: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
  formErrors: PropTypes.instanceOf(Object),
  screenNumber: PropTypes.number,
  setScreenNumber: PropTypes.func.isRequired,
  identityData: PropTypes.instanceOf(Object).isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
  verifyOtp: PropTypes.instanceOf(Object).isRequired,
  userNameData: PropTypes.instanceOf(Object).isRequired,
  passwordData: PropTypes.instanceOf(Object).isRequired,
  pinData: PropTypes.instanceOf(Object).isRequired,
  congratulationPage: PropTypes.instanceOf(Object).isRequired,
  referralScreen: PropTypes.instanceOf(Object).isRequired,
};

Register.defaultProps = {
  formErrors: {},
  screenNumber: 1,
  handleInputChange: () => null,
};

export default Register;
