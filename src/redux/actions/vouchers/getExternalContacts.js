import {
  GET_EXTERNAL_CONTACTS_START,
  GET_EXTERNAL_CONTACTS_SUCCESS,
  GET_EXTERNAL_CONTACTS_ERROR,
} from 'constants/action-types/vouchers/externalContacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetExternalContactList',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: GET_EXTERNAL_CONTACTS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACTS_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACTS_ERROR,
          payload: error,
        });
      },
    }),
  );
