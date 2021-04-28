/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import setPhonePrimary from 'redux/actions/users/setPrimaryPhone';
import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';
import sendOTPAction from 'redux/actions/users/sendOTP';
import getUserProfessionAction from 'redux/actions/users/getProfession';
import isFileImage from 'utils/isFileImage';
import uploadDocs from 'helpers/uploadDocs';
import updateUserPhoneListAction from 'redux/actions/userAccountManagement/updateUserPhoneList';
import updateUserEmailListAction from 'redux/actions/userAccountManagement/updateUserEmailList';

import setPrimaryEmail from 'redux/actions/users/setPrimaryEmail';
import sendEmailAction from 'redux/actions/sendEmail';

export default () => {
  const { userData, primaryPhone, primaryEmail } = useSelector(
    ({ user }) => user,
  );
  const {
    saveUserData,
    updateUserPhoneList,
    updateUserEmailList,
  } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const { loading, success } = saveUserData;
  const { data } = userData;
  const { loading: settingPrimaryPhone } = primaryPhone;
  const { loading: settingPrimaryEmail } = primaryEmail;

  const dispatch = useDispatch();
  const [currentOption, setCurrentOption] = useState(null);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [errors, setErrors] = useState({});
  const [cropImgState, setCropImgState] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [nationality, setNationality] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneValue, setPhoneValue] = useState(null);
  const [openPhoneModal, setOpenPhoneModal] = useState(false);
  const [formEmail, setFormEmail] = useState(null);
  const [OTP, setOTP] = useState('');
  const [professionOptions, setProfessionOptions] = useState(null);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [userIdUrlData, setUserIdUrlData] = useState(null);
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

  const {
    sendOTP,
    professionList,
    language: { preferred },
  } = useSelector(({ user }) => user);
  const { sendEmail } = useSelector(({ email }) => email);

  const [nationalityCountry, setNationalityCountry] = useState('');
  const [bornCountry, setBornCountry] = useState('');

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
    setPersonalInfoData({
      ...personalInfoData,
      DateOfBirth: moment(selectedDate).format('YYYY-MM-DD'),
    });
  }, [selectedDate]);

  useEffect(() => {
    if (!professionList.data) {
      getUserProfessionAction({ Language: preferred })(dispatch);
    }
  }, []);

  useEffect(() => {
    if (professionList.data) {
      setProfessionOptions(
        professionList.data.map(profession => {
          return {
            key: profession.ProfessionNumber,
            text: profession.ProfessionName,
            value: profession.ProfessionNumber,
          };
        }),
      );
    }
  }, [professionList]);

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
  const handleSubmit = async () => {
    const data = {
      FirstName: personalInfoData?.FirstName,
      LastName: personalInfoData?.LastName,
      FatherFName: personalInfoData?.FatherFName,
      MotherFName: personalInfoData?.MotherFName,
      Nationality: nationalityCountry?.toLowerCase(),
      CountryOfBirth: bornCountry.toLowerCase(),
      Profession: currentOption.toString(),
      SpouseName: personalInfoData?.SpouseName,
      CityOfBirth: personalInfoData?.CityOfBirth,
      DateOfBirth: personalInfoData.DateOfBirth,
      Gender: personalInfoData.Gender,
    };
    saveUserDataAction(data)(dispatch);
    return true;
  };

  useEffect(() => {
    if (data) {
      setPersonalInfoData({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Gender: data.Gender.Number,
        DateOfBirth: data.DateOfBirth,
        FatherFName: data.UserExtraKYC?.FatherFName,
        MotherFName: data.UserExtraKYC?.MotherFName,
        Profession: data.UserExtraKYC?.Profession,
        SpouseName: data.UserExtraKYC?.SpouseName,
        CityOfBirth: data.UserExtraKYC?.CityOfBirth,
        Nationality: nationality?.toLowerCase(),
      });
      setBornCountry(data.UserExtraKYC?.CountryOfBirth);
      setNationalityCountry(data.UserExtraKYC?.Nationality);
      setSelectedDate(new Date(data.DateOfBirth));
    }
  }, [data]);
  useEffect(() => {
    if (nationalityCountry) {
      setPersonalInfoData({
        ...personalInfoData,
        Nationality: nationalityCountry.toLowerCase(),
      });
    }
  }, [nationalityCountry]);

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
  useEffect(() => {
    if (sendEmail.data) {
      setOpenEmailModal(false);
    }
  }, [sendEmail]);
  const handleSubmitEmail = () => {
    const EmailData = {
      PID: data?.PID,
      Email: formEmail.email,
      Category: '1',
    };
    sendEmailAction(EmailData)(dispatch);
  };

  const handleSetPrimary = phone => {
    setPhonePrimary({ PhoneNumber: phone })(dispatch);
  };
  const handleSetEmailPrimary = email => {
    setPrimaryEmail({ Email: email })(dispatch);
  };

  const onImageChange = ({ target }) => {
    const { name, files, value } = target;

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        uploadDocs(name, file, data, '/UploadUserPicture').then(
          res => {
            setUserIdUrlData(res);
          },
        );
      } else
        toast.error(
          global.translate('Please, choose an image format', 2056),
        );
    }
  };
  useEffect(() => {
    if (OTP.length === 6) {
      const data = {
        OTP: OTP,
        PhoneNumber: phoneValue,
        Category: '1',
        CountryCode: 'rw',
        Phones: [],
      };
      updateUserPhoneListAction(data)(dispatch);
    }
  }, [OTP]);

  useEffect(() => {
    if (OTP.length === 6) {
      const data = {
        OTP: OTP,
        Category: '1',
        CountryCode: 'rw',
        Emails: [],
      };
      updateUserEmailListAction(data)(dispatch);
    }
  }, [OTP]);

  const handleDelete = (e, phone) => {
    e.stopPropagation();
    const newPhoneList = data?.Phones?.filter(
      phoneObject =>
        phoneObject.Phone.toString() !== phone.toString(),
    );
    updateUserPhoneListAction({ Phones: [...newPhoneList] })(
      dispatch,
    );
  };

  const handleDeleteEmail = (e, email) => {
    e.stopPropagation();
    const newEmailList = data?.Emails?.filter(
      phoneObject =>
        phoneObject.Email.toString() !== email.toString(),
    );
    updateUserEmailListAction({ Emails: [...newEmailList] })(
      dispatch,
    );
  };
  useEffect(() => {
    if (userData?.Emails) {
      updateUserEmailListAction({ Emails: [] })(dispatch);
    }
  }, [userData?.Emails]);

  return {
    personalInfoData,
    setPersonalInfoData,
    errors,
    handleSubmit,
    handleInputChange,
    cropImgState,
    setCropImgState,
    currentOption,
    options,
    setCurrentOption,
    selectedDate,
    setSelectedDate,
    loading,
    openInfoModal,
    setOpenInfoModal,
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
    professionOptions,
    handleSetPrimary,
    onImageChange,
    settingPrimaryPhone,
    OTP,
    handleSetEmailPrimary,
    settingPrimaryEmail,
    sendEmail,
    setOpenEmailModal,
    openEmailModal,
    updateUserPhoneList,
    updateUserEmailList,
    setOTP,
    handleDelete,
    handleDeleteEmail,
    nationalityCountry,
    setNationalityCountry,
    setBornCountry,
    bornCountry,
  };
};
