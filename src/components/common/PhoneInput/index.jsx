import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';

import './PhoneInput.scss';

const CustomPhoneInput = props => {
  const [value, setValue] = useState();
  const {
    focused,
    setPhoneNumber,
    phoneValue,
    setFocused,
    country,
  } = props;
  useEffect(() => {
    if (country?.key) {
      setValue(phoneValue);
    }
  }, [country?.key, phoneValue]);
  return (
    <div className="PhoneInput">
      <div className={`user-phone-number ${focused && 'focused'}`}>
        <PhoneInput
          enableSearch
          country={country.key}
          value={value}
          onChange={number => setPhoneNumber(number)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
};

CustomPhoneInput.propTypes = {
  setFocused: PropTypes.func,
  focused: PropTypes.bool,
  setPhoneNumber: PropTypes.func,
  phoneValue: PropTypes.string,
  country: PropTypes.shape({
    key: PropTypes.string,
  }),
};
CustomPhoneInput.defaultProps = {
  setFocused: () => null,
  focused: '',
  setPhoneNumber: () => null,
  phoneValue: '',
  country: { key: '' },
};
export default CustomPhoneInput;
