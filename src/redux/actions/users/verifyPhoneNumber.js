import { toast } from 'react-toastify';

import {
  VERIFY_PHONE_START,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_ERROR,
} from 'constants/action-types/users/verifyPhoneNumber';
import apiAction from 'helpers/apiAction';

export default phoneNumber => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/PhoneNumberExists',
      data: {
        PhoneNumber: phoneNumber,
      },
      onStart: () => dispatch =>
        dispatch({
          type: VERIFY_PHONE_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].PhoneNumberFound === 'YES') {
          return dispatch({
            type: VERIFY_PHONE_ERROR,
            payload: {
              isValid: false,
              message: data[0].Description,
            },
          });
        }
        return dispatch({
          type: VERIFY_PHONE_SUCCESS,
          payload: {
            isValid: data[0].PhoneNumberFound === 'NO',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error);
        return dispatch({
          type: VERIFY_PHONE_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
