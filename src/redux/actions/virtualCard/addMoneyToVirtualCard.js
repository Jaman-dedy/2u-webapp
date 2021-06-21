import { toast } from 'react-toastify';
import {
  ADD_MONEY_TO_VIRTUAL_CARD_ERROR,
  ADD_MONEY_TO_VIRTUAL_CARD_START,
  ADD_MONEY_TO_VIRTUAL_CARD_SUCCESS,
  CLEAR_ADD_MONEY_TO_VIRTUAL_CARD_STORE,
} from 'constants/action-types/virtual-card/addMoneyToVirtualCard';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddMoneyToVirtualCard',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_MONEY_TO_VIRTUAL_CARD_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] : data;
        if (res.Result === 'Success') {
          toast.success(res?.Description);
          return dispatch({
            type: ADD_MONEY_TO_VIRTUAL_CARD_SUCCESS,
            payload: {
              ...res,
              success: res.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: ADD_MONEY_TO_VIRTUAL_CARD_ERROR,
          payload: {
            ...res,
          },
        });
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error) ? error[0] : error;
        toast.error(err?.Description);
        return dispatch({
          type: ADD_MONEY_TO_VIRTUAL_CARD_ERROR,
          payload: {
            ...err,
          },
        });
      },
    }),
  );

export const clearAddMoneyToVirtuaCard = () => dispatch => {
  return dispatch({
    type: CLEAR_ADD_MONEY_TO_VIRTUAL_CARD_STORE,
  });
};
