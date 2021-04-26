import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Thumbnail from 'components/common/Thumbnail';
import EarnedPointIcon from 'assets/images/profile/points-icon.svg';
import RefereeIcon from 'assets/images/profile/referees-icon.svg';
import SendMoneyIcon from 'assets/images/profile/profile-send-money-icon.svg';
import SendCashIcon from 'assets/images/profile/profile-send-cash-icon.svg';
import SendVoucherIcon from 'assets/images/profile/profile-send-voucher.svg';
import ChatIcon from 'assets/images/profile/profile-chat-icon.svg';
import StatCards from './StatCards';
import './style.scss';
import {
  openChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';
import { ONE_TO_ONE } from 'constants/general';

import {
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingVoucher,
} from 'redux/actions/dashboard/dashboard';

const ReferralTab = ({ referreesList }) => {
  const history = useHistory();
  const { data } = referreesList;
  const [hasError, setHasError] = useState(false);
  const [refereesCount, setRefereesCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const dispatch = useDispatch();

  const goToTransferMoney = contact => {
    setIsSendingMoney(dispatch);
    history.push({
      pathname: '/contacts',
      search: '?ref=send-money',
      state: { moneyTransfer: contact },
    });
  };

  const goToSendCash = contact => {
    setIsendingCash(dispatch);
    history.push({
      pathname: '/contacts',
      search: '?ref=send-cash',
      state: { sendCash: contact },
    });
  };
  const goToChat = contact => {
    setGlobalChat({
      currentChatType: ONE_TO_ONE,
      currentChatTarget: contact,
      isChattingWithSingleUser: true,
    })(dispatch);
    openChatList()(dispatch);
  };
  const goToVoucher = contact => {
    setIsSendingVoucher(dispatch);
    history.push({
      pathname: '/vouchers',
      search: '?ref=send-voucher',
      state: {
        contact,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setRefereesCount(data.length);
      let points = 0;
      data.forEach(({ Points }) => {
        points += Number(Points) || 0;
      });
      setTotalPoints(points);
    }
  }, [data]);

  return (
    <div className="referral-tab-container">
      <div className="stats-cards">
        <StatCards
          title="Points earned"
          number={totalPoints}
          icon={EarnedPointIcon}
        />
        <StatCards
          title="Referees"
          number={refereesCount}
          icon={RefereeIcon}
        />
      </div>
      <div className="referral-tab">
        {referreesList?.data?.length !== 0 ? (
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="transaction-header">
                  <h3> {global.translate('Referrals')}</h3>
                </Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {referreesList?.data?.map(contact => (
                <Table.Row>
                  <Table.Cell>
                    <div className="user-profile">
                      <div className="user-avatar">
                        <Thumbnail
                          avatar={contact.PictureURL}
                          circular
                          name={contact?.FirstName}
                          secondName={contact?.LastName}
                          hasError={hasError}
                          setHasError={setHasError}
                          style={{ height: 50, width: 50 }}
                        />
                      </div>
                      <div className="user-text">
                        <div>
                          {contact.FirstName}&nbsp;{contact.LastName}
                        </div>
                        <div className="user-last-name">
                          {contact.ContactPID}
                        </div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell />
                  <Table.Cell textAlign="right">
                    <div className="quick-actions">
                      <Image
                        src={SendMoneyIcon}
                        onClick={() => goToTransferMoney(contact)}
                        alt=""
                      />
                      <Image
                        src={SendCashIcon}
                        onClick={() => goToSendCash(contact)}
                      />
                      <Image
                        src={SendVoucherIcon}
                        onClick={() => goToVoucher(contact)}
                      />
                      <Image
                        src={ChatIcon}
                        onClick={() => goToChat(contact)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div>
            {' '}
            {global.translate("So far, you don't have any referral")}
          </div>
        )}
      </div>
    </div>
  );
};

ReferralTab.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  referreesList: PropTypes.objectOf(PropTypes.any),
};
ReferralTab.defaultProps = {
  userData: {},
  referreesList: {},
};

export default ReferralTab;
