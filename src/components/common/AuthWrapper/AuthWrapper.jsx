/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './auth-landing-page.scss';
import './spiner.scss';
import './style.scss';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';
import LogoColored from 'assets/images/2u-money-logo.svg';
import AdPlaceholderDefault from 'assets/images/AD_V1.jpg';
import getUserDailyEvent from 'redux/actions/authWrapper';
import SelectLanguage from 'components/common/SelectLanguage';
import { HOME_WEBSITE, HOW_IT_WORKS } from 'constants/general';
import openInNewTab from 'helpers/openInNewTab';

const AuthWrapper = ({
  children,
  rightHeadlineText,
  authHeader,
  register,
}) => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const [eventUrl, setEventUrl] = useState(null);

  const {
    language: {
      supported: { loading: getSupportedLanguagesLoading },
    } = {},
  } = useSelector(({ user }) => user);

  return (
    <div
      onClick={() => {
        setOpenLanguage(false);
      }}
      className="wrapper"
    >
      <div className="wrap-event">
        {eventUrl ? (
          <Image src={eventUrl} />
        ) : (
          <Image src={AdPlaceholderDefault} />
        )}
        <div className="overlay-text">
          <h1>{global.translate('Welcome to 2U money')}</h1>
          <p>{rightHeadlineText}</p>
        </div>
      </div>
      <div className="form-wrapper">
        <div className="os-header">
          <div className="os-container">
            <Grid columns="two">
              <Grid.Row>
                <Grid.Column
                  mobile={6}
                  tablet={6}
                  computer={4}
                  style={{ display: 'flex', alignItems: 'center' }}
                  className="logo-container"
                >
                  <Image
                    className="logo"
                    src={LogoColored}
                    onClick={() => {
                      openInNewTab('2u.money');
                    }}
                  />
                </Grid.Column>
                <Grid.Column
                  mobile={10}
                  tablet={10}
                  computer={12}
                  className="navbar"
                >
                  <ul className="nav-menu">
                    <li className="hide-on-small">
                      <a href={HOME_WEBSITE}>
                        {global.translate('Home', 134)}
                      </a>
                    </li>
                    <li className="hide-on-small">
                      <Link to="/marketplace">
                        {global.translate('Marketplace', 2190)}{' '}
                      </Link>
                    </li>
                    <li className="hide-on-small">
                      <a href={HOW_IT_WORKS}>
                        {global.translate('How it works', 2191)}
                      </a>
                    </li>
                    <li>
                      {getSupportedLanguagesLoading ? null : (
                        <SelectLanguage
                          open={openLanguage}
                          setOpen={setOpenLanguage}
                        />
                      )}
                    </li>
                  </ul>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div className="wrap-auth-section">
          <div className="os-container">
            <div className="auth-section">
              {register ? (
                <div className="wrap-auth-register">
                  <h2 className="right-sub-header">
                    {rightHeadlineText}
                  </h2>
                  {authHeader && (
                    <div className="auth-sub-text">
                      {global.translate(authHeader)}
                    </div>
                  )}
                  {children}
                </div>
              ) : (
                <div className="wrap-auth">
                  <h2 className="right-sub-header">
                    {rightHeadlineText}
                  </h2>
                  {authHeader && (
                    <div className="auth-sub-text">
                      {global.translate(authHeader)}
                    </div>
                  )}
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rightHeadlineText: PropTypes.string.isRequired,
  authHeader: PropTypes.string,
  register: PropTypes.bool,
};

AuthWrapper.defaultProps = {
  authHeader: '',
  register: false,
};

export default AuthWrapper;
