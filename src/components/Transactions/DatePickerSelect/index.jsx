/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import CalendarArrow from 'assets/images/transactions/calendar-arrow.svg';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Dropdown, Image } from 'semantic-ui-react';
import './style.scss';

const DatePickerSelect = ({ form, setForm, getTransactions }) => {
  const [startDate, setStartDate] = useState(
    new Date(form?.fromDate),
  );
  const [endDate, setEndDate] = useState(new Date(form?.toDate));

  useEffect(() => {
    setForm({
      ...form,
      fromDate: moment(startDate).format('YYYY-MM-DD'),
    });
  }, [startDate]);
  useEffect(() => {
    setForm({
      ...form,
      toDate: moment(endDate).format('YYYY-MM-DD'),
    });
  }, [endDate]);
  return (
    <div>
      <Dropdown
        text={
          <>
            <span>{moment(form?.fromDate).format('ll')}</span>
            <Image src={CalendarArrow} className="arrow-btwn-date" />
            <span>{moment(form?.toDate).format('ll')}</span>
          </>
        }
        pointing
        closeOnEscape
        className="custom-dropdown-box"
      >
        <Dropdown.Menu>
          <div className="date-picker-box">
            <div
              className="date-select"
              onClick={e => e.stopPropagation()}
            >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                inline
                dropdownMode="select"
              />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                inline
                dropdownMode="select"
              />
            </div>
            <div className="date-picker-button-action">
              <Button
                className="btn--cancel"
                onClick={e => e.preventDefault()}
              >
                {global.translate('Cancel')}{' '}
              </Button>
              <Button
                className="btn--confirm"
                onClick={getTransactions}
              >
                {global.translate('Apply ')}
              </Button>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

DatePickerSelect.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  getTransactions: PropTypes.func,
};
DatePickerSelect.defaultProps = {
  form: {},
  setForm: () => {},
  getTransactions: () => {},
};

export default DatePickerSelect;
