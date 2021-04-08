import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import LoanDetailsComponent from 'components/Microloan/LoanDetails';
import confirmLoanAction, {
  clearConfirmLoan,
} from 'redux/actions/microloan/confirmLoan';
import payLoanAction from 'redux/actions/microloan/payLoan';
import { clearApplyLoan } from 'redux/actions/microloan/applyLoan';

const LoanDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    confirmLoan: {
      data: confirmLoanData,
      loading: confirmLoanLoading,
    },
    payLoan: { data: payLoanData, loading: payLoanLoading },
  } = useSelector(({ microloan }) => microloan);
  const { myWallets } = useSelector(({ user }) => user);
  const [paymentOption, setPaymentOption] = useState('Total');
  const [openPinModal, setOpenPinModal] = useState(false);
  const [openPayLoanModal, setOpenPayLoanModal] = useState(false);
  const [PIN, setPIN] = useState('');
  const [pinData, setPinData] = useState(null);

  const [pinErrors, setPinErrors] = useState(null);
  const [loanItem, setLoanItem] = useState(null);

  const {
    state: { item },
  } = location;

  const handleConfirmPayLoan = () => {
    const confirmPaymentData = {
      PaymentType: paymentOption,
    };
    confirmLoanAction(confirmPaymentData)(dispatch);
  };

  useEffect(() => {
    clearConfirmLoan()(dispatch);
    clearApplyLoan()(dispatch);
  }, []);

  useEffect(() => {
    if (confirmLoanData) {
      setOpenPinModal(true);
      setOpenPayLoanModal(false);
      clearConfirmLoan()(dispatch);
    }
  }, [confirmLoanData]);

  useEffect(() => {
    if (payLoanData) {
      setOpenPinModal(false);
      setOpenPayLoanModal(false);
      setLoanItem(payLoanData);
    } else {
      setLoanItem(item);
    }
  }, [payLoanData, item]);

  useEffect(() => {
    setPinData(pinData => ({
      ...pinData,
      PIN,
    }));
    setPinErrors(null);
  }, [PIN]);

  const pinIsValid = () => PIN.length === 4;
  const validate = () => {
    if (!pinIsValid()) {
      setPinErrors({
        Description: global.translate(
          'Please provide your PIN number.',
          944,
        ),
      });
      return true;
    }
    return false;
  };

  const handlePayLoan = () => {
    const payLoanData = {
      PaymentType: paymentOption,
      PIN: pinData?.PIN,
    };
    if (!validate()) {
      payLoanAction(payLoanData)(dispatch);
    }
  };
  return (
    <LoanDetailsComponent
      loan={loanItem}
      setPaymentOption={setPaymentOption}
      paymentOption={paymentOption}
      handleConfirmPayLoan={handleConfirmPayLoan}
      confirmLoanLoading={confirmLoanLoading}
      payLoanLoading={payLoanLoading}
      handlePayLoan={handlePayLoan}
      payLoanModal={openPayLoanModal}
      setPayLoanModal={setOpenPayLoanModal}
      confirmLoanData={confirmLoanData}
      setOpenPinModal={setOpenPinModal}
      openPinModal={openPinModal}
      setPIN={setPIN}
      PIN={PIN}
      pinErrors={pinErrors}
      pinData={pinData}
      clearConfirmLoan={clearConfirmLoan}
      walletList={myWallets?.walletList}
    />
  );
};

export default LoanDetails;
