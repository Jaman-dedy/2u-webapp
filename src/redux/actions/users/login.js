import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAR_LOGIN_ERRORS,
  UPDATE_AUTH_DATA,
} from 'constants/action-types/users/login';
import apiAction from 'helpers/apiAction';
import changeLanguage from './changeLanguage';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/CheckUserCredential',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: LOGIN_START,
        }),
      onSuccess: result => dispatch => {
        const res = Array.isArray(result)
          ? result[0] || {}
          : result || {};
        if (res.Result !== 'FAILED') {
          if (localStorage.languageToSave) {
            changeLanguage(
              localStorage.languageToSave,
              true,
            )(dispatch);
          }

          return dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              data: res,
              OTP: data?.OTP,
            },
          });
        }
        return dispatch({
          type: LOGIN_ERROR,
          payload: {
            error: res,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
export const clearLoginUser = () => dispatch =>
  dispatch({
    type: CLEAR_LOGIN_ERRORS,
  });

export const updateAuthData = data => dispatch => {
  dispatch({
    type: UPDATE_AUTH_DATA,
    payload: data,
  });
};
