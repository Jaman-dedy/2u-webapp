/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  RESTORE_REGISTER_USER,
} from 'constants/action-types/users/registerUser';
import { RESTORE_COUNTRY_CURRENCIES } from 'constants/action-types/users/countryCurrencies';

import apiAction from 'helpers/apiAction';
import countryCodes from 'utils/countryCodes';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/CreateFullUserAccount',
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        PhoneNumber: data.phoneNumber,
        PIN: data.pin,
        Password: data.password,
        PID: data.personalId,
        EMail: data.email || '',
        CountryCode: data.countryCode,
        ContactPID: data.ContactPID || '',
        DateOfBirth: data.DateOfBirth,
      },
      onStart: () => dispatch =>
        dispatch({
          type: REGISTER_USER_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: {
              success: data[0].Result === 'Success',
              message: data[0].Description,
              username: data[0].UserName,
              Wallets: data[0].Wallets,
            },
          });
        }
        toast.error(data[0].Description);
        return dispatch({
          type: REGISTER_USER_ERROR,
          payload: {
            error: data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: REGISTER_USER_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );

export const restoreRegisterUser = () => dispatch => {
  dispatch({
    type: RESTORE_REGISTER_USER,
  });
  dispatch({
    type: RESTORE_COUNTRY_CURRENCIES,
  });
};
