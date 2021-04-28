/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { List, Segment, Input } from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import EmptyCard from 'components/common/EmptyCard';
import EmptyCardList from 'assets/images/empty_card.svg';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import VirtualCard from 'components/common/Card';
import classes from './VirtualCards.module.scss';
import Placeholder from './PlaceHolder/PlaceHolder';
import AddVirtualCardModal from './AddVirtualCardModal/AddVirtualCardModal';
import modalIcon from 'assets/images/microloan/danger-cross.svg';
import ModalInfo from 'components/common/ModalInfo';

const MyVirtualCards = ({
  virtualCardList,
  isLoading,
  userData,
  currencies,
  onOptionsChange,
  onAddVirtualCard,
  selectedCurrency,
  setSelectedCurrency,
  selectedCard,
  setSelectedCard,
  virtualCardTypes,
  errors,
  setErrors,
  addVirtualCard,
  open,
  setOpen,
  size,
  setSize,
  form,
  setForm,
}) => {
  const history = useHistory();
  const [myVirtualCardList, setMyVirtualCardList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  const { loading: loadingUserData } = userData;
  const onClickHandler = () => history.goBack();

  const handleOnClick = (item, userData) => {
    history.push({
      pathname: 'virtual-card-details',
      state: { item, userData },
    });
  };

  const handleModalOpen = () => {
    setOpen(true);
    setSize('tiny');
  };

  useEffect(() => {
    if (virtualCardList) {
      setMyVirtualCardList(
        virtualCardList.filter(virtualCard => {
          return virtualCard.RecordsCount !== '0';
        }),
      );
    }
  }, [virtualCardList]);

  useEffect(() => {
    if (virtualCardList) {
      if (virtualCardList[0].RecordsCount === '0') {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [virtualCardList]);

  const handleKeyUp = e => {
    e.persist();
    const search = e.target.value;
    const data = virtualCardList;
    if (search.trim().length > 0) {
      const found = data.filter(
        item =>
          (item.CardNumber &&
            item.CardNumber.toLowerCase().includes(
              search.toLowerCase(),
            )) ||
          (item.CardType &&
            item.CardType.toLowerCase().includes(
              search.toLowerCase(),
            )) ||
          (item.CardNumberSpaced &&
            item.CardNumberSpaced.toLowerCase().includes(
              search.toLowerCase(),
            )) ||
          (item.CVV &&
            item.CVV.toLowerCase().includes(search.toLowerCase())) ||
          (item.YYYY &&
            item.YYYY.toLowerCase().includes(search.toLowerCase())) ||
          (item.Currency &&
            item.Currency.toLowerCase().includes(
              search.toLowerCase(),
            )) ||
          (item.Balance &&
            item.Balance.toLowerCase().includes(
              search.toLowerCase(),
            )) ||
          (item.CreationDate &&
            item.CreationDate.toLowerCase().includes(
              search.toLowerCase(),
            )),
      );
      setMyVirtualCardList(found);
    } else if (virtualCardList) setMyVirtualCardList(virtualCardList);
  };

  const renderPlaceholders = () => {
    return (
      <div className={classes.Placeholders}>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </div>
    );
  };

  const renderNoCardsFound = () => {
    return (
      <EmptyCard
        header={global.translate('No O-Card found', 1582)}
        createText={global.translate('Create an O-Card', 2152)}
        body={global.translate(
          'You can create your credit card and use them for your online payment',
          2153,
        )}
        onAddClick={() => {
          if (userData.data?.AccountVerified === 'YES') {
            handleModalOpen();
          } else {
            setOpenModal(true);
          }
        }}
        imgSrc={EmptyCardList}
      />
    );
  };

  const renderCardList = () => {
    if (!myVirtualCardList?.length) {
      return null;
    }
    return (
      <div className={classes.VirtualCardList}>
        <Segment style={{ padding: 0 }}>
          <List divided relaxed>
            {myVirtualCardList &&
              myVirtualCardList.length !== 0 &&
              myVirtualCardList.map(item => (
                <VirtualCard
                  card={item}
                  onClick={() => handleOnClick(item, userData?.data)}
                  userData={userData?.data}
                />
              ))}
          </List>
        </Segment>
      </div>
    );
  };

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <div className="head-content">
            {!isAppDisplayedInWebView() && (
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
            )}
            <h2 className="head-title">
              {global.translate('My O-Cards', 2038)}
            </h2>
            <div className="head-buttons">
              <button
                type="button"
                onClick={() => {
                  if (userData.data?.AccountVerified === 'YES') {
                    handleModalOpen();
                  } else {
                    setOpenModal(true);
                  }
                }}
              >
                {global.translate(`Add an O-Card`, 2039)}
              </button>
            </div>
            <div className="clear" />
          </div>
        </WelcomeBar>
        {!isLoading && !loadingUserData && !isEmpty && (
          <>
            <div className="search-area">
              <Input
                placeholder={global.translate('Search', 278)}
                icon="search"
                iconPosition="left"
                disabled={!virtualCardList}
                onKeyUp={e => handleKeyUp(e)}
              />
            </div>
            {renderCardList()}
          </>
        )}

        {isLoading && renderPlaceholders()}
        {!myVirtualCardList?.length &&
          !isLoading &&
          renderNoCardsFound()}

        <AddVirtualCardModal
          open={open}
          setOpen={setOpen}
          size={size}
          currencies={currencies}
          onOptionsChange={onOptionsChange}
          onAddVirtualCard={onAddVirtualCard}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          virtualCardTypes={virtualCardTypes}
          errors={errors}
          setErrors={setErrors}
          addVirtualCard={addVirtualCard}
          form={form}
          setForm={setForm}
        />
        <ModalInfo
          open={openModal}
          setOpen={setOpenModal}
          title={global.translate('You are not eligible', 2280)}
          body={global.translate(
            'You are not eligible to order an M Card. Only verified accounts can order an M Card',
          )}
          icon={modalIcon}
          isEligible={isEligible}
          buttonText={global.translate('Okay', 2554)}
        />
      </DashboardLayout>
    </>
  );
};

MyVirtualCards.propTypes = {
  virtualCardList: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func,
  onAddVirtualCard: PropTypes.func,
  setSelectedCard: PropTypes.func,
  setSelectedCurrency: PropTypes.func,
  selectedCurrency: PropTypes.string.isRequired,
  selectedCard: PropTypes.string.isRequired,
  virtualCardTypes: PropTypes.instanceOf(Array).isRequired,
  errors: PropTypes.instanceOf(Object),
  setErrors: PropTypes.func,
  addVirtualCard: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
  size: PropTypes.string.isRequired,
  setSize: PropTypes.func,
  form: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
};

MyVirtualCards.defaultProps = {
  onOptionsChange: () => {},
  onAddVirtualCard: () => {},
  setSelectedCard: () => {},
  setSelectedCurrency: () => {},
  setErrors: () => {},
  addVirtualCard: () => {},
  errors: {},
  setOpen: () => {},
  setSize: () => {},
};

export default MyVirtualCards;
