import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyPIDAction from 'redux/actions/users/verifyPID';

export default ({ registrationData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { personalId } = registrationData;

  const { verifyPID } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const handleVerifyPID = () => {
    verifyPIDAction(personalId)(dispatch);
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
    const personalIdError = personalId
      ? ''
      : global.translate('Please provide a valid Username', 2071);

    const personalIdSpecialCharacterError =
      personalId.search(/[@!#$%^&*]/) === -1
        ? ''
        : global.translate(
            'Your personal Id should not contain special characters',
          );

    const noSpaceAllowedError =
      /\s/.test(personalId) === false
        ? ''
        : global.translate(
            'Your personal Id should not contain spaces',
          );

    setErrors({
      ...errors,
      personalId:
        personalIdError ||
        personalIdSpecialCharacterError ||
        noSpaceAllowedError,
    });
    return !(
      personalIdError ||
      personalIdSpecialCharacterError ||
      noSpaceAllowedError
    );
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    handleVerifyPID();
    return true;
  };

  useEffect(() => {
    if (verifyPID.isValid) {
      setScreenNumber(4);
    }
  }, [verifyPID]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    verifyPID,
  };
};
