import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {
  CANCEL_VOUCHER_ERROR,
  CANCEL_VOUCHER_START,
  CANCEL_VOUCHER_SUCCESS,
  CLEAR_CANCEL_TRANSACTION,
} from 'constants/action-types/transactions/cancelTransaction';
import apiAction from 'helpers/apiAction';

export default (requestData, history) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/CancelVoucher',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: CANCEL_VOUCHER_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          global.translate(
            'Voucher transaction has been cancelled.',

          ),
        );
        history.push('/transactions');
        return dispatch({
          type: CANCEL_VOUCHER_SUCCESS,
          payload: { data, securityCode: requestData.SecurityCode },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CANCEL_VOUCHER_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearTransactionSucess = () => dispatch => {
  return dispatch({ type: CLEAR_CANCEL_TRANSACTION });
};
