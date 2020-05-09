import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import errorImage from 'assets/images/error.png';
import successImage from 'assets/images/confirm.png';
import './feedback.scss';

const Feedback = ({ message, title, success, callbackFn }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      if (callbackFn) {
        callbackFn()(dispatch);
      }
    }, 7000);
  }, []);
  return (
    <>
      {show ? (
        <div
          className="feedbackWrapper"
          onClick={() => {
            setShow(false);
            if (callbackFn) {
              callbackFn()(dispatch);
            }
          }}
        >
          <div className="feedbackWrapper-content">
            <img
              src={success ? successImage : errorImage}
              alt="status"
              width={100}
            />
            <div className="titleText">
              {global.translate(title).toUpperCase()}
            </div>
            <p className="messageText">{global.translate(message)}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
Feedback.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  success: PropTypes.bool,
  callbackFn: PropTypes.func,
};
Feedback.defaultProps = {
  title: 'SORRY',
  callbackFn: () => {},
  success: false,
  message: 'Invalid credential,please try again',
};
export default Feedback;