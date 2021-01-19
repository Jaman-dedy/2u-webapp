/* eslint-disable import/order */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CardInfo from 'components/common/Card';
import PropTypes from 'prop-types';
import React from 'react';
import { Item } from 'semantic-ui-react';
import AddMoneyModal from './AddMoneyModal';

import './item.scss';

const VirtualCard = ({
  virtualCard,
  userData,
  form,
  setForm,
  selectedWallet,
  setSelectedWallet,
  onOptionsChange,
  onAddMoneyToVirtualCard,
  isViewingDetail,
  userLocationData,
  step,
  setStep,
  errors,
  setErrors,
  checkTransactionConfirmation,
  confirmationData,
  checking,
  confirmationError,
  loading,
  addMoneyOpen,
  setAddMoneyOpen,
  onRedeemMoney,
  isRedeeming,
  setIsRedeeming,
  loadRedeeMoney,
  error,
  openConfirmModal,
  setOpenConfirmModal,
  shouldClear,
}) => {
  return (
    <Item className="virtual-card-item ">
      <CardInfo
        card={virtualCard}
        detail
        onClick={() => {}}
        userData={userData}
      />
      <br />
      <Item.Content verticalAlign="middle" />
      <AddMoneyModal
        addMoneyOpen={addMoneyOpen}
        setAddMoneyOpen={setAddMoneyOpen}
        virtualCard={virtualCard}
        userData={userData}
        form={form}
        setForm={setForm}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        onOptionsChange={onOptionsChange}
        onAddMoneyToVirtualCard={onAddMoneyToVirtualCard}
        isViewingDetail={isViewingDetail}
        userLocationData={userLocationData}
        step={step}
        setStep={setStep}
        setErrors={setErrors}
        errors={errors}
        checkTransactionConfirmation={checkTransactionConfirmation}
        confirmationData={confirmationData}
        confirmationError={confirmationError}
        checking={checking}
        loading={loading}
        onRedeemMoney={onRedeemMoney}
        isRedeeming={isRedeeming}
        setIsRedeeming={setIsRedeeming}
        loadRedeemMoney={loadRedeeMoney}
        error={error}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        shouldClear={shouldClear}
      />
    </Item>
  );
};

VirtualCard.propTypes = {
  virtualCard: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setAddMoneyOpen: PropTypes.func,
  addMoneyOpen: PropTypes.bool.isRequired,
  setSelectedWallet: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  setForm: PropTypes.func,
  selectedWallet: PropTypes.func,
  onOptionsChange: PropTypes.func,
  onAddMoneyToVirtualCard: PropTypes.func,
  isViewingDetail: PropTypes.bool,
  userLocationData: PropTypes.objectOf(PropTypes.any),
  step: PropTypes.number,
  setStep: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.any),
  setErrors: PropTypes.func,
  checkTransactionConfirmation: PropTypes.func,
  confirmationData: PropTypes.objectOf(PropTypes.any),
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  onRedeemMoney: PropTypes.func,
  isRedeeming: PropTypes.bool,
  setIsRedeeming: PropTypes.func,
  loadRedeeMoney: PropTypes.bool,
  error: PropTypes.string,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  shouldClear: PropTypes.bool,
};
VirtualCard.defaultProps = {
  setAddMoneyOpen: () => {},
  setForm: () => {},
  selectedWallet: () => {},
  onOptionsChange: () => {},
  onAddMoneyToVirtualCard: () => {},
  isViewingDetail: false,
  userLocationData: {},
  step: PropTypes.number,
  setStep: () => {},
  errors: {},
  setErrors: () => {},
  checkTransactionConfirmation: () => {},
  confirmationData: {},
  checking: false,
  confirmationError: {},
  loading: false,
  onRedeemMoney: () => {},
  isRedeeming: false,
  setIsRedeeming: () => {},
  loadRedeeMoney: false,
  error: null,
  openConfirmModal: false,
  setOpenConfirmModal: () => {},
  shouldClear: false,
};

export default VirtualCard;
