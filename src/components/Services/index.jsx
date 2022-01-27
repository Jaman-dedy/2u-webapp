/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import findServicesIcon from 'assets/images/services/market-p-service.svg';
import microloanServicesIcon from 'assets/images/services/microloan-p-service.svg';
import microloanIcon from 'assets/images/services/microloan-service.svg';
import agricultureIcon from 'assets/images/services/farmers-c-service.svg';
import crowdFundingIcon from 'assets/images/services/crowd-f-service.svg';
import storeIcon from 'assets/images/services/store-service.svg';
import savingWalletIcon from 'assets/images/services/saving-w-service.svg';
import CardComponent from 'components/common/BottomMenu/Card';
import GoBack from 'components/common/GoBack';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import ComingSoon from 'components/common/BottomMenu/ComingSoon';

const MoneyTransfer = ({ userData }) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <>
      <DashboardLayout>
        {!isAppDisplayedInWebView() && (
          <WelcomeBar>
            <div className="head-content">
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
              <h2 className="head-title">
                <span className="bold">
                  {userData.data && userData.data?.FirstName}
                </span>
                , {global.translate('enjoy our services')}
              </h2>
              <div className="clear" />
            </div>
          </WelcomeBar>
        )}
        <div className="wrap__container">
          <div className="services-container">
            <h3>{global.translate('Services')}</h3>
            <div className="container-subtitle">
              {global.translate('Explore our services')}
            </div>
            <div className="services-cards">
              <CardComponent
                image={storeIcon}
                title={global.translate('My stores')}
                to="/my-stores"
                subtitle={global.translate(
                  'Find store or create one.',

                )}
              />
              <CardComponent
                image={findServicesIcon}
                to="/marketplace"
                title={global.translate(`Marketplace`)}
                subtitle={global.translate(
                  `Find products and services near you`,

                )}
              />
              <CardComponent
                image={microloanServicesIcon}
                to="/microloan"
                title={global.translate(`Microloan`)}
                subtitle={global.translate(
                  `Get an instant loan for your transactions`,
                )}
              />
            </div>
            <h3 className="coming-soon-title">
              {global.translate('Coming soon')}
            </h3>
            <div className="soon-cards">
              <ComingSoon
                image={agricultureIcon}
                title={global.translate('Farmers Corner')}
                subtitle={global.translate(
                  'Agriculture supply chain',

                )}
              />
              <ComingSoon
                image={crowdFundingIcon}
                title={global.translate('Crowdfunding')}
                subtitle={global.translate('Crowdfunding')}
              />
              <ComingSoon
                image={savingWalletIcon}
                title={global.translate('Saving wallet')}
                subtitle={global.translate('Saving wallet')}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

MoneyTransfer.propTypes = {
  userData: PropTypes.instanceOf(Object),
};

MoneyTransfer.defaultProps = {
  userData: {
    data: {},
  },
};
export default MoneyTransfer;
