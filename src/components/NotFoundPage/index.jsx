import React from 'react';
import { useHistory } from 'react-router-dom';

import { Image } from 'semantic-ui-react';
import isAuth from 'utils/isAuth';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import ErrorImg from 'assets/images/404-or-500.svg';

import './NotFoundPage.scss';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const NotFoundPage = () => {
  const history = useHistory();
  return isAuth() ? (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <h2 className="head-title">
            {global.translate('Page not found', 2001)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="empty-store">
        <Image src={ErrorImg} />
        <h2>
          {global.translate(
            `Oops, looks like the page you are looking for is not found`,
            2265,
          )}
        </h2>
        <div>
          {' '}
          {global.translate(
            `You can navigate to other pages or you can click on this
          button below to navigate to the home page`,
            2266,
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            if (isAppDisplayedInWebView()) {
              history.push(
                `${history.location.pathname}?redirect_back=1`,
              );
            } else {
              history.push({
                pathname: '/',
              });
            }
          }}
          c
        >
          {global.translate('Home', 134)}
        </button>
      </div>
    </DashboardLayout>
  ) : (
    <div className="empty-store" style={{ marginTop: '10rem' }}>
      <Image src={ErrorImg} />
      <h2>
        {global.translate(
          `Oops, looks like the page you are looking for is not found`,
          2265,
        )}
      </h2>
      <div>
        {' '}
        {global.translate(
          `You can navigate to other pages or you can click on this
          button below to navigate to the home page`,
          2266,
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
