/* eslint-disable array-callback-return */
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import VirtualCardDetails from 'components/VrtualCard/virtualCardDetails/VirtualCardDetails';
import addMoneyToVCard, {
  clearAddMoneyToVirtuaCard,
} from 'redux/actions/virtualCard/addMoneyToVirtualCard';
import updateVirtualCardStatus, {
  clearUpdateCardStatus,
} from 'redux/actions/virtualCard/updateCardStatus';
import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction, {
  clearConfirmation,
} from 'redux/actions/moneyTransfer/confirmTransaction';
import renewCard, {
  clearRenewCardStatus,
} from 'redux/actions/virtualCard/renewVirtualCard';
import redeeMyMoney, {
  clearRedeeMoney,
} from 'redux/actions/virtualCard/redeeMoney';
import { VIRTUAL_CARD } from 'constants/general';
import { clearMoveFundsErrors } from 'redux/actions/moneyTransfer/moveFunds';

const VirtualCardDetailsContainer = () => {
  const dispatch = useDispatch();
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState(null);
  const [step, setStep] = useState(1);
  const { userData } = useSelector(({ user }) => user);
  const [toastMessage, setToasMessage] = useState('');
  const [toastCardStatus, setToastCardStatus] = useState(null);
  const [renewCardToast, setrenewCardToast] = useState(null);
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [cardsStatus, setCardStatus] = useState('YES');
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [renewCardLoad, setRenewCardLoad] = useState(false);
  const [loadRedeeMoney, setLoadRedeeMoney] = useState(false);
  const [isRedeeming, setisRedeeming] = useState(false);
  const [error, setError] = useState(null);
  const [confirmRedeem, setConfirmRedeem] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);
  const [destCurrency, setDestCurrency] = useState(null);
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const { walletList } = useSelector(state => state.user.myWallets);
  const [PIN, setPIN] = useState('');
  const location = useLocation();
  const {
    addMoneyToVirtualCard,
    cardStatus,
    renewVirtualCard,
    redeeMoney,
  } = useSelector(({ virtualCard }) => virtualCard);

  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);

  const onOptionsChange = (e, { name, value }) => {
    setShouldClear(false);
    setForm({ ...form, [name]: value });
    if (errors) {
      setErrors(null);
    }

    if (confirmationError) {
      clearMoveFundsErrors()(dispatch);
    }
  };

  useEffect(() => {
    if (location?.state?.item?.Currency) {
      setDestCurrency(location.state.item.Currency);
    }
  }, [location?.state?.item]);

  useEffect(() => {
    if (Array.isArray(walletList)) {
      walletList.map(wallet => {
        if (wallet.Default === 'YES') {
          setSelectedWallet(wallet);
        }
      });
    }
  }, [walletList]);

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  useEffect(() => {
    if (walletList.length) {
      const defaultWalletData = walletList.find(item => {
        return item.AccountNumber === selectedWallet?.AccountNumber;
      });

      setSelectedWallet(defaultWalletData);

      setForm({
        ...form,
        sourceWallet: defaultWalletData?.AccountNumber,
      });
    }
  }, [walletList]);

  useEffect(() => {
    if (addMoneyToVirtualCard?.data) {
      setToasMessage(addMoneyToVirtualCard?.data?.Description);
      setForm({
        ...form,
        amount: '',
        digit0: '',
        digit1: '',
        digit2: '',
        digit3: '',
      });
      setStep(1);
      setAddMoneyOpen(false);
      setError(null);
      setErrors(null);
    }
  }, [addMoneyToVirtualCard?.data]);

  useEffect(() => {
    if (addMoneyToVirtualCard?.error) {
      setError(addMoneyToVirtualCard?.error.Description);
      if (
        addMoneyToVirtualCard.error.Description ===
        'Wrong PIN number. Try again.'
      ) {
        setShouldClear(true);
      }
    }
  }, [addMoneyToVirtualCard?.error]);

  useEffect(() => {
    if (toastMessage) {
      setToasMessage('');
      clearAddMoneyToVirtuaCard()(dispatch);
      clearConfirmation()(dispatch);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (cardStatus?.data) {
      setToastCardStatus(cardStatus.data.Description);
      setCardStatus(cardStatus.data.Enabled);
    }
  }, [cardStatus?.data]);

  useEffect(() => {
    if (toastCardStatus) {
      setToastCardStatus(null);
      clearUpdateCardStatus()(dispatch);
    }
  }, [toastCardStatus]);

  useEffect(() => {
    if (renewVirtualCard?.data) {
      setrenewCardToast(renewVirtualCard.data.Description);
    }
  }, [renewVirtualCard?.data]);

  useEffect(() => {
    if (renewCardToast) {
      setrenewCardToast(null);
      clearRenewCardStatus()(dispatch);
    }
  }, renewCardToast);

  useEffect(() => {
    if (redeeMoney?.data) {
      clearRedeeMoney()(dispatch);
      setStep(1);
      setisRedeeming(false);
      setErrors(null);
      setError(null);
      setOpenConfirmModal(false);
    }
  }, [redeeMoney.data, dispatch]);

  useEffect(() => {
    if (redeeMoney?.error) {
      setStep(1);
      setAddMoneyOpen(false);
      setOpenConfirmModal(false);
    }
  }, [redeeMoney.error]);

  useEffect(() => {
    setIsLoadingStatus(cardStatus.loading);
  }, [cardStatus.loading]);

  useEffect(() => {
    setRenewCardLoad(renewVirtualCard?.loading);
  }, [renewVirtualCard?.loading]);

  useEffect(() => {
    setLoadRedeeMoney(redeeMoney.loading);
  }, [redeeMoney.loading]);

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0) {
      setErrors(
        global.translate('The Transfer amount can not be zero'),
      );
      hasError = true;
    }
    if (parseFloat(form.amount, 10) < 0) {
      setErrors(
        global.translate(
          'The Transfer amount can not be less than zero',

        ),
      );
      hasError = true;
    }
    if (parseFloat(selectedWallet?.Balance, 10) === 0) {
      setErrors(
        global.translate(
          "You don't have enough money in this wallet for this operation",

        ),
      );
      hasError = true;
      return true;
    }

    if (form.amount === '' || !form.amount) {
      setErrors(
        global.translate(
          'You must enter the amount for this operation.',

        ),
      );
      hasError = true;
    }

    return hasError;
  };

  const checkTransactionConfirmation = () => {
    const data = {
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: destCurrency,
      TargetType: VIRTUAL_CARD,
      SourceWallet:
        form.sourceWallet || selectedWallet?.AccountNumber,
      CardNumber: form?.CardNumber,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = form;
    const pinNumber = [];
    if (digit0) {
      pinNumber[0] = digit0;
    }

    if (digit1) {
      pinNumber[1] = digit1;
    }

    if (digit2) {
      pinNumber[2] = digit2;
    }

    if (digit3) {
      pinNumber[3] = digit3;
    }
    setPIN(pinNumber.join(''));
    if (pinNumber.join('').length === 4) {
      setCanProceed(true);
    }
  }, [form]);

  const pinIsValid = useCallback(() => {
    return PIN.length === 4;
  }, [PIN]);

  const onAddMoneyToVirtualCard = () => {
    const data = {
      PIN,
      Amount: form?.amount?.toString(),
      Currency: form?.CurrencyCode ?? location?.state?.item?.Currency,
      SourceWallet:
        form?.sourceWallet || selectedWallet?.AccountNumber,
      CardNumber:
        form?.CardNumber ?? location?.state?.item?.CardNumber,
      TargetType: VIRTUAL_CARD,
    };

    if (!pinIsValid()) {
      setErrors(
        global.translate('Please provide your PIN number.'),
      );
      return;
    }
    if (!form?.amount) {
      setErrors(
        global.translate(
          'Please provide the amount to be added',

        ),
      );
    }
    if (!form?.AccountNumber) {
      setErrors(
        global.translate('You did not select any wallet'),
      );
    }
    setErrors(null);
    addMoneyToVCard(data, '/AddMoneyToVirtualCard')(dispatch);
  };
  useEffect(() => {
    if (pinIsValid()) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [PIN, pinIsValid]);

  const onUpdateCardStatus = () => {
    const status = cardsStatus === 'YES' ? 'NO' : 'YES';
    const data = {
      CardNumber:
        form?.CardNumber ?? location?.state?.item?.CardNumber,
      Enable: status,
      PIN,
    };
    if (pinIsValid()) {
      updateVirtualCardStatus(
        data,
        '/UpdateVirtualCardStatus',
      )(dispatch);
    } else {
      toast.error('Please provide the PIN');
    }
    setForm({
      ...form,
      amount: '',
      digit0: '',
      digit1: '',
      digit2: '',
      digit3: '',
    });
    setPIN('');
    setCanProceed(false);
  };

  const onRenewVirtualCard = () => {
    const data = {
      CardNumber:
        form?.CardNumber ?? location?.state?.item?.CardNumber,
    };
    renewCard(data, '/RenewVirtualCard')(dispatch);
  };

  const onRedeeMoney = () => {
    const data = {
      PIN,
      CardNumber:
        form?.CardNumber ?? location?.state?.item?.CardNumber,
      TargetWallet: selectedWallet?.AccountNumber,
    };
    if (!pinIsValid()) {
      setErrors(
        global.translate('Please provide your PIN number.'),
      );
      return;
    }
    redeeMyMoney(data, '/RedeemVirtualCardBalance')(dispatch);
  };

  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      setStep(step => step + 1);
    }
  }, [confirmationData]);

  useEffect(() => {
    setErrors(null);
  }, [step]);

  return (
    <VirtualCardDetails
      selectedWallet={selectedWallet && selectedWallet}
      setSelectedWallet={setSelectedWallet}
      onOptionsChange={onOptionsChange}
      onAddMoneyToVirtualCard={onAddMoneyToVirtualCard}
      errors={errors}
      setForm={setForm}
      form={form}
      isViewingDetail={isViewingDetail}
      setIsViewingDetail={setIsViewingDetail}
      step={step}
      setStep={setStep}
      setErrors={setErrors}
      checkTransactionConfirmation={checkTransactionConfirmation}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      loading={addMoneyToVirtualCard?.loading}
      addMoneyOpen={addMoneyOpen}
      setAddMoneyOpen={setAddMoneyOpen}
      cardStatus={cardsStatus}
      setCardStatus={setCardStatus}
      onUpdateCardStatus={onUpdateCardStatus}
      loadingStatus={isLoadingStatus}
      onRenewVirtualCard={onRenewVirtualCard}
      onRedeeMoney={onRedeeMoney}
      renewCardLoad={renewCardLoad}
      setisRedeeming={setisRedeeming}
      isRedeeming={isRedeeming}
      loadRedeeMoney={loadRedeeMoney}
      error={error}
      userData={userData}
      confirmRedeem={confirmRedeem}
      setConfirmRedeem={setConfirmRedeem}
      setOpenConfirmModal={setOpenConfirmModal}
      openConfirmModal={openConfirmModal}
      shouldClear={shouldClear}
      canProceed={canProceed}
      setCanProceed={setCanProceed}
      PIN={PIN}
      setPIN={setPIN}
    />
  );
};

export default VirtualCardDetailsContainer;
