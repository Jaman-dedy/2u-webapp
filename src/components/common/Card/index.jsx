/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Image, Button, Popup, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CopyIcon from 'assets/images/Copy-icon.svg';
import CardImage from '../CardImage';
import './style.scss';

const Card = ({ card, onClick, detail, userData }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async (e, CardNumber, message) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CardNumber);
      setCopySuccess(message);
    } catch (err) {
      setCopySuccess('Failed to copy!', 2143);
    }
  };

  return (
    <List.Item className="card-list-item">
      <List.Content>
        <div
          className={
            detail ? 'display-card-box detail' : 'display-card-box'
          }
        >
          <div className="left-side">
            <div>
              <CardImage
                cardType={card?.CardType}
                cardLevel={card?.cardLevel}
              />
            </div>
            <div className="left-details">
              <span className="username">
                <strong>
                  {card?.NameOnCard ??
                    `${userData?.FirstName} ${userData?.LastName}`}
                </strong>
              </span>
              <span>
                {detail
                  ? card?.CardNumberSpaced ?? card?.CardNumber
                  : card?.CardNumberHidden}
              </span>
              <div className="left-details-action">
                <Popup
                  content={copySuccess}
                  on="click"
                  pinned
                  trigger={
                    <span
                      onClick={e =>
                        copyToClipBoard(
                          e,
                          card?.CardNumber,
                          'Card number copied!',
                          2144,
                        )
                      }
                      className="card-detail-info"
                    >
                      <Image src={CopyIcon} />
                      {global.translate('Copy card number', 2145)}
                    </span>
                  }
                />
                <Popup
                  content={copySuccess}
                  on="click"
                  pinned
                  trigger={
                    <span
                      onClick={e =>
                        copyToClipBoard(
                          e,
                          card?.CVV,
                          global.translate('CVV copied!', 2146),
                        )
                      }
                      className="card-detail-info"
                    >
                      <Image src={CopyIcon} />
                      {global.translate('Copy card CVV')}
                    </span>
                  }
                />
              </div>
            </div>
          </div>
          <div className="right-side">
            <span>
              <strong>{card?.Balance}</strong> {card?.Currency}
            </span>
            {!detail && (
              <Button basic onClick={() => onClick(card)}>
                {global.translate('View', 1900)}
              </Button>
            )}
          </div>
        </div>
      </List.Content>
    </List.Item>
  );
};
Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  detail: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
};
Card.defaultProps = {
  detail: false,
};
export default Card;
