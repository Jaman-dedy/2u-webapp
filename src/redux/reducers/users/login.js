import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  CLEAR_LOGIN_ERRORS,
  UPDATE_AUTH_DATA,
} from 'constants/action-types/users/login';

export default (state, { type, payload }) => {
  switch (type) {
    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: null,
        },
      };

    case LOGIN_START:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          error: null,
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          error: payload,
          loading: false,
        },
      };
    case LOGIN_SUCCESS:
      localStorage.removeItem('userWasIdle');
      localStorage.removeItem('fromUserLogout');
      localStorage.setItem('token', payload.data.LiveToken);
      localStorage.setItem(
        'refresh_token',
        payload.data.RefreshToken,
      );

      localStorage.setItem(
        'MAX_USER_IDLE_TIME',
        Number(payload.data.MaxIdleTimeForLogoff) * 60000,
      );
      return {
        ...state,
        login: {
          ...state.login,
          error: null,
          loading: false,
        },
        currentUser: {
          ...state.currentUser,
          authData: { ...payload.data, OTP: payload.OTP },
        },

        userData: {
          data: payload.data?.UserData,
          loading: false,
          error: null,
        },
        myWallets: {
          ...state.myWallets,
          walletList: payload.data?.UserData.Wallets,
          success: true,
          loading: false,
        },

        currencies: {
          ...state.currencies,
          error: null,
          loading: false,
          data: payload.data?.Currencies,
        },
      };

    case UPDATE_AUTH_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          authData: {
            ...state.currentUser.authData,
            ...payload,
          },
        },
      };
    default:
      return null;
  }
};
