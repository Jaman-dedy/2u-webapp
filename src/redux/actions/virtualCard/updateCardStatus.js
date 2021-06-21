import { toast } from 'react-toastify';
import {
  UPDATE_CARD_STATUS_START,
  UPDATE_CARD_STATUS_SUCCESS,
  UPDATE_CARD_STATUS_ERROR,
  CLEAR_UPDATE_CARD_STATUS_STORE,
} from 'constants/action-types/virtual-card/updateCardStatus';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateVirtualCardStatus',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_CARD_STATUS_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] : data;
        if (res.Result === 'Success') {
          toast.success(res.Description);
          return dispatch({
            type: UPDATE_CARD_STATUS_SUCCESS,
            payload: {
              ...res,
              success: res.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: UPDATE_CARD_STATUS_ERROR,
          payload: {
            ...res,
          },
        });
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error) ? error[0] : error;
        toast.error(err?.Description);
        return dispatch({
          type: UPDATE_CARD_STATUS_ERROR,
          payload: {
            ...err,
          },
        });
      },
    }),
  );

export const clearUpdateCardStatus = () => dispatch => {
  return dispatch({
    type: CLEAR_UPDATE_CARD_STATUS_STORE,
  });
};
