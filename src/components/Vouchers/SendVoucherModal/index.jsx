import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Dropdown } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import './SendVoucherModal.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import getPendingVouchers from 'redux/actions/transactions/getPendingVouchers';
import PinCodeForm from 'components/common/PinCodeForm';
import { getPossibleDates } from 'utils/monthdates';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import { clearSelectedStore } from 'redux/actions/vouchers/selectedStore';
import Img from 'components/Vouchers/Img';
import Thumbnail from 'components/common/Thumbnail';
import formatNumber from 'utils/formatNumber';
import { clearMoveFundsErrors } from 'redux/actions/moneyTransfer/moveFunds';
import TransactionEntity from './TransactionEntity';

const SendMoneyModal = ({ SendVoucherModal }) => {
  const [hasError, setHasError] = useState(false);
  const {
    setErrors,
    walletList,
    userData,
    onOptionsChange,
    form,
    balanceOnWallet,
    setForm,
    sendMoneyOpen,
    setSendMoneyOpen,
    checkTransactionConfirmation,
    currency,
    checking,
    confirmationError,
    confirmationData,
    sendVoucherFx,
    loading,
    errors,
    error,
    data,
    DefaultWallet,
    step,
    resetState,
    selectedContact,
    selectedStore,
    handleInputChange,
    setScreenNumber,
  } = SendVoucherModal;

  const history = useHistory();
  const dispatch = useDispatch();
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  const destinationContact = selectedContact;

  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));

  const clearSendVoucher = () => {
    history.push({
      pathname: '/contacts',
      search: '?send-voucher-success=1',
    });

    setForm({ Scope: 'AND' });
    setErrors(null);
    setSendMoneyOpen(false);
    setScreenNumber(1);
    clearSelectedStore(dispatch);
  };

  useEffect(() => {
    if (data && data[0]) {
      clearSendVoucher();
      clearMoveFundsErrors()(dispatch);
      getPendingVouchers()(dispatch);
      resetState();
      toast.success(`${data[0].Description}`);
    }
  }, [data]);

  return (
    <Modal.Content className="send-voucher-modal">
      <Modal
        size="small"
        open={sendMoneyOpen}
        onOpen={() => setSendMoneyOpen(!sendMoneyOpen)}
      >
        {selectedStore && destinationContact && (
          <Modal.Header className="modal-title">
            {global.translate('Send a voucher to be retrieved by')}
            &nbsp;
            <strong>
              {`${destinationContact.FirstName} ${destinationContact.LastName}`}
            </strong>
            &nbsp;
            {global.translate('at')}
            &nbsp;
            <strong>{selectedStore.StoreName}</strong>
          </Modal.Header>
        )}

        {step === 1 && (
          <Modal.Content>
            <div className="flex flex-row send-voucher-modal__top-images justify-content-space-between align-items-center ">
              <span>
                <Thumbnail
                  height={75}
                  width={75}
                  compress
                  format="png"
                  avatar={userData?.data?.PictureURL}
                  name={userData?.data?.FirstName}
                  secondName={userData?.data?.LastName}
                  circular
                  className="header_2u_avatar"
                  style={{
                    height: '80px',
                    width: '80px',
                    marginRight: 0,
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  hasError={hasError}
                  setHasError={setHasError}
                />
              </span>
              {destinationContact && (
                <>
                  <span>{global.translate('To')}</span>
                  <span>
                    <Thumbnail
                      height={75}
                      width={75}
                      compress
                      format="png"
                      avatar={destinationContact?.PictureURL}
                      name={destinationContact?.FirstName}
                      secondName={destinationContact?.LastName}
                      circular
                      className="header_2u_avatar"
                      style={{
                        height: '80px',
                        width: '80px',
                        marginRight: 0,
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                      hasError={hasError}
                      setHasError={setHasError}
                    />
                  </span>
                </>
              )}
              <span>{global.translate('at')}</span>
              <span>
                <Img
                  height={75}
                  width={75}
                  format="png"
                  compress
                  pic={selectedStore?.StoreLogo || 'N/A'}
                  className="send-voucher-modal__top-images__store-image"
                />
              </span>
            </div>

            <div className="send-voucher-modal__walletDropdown flex flex-column align-items-center">
              <TransactionEntity
                id={1}
                name="user1wallets"
                form={form}
                walletList={walletList}
                DefaultWallet={
                  form?.user1wallets
                    ? form?.user1wallets
                    : DefaultWallet
                }
                onChange={handleInputChange}
              />

              <div
                style={{
                  marginTop: '10px',
                }}
              >
                Store currency :{' '}
                <strong>{selectedStore?.Currency}</strong>
              </div>
            </div>

            <div className="remaining-money-shade">
              <h4 className="available">
                {global.translate(
                  'Available Balance in the Selected Wallet',
                )}
                <p className="available-value">
                  {formatNumber(balanceOnWallet, {
                    locales: preferred,
                    currency,
                  })}
                </p>
              </h4>
            </div>

            <div className="money-section flex flex-row align-items-center">
              <div
                className="flex flex-row align-items-center money-section__items"
                style={{ margin: '0 auto' }}
              >
                <span className="hide-xs">
                  {global.translate('Amount')}
                </span>

                <div
                  className="amount-value"
                  style={{ margin: '0 10px' }}
                >
                  <div className="form-information flex flex-row align-items-center">
                    <Input
                      type="number"
                      name="amount"
                      placeholder={global.translate('Amount')}
                      onChange={onOptionsChange}
                      value={form.amount || null}
                      style={{
                        width: '198px',
                        border: '1px solid #cfcfcf',
                      }}
                    />
                  </div>
                </div>
                <span>{currency}</span>
              </div>
            </div>
            <div className="loader-section">
              {errors && <Message message={errors} />}
              {confirmationError && confirmationError[0] && (
                <Message
                  message={
                    confirmationError &&
                    confirmationError[0].Description
                      ? global.translate(
                          confirmationError &&
                            confirmationError[0].Description,
                        )
                      : global.translate(confirmationError.error)
                  }
                />
              )}
              {confirmationError && !confirmationError[0] && (
                <Message
                  message={global.translate(confirmationError.error)}
                />
              )}
              {checking && (
                <LoaderComponent
                  loaderContent={global.translate('Working…')}
                />
              )}
            </div>
          </Modal.Content>
        )}

        {step === 2 && confirmationData && confirmationData[0] && (
          <Modal.Content className="ss-content">
            <div className="ss-amount">
              <p>{global.translate('Amount')}: </p> &nbsp;&nbsp;
              <p>
                <strong> {confirmationData[0].Amount}</strong>
              </p>
            </div>

            <div className="fees">
              <div className="fees-list">
                <p>{global.translate('Fees')}</p>

                <div className="fees-item">
                  <p className="left">{global.translate('Fees')}:</p>
                  <p className="right">{confirmationData[0].Fees}</p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('External fees')}:
                  </p>
                  <p className="right">
                    {confirmationData[0].ExternalFees}
                  </p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('Exchange fees')}:
                  </p>
                  <p className="right">
                    {' '}
                    {confirmationData[0].ExchangeFees}
                  </p>
                </div>
                <div className="fees-item">
                  <p className="left">{global.translate('Taxes')}:</p>
                  <p className="right">{confirmationData[0].Taxes}</p>
                </div>
              </div>
            </div>
            <div className="exchange-rate">
              <p>
                {global.translate('Exchange Rate')}=
                {confirmationData[0].ExchangeRate}
              </p>
            </div>
            <div className="amount-to-be-recieved-break-down">
              <div className="fees-item">
                <p className="left" style={{ marginTop: '13px' }}>
                  {global.translate('Total')}:
                </p>
                <p className="right">
                  <strong
                    className="bolder"
                    style={{ fontSize: '23px', fontWeight: 500 }}
                  >
                    {confirmationData[0].TotalAmount}
                  </strong>
                </p>
              </div>
              <div className="fees-item">
                <p className="left" style={{ marginTop: '13px' }}>
                  {global.translate('Amount to be received')}:
                </p>
                <p className="right">
                  {' '}
                  <strong
                    className="bolder"
                    style={{ fontSize: '23px', fontWeight: 500 }}
                  >
                    {confirmationData[0].AmountToBeSent}
                  </strong>
                </p>
              </div>
            </div>

            <div className="confirm-form">
              <Input
                name="reference"
                onChange={onOptionsChange}
                value={form.reference || ''}
                placeholder={global.translate('Enter reference here')}
              />
              <Input
                name="description"
                onChange={onOptionsChange}
                value={form.description || ''}
                placeholder={global.translate(
                  'Enter description here',
                )}
              />
            </div>

            {form.isRecurring && (
              <div className="recurring">
                <div className="repeat-date">
                  <p className="repeated-on">
                    {global.translate('Repeat Payment on Every')}:{' '}
                  </p>
                  <span>
                    <Dropdown
                      className="custom-dropdown2"
                      search
                      name="day"
                      value={form.day || ''}
                      onChange={onOptionsChange}
                      selection
                      options={days}
                    />
                  </span>
                </div>
                <div className="from-to-dates">
                  <div className="from-two-group">
                    <p className="from">
                      {' '}
                      {global.translate('From')}:
                    </p>
                    <DateInput
                      icon="dropdown"
                      popupPosition="top left"
                      animation="fade"
                      placeholder={global.translate('Start date')}
                      iconPosition="right"
                      dateFormat="YYYY-MM-DD"
                      name="startDate"
                      value={
                        form.startDate
                          ? new Date(form.startDate).toDateString()
                          : ''
                      }
                      onChange={onOptionsChange}
                    />
                  </div>
                  <div className="from-two-group">
                    <p className="from">{global.translate('to')}:</p>
                    <DateInput
                      icon="dropdown"
                      popupPosition="top left"
                      animation="fade"
                      placeholder={global.translate('End date')}
                      iconPosition="right"
                      dateFormat="YYYY-MM-DD"
                      name="endDate"
                      value={
                        form.endDate
                          ? new Date(form.endDate).toDateString()
                          : ''
                      }
                      onChange={onOptionsChange}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="pin-number">
              <PinCodeForm
                label={global.translate('Confirm  your PIN number')}
                onChange={onOptionsChange}
                name="pin"
                value={form.pin || ''}
              />
            </div>
            <div
              className="loader-section"
              style={{ alignSelf: 'center' }}
            >
              {errors && <Message message={errors} />}
              {error && error[0] && (
                <Message
                  message={
                    error && error[0].Description
                      ? global.translate(error[0].Description)
                      : global.translate(error.error)
                  }
                />
              )}
              {error && !error[0] && (
                <Message message={global.translate(error.error)} />
              )}
              {loading && (
                <LoaderComponent
                  loaderContent={global.translate('Working…')}
                />
              )}
            </div>
          </Modal.Content>
        )}

        <Modal.Actions>
          <>
            {step !== 1 && (
              <Button
                className="btn--cancel"
                disabled={checking || loading}
                onClick={() => {
                  resetState();
                }}
              >
                {global.translate('Back')}
              </Button>
            )}

            <Button
              className="btn--cancel"
              disabled={checking || loading}
              onClick={() => {
                if (selectedStore.skipSearchPage === true) {
                  history.push('/contacts?ref=send-voucher');
                }
                setSendMoneyOpen(!sendMoneyOpen);
                resetState();
                setForm({});
                setErrors(null);
              }}
            >
              {global.translate('Cancel')}
            </Button>

            <Button
              className="btn--confirm"
              disabled={checking || loading}
              onClick={() => {
                if (step === 1) {
                  checkTransactionConfirmation();
                } else if (step === 2) {
                  sendVoucherFx();
                } else {
                  clearSendVoucher();
                }
              }}
            >
              {step !== 3
                ? global.translate('Send voucher')
                : global.translate('Done')}
            </Button>
          </>
        </Modal.Actions>
      </Modal>
    </Modal.Content>
  );
};

SendMoneyModal.propTypes = {
  SendVoucherModal: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SendMoneyModal;
