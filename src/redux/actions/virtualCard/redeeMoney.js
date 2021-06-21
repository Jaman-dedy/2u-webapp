import { toast } from 'react-toastify';
import {
  REDEEM_MONEY_START,
  REDEEM_MONEY_SUCCESS,
  REDEEM_MONEY_ERROR,
  CLEAR_REDEEM_MONEY_STORE,
} from 'constants/action-types/virtual-card/redeeMoney';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/RedeemVirtualCardBalance',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: REDEEM_MONEY_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] : data;
        if (res.Result === 'Success') {
          toast.success(res.Description);
          return dispatch({
            type: REDEEM_MONEY_SUCCESS,
            payload: {
              ...res,
              success: res.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: REDEEM_MONEY_ERROR,
          payload: {
            ...res,
          },
        });
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error) ? error[0] : error;
        toast.error(err?.Description);

        if (err) {
          toast.error(err?.Description);
        }
        return dispatch({
          type: REDEEM_MONEY_ERROR,
          payload: {
            ...err,
          },
        });
      },
    }),
  );

export const clearRedeeMoney = () => dispatch => {
  return dispatch({
    type: CLEAR_REDEEM_MONEY_STORE,
  });
};
