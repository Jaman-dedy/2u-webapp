import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import UploadImg from 'assets/images/profile/upload-img.svg';
import ShareImg from 'assets/images/profile/share-img.svg';
import './style.scss';
import formatNumber from 'utils/formatNumber';
import Img from 'components/common/Img';

const UserDetails = ({ userData }) => {
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  const defaultWallet = userData?.Wallets.find(
    wallet => wallet.Default === 'YES',
  );

  return (
    <div className="user-details">
      <div>
        <div>
          <div className="upload-images">
            <Img
              src={userData?.PictureURL}
              compress
              format="png"
              hasError
              circular
            />
            <Image
              className="upload-action"
              src={UploadImg}
              circular
            />
          </div>

          <h3>
            {userData?.FirstName}&nbsp;{userData?.LastName}
          </h3>
          <div className="verified-user">
            {userData?.AccountVerified === 'YES'
              ? global.translate('Verified')
              : null}
          </div>
          <div className="list-items">
            <div className="user-contact">
              {userData?.MainPhone && `+${userData?.MainPhone}`}
              {userData?.MainPhone && <Image src={ShareImg} />}
            </div>
            <div className="user-contact">
              {userData?.MainEmail}
              {userData?.MainEmail && <Image src={ShareImg} />}
            </div>
          </div>
        </div>
      </div>
      <div className="list-items">
        <div>{global.translate('Default wallet balance')}</div>
        <div className="title-display">
          {formatNumber(defaultWallet?.Balance, {
            locales: preferred,
          })}
          {defaultWallet?.CurrencyCode}
        </div>
      </div>
      <div className="list-items">
        <div>{global.translate('Unique ID')}</div>
        <div className="title-display">{userData?.BankUnikID}</div>
      </div>
      <div className="user-status">
        <div>{global.translate('Presence status')}</div>
        <div>Invisible</div>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
};
UserDetails.defaultProps = {
  userData: {},
};

export default UserDetails;
