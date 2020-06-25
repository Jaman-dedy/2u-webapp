import { SET_CURRENT_CHAT_TARGET } from 'constants/action-types/chat/globalchat';
import {
  SET_CHAT_LIST_OPEN,
  SET_CHAT_LIST_CLOSED,
} from 'constants/action-types/dashboard';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_CHAT_TARGET:
      return {
        ...state,
        appChat: {
          ...state.appChat,
          currentChatType: payload.currentChatType,
          currentChatTarget: payload.currentChatTarget,
          isChattingWithSingleUser: payload.isChattingWithSingleUser,
        },
      };

    case SET_CHAT_LIST_OPEN:
      return {
        ...state,
        appChat: {
          ...state.appChat,
          open: true,
        },
      };
    case SET_CHAT_LIST_CLOSED:
      return {
        ...state,
        appChat: {
          ...state.appChat,
          open: false,
        },
      };

    default:
      return null;
  }
};
