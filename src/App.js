/* eslint-disable import/no-extraneous-dependencies */
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactGA from 'react-ga';
import IdleTimer from 'react-idle-timer';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal } from 'semantic-ui-react';
import moment from 'moment';

import 'react-phone-input-2/lib/style.css';

import UserLeaveConfirmation from 'components/common/UserConfirmation';
import InstallApp from 'components/InstallApp';
import NotFoundPage from 'components/NotFoundPage';
import ReloadApp from 'components/ReloadApp';
import { LOGIN_RETURN_URL } from 'constants/general';
import useNotifyOnlineStatus from 'containers/Dashboard/useNotifyOnlineStatus';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import scroll from 'helpers/scroll';
import useInstallApp from 'hooks/useInstallApp';
import useTranslate from 'hooks/useTranslate';

import getLanguage from 'redux/actions/users/getLanguage';
import getSupportedLanguages from 'redux/actions/users/getSupportedLanguages';
import getUserInfo from 'redux/actions/users/getUserInfo';
import logout from 'redux/actions/users/logout';
import notifAction from 'redux/actions/users/notifications';
import getUserLocationData from 'redux/actions/users/userLocationData';
import routes from 'routes';
import chatThreads from 'services/socketIO/chat/chatThreads';
import deleteMessages from 'services/socketIO/chat/deleteMessages';
import directMessage from 'services/socketIO/chat/directMessage';
import updateUnreadCount from 'services/socketIO/chat/updateUnreadCount';
import handleSocketIOClientEvents from 'services/socketIO/events';
import blockUnblock from 'services/socketIO/events/blockUnblock';
import cashRequestEvent from 'services/socketIO/events/cashRequest';
import checkUserConnected from 'services/socketIO/events/checkUserConnected';
import userPresence from 'services/socketIO/events/contactPresence';
import contactRequestEvent from 'services/socketIO/events/contactRequest';
import generalEvent from 'services/socketIO/events/general';
import voucherEvent from 'services/socketIO/events/voucher';
import walletEvent from 'services/socketIO/events/wallet';
import * as welcomeEvent from 'services/socketIO/events/welcome';
import isAuth from 'utils/isAuth';
import LoadingPage from 'components/LoadingPage';
import ErrorFallback from './Error';
import * as serviceWorker from './serviceWorker';
import 'assets/styles/style.scss';
import 'react-bnb-gallery/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';

const { REACT_APP_GOOGLE_ANALYTICS_NUMBER } = process.env;
const history = createBrowserHistory();

ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS_NUMBER);

history.listen(location => {
  const queryParams = queryString.parseUrl(window.location.href, {
    parseFragmentIdentifier: true,
  });
  ReactGA.pageview(
    `${location.pathname + location.search}${
      queryParams.fragmentIdentifier
        ? `#${queryParams.fragmentIdentifier}`
        : ''
    }`,
  );
});
const App = () => {
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    moment.locale(preferred || 'en');
  }, [preferred]);

  const dispatch = useDispatch();
  global.translate = useTranslate();
  handleSocketIOClientEvents();
  walletEvent();
  generalEvent();
  cashRequestEvent();
  contactRequestEvent();
  voucherEvent();
  // chat
  chatThreads();
  directMessage();
  deleteMessages();
  updateUnreadCount();
  // check user went offline
  checkUserConnected();
  // user presence
  userPresence();
  // contact block/unblock updates
  blockUnblock();
  // notify user online
  useNotifyOnlineStatus();
  const {
    showInstallBtn,
    deferredPrompt,
    installApp,
    cancelInstallApp,
  } = useInstallApp();
  const routeRef = useRef(null);
  const appRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(true);
  const {
    userData: { data, loading: userDataLoading },
  } = useSelector(({ user }) => user);
  const { open: chatOpen } = useSelector(state => state.chat.appChat);
  const MAX_USER_IDLE_TIME = Number(
    localStorage.getItem('MAX_USER_IDLE_TIME'),
  );
  const DEBOUNCE_TIME = MAX_USER_IDLE_TIME * (1 / 4);
  const INITIAL_TIMEOUT_DURATION = Math.floor(
    MAX_USER_IDLE_TIME * (3 / 4),
  );
  const reloadPage = registration => {
    if (registration.waiting?.postMessage) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const onSWUpdate = registration => {
    const reloadAppBtn = document.querySelector('.reload-app-toast');
    if (!reloadAppBtn && !isAppDisplayedInWebView()) {
      toast(<ReloadApp onReload={() => reloadPage(registration)} />, {
        autoClose: false,
        closeButton: false,
        className: 'reload-app-toast',
      });
    } else if (registration?.waiting && isAppDisplayedInWebView()) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };
  const stayActive = () => {
    clearTimeout(sessionTimeoutRef.current);
    setOpen(false);
  };
  const logUserOut = () => {
    setOpen(false);
    localStorage.setItem('userWasIdle', true);
    logout()(dispatch);
  };
  const onIdle = () => {
    setOpen(true);
    sessionTimeoutRef.current = setTimeout(logUserOut, DEBOUNCE_TIME);
  };
  useEffect(() => {
    const installAppBtn = document.querySelector(
      '.install-app-toast',
    );
    if (
      showInstallBtn &&
      deferredPrompt &&
      !installAppBtn &&
      !isAppDisplayedInWebView()
    ) {
      toast(
        <InstallApp
          onInstall={() => installApp(deferredPrompt)}
          onCancel={cancelInstallApp}
        />,
        {
          autoClose: false,
          closeButton: false,
          className: 'install-app-toast',
        },
      );
    }
  }, [showInstallBtn, deferredPrompt]);
  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
    getUserLocationData()(dispatch);
    getSupportedLanguages()(dispatch);
    if (localStorage.token) {
      getUserInfo()(dispatch);
    }
    if (!localStorage.getItem('fromUserLogout')) {
      getLanguage()(dispatch);
    }
  }, []);
  useEffect(() => {
    if (!userDataLoading && data && Object.keys(data).length) {
      notifAction({ PID: data.PID })(dispatch);
    }
  }, [userDataLoading, data]);
  useEffect(() => {
    welcomeEvent.listen();
    return () => {
      welcomeEvent.off();
    };
  }, []);
  useEffect(() => {
    scroll();
  }, [window.location.href]);
  useEffect(() => {
    ReactGA.pageview(
      window.location.pathname + window.location.search,
    );
  }, []);
  const AppRoutes = (
    <Router
      ref={routeRef}
      history={history}
      getUserConfirmation={(message, callback) => {
        return UserLeaveConfirmation(
          message,
          confirmOpen,
          setConfirmOpen,
          callback,
        );
      }}
    >
      <React.Suspense fallback={<LoadingPage />}>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.name}
              exact={route.exact || true}
              path={route.path}
              render={props => {
                if (route.protected && !isAuth()) {
                  props.history.push({
                    pathname: '/login',
                    search: `${LOGIN_RETURN_URL}=${route.path}`,
                    state: {
                      [LOGIN_RETURN_URL]: route.path,
                    },
                  });
                }
                if (!route.protected && isAuth()) {
                  props.history.push({
                    pathname: '/',
                  });
                }
                if (!route.indexPage) {
                  document.title = global.translate(route.name);
                }
                return (
                  <route.component
                    location={props.location}
                    history={props.history}
                    match={props.match}
                  />
                );
              }}
            />
          ))}
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      </React.Suspense>
    </Router>
  );
  return (
    <>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="App">
        <Modal
          size="tiny"
          className="session-timeout-modal"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          closeOnDimmerClick={false}
          closeOnDocumentClick={false}
        >
          <Modal.Header>
            {global.translate('Account has no activity')}!
          </Modal.Header>
          <Modal.Content>
            <p className="sub-title">
              {global.translate(
                'Your account has been idle for a while, you are going to be logged out soon.',
              )}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              className="btn--cancel"
              onClick={() => {
                logUserOut();
              }}
            >
              {global.translate('Log me out')}
            </Button>
            <Button
              className="btn--confirm"
              onClick={stayActive}
              content={global.translate('Keep me signed in.')}
            />
          </Modal.Actions>
        </Modal>
        {isAppDisplayedInWebView() ? (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {AppRoutes}
          </ErrorBoundary>
        ) : (
          <IdleTimer
            ref={appRef}
            element={document}
            timeout={INITIAL_TIMEOUT_DURATION}
            onIdle={() => {
              if (isAuth()) {
                onIdle();
              }
            }}
          >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {AppRoutes}
            </ErrorBoundary>
          </IdleTimer>
        )}
      </div>
    </>
  );
};
App.defaultProps = {
  location: {},
  history: {},
  match: {},
};
App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({}),
};
export default App;
