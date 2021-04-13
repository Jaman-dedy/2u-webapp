import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Loader, Dimmer, Icon } from 'semantic-ui-react';

import isAuth from 'utils/isAuth';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import logo from 'assets/images/2u-money-logo-filled.svg';
import './VerifyEmail.scss';

const VerifyEmail = ({ verifyEmailState }) => {
  const history = useHistory();

  return isAuth() ? (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <h3 className="head-title">
            {global.translate('Verify Email', 2001)}
          </h3>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div
        className="VerifyEmail empty-store xlarge-padding flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '70vh' }}
      >
        {verifyEmailState?.loading ? (
          <Dimmer active inverted>
            <Loader inverted>{`${global.translate(
              'Loading',
            )}...`}</Loader>
          </Dimmer>
        ) : null}
        <Image src={logo} className="logo" />
        {verifyEmailState?.loading ? null : (
          <> 
          <h2 className="center-align">
            {global.translate(
              verifyEmailState?.error?.Description ||
                verifyEmailState?.data?.Description,
            )}
          </h2>
          <div>
            <button
              type="button"
              onClick={() => history.push({ pathname: '/account-management' })}
              className="btn-auth btn-primary"
            >
              &nbsp; &nbsp;
              <Icon name="mail" className="text-white" />
              {global.translate('Manage emails')}
              &nbsp; &nbsp;
            </button>
          </div>
          </>
         
        )}
      </div>
    </DashboardLayout>
  ) : (
    <div
      className="VerifyEmail empty-store xlarge-padding flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      {verifyEmailState?.loading ? (
        <Dimmer active inverted>
          <Loader inverted>{`${global.translate(
            'Loading',
          )}...`}</Loader>
        </Dimmer>
      ) : null}
      <Image src={logo} className="logo" />
      {verifyEmailState?.loading ? null : (
        <>
          <h2 className="center-align">
            {global.translate(
              verifyEmailState?.error?.Description ||
                verifyEmailState?.data?.Description,
            )}
          </h2>
          <div>
            <button
              type="button"
              onClick={() => history.push({ pathname: '/' })}
              className="btn-auth btn-primary"
            >
              &nbsp; &nbsp;
              <Icon name="chevron left" className="text-white" />
              {global.translate('Home')}
              &nbsp; &nbsp;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

VerifyEmail.propTypes = {
  verifyEmailState: PropTypes.instanceOf(Object),
};

VerifyEmail.defaultProps = {
  verifyEmailState: {},
};

export default VerifyEmail;
