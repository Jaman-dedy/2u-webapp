import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

import calendar from 'assets/images/calendar.png';

import './DatePicker.scss';

const DateInput = ({
  onChange,
  placeholder,
  value,
  onClick,
  label,
  setFocused,
  focused,
}) => {
  /** START  Enable users to type in the date input */
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef();
  const handleInputValueChange = ({ target: { value } }) => {
    setInputValue(value);
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!focused && inputValue && inputRef) {
      onChange({ target: inputRef.current });
    }
  }, [inputValue, focused, inputRef, onChange]);

  /** END  Enable users to type in the date input */

  return (
    <div>
      <label htmlFor="DateInput">{label}</label>
      <div className={`DateInputContainer ${focused && 'focused'}`}>
        <div className="InputIcon">
          <img src={calendar} alt="" />
        </div>
        <input
          className="DateInput"
          onChange={handleInputValueChange}
          placeholder={placeholder}
          value={inputValue}
          onClick={onClick}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
const CustomDatePicker = props => {
  const {
    onDateChange,
    date,
    dateFormat,
    maxDate,
    minDate,
    label,
    placeholder,
  } = props;

  const [focused, setFocused] = useState(false);

  return (
    <DatePicker
      value={date}
      className="datePicker"
      wrapperClassName="datePickerWrapper"
      selected={date}
      onChange={onDateChange}
      customInput={
        <DateInput
          label={label}
          value={date}
          onChange={onDateChange}
          focused={focused}
          setFocused={setFocused}
          onClick
          placeholder
        />
      }
      dateFormat={dateFormat}
      maxDate={maxDate}
      minDate={minDate}
      showYearDropdown
      showMonthDropdown
      adjustDateOnChange
      placeholderText={placeholder}
      dropdownMode="select"
    />
  );
};

CustomDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  dateFormat: PropTypes.func,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

CustomDatePicker.defaultProps = {
  dateFormat: '',
  maxDate: '',
  minDate: '',
  label: '',
  placeholder: '',
};

DateInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.func,
  setFocused: PropTypes.func,
  focused: PropTypes.bool,
};
DateInput.defaultProps = {
  onChange: () => null,
  placeholder: '',
  value: '',
  onClick: () => null,
  label: '',
  setFocused: () => null,
  focused: false,
};

export default CustomDatePicker;
