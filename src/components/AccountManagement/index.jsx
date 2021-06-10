import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Tab, Image } from 'semantic-ui-react';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';

import getReferreesList from 'redux/actions/contacts/getReferreesList';
import './style.scss';
import UserDetailsPlaceHolder from 'assets/images/profile/load-user-details.svg';
import ProfilePlaceHolder from 'assets/images/profile/load-profile-data.svg';
import LoadReferrals from 'assets/images/profile/load-referrals.svg';
import UserProfile from './Profile';
import TransactionLimit from './TransactionLimit';
import ReferralTab from './ReferralTab';
import SecurityTab from './SecurityTab';
import SettingsTab from './SettingsTab';
import PersonalInfoTab from './PersonalInfoTab';
import DocumentTab from './DocumentTab';
import UserDetails from './UserDetails';
import BusinessInfoTab from './BusinessInfoTab';
const Profile = ({
  userData,
  personalInfo,
  identityConfirmation,
  residenceData,
  userDetails,
  changeUserPresence,
  switchAccount,
  supportingDocuments,
  activeTabIndex,
  setActiveTabIndex,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { referreesList } = useSelector(state => state.contacts);

  const businessInfoTitle = global.translate('Business Information');
  const personalInfoTitle = global.translate('Personal information');
  const [updateInfo, setUpdateInfo] = useState(true);
  const [updateBusinessAccount, setUpdateBusinessAccount] = useState(
    false,
  );
  const [updatePersonalAccount, setUpdatePersonalAccount] = useState(
    false,
  );
  const [accountInfoTitle, setAccountInfoTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    getReferreesList()(dispatch);
  }, []);

  const onClickHandler = () => history.goBack();

  const onUpdateBusinessInformation = () => {
    setAccountInfoTitle(businessInfoTitle);
    setActiveTabIndex(1);
    setUpdatePersonalAccount(false);
    setUpdateBusinessAccount(true);
  };

  const onUpdatePersonalInformation = () => {
    setAccountInfoTitle(personalInfoTitle);
    setActiveTabIndex(1);
    setUpdateBusinessAccount(false);
    setUpdatePersonalAccount(true);
  };

  const onTabChange = (_, { activeIndex }) => {
    setActiveTabIndex(activeIndex);
  };

  useEffect(() => {
    if (updateBusinessAccount) {
      setUpdateInfo(true);
    } else if (updatePersonalAccount) {
      setUpdateInfo(false);
    }
  }, [updateBusinessAccount, updatePersonalAccount]);
  useEffect(() => {
    if (userData && userData?.data) {
      const { BusinessAccount } = userData?.data;
      setAccountInfoTitle(
        BusinessAccount === 'YES'
          ? businessInfoTitle
          : personalInfoTitle,
      );
    }
  }, [userData]);
  useEffect(() => {
    if (location.state && location.state.detailTab) {
      setActiveTabIndex(location.state.detailTab);
    }
  }, []);

  let businessInfoPane = null;

  if (
    userData &&
    userData?.data &&
    userData?.data?.BusinessAccount === 'YES'
  ) {
    businessInfoPane = {
      menuItem: global.translate('Business info'),
      render: () => (
        <Tab.Pane attached={false}>
          <BusinessInfoTab
            userData={userData?.data}
            switchAccount={switchAccount}
          />
        </Tab.Pane>
      ),
    };
  }
  const panes = [
    {
      menuItem: global.translate('Profile'),
      render: () => (
        <Tab.Pane attached={false}>
          <div className="details top">
            <UserDetails
              userData={userData?.data}
              userDetails={userDetails}
              changeUserPresence={changeUserPresence}
            />
          </div>
          <UserProfile
            setUpdateBusinessAccount={setUpdateBusinessAccount}
            onUpdatePersonalInformation={onUpdatePersonalInformation}
            onUpdateBusinessInformation={onUpdateBusinessInformation}
            userData={userData?.data}
            updateInfo={updateInfo}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Personal info'),
      render: () => (
        <Tab.Pane attached={false}>
          <PersonalInfoTab
            showBusinessInfo={updateBusinessAccount}
            showPersonalInfo={updatePersonalAccount}
            userData={userData?.data}
            personalInfo={personalInfo}
            identityConfirmation={identityConfirmation}
            residenceData={residenceData}
            switchAccount={switchAccount}
          />
        </Tab.Pane>
      ),
    },
    businessInfoPane,
    {
      menuItem: global.translate('Referrals'),
      render: () => (
        <Tab.Pane attached={false}>
          {referreesList.loading ? (
            <div>
              <Image
                className="animate-placeholder"
                src={LoadReferrals}
              />
            </div>
          ) : (
            <ReferralTab
              userData={userData.data}
              referreesList={referreesList}
            />
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Security'),
      render: () => (
        <Tab.Pane attached={false}>
          <SecurityTab />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Supporting documents'),
      render: () => (
        <Tab.Pane attached={false}>
          <DocumentTab
            supportingDocuments={supportingDocuments}
            userData={userData}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Transaction limits'),
      render: () => (
        <Tab.Pane attached={false}>
          <TransactionLimit userData={userData.data} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Settings'),
      render: () => (
        <Tab.Pane attached={false}>
          <SettingsTab switchAccount={switchAccount} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <div className="title">
            <h2 className="head-title">
              {global.translate('My Account', 1947)}
            </h2>
          </div>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="profile-container">
        <div className="user-info-details top">
          {userData.loading ? (
            <div className="load-info-details">
              <Image
                className="animate-placeholder"
                src={ProfilePlaceHolder}
              />
            </div>
          ) : (
            <div>
              <Tab menu={{ secondary: true }} panes={panes} />
            </div>
          )}
        </div>
        {userData?.loading ? (
          <div className="load-user-details bottom">
            {' '}
            <Image
              className="animate-placeholder"
              src={UserDetailsPlaceHolder}
            />
          </div>
        ) : (
          <div className="details bottom">
            <UserDetails
              userData={userData?.data}
              userDetails={userDetails}
              changeUserPresence={changeUserPresence}
            />
          </div>
        )}

        <div className="user-info-details bottom">
          {userData.loading ? (
            <div className="load-info-details">
              <Image
                className="animate-placeholder"
                src={ProfilePlaceHolder}
              />
            </div>
          ) : (
            <Tab
              menu={{ secondary: true }}
              panes={panes}
              activeIndex={activeTabIndex}
              defaultActiveIndex={0}
              onTabChange={onTabChange}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

Profile.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  switchAccount: PropTypes.objectOf(PropTypes.any).isRequired,
  supportingDocuments: PropTypes.objectOf(PropTypes.any),
  activeTabIndex: PropTypes.number,
  setActiveTabIndex: PropTypes.func,
  personalInfo: PropTypes.objectOf(PropTypes.any),
  identityConfirmation: PropTypes.objectOf(PropTypes.any),
  residenceData: PropTypes.objectOf(PropTypes.any),
  userDetails: PropTypes.objectOf(PropTypes.any),
  changeUserPresence: PropTypes.func,
  bankAccount: PropTypes.objectOf(PropTypes.any).isRequired,
};
Profile.defaultProps = {
  userData: {},
  supportingDocuments: {},
  activeTabIndex: 0,
  setActiveTabIndex: () => {},
  personalInfo: {},
  identityConfirmation: {},
  residenceData: {},
  userDetails: {},
  changeUserPresence: () => {},
};

export default Profile;
