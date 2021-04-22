import { toast } from 'react-toastify';
import {
  CLEAR_MOVE_FUNDS_ERRORS,
  MOVE_FUNDS_ERROR,
  MOVE_FUNDS_START,
  MOVE_FUNDS_SUCCESS,
} from 'constants/action-types/moneyTransfer';
import apiAction from 'helpers/apiAction';

export default (
  data,
  endpoint = '/TransferFunds2UWallet',
  type = 'send-money',
) => dispatch => (callback = null) => {
  return dispatch(
    apiAction({
      method: 'post',
      url: endpoint,
      data,
      onStart: () => dispatch =>
        dispatch({
          type: MOVE_FUNDS_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: MOVE_FUNDS_SUCCESS,
          payload: [{ ...data[0], type }],
        });
        if (data[0].ReccurentTransactionsSet === 'YES') {
          toast.success(
            global.translate('Recurrent transaction set'),
          );
        }
        if (callback) callback(data[0]);
      },
      onFailure: error => dispatch => {
        if (Array.isArray(error)) {
          toast.error(error[0]?.Description);
        }
        return dispatch({
          type: MOVE_FUNDS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};

export const clearMoveFundsErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_MOVE_FUNDS_ERRORS,
  });
};
