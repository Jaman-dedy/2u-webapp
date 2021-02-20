import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';

import DetailHeading from './DetailHeading';
import DetailTypeAction from './DetailTypAction';
import './style.scss';
import DisplayWallet from './DisplayWallet';
import DetailsBody from './DetailsBody';
import ConfirmCancelTransaction from '../ConfirmCancelTransaction';

const TransactionDetails = ({
  item,
  selectedCard,
  setPhoneValue,
  phoneValue,
  onOptionChange,
  form,
  modifyOneTransaction,
  updating,
  updatingData,
  updatingError,
  openEditTransaction,
  setOpenEditTransaction,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const [cancelOpen, setCancelOpen] = useState(false);

  const walletInfos = () => {
    if (selectedCard === 1) {
      return {
        sourceWallet: item.WalletNumber,
        sourceCurrency: item.SourceCurrencyFlag,
        targetWallet: item.TargetAccount,
        targetCurrency: item.TargetCurrencyFlag,
      };
    }
    if (selectedCard === 2) {
      return {
        sourceWallet: item.SourceAccountNumber,
        sourceCurrency: item.SourceCurrencyFlag,
        targetWallet: `${item.PhonePrefix} ${item.Phone}`,
        targetCurrency: item.DestCurrencyFlag,
      };
    }
    if (selectedCard === 3) {
      return {
        sourceWallet: item.SourceAccountNumber,
        sourceCurrency: item.CurrencyFlag,
        targetWallet: item?.Store?.Name,
      };
    }
    if (selectedCard === 4) {
      return {
        sourceWallet: item.SourceAccountNumber,
        sourceCurrency: item.SourceCurrencyFlag,
        targetWallet: `${item.PhonePrefix ? item.PhonePrefix : ''} ${
          item.Phone ? item.Phone : ''
        }`,
        targetCurrency: item.DestCurrencyFlag,
      };
    }
  };
  return (
    <DashboardLayout>
      <>
        <WelcomeBar>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              {global.translate('Transaction details', 2193)}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="transaction-detail-container">
          <Segment>
            <DetailHeading item={item} selectedCard={selectedCard} />
            <DetailTypeAction
              item={item}
              selectedCard={selectedCard}
              phoneValue={phoneValue}
              setPhoneValue={setPhoneValue}
              onOptionChange={onOptionChange}
              form={form}
              modifyOneTransaction={modifyOneTransaction}
              updating={updating}
              updatingData={updatingData}
              updatingError={updatingError}
              openEditTransaction={openEditTransaction}
              setOpenEditTransaction={setOpenEditTransaction}
            />
            <div className="display-wallets">
              <DisplayWallet
                title={global.translate('Source account', 2191)}
                walletNumber={walletInfos().sourceWallet}
                walletFlag={walletInfos().sourceCurrency}
              />
              <DisplayWallet
                title={
                  selectedCard !== 3
                    ? global.translate('Target account', 1611)
                    : global.translate('Store', 803)
                }
                walletNumber={walletInfos().targetWallet}
                walletFlag={walletInfos().targetCurrency}
              />
            </div>
            <DetailsBody
              item={item}
              selectedCard={selectedCard}
              updatingData={updatingData}
            />
          </Segment>
          <div className="goto-transactions">
            <Button onClick={() => history.push('/transactions')}>
              {global.translate('Go to all transactions', 2192)}
            </Button>
            {selectedCard !== 1 && (
              <Button
                onClick={() => {
                  setCancelOpen(true);
                }}
              >
                {global.translate('Cancel transaction', 1103)}
              </Button>
            )}
          </div>
        </div>
        <ConfirmCancelTransaction
          open={cancelOpen}
          setOpen={setCancelOpen}
          fromVouchers={selectedCard === 3}
          item={item}
        />
      </>
    </DashboardLayout>
  );
};
TransactionDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  selectedCard: PropTypes.number,
  setPhoneValue: PropTypes.func,
  phoneValue: PropTypes.string,
  onOptionChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  modifyOneTransaction: PropTypes.func,
  updating: PropTypes.bool,
  updatingData: PropTypes.objectOf(PropTypes.any),
  updatingError: PropTypes.objectOf(PropTypes.any),
  openEditTransaction: PropTypes.bool,
  setOpenEditTransaction: PropTypes.func,
};
TransactionDetails.defaultProps = {
  item: {},
  selectedCard: 1,
  setPhoneValue: () => {},
  phoneValue: '',
  onOptionChange: () => {},
  form: {},
  modifyOneTransaction: () => {},
  updating: false,
  updatingData: {},
  updatingError: {},
  openEditTransaction: false,
  setOpenEditTransaction: () => {},
};

export default TransactionDetails;
