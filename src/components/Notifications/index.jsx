/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Notifications.scss';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PREVIOUS_ICON from 'assets/images/back.png';
import Thumbnail from 'components/common/Thumbnail';
import TimeAgo from 'components/common/TimeAgo';
import notifRequest from 'assets/images/notif-type-request.png';
import notifTransac from 'assets/images/notif-type-transaction.png';
import notifLink from 'assets/images/notif-type-advert.png';
import chatIcon from 'assets/images/chat-icon.png';
import deleteIcon from 'assets/images/deletecontact2.png';
import logo from 'assets/images/logo.png';
import getNotifications from 'redux/actions/users/notifications';
import makeNotificationsSeen from 'redux/actions/users/makeNotificationsSeen';
import deleteNotifications from 'redux/actions/users/deleteNotifications';
import Loader from 'components/common/Loader';
import getContactList from 'redux/actions/contacts/getContactList';

import Pagination from 'components/common/Pagination';

const Notifications = ({ userData, notifications }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [publicityOpen, setPublicityOpen] = useState(false);
  const [publicityData, setPublicityData] = useState({});
  const { data = [], meta } = notifications;

  const { allContacts } = useSelector(state => state.contacts);

  const onPageChange = currentPage => {
    setPage(currentPage);
  };

  useEffect(() => {
    if (userData.data) {
      getNotifications({ PID: userData.data.PID, page })(dispatch);
      getContactList()(dispatch);
    }
  }, [userData.data && userData.data.PID, page]);

  useEffect(() => {
    const IDs = data
      .filter(({ status }) => status === 'unseen')
      .map(({ id }) => id);
    if (userData.data && IDs.length !== 0)
      makeNotificationsSeen({
        PID: userData.data.PID,
        IDs,
        status: 'seen',
      })(dispatch);
  }, [userData.data && userData.data.PID, data]);

  const openStorePublicity = (open, linkData) => {
    if (open) setPublicityData(linkData);
    setPublicityOpen(open);
  };

  const renderAction = actions => {
    const { action, PID, id, linkData } = actions;

    const notifActions = {
      sendMoney: {
        image: notifRequest,
        name: global.translate('Send money', 65),
        onClick: () =>
          history.push(`/contacts?ref=send-money&PID=${PID}`),
      },
      viewTransaction: {
        image: notifTransac,
        name: global.translate('View transations', 143),
        onClick: () => {
          const contact =
            allContacts.data &&
            allContacts.data.find(
              ({ ContactPID }) => ContactPID === PID,
            );
          if (contact)
            history.push({
              pathname: '/transactions',
              search: '?ref=contact',
              state: {
                contact,
                isSendingCash: false,
              },
            });
        },
      },
      chat: {
        image: chatIcon,
        name: global.translate('Send a message'),
        onClick: () => null,
      },
      delete: {
        image: deleteIcon,
        name: global.translate('Delete notification', 372),
        onClick: () =>
          userData.data &&
          deleteNotifications({ IDs: [id], PID: userData.data.PID })(
            dispatch,
          ),
      },
      more: {
        image: notifLink,
        name: global.translate('More info'),
        onClick: () => linkData && openStorePublicity(true, linkData),
      },
    };

    switch (action) {
      case 'TR':
        return [
          notifActions.viewTransaction,
          notifActions.chat,
          notifActions.delete,
        ];

      case 'CR':
        return [
          notifActions.sendMoney,
          notifActions.chat,
          notifActions.delete,
        ];

      case 'LK':
        return [notifActions.more, notifActions.delete];

      case 'NA':
        return [notifActions.delete];

      default:
        return [notifActions.delete];
    }
  };

  return (
    <>
      <DashboardLayout
        openStorePublicity={openStorePublicity}
        publicityOpen={publicityOpen}
        publicityData={publicityData}
      >
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            {global.translate('All your notifications')}
          </span>
        </WelcomeBar>
        <Image
          src={PREVIOUS_ICON}
          height={30}
          className="goBack"
          onClick={() => history.goBack()}
        />
        <div className="notification-container">
          {data.map(({ message, createdAt, data, id }) => (
            <div key={id} className="notifications-item">
              <div className="flex justify-content-space-between align-items-center">
                <div className="notification-user flex align-items-center">
                  <Thumbnail
                    avatar={
                      Object.keys(data).length
                        ? data.PictureURL
                        : logo
                    }
                    size="small"
                    name={data.FirstName || ''}
                    secondName={data.LastName || ''}
                    circular
                    className="header_2u_avatar"
                    style={{
                      height: '50px',
                      width: '50px',
                      marginRight: '13px',
                    }}
                  />
                  <div className="notif-info flex flex-column">
                    <span className="name">{`${data.FirstName ||
                      ''} ${data.LastName || ''}`}</span>
                    <span className="time">
                      <TimeAgo time={createdAt} />
                    </span>
                  </div>
                </div>
                <div className="icon-actions flex">
                  <Dropdown
                    icon={<Icon name="ellipsis vertical" link />}
                  >
                    <Dropdown.Menu
                      className="options"
                      style={{
                        marginLeft: -245,
                        marginTop: -20,
                        width: 240,
                        padding: '10px 0px',
                      }}
                    >
                      {renderAction({
                        action: data.Action,
                        PID: data.PID,
                        id,
                        linkData: data || null,
                      }).map(item => (
                        <div
                          className="innerOptions"
                          key={item.name}
                          role="button"
                          tabIndex={0}
                          onKeyDown={() => null}
                          onClick={item.onClick}
                          style={{ paddingLeft: '8px' }}
                        >
                          <Image
                            src={item.image}
                            height={20}
                            className="iconItem"
                          />
                          <p className="itemName">{item.name}</p>
                        </div>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {data.Action === 'LK' ? (
                <>
                  <div className="publicity-title small-v-margin small-text">
                    {data.Title || ''}
                  </div>
                  <div className="notif-message small-v-margin small-text">
                    {data.SubTitle || ''}
                  </div>
                </>
              ) : (
                <div className="notif-message small-v-margin small-text">
                  {global.translate(message)}
                </div>
              )}
            </div>
          ))}
          {notifications.loading && (
            <div className="small-padding">
              <Loader />
            </div>
          )}
          {meta && meta.total > 20 && (
            <Pagination
              data={data}
              onPageChange={onPageChange}
              itemsPerPage={meta.perPage}
              totalItems={meta.total}
            />
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

Notifications.propTypes = {
  userData: PropTypes.instanceOf(Object),
  notifications: PropTypes.instanceOf(Object),
};

Notifications.defaultProps = {
  userData: {
    data: {},
  },
  notifications: {
    data: [],
  },
};

export default Notifications;