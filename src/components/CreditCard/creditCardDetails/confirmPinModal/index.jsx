import React from 'react';
import propTypes from 'prop-types';
import { Button, Message, Modal } from 'semantic-ui-react';
import PinCodeForm from 'components/common/PinCodeForm';
import classes from './Mypin.module.scss';

const ConfirmPin = ({
  open,
  handleActivateCard,
  setError,
  error,
  setUserPinDigit,
  userPinDigit,
  setShouldClear,
  isChangingPwd,
  isActivatingCard,
  isEnablingCard,
  handleChangeCreditCardPin,
  setIsActivatingCard,
  setIsEnablingCard,
  setIsChangingPwd,
  setForm,
  handleEnableCard,
  loading,
  modalTitle,
  children,
  isDeletingCard,
  handleDeleteCard,
  canProceed,
  setIsDeletingCard,
}) => {
  return (
    <Modal
      size="tiny"
      open={open}
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
      closeOnEscape={false}
    >
      <Modal.Header style={{ textAlign: 'center' }}>
        {modalTitle ??
          global.translate('Confirm with your PIN', 2125)}
      </Modal.Header>
      <Modal.Content>
        {children}
        <div className={classes.PinFormNumber}>
          <PinCodeForm
            label={global.translate('Provide your PIN Number', 543)}
            onChange={({ target: { value, name } }) => {
              setError(null);
              setUserPinDigit({
                ...userPinDigit,
                [name]: value,
              });
            }}
            name="PIN"
            setShouldClear={setShouldClear}
          />
          {error && (
            <Message negative icon>
              <span style={{ width: '100%', fontSize: '.9rem' }}>
                {error}
              </span>
            </Message>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={loading}
          className="btn--cancel"
          onClick={() => {
            setIsActivatingCard(false);
            setIsEnablingCard(false);
            setIsChangingPwd(false);
            setIsDeletingCard(false);
            setForm({});
            setShouldClear(true);
          }}
        >
          {global.translate('Cancel', 86)}
        </Button>
        <Button
          loading={loading}
          disabled={loading || (!canProceed && isDeletingCard)}
          positive
          onClick={() => {
            if (isChangingPwd) {
              handleChangeCreditCardPin();
            }
            if (isActivatingCard) {
              handleActivateCard();
            }
            if (isEnablingCard) {
              handleEnableCard();
            }
            if (isDeletingCard) {
              handleDeleteCard();
            }
          }}
        >
          {global.translate('Proceed', 1752)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ConfirmPin.propTypes = {
  open: propTypes.bool.isRequired,
  handleActivateCard: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
  setUserPinDigit: propTypes.func.isRequired,
  userPinDigit: propTypes.instanceOf(Object).isRequired,
  setShouldClear: propTypes.func.isRequired,
  isEnablingCard: propTypes.bool.isRequired,
  isActivatingCard: propTypes.bool.isRequired,
  isChangingPwd: propTypes.bool.isRequired,
  handleChangeCreditCardPin: propTypes.func.isRequired,
  setIsChangingPwd: propTypes.func.isRequired,
  setIsActivatingCard: propTypes.func.isRequired,
  setIsEnablingCard: propTypes.func.isRequired,
  setForm: propTypes.func.isRequired,
  error: propTypes.string.isRequired,
  handleEnableCard: propTypes.func.isRequired,
  isDeletingCard: propTypes.bool.isRequired,
  children: propTypes.instanceOf(React.Children),
  canProceed: propTypes.bool,
  handleDeleteCard: propTypes.func,
  modalTitle: propTypes.string,
  loading: propTypes.string,
  setIsDeletingCard: propTypes.func.isRequired,
};
ConfirmPin.defaultProps = {
  children: null,
  canProceed: true,
  handleDeleteCard: () => {},
  modalTitle: '',
  loading: false,
};
export default ConfirmPin;
