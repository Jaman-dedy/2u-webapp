/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import CurrencyExchangeIcon from 'assets/images/currencyexchange.png';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';

import PayBills from 'components/PayBills';

import moneyTransferImage from 'assets/images/transfer_money.png';

import payBillsIcon from 'assets/images/pay-bills-icon.png';
import MoneyTransferIcon from 'assets/images/transactionsimage.png';
import TopUpIcon from 'assets/images/top-up.png';
import ToOtherIcon from 'assets/images/to_other_provider.png';
import SendCashIcon from 'assets/images/sendCashIcon.png';
import CreditCard from 'assets/images/credit-card.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import bankTransferIcon from 'assets/images/bank_transfer.png';
import MyWalletIcon from 'assets/images/my_wallet_dash.png';
import ContactIcon from 'assets/images/contact_icon_dash.png';
import CardComponent from 'components/common/BottomMenu/Card';
import ExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';

const MoneyTransfer = ({ userData, payBills }) => {
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const { openPayBills, setOpenPayBills } = payBills;

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <span className="lighter">
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , {global.translate('enjoy our services')}
          </span>
        </WelcomeBar>
        <div className="add-money-container">
          <div>
            <Image src={moneyTransferImage} size="medium" centered />
          </div>
        </div>
        <PayBills
          open={openPayBills}
          setOpen={setOpenPayBills}
          payBills={payBills}
        />
        <div className="services">
          <p className="sub-title">
            {global.translate('Our Services')}
          </p>
          <div className="to-u-services">
            <CardComponent
              image={MoneyTransferIcon}
              title="Send Money"
              to="/contacts?ref=send-money"
              subtitle="Transfer funds to your 2U contacts"
            />
            <CardComponent
              image={payBillsIcon}
              title={global.translate('Pay bills', 67)}
              onClick={() => setOpenPayBills(true)}
              subtitle={global.translate(
                'Pay your bills to registered providers',
                668,
              )}
            />
            <CardComponent
              image={MyWalletIcon}
              title={global.translate('Send a voucher', 863)}
              subtitle={global.translate(
                'Create a voucher or a gift card',
                764,
              )}
            />
            <CardComponent
              image={SendCashIcon}
              title={global.translate('Send Cash', 915)}
              to="/contacts?ref=send-cash"
              subtitle={global.translate(
                'Send cash to external contact',
                915,
              )}
            />

            {sendMoneyOpen && (
              <ExchangeContainer
                setSendMoneyOpen={setSendMoneyOpen}
                sendMoneyOpen={sendMoneyOpen}
              />
            )}
            <CardComponent
              image={CurrencyExchangeIcon}
              onClick={() => {
                setSendMoneyOpen(!sendMoneyOpen);
              }}
              title={global.translate('Currency exchange', 87)}
              subtitle={global.translate(
                'The easiest way to do your currency exchange',
                569,
              )}
            />

            <CardComponent
              image={ToOtherIcon}
              title={global.translate('2U to others', 581)}
              to="/wallets"
              subtitle={global.translate(
                'Send money from your wallet to other provider',
                581,
              )}
            />
            <CardComponent
              image={TopUpIcon}
              to="/contacts"
              title={global.translate('Top up a cell phone', 539)}
              subtitle={global.translate('Top up a cell phone', 539)}
            />
            <CardComponent
              image={CreditCard}
              to="/contacts"
              title={global.translate('Credit card', 726)}
              subtitle={global.translate(
                'Get one time use Credit card number for online payment',
                672,
              )}
            />
            <CardComponent
              image={bankTransferIcon}
              to="/contacts"
              title={global.translate('Bank transfer', 169)}
              subtitle={global.translate(
                'Transfer fund to a bank account',
                670,
              )}
            />
            <CardComponent
              image={AddMoneyIcon}
              title={global.translate('Paypal', 170)}
              to="/add-money"
              subtitle={global.translate(
                'Transfer funds to a PayPal account',
                669,
              )}
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

MoneyTransfer.propTypes = {
  userData: PropTypes.instanceOf(Object),
  payBills: PropTypes.instanceOf(Object),
};

MoneyTransfer.defaultProps = {
  userData: {
    data: {},
  },
  payBills: {},
};
export default MoneyTransfer;