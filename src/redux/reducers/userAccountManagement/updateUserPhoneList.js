import {
  UPDATE_USER_PHONE_LIST_START,
  UPDATE_USER_PHONE_LIST_SUCCESS,
  UPDATE_USER_PHONE_LIST_FAILURE,
  CLEAR_UPDATE_USER_PHONE_LIST,
} from 'constants/action-types/userAccountManagement/updateUserPhoneList';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_PHONE_LIST_START:
      return {
        ...state,
        updateUserPhoneList: {
          ...state.updateUserPhoneList,
          loading: true,
          error: null,
        },
      };
    case UPDATE_USER_PHONE_LIST_FAILURE:
      return {
        ...state,
        updateUserPhoneList: {
          ...state.updateUserPhoneList,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_UPDATE_USER_PHONE_LIST:
      return {
        ...state,
        updateUserPhoneList: {
          ...state.updateUserPhoneList,
          error: null,
          loading: false,
          success: false,
        },
      };
    case UPDATE_USER_PHONE_LIST_SUCCESS:
      return {
        ...state,
        updateUserPhoneList: {
          ...state.updateUserPhoneList,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
        // userData: {
        //   ...state.userData,
        //   data: {
        //     ...state.userData.data,
        //     Phones: Array.isArray(payload.Phones)
        //       ? [payload.Phones]
        //       : [payload.phoneNumber, ...state.userData.data.Phones],
        //   },
        // },
      };
    default:
      return null;
  }
};
