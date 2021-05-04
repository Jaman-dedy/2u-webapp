/* eslint-disable no-unused-vars */
import {
  SAVE_BANK_ACCOUNT_START,
  SAVE_BANK_ACCOUNT_SUCCESS,
  SAVE_BANK_ACCOUNT_ERROR,
  CLEAR_SAVE_BANK_ACCOUNT_STORE,
} from 'constants/action-types/contacts/saveBankAccount';

export default (state, { type, payload }) => {
  switch (type) {
    case SAVE_BANK_ACCOUNT_START:
      return {
        ...state,
        accountNumber: {
          ...state.accountNumber,
          loading: true,
          success: false,
          error: null,
        },
      };
    case SAVE_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        accountNumber: {
          ...state.accountNumber,
          error: payload,
          loading: false,
        },
      };

    case SAVE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountNumber: {
          ...state.accountNumber,
          data: payload,
          loading: false,
          error: null,
        },
        allContacts: {
          ...state.allContacts,
          data: state.allContacts?.data.map((item, index) => {
            if (item.ContactPID === payload?.OwnerID) {
              return {
                ...item,
                BankAccounts: [payload, ...item.BankAccounts],
              };
            }
            return item;
          }),
        },
      };

    case CLEAR_SAVE_BANK_ACCOUNT_STORE:
      return {
        ...state,
        accountNumber: {
          loading: false,
          error: null,
          success: false,
          OK: '',
        },
      };
    default:
      return null;
  }
};
