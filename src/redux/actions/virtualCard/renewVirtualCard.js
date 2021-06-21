import { toast } from 'react-toastify';
import {
  RENEW_VIRTUAL_CARD_START,
  RENEW_VIRTUAL_CARD_SUCCESS,
  RENEW_VIRTUAL_CARD_ERROR,
  CLEAR_RENEW_VIRTUAL_CARD_STORE,
} from 'constants/action-types/virtual-card/renewVirtualCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/RenewVirtualCard',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: RENEW_VIRTUAL_CARD_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] : data;
        if (res.Result === 'Success') {
          toast.success(res.Description);
          return dispatch({
            type: RENEW_VIRTUAL_CARD_SUCCESS,
            payload: {
              ...res,
              success: res.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: RENEW_VIRTUAL_CARD_ERROR,
          payload: {
            ...res,
          },
        });
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error) ? error[0] : error;
        toast.error(err?.Description);
        return dispatch({
          type: RENEW_VIRTUAL_CARD_ERROR,
          payload: {
            ...err,
          },
        });
      },
    }),
  );

export const clearRenewCardStatus = () => dispatch => {
  return dispatch({
    type: CLEAR_RENEW_VIRTUAL_CARD_STORE,
  });
};
