/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react';
import assets from 'helpers/assets';
import SelectLanguage from 'components/common/SelectLanguage';
import PersonaBackGround from 'assets/images/BGPersona.png';
import PhoneBackGround from 'assets/images/BGPhone.png';

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
      className="page-wrapper"
    >
      <div className="wrap-top-bar">
        <div className="main-logo">
          <Image src={assets.logoWhiteText} />
        </div>
        <div className="lang-dropdown">
          {getSupportedLanguagesLoading ? null : (
            <SelectLanguage
              open={openLanguage}
              setOpen={setOpenLanguage}
            />
          )}
        </div>
      </div>
      <div className="wrap-auth-section">
        <div
          className={
            register ? 'auth-register-box' : 'auth-login-box'
          }
        >
          <div className="wrap-auth">
            <h1>{rightHeadlineText}</h1>
            {authHeader && <div>{global.translate(authHeader)}</div>}
            {children}
          </div>
          <div className="auth-terms">
            Copyright &copy; {new Date().getFullYear()} Ossix
            Technologies, LLC.
            {global.translate('All rights reserved')}.
          </div>
        </div>
      </div>
      <div className="persona-background">
        <Image src={PersonaBackGround} />
      </div>
      <div className="phone-background">
        <Image src={PhoneBackGround} />
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
