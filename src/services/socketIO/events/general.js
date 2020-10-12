/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  GENERAL_NOTIFICATION,
  STORE_PUBLICITY,
  BROADCAST,
} from 'constants/events/general';
import socketIOClient from 'services/socketIO';
import notifAction from 'redux/actions/users/notifications';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import { VOUCHER } from 'constants/events/common';

export default () => {
  const dispatch = useDispatch();

  const { userData: { data = {} } = {} } = useSelector(
    ({ user }) => user,
  );

  const newDispatch = ({ type, payload }) => {
    delete payload.onStart;
    delete payload.onFailure;
    delete payload.onEnd;
    const action = {
      type,
      payload,
    };
    return dispatch(action);
  };

  useEffect(() => {
    if (data && data.PID) {
      socketIOClient.off(GENERAL_NOTIFICATION);
      socketIOClient.on(GENERAL_NOTIFICATION, () => {
        notifAction({ PID: data.PID })(newDispatch);
      });
    }
    return () => {
      socketIOClient.off(GENERAL_NOTIFICATION);
    };
  }, [data && data.PID]);

  useEffect(() => {
    if (data && data.PID) {
      socketIOClient.off(STORE_PUBLICITY);
      socketIOClient.on(STORE_PUBLICITY, notification => {
        notifAction({ PID: data.PID })(newDispatch);
        const { message } = notification || {};
        const publicityOwner =
          notification.data && notification.data.PID;
        if (data.PID !== publicityOwner && !isAppDisplayedInWebView())
          toast.success(global.translate(message));
      });
    }

    return () => {
      socketIOClient.off(STORE_PUBLICITY);
    };
  }, [data && data.PID]);

  useEffect(() => {
    if (data && data.PID) {
      socketIOClient.off(BROADCAST);
      socketIOClient.on(BROADCAST, notification => {
        notifAction({ PID: data.PID })(newDispatch);
        const { message } = notification || {};

        if (!isAppDisplayedInWebView) {
          toast.success(global.translate(message));
        }
      });
    }
    return () => {
      socketIOClient.off(BROADCAST);
    };
  }, [data && data.PID]);
};
