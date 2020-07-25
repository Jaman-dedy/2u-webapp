import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Image, Label } from 'semantic-ui-react';
import MessageIcon from 'assets/images/message.png';
import './style.scss';

const Trigger = ({ onClick }) => {
  const { messages } = useSelector(state => state.chat);
  const totalNewMessages = messages.chatThreads?.data?.data
    .map(item => {
      if (item.unreadMessagesCount?.length > 0) {
        return item.unreadMessagesCount[0].count;
      }
      return 0;
    })
    .reduce((acc, item) => acc + Number(item), 0);
  return (
    <>
      <div
        className="messages-wrapper"
        title={global.translate('Open Chat')}
      >
        {!!(totalNewMessages && Number(totalNewMessages) !== 0) && (
          <Label
            color="red"
            size="small"
            className="floating-message-count"
          >
            {totalNewMessages > 99 ? '99+' : totalNewMessages}
          </Label>
        )}
        <Image src={MessageIcon} onClick={onClick} />
      </div>
    </>
  );
};
Trigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Trigger;