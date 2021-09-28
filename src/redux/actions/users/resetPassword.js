import { toast } from 'react-toastify';
import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SET,
  RESET_PASSWORD_CLEAR,
} from 'constants/action-types/users/resetPassword';

import apiAction from 'helpers/apiAction';

export const postResetPassword = data => dispatch => {
  dispatch(
    apiAction({
      method: 'post',
      url: '/ResetUserPasswordAndPIN',
      data: {
        LastName: data.LastName,
        DOB: data.DOB,
        PhoneNumber: data.PhoneNumber,
        NewPIN: data.NewPIN,
        NewPassword: data.NewPassword,
        PID: data.PID,
        DOBSet: data.DOBSet,
        OTP: data.OTP,
        KYCDocSent: data.KYCDocSent,
        SecurityQuestionSet: data.SecurityQuestionSet,
        A1: data.A1,
        A2: data.A2,
        A3: data.A3,
        A4: data.A4,
        A5: data.A5,
      },
      onStart: () => dispatch =>
        dispatch({
          type: RESET_PASSWORD_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data)) {
          toast.success(data[0]?.Description);
        }
        return dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0]?.Description,
            FirstName: data[0].FirstName,
          },
        });
      },
      onFailure: error => dispatch => {
        if (Array.isArray(error)) {
          toast.error(error[0]?.Description);
        }
        return dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
};

export const setResetPasswordDataAction = data => dispatch => {
  dispatch({
    type: RESET_PASSWORD_SET,
    payload: {
      data,
    },
  });
};

export const clearResetPasswordData = () => dispatch => {
  dispatch({
    type: RESET_PASSWORD_CLEAR,
  });
};
