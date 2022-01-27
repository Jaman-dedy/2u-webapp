/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clearResetUserPrequalificationFx from 'redux/actions/users/clearResetPasswordPrequalification';
import {
  clearResetPasswordData,
  postResetPasswordPrequalification,
} from 'redux/actions/users/resetPasswordPrequalification';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';

export default ({
  resetPasswordData,
  setScreenNumber,
  setResetPasswordData,
}) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState();
  const { personalId, phoneNumber } = resetPasswordData;
  const {
    userLocationData,
    resetPasswordPrequalification,
  } = useSelector(({ user }) => user);

  const formatDate = value => {
    return `0${value}`.substr(-2);
  };

  const resetPasswordPrequalificationFx = () => {
    const date = resetPasswordData.DOB;

    const fullDate = `${date?.getFullYear()}-${formatDate(
      date?.getMonth() + 1,
    )}-${formatDate(date?.getDate())}`;

    const payload = {
      ...resetPasswordData,
      DOB: fullDate,
      phoneNumber,
    };
    postResetPasswordPrequalification(payload)(dispatch);
  };

  const clearError = () => {
    setErrors({});
  };
  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const personalIdError = personalId
      ? ''
      : global.translate('Please Enter your user name');

    setErrors({
      ...errors,
      personalId: personalIdError,
    });

    return !personalIdError;
  };
  const handleNext = () => {
    if (validate()) {
      // clearResetPasswordData({ success: false })(dispatch);
      resetPasswordPrequalificationFx();
    }
  };

  useEffect(() => {
    if (resetPasswordPrequalification.success) {
      setScreenNumber(2);
      clearResetPasswordData({ success: false })(dispatch);
    }
  }, [resetPasswordPrequalification]);

  useEffect(() => {
    if (!userLocationData?.CountryCode) {
      getUserLocationDataAction()(dispatch);
    }
    clearError();
  }, []);

  useEffect(() => {
    if (resetPasswordPrequalification.error)
      setErrors(resetPasswordPrequalification.error);
  }, [resetPasswordPrequalification.error]);

  useEffect(() => {
    if (phoneValue) {
      setResetPasswordData({
        ...resetPasswordData,
        phoneNumber: phoneValue,
      });
      clearError();
    }
  }, [phoneValue]);
  return {
    handleNext,
    validate,
    errors,
    clearError,
    resetPasswordPrequalification,
    userLocationData,
    clearResetUserPrequalificationFx,
    phoneValue,
    setPhoneValue,
    resetPasswordData,
  };
};
