import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Register from 'components/Register';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import identityData from './identityData';
import verifyOtp from './verifyOtp';
import userNameData from './userNameData';
import passwordData from './passwordData';
import pinData from './pinData';
import congratulationPage from './congratulationPage';
import referralScreen from './referralData';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const [screenNumber, setScreenNumber] = useState(1);

  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
    personalId: '',
    password: '',
    confirmPassword: '',
    pin: '',
    confirmPin: '',
    ReferralPID: '',
    ContactPID: '',
    userAgrees: false,
    OTP: '',
  });

  const { userLocationData } = useSelector(({ user }) => user);

  const handleInputChange = ({ target: { name, value } }) => {
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!userLocationData?.CountryCode) {
      getUserLocationDataAction()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (userLocationData?.CountryCode) {
      setRegistrationData({
        ...registrationData,
        countryCode: userLocationData?.CountryCode,
      });
    }
  }, [userLocationData]);

  return (
    <Register
      registrationData={registrationData}
      setRegistrationData={setRegistrationData}
      handleInputChange={handleInputChange}
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
      identityData={identityData({
        registrationData,
        setScreenNumber,
        screenNumber,
        setRegistrationData,
      })}
      verifyOtp={verifyOtp({
        registrationData,
        setScreenNumber,
        screenNumber,
      })}
      userNameData={userNameData({
        registrationData,
        setScreenNumber,
      })}
      passwordData={passwordData({
        registrationData,
        setScreenNumber,
        screenNumber,
      })}
      pinData={pinData({
        registrationData,
        setScreenNumber,
      })}
      referralScreen={referralScreen({
        registrationData,
        setScreenNumber,
        setRegistrationData,
      })}
      congratulationPage={congratulationPage()}
    />
  );
};

export default RegisterContainer;
