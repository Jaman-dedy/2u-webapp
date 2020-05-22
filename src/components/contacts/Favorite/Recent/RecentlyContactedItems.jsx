/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Message from 'components/common/Message';
import Thumbnail from 'components/common/Thumbnail';
import './style.scss';
import useWindowSize from 'utils/useWindowSize';
import ItemsPlaceholder from '../ItemsLoading';

const RecentlyContactedItems = React.memo(
  ({ items: { data, loading, error }, retryFn, onItemClick }) => {
    const { width } = useWindowSize();

    const { isSendingMoney } = useSelector(
      state => state.dashboard.contactActions,
    );

    const toShowIconsCheck = (items = []) => {
      if (items) {
        return width < 700 || items.length > 4;
      }
      return false;
    };

    const showScrollIcons = () => toShowIconsCheck(data) && !loading;

    const userFavorites1 =
      data &&
      data.map(({ ContactPID, ...rest }) => {
        return {
          Favorite: 'YES',
          ContactPID,
          ...rest,
          ContactType: ContactPID ? 'INTERNAL' : 'EXTERNAL',
        };
      });
    const userFavorites = isSendingMoney
      ? userFavorites1 &&
        userFavorites1.filter(item => item.ContactPID)
      : userFavorites1;

    const listContainerRef = useRef(null);

    const onArrowRightClick = () => {
      listContainerRef.current.scrollBy({
        top: 0,
        left: 200,
        behavior: 'smooth',
      });
    };

    const onArrowLeftClick = () => {
      listContainerRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: 'smooth',
      });
    };

    return (
      <>
        <div className="slide-container">
          {showScrollIcons() && (
            <Icon
              onClick={onArrowLeftClick}
              disabled={data.length < 3}
              className="prevNextIcon"
              name="caret left"
              size="big"
            />
          )}
          <div className="items-container" ref={listContainerRef}>
            {error && (
              <Message
                style={{ flex: 1 }}
                action={{
                  onClick: () => {
                    retryFn();
                  },
                }}
                message={
                  error[0]
                    ? global.translate(error[0].Description)
                    : global.translate(error.error, 162)
                }
              />
            )}
            {loading && !data && !error ? (
              <ItemsPlaceholder />
            ) : (
              userFavorites &&
              userFavorites.map(user => (
                <div
                  className="single-item-container"
                  onClick={() => onItemClick(user)}
                >
                  {' '}
                  <Dropdown
                    style={{ float: 'right' }}
                    className="ellipse-icon"
                    icon="ellipsis vertical"
                    scrolling
                    floated="right"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item text="Remove from list" />
                      <Dropdown.Item
                        text="View"
                        description="Detail"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                  <Icon
                    className="before-ellipse-icon"
                    style={{ float: 'right' }}
                  />
                  <Thumbnail
                    circular
                    height={75}
                    width={75}
                    className="userpic"
                    style={{
                      height: 75,
                      width: 75,
                      fontSize: 27,
                      margin: 'auto',
                    }}
                    avatar={user.PictureURL}
                    name={user.FirstName}
                    secondName={user.LastName}
                    alt={user.FirstName}
                  />
                  <p className="single-line username">
                    {`${user.FirstName} ${user.LastName}`}
                  </p>
                </div>
              ))
            )}
          </div>
          {showScrollIcons() && (
            <Icon
              onClick={onArrowRightClick}
              disabled={data.length < 3}
              className="prevNextIcon"
              name="caret right"
              size="big"
            />
          )}
        </div>
      </>
    );
  },
);

RecentlyContactedItems.propTypes = {
  items: PropTypes.objectOf(PropTypes.any).isRequired,
  retryFn: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default RecentlyContactedItems;
