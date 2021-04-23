import {
  VERIFY_PID_START,
  VERIFY_PID_SUCCESS,
  VERIFY_PID_ERROR,
  CLEAR_PID,
} from 'constants/action-types/users/verifyPID';

export default (state, { type, payload }) => {
  switch (type) {
    case VERIFY_PID_START:
      return {
        ...state,
        verifyPID: {
          ...state.verifyPID,
          loading: true,
          error: null,
        },
      };
    case VERIFY_PID_ERROR:
      return {
        ...state,
        verifyPID: {
          ...state.verifyPID,
          error: payload,
          loading: false,
        },
      };
    case VERIFY_PID_SUCCESS:
      return {
        ...state,
        verifyPID: {
          ...state.verifyPID,
          ...payload,
          loading: false,
        },
      };
    case CLEAR_PID:
      return {
        ...state,
        verifyPID: {
          loading: false,
        },
      };
    default:
      return null;
  }
};
