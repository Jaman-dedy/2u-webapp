import { toast } from 'react-toastify';
import {
  EDIT_CREDIT_CARD_START,
  EDIT_CREDIT_CARD_SUCCESS,
  EDIT_CREDIT_CARD_ERROR,
  CLEAR_EDIT_CREDIT_CARD,
} from 'constants/action-types/credit-card/editCreditCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ChangeCardPIN',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: EDIT_CREDIT_CARD_START,
        }),
      onSuccess: data => dispatch => {
        const result = Array.isArray(data)
          ? data[0] || {}
          : data || {};
        if (result.Result === 'Success') {
          toast.success(result.Description);
          return dispatch({
            type: EDIT_CREDIT_CARD_SUCCESS,
            payload: {
              ...result,
              success: result.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: EDIT_CREDIT_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: EDIT_CREDIT_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
export const clearChangeCard = () => dispatch => {
  return dispatch({
    type: CLEAR_EDIT_CREDIT_CARD,
  });
};
