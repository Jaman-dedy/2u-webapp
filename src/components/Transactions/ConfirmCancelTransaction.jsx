import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PinCodeForm from 'components/common/PinCodeForm';
import Message from 'components/common/Message';

import LoaderComponent from 'components/common/Loader';
import { clearMoveFundsErrors } from 'redux/actions/money-transfer/moveFunds';
import CashListTransactionDetails from './TransactionDetails';

const ConfirmCancelTransaction = ({
  open,
  setOpen,
  item,
  onPositiveConfirm,
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const {
    cancelTransaction: { loading, data, error: err },
  } = useSelector(state => state.transactions);
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setStep(1);
      setOpen(false);
      toast.success(
        global.translate(
          'Your Cash transaction has been cancelled.',
          1117,
        ),
      );

      clearMoveFundsErrors()(dispatch);
    }
  }, [data]);

  const cancelCashListTransaction = () => {
    const { digit0, digit1, digit2, digit3 } = form;
    const PIN = `${digit0}${digit1}${digit2}${digit3}`;
    if (PIN.length !== 4) {
      setError(
        global.translate('Please provide your PIN number.', 543),
      );
      return;
    }
    setError(null);
    onPositiveConfirm({ item, PIN });
  };
  return (
    <div>
      <Modal size="mini" open={open} onClose={() => setOpen(false)}>
        <Modal.Header className="modal-title">
          {global.translate(
            'Are you sure, you want to cancel this transaction?',
            23,
          )}
        </Modal.Header>
        <Modal.Content centered className="main-content">
          {step === 1 && <CashListTransactionDetails item={item} />}
          {step === 2 && (
            <>
              {loading ? (
                <LoaderComponent
                  loaderContent={global.translate('Working…')}
                />
              ) : (
                <div className="pin-number-inputs">
                  <PinCodeForm
                    label={global.translate(
                      'Confirm  your PIN number',
                      941,
                    )}
                    onChange={onChange}
                    name="pin"
                    value={form.pin || ''}
                  />
                </div>
              )}
            </>
          )}

          {error && <Message message={error} />}
          {err && (
            <Message
              message={err.error ? err.error : err[0].Description}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          {step !== 2 && (
            <Button
              disabled={loading}
              negative
              onClick={() => setOpen(false)}
            >
              {global.translate('Close')}
            </Button>
          )}

          {step === 2 && (
            <Button
              disabled={loading}
              negative
              onClick={() => setStep(step - 1)}
            >
              {global.translate('Back')}
            </Button>
          )}
          <Button
            disabled={loading}
            positive
            onClick={() => {
              if (step === 1) {
                setStep(step + 1);
              } else {
                cancelCashListTransaction();
              }
            }}
          >
            {step === 1 && global.translate('Yes')}
            {step === 2 && global.translate('Save')}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
ConfirmCancelTransaction.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  onPositiveConfirm: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

ConfirmCancelTransaction.defaultProps = {
  open: false,
};
export default ConfirmCancelTransaction;