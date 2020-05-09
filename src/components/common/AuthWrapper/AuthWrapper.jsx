import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Image } from 'semantic-ui-react';

import SelectLanguage from 'components/common/SelectLanguage';
import Logo from 'assets/images/logo.png';
import './style.scss';
import GirlImage from './GirlImage';

const AuthWrapper = ({ children, rightHeadlineText, authHeader }) => {
  return (
    <div className="wrapper">
      <div className="left-column">
        <div className="header">
          <p>
            {global.translate(
              'Send and receive money worldwide within 45 seconds',
            )}
          </p>
        </div>
        <div className="imageWrapper">
          <GirlImage />
        </div>
      </div>
      <Grid.Column className="right-column">
        <Image src={Logo} centered className="logo" />
        <Header className="rightHeaderText">
          {authHeader ? (
            <Header.Content>
              {global.translate(authHeader)}
            </Header.Content>
          ) : (
            <Header.Content>
              {global.translate('Welcome to')} 2U
            </Header.Content>
          )}
        </Header>
        <p className="right-sub-header">{rightHeadlineText}</p>
        <div className="right">{children}</div>
      </Grid.Column>
      <SelectLanguage />
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
};

AuthWrapper.defaultProps = {
  authHeader: '',
};

export default AuthWrapper;