import './modal.scss';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';
import { getPossibleDates } from 'utils/monthdates';

import ConfirmationForm from '../../ConfirmationForm';

const SendMoneyModal = ({ sendMoneyModal, locateUser }) => {
  const dispatch = useDispatch();
  const [shouldClear, setShouldClear] = useState(false);

  const {
    form,
    confirmationData,
    openModal: open,
    setOpenModal: setOpen,
    step,
    errors,
    setErrors,
    onOptionsChange,
    moveFundsToToUWallet,
    resetState,
    loading,
    moveFundError,
  } = sendMoneyModal;

  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));
  const clearForm = () => {
    setOpen(false);
    resetState();
    setErrors(null);
  };

  return (
    <Modal
      size="small"
      open={open}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      onClose={() => {
        setOpen(false);
        resetState();
        clearForm();
      }}
    >
      <Modal.Header className="modal-title">
        {global.translate(`Transfer money to  `)}
        <strong>
          &nbsp; {locateUser?.data && locateUser?.data[0].FirstName}
        </strong>
      </Modal.Header>

      {step === 2 && confirmationData && confirmationData[0] && (
        <ConfirmationForm
          confirmationData={confirmationData[0]}
          onOptionsChange={onOptionsChange}
          form={form}
          errors={errors}
          error={moveFundError}
          loading={loading}
          days={days}
          shouldClear={shouldClear}
          setShouldClear={setShouldClear}
        />
      )}

      <Modal.Actions>
        <>
          <Button
            basic
            color="red"
            disabled={loading}
            onClick={() => {
              clearForm();
              setOpen(false);
              clearFoundUser()(dispatch);
            }}
          >
            {global.translate('Cancel')}
          </Button>

          <Button
            positive
            disabled={loading}
            loading={loading}
            onClick={() => {
              if (step === 2) {
                moveFundsToToUWallet();
              }
            }}
          >
            {global.translate('Transfer Money')}
          </Button>
        </>
      </Modal.Actions>
    </Modal>
  );
};

SendMoneyModal.propTypes = {
  sendMoneyModal: PropTypes.objectOf(PropTypes.any).isRequired,
  locateUser: PropTypes.objectOf(PropTypes.any).isRequired,
  setResult: PropTypes.func,
};

SendMoneyModal.defaultProps = {
  setResult: () => {},
};

export default SendMoneyModal;
