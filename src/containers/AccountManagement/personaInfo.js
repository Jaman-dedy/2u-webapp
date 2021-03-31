/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';
import rawCountries from 'utils/countries';
import rawNationalities from 'utils/nationalities';
import sendOTPAction from 'redux/actions/users/sendOTP';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const { saveUserData } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const { loading, success } = saveUserData;

  const dispatch = useDispatch();
  const [currentOption, setCurrentOption] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [errors, setErrors] = useState({});
  const [cropImgState, setCropImgState] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nationality, setNationality] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneValue, setPhoneValue] = useState(null);
  const [openPhoneModal, setOpenPhoneModal] = useState(false);
  const [formEmail, setFormEmail] = useState(null);
  const [personalInfoData, setPersonalInfoData] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    DateOfBirth: '',
    FatherFName: '',
    MotherFName: '',
    Nationality: '',
    CountryOfBirth: '',
    CityOfBirth: '',
    Profession: '',
    SpouseName: '',
  });

  const { sendOTP } = useSelector(({ user }) => user);

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));
  const nationalities = rawNationalities.map(
    ({ text, flag, key }) => ({
      CountryName: text,
      Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
      CountryCode: key,
    }),
  );

  const options = [
    { key: '0', text: global.translate('Unkown', 1345), value: '0' },
    { key: '1', text: global.translate('Female', 1343), value: '1' },
    { key: '2', text: global.translate('Male', 1344), value: '2' },
  ];

  useEffect(() => {
    if (success) {
      setOpenInfoModal(false);
    }
  }, [success]);
  useEffect(() => {
    if (userData.data) {
      setSelectedCountry(
        countries.find(
          ({ CountryCode }) =>
            CountryCode ===
            userData.data?.UserExtraKYC.CountryOfBirth.toLowerCase(),
        ),
      );
    }
  }, [userData]);
  useEffect(() => {
    if (userData.data) {
      setNationality(
        nationalities.find(
          ({ CountryCode }) =>
            CountryCode === userData.data?.UserExtraKYC.Nationality,
        ),
      );
    }
  }, [userData]);

  useEffect(() => {
    setPersonalInfoData({
      ...personalInfoData,
      DateOfBirth: moment(selectedDate).format('YYYY-MM-DD'),
    });
  }, [selectedDate]);
  useEffect(() => {
    if (selectedCountry) {
      setPersonalInfoData({
        ...personalInfoData,
        CountryOfBirth: selectedCountry.CountryCode,
      });
    }
  }, [selectedCountry]);

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = async ({ target: { name, value } }) => {
    clearError(name);

    return setPersonalInfoData({
      ...personalInfoData,
      [name]: value,
    });
  };
  const handleEmailInputChange = async ({
    target: { name, value },
  }) => {
    return setFormEmail({
      ...formEmail,
      [name]: value,
    });
  };

  const handleOnCountryChange = ({ target: { name, value } }) => {
    setSelectedCountry(
      countries.find(({ CountryCode }) => CountryCode === value),
    );
  };
  const handleOnNationalityChange = ({ target: { name, value } }) => {
    setNationality(
      countries.find(({ CountryCode }) => CountryCode === value),
    );
  };
  const handleSubmit = async () => {
    const data = {
      FirstName: personalInfoData?.FirstName,
      LastName: personalInfoData?.LastName,
      FatherFName: personalInfoData?.FatherFName,
      MotherFName: personalInfoData?.MotherFName,
      Nationality: personalInfoData?.Nationality,
      CountryOfBirth: personalInfoData?.CountryOfBirth,
      Profession: '01',
      SpouseName: personalInfoData?.SpouseName,
      CityOfBirth: personalInfoData?.CityOfBirth,
      DateOfBirth: personalInfoData.DateOfBirth,
      Gender: personalInfoData.Gender,
    };
    saveUserDataAction(data)(dispatch);
    return true;
  };

  useEffect(() => {
    const { data } = userData;
    if (data) {
      setPersonalInfoData({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Gender: data.Gender.Number,
        DateOfBirth: data.DateOfBirth,
        FatherFName: data.UserExtraKYC.FatherFName,
        MotherFName: data.UserExtraKYC.MotherFName,
        CountryOfBirth: data.UserExtraKYC.CountryOfBirth,
        Profession: data.UserExtraKYC.Profession,
        SpouseName: data.UserExtraKYC.SpouseName,
        CityOfBirth: data.UserExtraKYC.CityOfBirth,
        Nationality: nationality?.CountryCode,
      });
    }
  }, [userData]);
  useEffect(() => {
    if (nationality) {
      setPersonalInfoData({
        ...personalInfoData,
        Nationality: nationality.CountryCode,
      });
    }
  }, [nationality]);

  useEffect(() => {
    if (personalInfoData) {
      setCurrentOption(personalInfoData.Gender);
    }
  }, [personalInfoData]);
  useEffect(() => {
    if (
      !personalInfoData.FirstName ||
      !personalInfoData.LastName ||
      !personalInfoData.DateOfBirth ||
      !personalInfoData.Gender
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [personalInfoData]);

  const handleSendOTP = () => {
    sendOTPAction(phoneValue)(dispatch);
  };
  const handleSubmitEmail = () => {
    // sendEmailAction(formEmail.email)(dispatch);
  };

  return {
    personalInfoData,
    setPersonalInfoData,
    errors,
    handleSubmit,
    handleInputChange,
    userData,
    cropImgState,
    setCropImgState,
    currentOption,
    options,
    selectedCountry,
    countries,
    nationalities,
    setCurrentOption,
    selectedDate,
    setSelectedDate,
    loading,
    openInfoModal,
    setOpenInfoModal,
    handleOnCountryChange,
    handleOnNationalityChange,
    nationality,
    isEditing,
    disableButton,
    phoneValue,
    setPhoneValue,
    handleSendOTP,
    sendOTP,
    openPhoneModal,
    setOpenPhoneModal,
    handleEmailInputChange,
    handleSubmitEmail,
    formEmail,
  };
};
