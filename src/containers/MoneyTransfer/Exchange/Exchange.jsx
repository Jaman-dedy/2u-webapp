import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/money-transfer/moveFunds';
import getallContacts from 'redux/actions/contacts/getContactList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction from 'redux/actions/money-transfer/confirmTransaction';
import ExchangeCurrency from 'components/MoneyTransfer/currencyExchange/CurrencyExchange';

const CurrencyExchangeContainer = ({
  setSendMoneyOpen,
  sendMoneyOpen,
}) => {
  const { allContacts } = useSelector(state => state.contacts);
  const { walletList } = useSelector(state => state.user.myWallets);
  const { userData } = useSelector(({ user }) => user);
  const [contactPID, setContactPID] = React.useState();
  const [form, setForm] = useState({});
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState(null);
  const wallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );

  const [DefaultWallet, setDefaultWallet] = useState(wallet);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (DefaultWallet) {
      setForm({ ...form, user2wallets: DefaultWallet.AccountNumber });
    }
  }, [DefaultWallet, sendMoneyOpen]);

  useEffect(() => {
    setForm({ ...form, user1wallets: DefaultWallet.AccountNumber });
  }, [form.user2wallets]);
  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);
  const { loading, error, data } = useSelector(
    state => state.moneyTransfer.moveFundsTo2UWallet,
  );
  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      setStep(step + 1);
    }
  }, [confirmationData]);

  useEffect(() => {
    if (data && data[0]) {
      clearMoveFundsErrors()(dispatch);
    }
  }, [data]);

  const resetState = () => {
    clearMoveFundsErrors()(dispatch);
  };

  useEffect(() => {
    if (walletList && walletList.length > 0) {
      setDefaultWallet(
        walletList.find(wallet => wallet.Default === 'YES'),
      );
    }
  }, [walletList]);

  const balanceData = useSelector(state => state.user.userData.data);

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.Balance);
    }
  }, [balanceData]);

  useEffect(() => {
    getMyWallets()(dispatch);
  }, []);
  const loadContacts = () => getallContacts()(dispatch);
  useEffect(() => {
    if (!allContacts.data) {
      loadContacts();
    }
  }, []);

  const isUsingDefaultWallet = () =>
    userData.data.DefaultWallet === form.user1wallets || false;

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0) {
      setErrors('The Exchange amount can not be zero');
      hasError = true;
    }
    if (parseFloat(balanceOnWallet, 10) === 0) {
      setErrors('The selected wallet has no funds');
      hasError = true;
      return true;
    }

    if (form.amount === '' || !form.amount) {
      setErrors('Please enter an amount.');
      hasError = true;
    }
    if (form.user2wallets === '' || !form.user2wallets) {
      setErrors('Please choose the To wallet');
      hasError = true;
    }
    if (form.user1wallets === '' || !form.user1wallets) {
      setErrors('Please choose your from wallet');
      hasError = true;
    }
    if (form.user1wallets === !'' || form.user1wallets) {
      if (form.user2wallets === form.user1wallets) {
        setErrors(
          'The Source Wallet and the To Wallet should be different',
        );
        hasError = true;
      }
    }

    return hasError;
  };

  const checkTransactionConfirmation = () => {
    const data = {
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: currency,
      TargetType: '1',
      SourceWallet: form.user1wallets,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };
  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;
  const pinIsValid = () => PIN.length === 4;
  const moveFundsToToUWallet = () => {
    const data = {
      PIN,
      Amount: form.amount && form.amount.toString(),
      ContactPID: contactPID,
      UseDefaultWallet: isUsingDefaultWallet() ? 'YES' : 'No',
      TargetWallet: form.user2wallets,
      SourceWallet: form.user1wallets,
      Reference: form.reference || '',
      Description: form.description || '',
    };

    if (!pinIsValid()) {
      setErrors('Please enter your 4 digit PIN Number');
      return;
    }

    setErrors(null);
    moveFunds(data)(dispatch);
  };

  useEffect(() => {
    if (form.user1wallets && walletList) {
      const walletData =
        walletList &&
        walletList.find(
          item => item.AccountNumber === form.user1wallets,
        );
      if (walletData) {
        setBalance(
          `${walletData.Balance} ${walletData.CurrencyCode}`,
        );
        setCurrency(walletData.CurrencyCode);
      }
    }
  }, [form]);

  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const onChange = e => {
    e.persist();
    setForm({ ...form, [e.target.name]: e.target.checked });
  };
  return (
    <ExchangeCurrency
      history={history}
      allContacts={allContacts}
      setErrors={setErrors}
      walletList={walletList}
      userData={userData}
      onChange={onChange}
      onOptionsChange={onOptionsChange}
      form={form}
      balanceOnWallet={balanceOnWallet}
      setBalance={setBalance}
      setForm={setForm}
      modalOpen={sendMoneyOpen}
      setOpen={setSendMoneyOpen}
      checkTransactionConfirmation={checkTransactionConfirmation}
      currency={currency}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      moveFundsToToUWallet={moveFundsToToUWallet}
      setContactPID={setContactPID}
      loading={loading}
      errors={errors}
      error={error}
      data={data}
      retryContacts={loadContacts}
      DefaultWallet={DefaultWallet}
      step={step}
      setStep={setStep}
      resetState={resetState}
    />
  );
};

CurrencyExchangeContainer.propTypes = {
  setSendMoneyOpen: PropTypes.func.isRequired,
  sendMoneyOpen: PropTypes.bool.isRequired,
};
export default CurrencyExchangeContainer;
