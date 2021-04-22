/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyOTPAction from 'redux/actions/users/verifyOTP';

export default ({
  registrationData,
  setScreenNumber,
  screenNumber,
}) => {
  const dispatch = useDispatch();
  const { verifyOTP } = useSelector(({ user }) => user);

  const [errors, setErrors] = useState({});
  const { countryCode, phoneNumber, OTP } = registrationData;

  const handleVerifyOTP = () => {
    verifyOTPAction(phoneNumber, OTP)(dispatch);
  };

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const otpError = OTP
      ? ''
      : global.translate(
          'Please enter the verification code sent via SMS',
          2088,
        );

    setErrors({ ...errors, OTP: otpError });

    return !otpError;
  };
  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    handleVerifyOTP();
    return true;
  };

  useEffect(() => {
    if (verifyOTP.isValid) {
      setScreenNumber(3);
    }
  }, [verifyOTP]);

  return {
    setScreenNumber,
    screenNumber,
    handleNext,
    validate,
    errors,
    clearError,
    verifyOTP,
  };
};