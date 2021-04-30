/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

import LogoColored from 'assets/images/2u-money-logo.svg';
import AdPlaceholderDefault from 'assets/images/event-place-holder.jpg';
import getUserDailyEvent from 'redux/actions/authWrapper';
import SelectLanguage from 'components/common/SelectLanguage';

import './auth-landing-page.scss';
import './spiner.scss';
import './style.scss';

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
      </div>
      <div className="form-wrapper">
        <div className="os-header">
          <div className="os-container">
            <Grid columns="two">
              <Grid.Row>
                <Grid.Column
                  mobile={10}
                  tablet={10}
                  computer={12}
                  className="navbar"
                >
                  <ul className="nav-menu">
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
