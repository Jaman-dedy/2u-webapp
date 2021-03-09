/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import AddMoneyIcon from 'assets/images/services/paypal-csn.svg';
import bankTransferIcon from 'assets/images/services/bank-t-csn.svg';
import { useHistory, Prompt, useLocation } from 'react-router-dom';
import './AddMoney.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';

import WelcomeBar from 'components/Dashboard/WelcomeSection';
import MyWallets from 'components/common/WalletCarousselSelector';
import 'react-datepicker/dist/react-datepicker.css';
import DisplayProviders from 'components/common/DisplayProviders';
import TopUpCreditCardImg from 'assets/images/topup-credit.svg';
import PaypalImg from 'assets/images/paypal-provider.svg';
import BankImg from 'assets/images/bankImg.svg';
import ConfirmAddMoney from './ConfirmAddMoney';
import CreditCardForm from './CreditCardForm';
import ShowStep from './ShowStep';
import Step1Img from 'assets/images/step1.svg';
import Step2Img from 'assets/images/step2.svg';
import Step3Img from 'assets/images/step3.svg';
import levelOneVisited from 'assets/images/level-one-visited.svg';
import levelTwoVisited from 'assets/images/level-two-visited.svg';
import levelThreeVisited from 'assets/images/level-three-visited.svg';
import ComingSoon from 'components/common/BottomMenu/ComingSoon';

const defaultOptions = [
  { key: 'usd', text: 'USD', value: 'USD' },
  { key: 'eur', text: 'EUR', value: 'EUR' },
  { key: 'gbp', text: 'GBP', value: 'GBP' },
  { key: 'cad', text: 'CAD', value: 'CAD' },
  { key: 'aud', text: 'AUD', value: 'AUD' },
];

const AddMoney = ({
  handleInputChange,
  addMoneyData,
  userData,
  myWallets,
  selectWallet,
  cardOperationFees,
  addMoneyFromCreditCard,
  errors,
  handleSubmit,
  clearAddMoneyData,
}) => {
  const [date, setDate] = useState('');
  const [oneSuccess, setOneSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [selectedWalletNumber, setSelectedWalletNumber] = useState(
    '',
  );
  const [topUpFromCreditCard, setTopUpFromCreditCard] = useState(
    false,
  );
  const [step, setStep] = useState(1);
  const [levelOne, setLevelOne] = useState(false);
  const [levelTwo, setLevelTwo] = useState(false);
  const [levelThree, setLevelThree] = useState(false);
  const [topUpPaypalCard, setTopUpPaypalCard] = useState(false);
  const [topUpFromBank, setTopUpFromBank] = useState(false);
  const cvvRef = useRef(null);
  const { loading, success, error } = addMoneyFromCreditCard;

  const history = useHistory();
  const location = useLocation();

  const onClickHandler = () => history.goBack();
  const { Currency } = addMoneyData;

  const { justAdded } = addMoneyFromCreditCard;

  useEffect(() => {
    if (location.state?.wallet) {
      const { AccountNumber } = location.state.wallet;
      setSelectedWalletNumber(AccountNumber);
    }
  }, [myWallets]);

  useEffect(() => {
    if (location.state?.wallet) {
      const { AccountNumber } = location.state.wallet;
      myWallets.walletList;
      setSelectedWalletNumber(AccountNumber);
    }
  }, [myWallets]);

  useEffect(() => {
    if (justAdded) {
      setOneSuccess(true);
    }
  }, [justAdded]);

  const handleDateChange = () => {
    handleInputChange({
      target: { name: 'date', value: date },
    });
  };

  useEffect(() => {
    handleDateChange();
    if (cardOperationFees.success) setOpen(true);
  }, [date, cardOperationFees]);

  useEffect(() => {
    const option = defaultOptions.find(
      option => option.value === Currency,
    );

    const newOptions = option
      ? defaultOptions
      : [
          ...defaultOptions,
          {
            key: Currency.toLowerCase(),
            text: Currency,
            value: Currency,
          },
        ];

    setOptions(newOptions);
  }, [Currency]);
  const { MM, YYYY } = addMoneyData;

  const justSuccessful = !!MM?.length && !!YYYY?.length && oneSuccess;

  const formIsHalfFilledOut =
    Object.values(addMoneyData).filter(item => item && item !== '')
      .length > 2 && !justSuccessful;
  const [selectedMonth, setSelectedMonth] = useState();

  const CustomInput = ({ value, onClick }) => {
    useEffect(() => {
      if (value !== date) {
        setDate(value);
      }
    }, [value]);
    return (
      <Form.Input
        value={date}
        onClick={onClick}
        error={errors.date || false}
        placeholder={global.translate('Date', 1258)}
      />
    );
  };

  const handleBackEvent = () => {
    setStep(step - 1);
    setLevelTwo(false);
  };
  const checkTopUpCreditCard = () => {
    setTopUpFromCreditCard(true);
    setTopUpPaypalCard(false);
    setTopUpFromBank(false);
  };
  const checkTopUpPayPal = () => {
    setTopUpFromCreditCard(false);
    setTopUpPaypalCard(true);
    setTopUpFromBank(false);
  };
  const checkTopUpBank = () => {
    setTopUpFromCreditCard(false);
    setTopUpPaypalCard(false);
    setTopUpFromBank(true);
  };
  useEffect(() => {
    if (success) {
      setTopUpFromCreditCard(false);
      setTopUpPaypalCard(false);
      setTopUpFromBank(false);
      setLevelOne(true);
      setLevelTwo(false);
      setLevelThree(false);
    }
  }, [success]);
  useEffect(() => {
    if (step === 1) {
      setLevelOne(true);
    }
  }, [step]);
  useEffect(() => {
    if (step === 2) {
      setLevelTwo(true);
    }
  }, [step]);
  useEffect(() => {
    if (step === 3) {
      setLevelThree(true);
    }
  }, [step]);

  const handleNavigateSteps = step => {
    setStep(step);
  };

  return (
    <>
      <Prompt
        when={formIsHalfFilledOut}
        message={JSON.stringify({
          header: global.translate('Confirm', 1750),
          content: global.translate(
            'You have unsaved changes, Are you sure you want to leave?',
            1751,
          ),
        })}
      />

      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              {global.translate('Top Up your wallet', 2220)}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="clear" />
        <div className="wrap__container">
          <div className="display-steps">
            <ShowStep
              title={global.translate('Select', 2217)}
              subTitle={global.translate(
                'Choose a provider and wallet',
                2218,
              )}
              levelNumber={levelOne ? levelOneVisited : Step1Img}
              visited={levelOne}
              onClick={handleNavigateSteps}
              number={1}
            />
            <ShowStep
              title={global.translate('Top Up', 542)}
              subTitle={global.translate(
                'Add money to your wallet',
                173,
              )}
              levelNumber={levelTwo ? levelTwoVisited : Step2Img}
              visited={levelTwo}
              onClick={handleNavigateSteps}
              number={2}
            />
            <ShowStep
              title={global.translate('Confirm', 1750)}
              subTitle={global.translate('Review and confirm', 2219)}
              levelNumber={levelThree ? levelThreeVisited : Step3Img}
              visited={levelThree}
              onClick={handleNavigateSteps}
              number={3}
            />
          </div>

          <div className="add-money-container">
            {step === 1 && (
              <div className="providers-box">
                <MyWallets
                  myWallets={myWallets}
                  selectWallet={selectWallet}
                  selectedWalletNumber={selectedWalletNumber}
                />

                <h3>{global.translate('Choose a provider', 2168)}</h3>
                <DisplayProviders
                  providerLogo={TopUpCreditCardImg}
                  title="Credit/Prepaid card"
                  subTitle={global.translate(
                    'Top up money from any major credit card',
                    2133,
                  )}
                  onClick={checkTopUpCreditCard}
                  ticked={topUpFromCreditCard}
                />
                <h3>{global.translate('Coming soon', 1747)}</h3>

                <div className="flex top-up__coming-soon">
                  <ComingSoon
                    image={AddMoneyIcon}
                    title={global.translate('Paypal', 170)}
                    to="/"
                    subtitle={global.translate(
                      'Top Up money from your Paypal account',
                      2134,
                    )}
                  />

                  <ComingSoon
                    image={bankTransferIcon}
                    title="Bank account"
                    subtitle={global.translate(
                      'Top Up money from your bank account',
                      2135,
                    )}
                  />
                </div>
                <Button
                  disabled={
                    !topUpFromBank &&
                    !topUpPaypalCard &&
                    !topUpFromCreditCard
                  }
                  positive
                  onClick={() => setStep(step + 1)}
                >
                  {global.translate('Next', 10)}
                </Button>
              </div>
            )}
            {step === 2 && (
              <CreditCardForm
                errors={errors}
                addMoneyData={addMoneyData}
                handleInputChange={handleInputChange}
                options={options}
                cvvRef={cvvRef}
                cardOperationFees={cardOperationFees}
                handleSubmit={handleSubmit}
                step={step}
                setStep={setStep}
                handleBackEvent={handleBackEvent}
                addMoneyFromCreditCard={addMoneyFromCreditCard}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                CustomInput={CustomInput}
              />
            )}

            {step === 3 && (
              <ConfirmAddMoney
                step={step}
                setStep={setStep}
                addMoneyData={addMoneyData}
                cardOperationFees={cardOperationFees}
                addMoneyFromCreditCard={addMoneyFromCreditCard}
                clearAddMoneyData={clearAddMoneyData}
                setLevelThree={setLevelThree}
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
AddMoney.propTypes = {
  userData: PropTypes.instanceOf(Object),
  addMoneyData: PropTypes.instanceOf(Object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func.isRequired,
  myWallets: PropTypes.instanceOf(Object).isRequired,
  cardOperationFees: PropTypes.instanceOf(Object),
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  selectWallet: PropTypes.func.isRequired,
  clearAddMoneyData: PropTypes.func,
};
AddMoney.defaultProps = {
  userData: {
    data: {},
  },
  errors: {},
  cardOperationFees: {
    success: false,
  },
  addMoneyFromCreditCard: {
    success: false,
  },
  clearAddMoneyData: () => null,
};
export default AddMoney;
