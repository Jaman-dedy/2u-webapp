/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Icon,
  Input,
  Modal,
  TransitionablePortal,
} from 'semantic-ui-react';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import PinCodeForm from 'components/common/PinCodeForm';
import TransactionEntity from 'components/MoneyTransfer/SendMoney/TransactionEntity';
import Wrapper from 'hoc/Wrapper';
import { clearConfirmation } from 'redux/actions/moneyTransfer/confirmTransaction';
import formatNumber from 'utils/formatNumber';
import NestedModal from '../virtualCardDetails/confirmRedeeModal';
import './style.scss';

const AddMoneyModal = ({
  setOpen,
  walletList,
  destinationContact,
  errors,
  onOptionsChange,
  form,
  setForm,
  checkTransactionConfirmation,
  checking,
  confirmationError,
  confirmationData,
  loading,
  error,
  isSendingCash,
  data,
  setErrors,
  step,
  setStep,
  addMoneyOpen,
  setAddMoneyOpen,
  userData,
  selectedWallet,
  setSelectedWallet,
  onAddMoneyToVirtualCard,
  isViewingDetail,
  onRedeemMoney,
  isRedeeming,
  setIsRedeeming,
  loadRedeemMoney,
  openConfirmModal,
  setOpenConfirmModal,
  virtualCard,
  shouldClear,
  PIN,
  setPIN,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data[0] && isViewingDetail) {
      setStep(step + 1);
    }
  }, [data]);

  const currency =
    selectedWallet?.CurrencyCode || selectedWallet?.Currency;
  useEffect(() => {
    if (isViewingDetail) {
      return () => {
        setStep(1);
      };
    }
  }, []);
  const defaultOption =
    walletList && walletList.find(item => item.Default === 'YES');
  const { walletList: myWalletsList } = useSelector(
    state => state.user.myWallets,
  );
  const [setCurrentOpt] = useState({});
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    if (defaultOption) {
      setCurrentOpt(defaultOption);
    }
  }, [defaultOption]);
  useEffect(() => {
    if (step === 3 && isViewingDetail) {
      setStep(1);
      setOpen(false);
      setErrors(null);
    }
  }, [step]);

  return (
    <Wrapper>
      {' '}
      <TransitionablePortal
        transition={{
          duration: 400,
          animation: 'fade',
        }}
        onClose={() => setOpen(false)}
        open={addMoneyOpen}
      >
        <Modal
          size="small"
          open={addMoneyOpen}
          closeOnDocumentClick={false}
          closeOnDimmerClick={false}
          onOpen={() => {
            setOpen(false);
          }}
        >
          <Modal.Header centered className="modal-title">
            {isRedeeming
              ? global.translate(`Redeem money from my O-Card`)
              : global.translate(`Add money to my O-Card`)}
          </Modal.Header>
          {step === 1 && (
            <Modal.Content className="entities">
              <div className="entities">
                <TransactionEntity
                  customStyle
                  data={userData}
                  id={1}
                  currentOption={selectedWallet}
                  setCurrentOption={setSelectedWallet}
                  isSendingCash={isSendingCash}
                  name="sourceWallet"
                  form={form}
                  walletList={myWalletsList}
                  onChange={onOptionsChange}
                  destinationContact={destinationContact}
                  isRedeeming={isRedeeming}
                />{' '}
              </div>
              <div className="remaining-money-shade">
                <h4 className="available">
                  {global.translate(
                    'Available Balance in the Selected Wallet',
                  )}
                  <p className="available-value">
                    {formatNumber(selectedWallet?.Balance, {
                      locales: preferred,
                      currency,
                    })}
                  </p>
                </h4>
              </div>
              {isRedeeming ? (
                ''
              ) : (
                <div className="wrap-money-form">
                  <div className="wrap-money-input">
                    <div>{global.translate('Amount')}</div>
                    <div className="money-input">
                      <Input
                        type="number"
                        name="amount"
                        placeholder={global.translate('Amount')}
                        onChange={onOptionsChange}
                        value={form?.amount || null}
                        min="0"
                      />
                      <span>{currency}</span>
                    </div>
                  </div>
                </div>
              )}
              {isRedeeming ? (
                ''
              ) : (
                <div className="loader-section">
                  {errors && <Message message={errors} />}
                  {confirmationError && confirmationError[0] && (
                    <Message
                      message={
                        confirmationError[0].Description
                          ? global.translate(
                              confirmationError[0].Description,
                            )
                          : global.translate(confirmationError.error)
                      }
                    />
                  )}
                  {confirmationError && !confirmationError[0] && (
                    <Message
                      message={global.translate(
                        confirmationError.error,
                      )}
                    />
                  )}
                  {checking && (
                    <LoaderComponent
                      loaderContent={global.translate(
                        'Working…',
                        412,
                      )}
                    />
                  )}
                </div>
              )}
            </Modal.Content>
          )}
          {step === 2 && (
            <Modal.Content className="ss-content">
              {confirmationData && confirmationData[0] && (
                <>
                  <div className="ss-amount">
                    <p>{global.translate('Amount')}: </p> &nbsp;&nbsp;
                    <p>
                      <strong>{confirmationData[0].Amount}</strong>
                    </p>
                  </div>
                  <div className="fees">
                    <div className="fees-list">
                      <p>{global.translate('Fees')}</p>

                      <div className="fees-item">
                        <p className="left">
                          {global.translate('Fees')}:
                        </p>
                        <p className="right">
                          {confirmationData[0].Fees}
                        </p>
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
                        <p className="left">
                          {global.translate('Taxes')}:
                        </p>
                        <p className="right">
                          {confirmationData[0].Taxes}
                        </p>
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
                      <p
                        className="left"
                        style={{ marginTop: '13px' }}
                      >
                        {global.translate('Total')}:
                      </p>
                      <p className="right">
                        <strong
                          className="bolder"
                          style={{
                            fontSize: '20px',
                            fontWeight: 500,
                          }}
                        >
                          {confirmationData[0].TotalAmount}
                        </strong>
                      </p>
                    </div>
                    <div className="fees-item">
                      <p
                        className="left"
                        style={{ marginTop: '13px' }}
                      >
                        {global.translate('Amount to be received')}:
                      </p>
                      <p className="right">
                        {' '}
                        <strong
                          className="bolder"
                          style={{
                            fontSize: '20px',
                            fontWeight: 500,
                          }}
                        >
                          {confirmationData[0].AmountToBeSent}
                        </strong>
                      </p>
                    </div>
                  </div>
                </>
              )}
              <>
                <div className="pin-number">
                  <PinCodeForm
                    shouldClear={shouldClear}
                    label={global.translate(
                      'Confirm  your PIN number',
                      941,
                    )}
                    onChange={onOptionsChange}
                    name="pin"
                  />
                </div>
                <div
                  className="loader-section"
                  style={{ alignSelf: 'center' }}
                >
                  {' '}
                  {errors && shouldClear && (
                    <Message message={errors} />
                  )}
                  <>
                    {' '}
                    {error && shouldClear && (
                      <Message message={global.translate(error)} />
                    )}
                    {error && !error[0] && (
                      <Message
                        message={global.translate(error.error)}
                      />
                    )}
                  </>
                </div>
              </>
            </Modal.Content>
          )}
          <Modal.Actions>
            <>
              {step !== 1 && step !== 3 && (
                <Button
                  disabled={checking || loading}
                  className="btn--cancel"
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  {global.translate('Back')}
                </Button>
              )}
              {step !== 3 && (
                <Button
                  disabled={loading}
                  className="btn--cancel"
                  onClick={() => {
                    setAddMoneyOpen(!addMoneyOpen);
                    setIsRedeeming(false);
                    setStep(1);
                    setIsRedeeming(false);
                    setForm({
                      ...form,
                      amount: '',
                    });
                    setErrors(null);
                    clearConfirmation()(dispatch);
                  }}
                >
                  {global.translate('Cancel')}
                </Button>
              )}

              {isRedeeming ? (
                <Button
                  className="btn--confirm"
                  onClick={() => {
                    setOpenConfirmModal(true);
                    setAddMoneyOpen(false);
                  }}
                >
                  {global.translate('Redeem Money')}
                </Button>
              ) : (
                <Button
                  className="btn--confirm"
                  loading={loading}
                  disabled={checking || loading}
                  onClick={() => {
                    if (step === 1) {
                      checkTransactionConfirmation();
                    } else if (step === 2) {
                      onAddMoneyToVirtualCard();
                    }
                  }}
                >
                  {global.translate('Add money')}
                </Button>
              )}
            </>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>
      <NestedModal
        setAddMoneyOpen={setAddMoneyOpen}
        setIsRedeeming={setIsRedeeming}
        onRedeeMoney={onRedeemMoney}
        isRedeeming={isRedeeming}
        setPIN={setPIN}
        PIN={PIN}
        addMoneyOpen={addMoneyOpen}
        setOpenConfirmModal={setOpenConfirmModal}
        openConfirmModal={openConfirmModal}
        loadRedeeMoney={loadRedeemMoney}
        errors={errors}
        error={error}
        virtualCard={virtualCard}
      />
    </Wrapper>
  );
};

AddMoneyModal.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  setForm: PropTypes.func,
  checkTransactionConfirmation: PropTypes.func,
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any).isRequired,
  confirmationData: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  setErrors: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  errors: PropTypes.string,
  isSendingCash: PropTypes.bool,
  addMoneyOpen: PropTypes.bool,
  setAddMoneyOpen: PropTypes.func,
  selectedWallet: PropTypes.objectOf(PropTypes.any),
  setSelectedWallet: PropTypes.func,
  onAddMoneyToVirtualCard: PropTypes.func,
  isViewingDetail: PropTypes.bool,
  onRedeemMoney: PropTypes.func,
  isRedeeming: PropTypes.bool,
  loadRedeemMoney: PropTypes.bool,
  setIsRedeeming: PropTypes.func,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  virtualCard: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldClear: PropTypes.bool.isRequired,
  PIN: PropTypes.string.isRequired,
  setPIN: PropTypes.func.isRequired,
};

AddMoneyModal.defaultProps = {
  loading: false,
  errors: null,
  checkTransactionConfirmation: () => {},
  checking: false,
  setForm: () => {},
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  isSendingCash: PropTypes.bool,
  addMoneyOpen: false,
  setAddMoneyOpen: () => {},
  selectedWallet: {},
  setSelectedWallet: () => {},
  onAddMoneyToVirtualCard: () => {},
  isViewingDetail: false,
  onRedeemMoney: () => {},
  isRedeeming: false,
  loadRedeemMoney: false,
  setIsRedeeming: () => {},
  openConfirmModal: false,
  setOpenConfirmModal: () => {},
};
export default AddMoneyModal;
