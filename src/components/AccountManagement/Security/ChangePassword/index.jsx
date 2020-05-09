import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './ChangePassword.scss';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PasswordInput from 'components/common/PasswordInput';
import PasswordForm from 'components/common/PasswordForm';
import updatePasswordAction, {
  restoreUpdatePassword,
} from 'redux/actions/userAccountManagement/updatePassword';
import useWindowSize from 'utils/useWindowSize';

const ChangePassword = ({ style, OTP, PID }) => {
  const dispatch = useDispatch();
  const { updatePassword } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const size = useWindowSize();

  const [errors, setErrors] = useState({});
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    clearError(name);
    setChangePasswordData({
      ...changePasswordData,
      [name]: value,
    });
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const {
      oldPassword,
      password,
      confirmPassword,
    } = changePasswordData;

    const oldPasswordError = oldPassword
      ? ''
      : global.translate('Please enter the old password');

    const passwordError = password
      ? ''
      : global.translate('Please enter your password');

    const confirmPasswordError = confirmPassword
      ? ''
      : global.translate('Confirm your new password', 45);

    const confirmationError =
      password === confirmPassword
        ? ''
        : global.translate('The new passwords do not match.', 325);

    setErrors({
      ...errors,
      oldPassword: oldPasswordError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      confirmation: confirmPasswordError ? '' : confirmationError,
    });
    return !(
      oldPasswordError ||
      passwordError ||
      confirmPasswordError ||
      confirmationError
    );
  };
  const handleSubmit = () => {
    if (!validate()) {
      return false;
    }
    const { oldPassword, password } = changePasswordData;
    updatePasswordAction(
      { Pwd: oldPassword, NewPwd: password, OTP, PID },
      (OTP && true) || false,
    )(dispatch);
    return true;
  };

  useEffect(() => {
    if (updatePassword.success) {
      toast.success(updatePassword.Description);
      setChangePasswordData({
        oldPassword: '',
        password: '',
        confirmPassword: '',
      });
      restoreUpdatePassword()(dispatch);
    }
    if (updatePassword.error) {
      toast.error(updatePassword.error.Description);
    }
  }, [updatePassword]);

  return (
    <div
      style={size.width > 500 ? style : {}}
      className="change-password-container
       large-padding border-1
        b-light-grey border-radius-4
        medium-v-margin xlarge-h-margin"
    >
      <Form>
        <PasswordInput
          fluid
          placeholder={global.translate('Old password')}
          name="oldPassword"
          onChange={handleInputChange}
          error={(errors && errors.oldPassword) || false}
          value={changePasswordData && changePasswordData.oldPassword}
          type="password"
        />
        <PasswordForm
          buttonText={global.translate('Change password')}
          errors={errors}
          passwordData={{
            password:
              changePasswordData && changePasswordData.password,
            confirmPassword:
              changePasswordData &&
              changePasswordData.confirmPassword,
          }}
          onInputChange={handleInputChange}
          onClick={handleSubmit}
          loading={updatePassword.loading}
        />
      </Form>
    </div>
  );
};

ChangePassword.propTypes = {
  style: PropTypes.instanceOf(Object),
};

ChangePassword.defaultProps = {
  style: {},
};

export default ChangePassword;