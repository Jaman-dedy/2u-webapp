import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import './style.scss';

const OtpInput = ({
  name,
  maxLength,
  onChange,
  onKeyDown,
  style,
}) => {
  return (
    <div className="otp-input">
      <Input
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
    </div>
  );
};

OtpInput.propTypes = {
  name: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
};
OtpInput.defaultProps = {
  name: '',
  maxLength: 4,
  onChange: () => {},
  onKeyDown: () => {},
  style: {},
};

export default OtpInput;
