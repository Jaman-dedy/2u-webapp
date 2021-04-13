import { toast } from 'react-toastify';
import {
  ADD_MONEY_FROM_PAYPAL_START,
  ADD_MONEY_FROM_PAYPAL_SUCCESS,
  ADD_MONEY_FROM_PAYPAL_ERROR,
} from 'constants/action-types/addMoney/addMoneyFromPayPal';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: 'https://app.2u.money:7000/api/v1/paypal/charge',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_MONEY_FROM_PAYPAL_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] || {} : data || {};
        return dispatch({
          type: ADD_MONEY_FROM_PAYPAL_SUCCESS,
          payload: res,
        });
      },
      onFailure: err => dispatch => {
        const error = Array.isArray(err) ? err[0] || {} : err || {};
        if (error.Description || error.Result || error.message) {
          toast.error(
            global.translate(
              error.Description || error.Result || error.message,
            ),
          );
        }
        return dispatch({
          type: ADD_MONEY_FROM_PAYPAL_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
