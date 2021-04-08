/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import InfoMessage from 'components/common/Alert/InfoMessage';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import getVirtualCard from 'redux/actions/virtualCard/getVirtualCard';
import VirtualCard from '../Item';
import TableDetails from '../TableDetails';
import './styles.scss';

const VirtualCardDetails = ({
  selectedWallet,
  setSelectedWallet,
  onOptionsChange,
  form,
  setForm,
  onAddMoneyToVirtualCard,
  isViewingDetail,
  setIsViewingDetail,
  userLocationData,
  step,
  setStep,
  setErrors,
  errors,
  checkTransactionConfirmation,
  confirmationData,
  confirmationError,
  checking,
  loading,
  addMoneyOpen,
  setAddMoneyOpen,
  setCardStatus,
  onUpdateCardStatus,
  loadingStatus,
  onRenewVirtualCard,
  renewCardLoad,
  onRedeeMoney,
  setisRedeeming,
  isRedeeming,
  loadRedeeMoney,
  error,
  userData,
  confirmRedeem,
  setConfirmRedeem,
  openConfirmModal,
  setOpenConfirmModal,
  shouldClear,
  canProceed,
  setCanProceed,
  PIN,
  setPIN,
}) => {
  const [canViewDetail, setCanViewDetail] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);

  const dispatch = useDispatch();

  const {
    virtualCardList: { data },
  } = useSelector(state => state.virtualCard);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setCurrentCard(
      data?.find(
        item => item.CardNumber === location?.state?.item.CardNumber,
      ),
    );
  }, [location, data]);

  useEffect(() => {
    if (!data) {
      getVirtualCard()(dispatch);
    }
  }, []);

  useEffect(() => {
    setIsViewingDetail(true);
  }, []);
  useEffect(() => {
    if (currentCard) {
      setCardStatus(currentCard.Enabled);
    } else {
      setCardStatus(location?.state?.item?.Enabled);
    }
  }, [currentCard]);
  const onClickHandler = () => history.goBack();

  useEffect(() => {
    setForm({
      ...form,
      CardNumber: location?.state?.item.CardNumber,
    });
  }, []);

  const cardExpired = () => {
    if (!currentCard) {
      return false;
    }
    const expiryDate = new Date(
      Number(currentCard.YYYY),
      Number(currentCard.MM),
      1,
      0,
      0,
      0,
      0,
    );
    return new Date() > expiryDate;
  };

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('O-Card', 1999)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>

      <div className="VirtualCardDetails">
        <VirtualCard
          virtualCard={currentCard}
          userData={userData?.data}
          canViewDetail={canViewDetail}
          setCanViewDetail={setCanViewDetail}
          selectedWallet={selectedWallet && selectedWallet}
          setSelectedWallet={setSelectedWallet}
          onOptionsChange={onOptionsChange}
          form={form}
          setForm={setForm}
          onAddMoneyToVirtualCard={onAddMoneyToVirtualCard}
          isViewingDetail={isViewingDetail}
          userLocationData={userLocationData}
          step={step}
          setStep={setStep}
          errors={errors}
          setErrors={setErrors}
          checking={checking}
          confirmationData={confirmationData}
          confirmationError={confirmationError}
          loading={loading}
          addMoneyOpen={addMoneyOpen}
          setAddMoneyOpen={setAddMoneyOpen}
          onRedeemMoney={onRedeeMoney}
          isRedeeming={isRedeeming}
          setIsRedeeming={setisRedeeming}
          loadRedeemMoney={loadRedeeMoney}
          error={error}
          confirmRedeem={confirmRedeem}
          setConfirmRedeem={setConfirmRedeem}
          checkTransactionConfirmation={checkTransactionConfirmation}
          setOpenConfirmModal={setOpenConfirmModal}
          openConfirmModal={openConfirmModal}
          shouldClear={shouldClear}
          PIN={PIN}
          setPIN={setPIN}
        />
        <br />
        <div className="card-details">
          {currentCard && currentCard?.Enabled === 'NO' && (
            <InfoMessage
              description={global.translate(
                `This card is currently disabled. When your O-Card is disabled, it will not be used
            for any online transaction, until you enable it again`,
                2142,
              )}
              className="virtual-card-info"
            />
          )}
          <TableDetails
            card={currentCard}
            setCanProceed={setCanProceed}
            onUpdateConfirmed={onUpdateCardStatus}
            onRenewVirtualCard={onRenewVirtualCard}
            loadOnChangeStatus={loadingStatus}
            loadOnRenew={renewCardLoad}
            isExpired={cardExpired()}
            setAddMoneyOpen={setAddMoneyOpen}
            setIsRedeeming={setisRedeeming}
            loadRedeeming={loadRedeeMoney}
            loadAddMoney={loading}
            canProceed={canProceed}
            setPIN={setPIN}
            PIN={PIN}
            setForm={setForm}
            form={form}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
VirtualCardDetails.propTypes = {
  selectedWallet: PropTypes.objectOf(PropTypes.any),
  setSelectedWallet: PropTypes.func,
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  onAddMoneyToVirtualCard: PropTypes.func,
  isViewingDetail: PropTypes.bool,
  setIsViewingDetail: PropTypes.func,
  userLocationData: PropTypes.objectOf(PropTypes.any),
  step: PropTypes.number,
  setStep: PropTypes.func,
  setErrors: PropTypes.func,
  errors: PropTypes.string,
  checkTransactionConfirmation: PropTypes.func,
  confirmationData: PropTypes.objectOf(PropTypes.any),
  confirmationError: PropTypes.objectOf(PropTypes.any),
  checking: PropTypes.bool,
  loading: PropTypes.bool,
  addMoneyOpen: PropTypes.bool,
  setAddMoneyOpen: PropTypes.func,
  setCardStatus: PropTypes.func,
  onUpdateCardStatus: PropTypes.func,
  loadingStatus: PropTypes.bool,
  onRenewVirtualCard: PropTypes.func,
  renewCardLoad: PropTypes.bool,
  onRedeeMoney: PropTypes.func,
  setisRedeeming: PropTypes.func,
  isRedeeming: PropTypes.bool,
  loadRedeeMoney: PropTypes.bool,
  error: PropTypes.string,
  userData: PropTypes.objectOf(PropTypes.any),
  confirmRedeem: PropTypes.bool,
  setConfirmRedeem: PropTypes.func,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  shouldClear: PropTypes.bool,
  canProceed: PropTypes.bool,
  setCanProceed: PropTypes.func.isRequired,
  PIN: PropTypes.string.isRequired,
  setPIN: PropTypes.func.isRequired,
};
VirtualCardDetails.defaultProps = {
  selectedWallet: {},
  setSelectedWallet: () => {},
  onOptionsChange: () => {},
  form: {},
  setForm: () => {},
  onAddMoneyToVirtualCard: () => {},
  isViewingDetail: false,
  setIsViewingDetail: () => {},
  userLocationData: {},
  step: null,
  setStep: () => {},
  setErrors: () => {},
  errors: null,
  checkTransactionConfirmation: () => {},
  confirmationData: {},
  confirmationError: null,
  checking: false,
  loading: false,
  addMoneyOpen: false,
  setAddMoneyOpen: () => {},
  setCardStatus: () => {},
  onUpdateCardStatus: () => {},
  loadingStatus: false,
  onRenewVirtualCard: () => {},
  renewCardLoad: false,
  onRedeeMoney: () => {},
  setisRedeeming: () => {},
  isRedeeming: false,
  loadRedeeMoney: false,
  error: null,
  userData: {},
  confirmRedeem: false,
  setConfirmRedeem: () => {},
  openConfirmModal: false,
  setOpenConfirmModal: () => {},
  shouldClear: false,
  canProceed: false,
};

export default VirtualCardDetails;
