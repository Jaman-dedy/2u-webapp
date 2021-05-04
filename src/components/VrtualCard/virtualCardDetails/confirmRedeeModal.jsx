import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import PINConfirmationModal from 'components/common/PINConfirmationModal';

const NestedModal = ({
  setIsRedeeming,
  setAddMoneyOpen,
  setPIN,
  PIN,
  openConfirmModal,
  setOpenConfirmModal,
  onRedeeMoney,
  errors,
  error,
  virtualCard,
}) => {
  const closeModal = () => {
    setIsRedeeming(false);
    setAddMoneyOpen(false);
    setOpenConfirmModal(false);
  };
  const { redeeMoney } = useSelector(
    ({ virtualCard }) => virtualCard,
  );

  return (
    <PINConfirmationModal
      setOpen={setOpenConfirmModal}
      open={openConfirmModal}
      onClose={closeModal}
      PIN={PIN}
      setPIN={setPIN}
      loading={redeeMoney?.loading}
      onPinConfirm={onRedeeMoney}
    />
  );
};

NestedModal.propTypes = {
  setIsRedeeming: PropTypes.func,
  setAddMoneyOpen: PropTypes.func,
  setPIN: PropTypes.func.isRequired,
  PIN: PropTypes.string.isRequired,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  onRedeeMoney: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  virtualCard: PropTypes.objectOf(PropTypes.any),
};

NestedModal.defaultProps = {
  setIsRedeeming: () => {},
  setAddMoneyOpen: () => {},

  openConfirmModal: false,
  setOpenConfirmModal: () => {},
  onRedeeMoney: false,
  loadRedeeMoney: false,
  errors: {},
  error: {},
  virtualCard: {},
};

export default NestedModal;
