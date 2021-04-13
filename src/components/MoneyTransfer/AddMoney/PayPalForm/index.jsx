import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Info from 'components/common/Alert/Info';

const PayPalForm = ({
  errors,
  addMoneyData,
  handleInputChange,
  step,
  setStep,
  handleBackEvent,
  setAddMoneyData,
  handleSubmitPayPal,
  payPalOperationFees,
}) => {
  const { loading, success, error } = payPalOperationFees;
  useEffect(() => {
    setAddMoneyData({
      ...addMoneyData,
      Currency: 'USD',
    });
  }, []);
  useEffect(() => {
    if (success || error) {
      setStep(step + 1);
    }
  }, [success, error]);
  return (
    <Form className="add-money-form" autoComplete="off">
      <div className="amount">
        <Form.Input
          placeholder={global.translate('Amount', 116)}
          className="amount-pay-pal-input"
          error={errors.Amount || false}
          name="Amount"
          value={addMoneyData.Amount}
          onChange={handleInputChange}
          type="number"
          required
        />
        <Form.Input
          placeholder={global.translate('Currency')}
          className="amount-currency-input"
          name="currency"
          value={addMoneyData.Currency}
          required
        />
      </div>
      <Info
        message={global.translate(
          'You are going to be redirected to PayPal website',
        )}
      />
      <div className="topup-actions">
        <Form.Button onClick={handleBackEvent}>
          {global.translate('Back', 174)}
        </Form.Button>

        <Form.Button
          type="button"
          loading={loading}
          onClick={handleSubmitPayPal}
          positive
          disabled={!addMoneyData?.Amount}
        >
          {global.translate('Next', 10)}
        </Form.Button>
      </div>
    </Form>
  );
};

PayPalForm.propTypes = {
  errors: PropTypes.instanceOf(Object),
  addMoneyData: PropTypes.instanceOf(Object),
  handleInputChange: PropTypes.func,
  options: PropTypes.instanceOf(Array),
  cvvRef: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func,
  step: PropTypes.instanceOf(Object),
  setStep: PropTypes.func,
  handleBackEvent: PropTypes.func,
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  selectedMonth: PropTypes.string.isRequired,
  setSelectedMonth: PropTypes.func,
  CustomInput: PropTypes.func,
};

PayPalForm.defaultProps = {
  errors: {},
  addMoneyData: {},
  handleInputChange: {},
  options: [],
  cvvRef: {},
  handleSubmit: {},
  step: {},
  setStep: {},
  handleBackEvent: () => {},
  addMoneyFromCreditCard: {},
  setSelectedMonth: () => {},
  CustomInput: () => {},
};

export default PayPalForm;
