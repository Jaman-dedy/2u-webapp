import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import UploadImg from 'assets/images/profile/upload-img.svg';
import ShareImg from 'assets/images/profile/share-img.svg';
import './style.scss';
import formatNumber from 'utils/formatNumber';
import Img from 'components/common/Img';
import UploadImgButton from 'components/common/uploadImgButton';
import validateImg from 'helpers/image/validateImg';
import UserImg from 'assets/images/profile/user.svg';
import Thumbnail from 'components/common/Thumbnail';

const UserDetails = ({ userData, userDetails }) => {
  const [isImgCorrect, setIsImgCorrect] = useState(false);
  const { onImageChange, userIdUrlData, uploadingImg } = userDetails;
  const [hasError, setHasError] = useState(false);
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  const defaultWallet = userData?.Wallets.find(
    wallet => wallet.Default === 'YES',
  );

  useEffect(() => {
    if (userData?.PictureURL) {
      validateImg(userData?.PictureURL).then(
        function fulfilled(img) {
          setIsImgCorrect(true);
        },

        function rejected() {
          setIsImgCorrect(false);
        },
      );
    }
  }, [userData]);

  return (
    <div className="user-details">
      <div>
        <div>
            <div className="upload-images">
              <Thumbnail
                avatar={
                  userIdUrlData?.MediaSourceURL ||
                  userData?.PictureURL
                }
                size="medium"
                height="100px"
                width="100px"
                name={userData && userData.FirstName}
                secondName={userData && userData.LastName}
                circular
                hasError={hasError}
                setHasError={setHasError}
                circular
                className="header_2u_avatar"
                style={{
                  height: '91px',
                  width: '100px',
                  marginRight: 0,
                  objectFit: 'cover',
                  color: 'white',
                }}
              />
              <UploadImgButton
                name="UserProofOfAddressURL"
                onChooseFile={onImageChange}
                img
                src={UploadImg}
                circular
                loading={uploadingImg}
              />
            </div>
           
          <h3>
            {userData?.FirstName}&nbsp;{userData?.LastName}
          </h3>
          {userData?.AccountVerified === 'YES'? (
            <div className="verified-user">
            {global.translate('Verified')}
          </div> 
          ): null}
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
  userDetails: PropTypes.objectOf(PropTypes.any),
};
UserDetails.defaultProps = {
  userData: {},
  userDetails: {},
};

export default UserDetails;
