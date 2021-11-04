import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'semantic-ui-react';
import ReactFlagsSelect from 'react-flags-select';
import DatePicker from 'components/common/DatePicker';

import './style.scss';

const UpdateInfoModal = ({ open, setOpen, personalInfo }) => {
  const {
    personalInfoData,
    setPersonalInfoData,
    handleSubmit,
    handleInputChange,
    currentOption,
    options,
    setCurrentOption,
    selectedDate,
    setSelectedDate,
    loading,
    disableButton,
    professionOptions,
    nationalityCountry,
    setNationalityCountry,
    setBornCountry,
    bornCountry,
  } = personalInfo;
  const [startDate, setStartDate] = useState(new Date('2014/02/08'));

  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="small">
      <Modal.Content>
        <div className="edit-info-form">
          <h3>{global.translate('User information')}</h3>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name*"
                placeholder="First name"
                onChange={handleInputChange}
                name="FirstName"
                value={personalInfoData?.FirstName}
              />
              <Form.Input
                fluid
                label="Last name*"
                placeholder="Last name"
                onChange={handleInputChange}
                value={personalInfoData?.LastName}
                name="LastName"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                className="gender-input"
                fluid
                label="Gender*"
                placeholder="Select your gender"
                options={options}
                onChange={(target, { name, value }) => {
                  setCurrentOption(value);
                  setPersonalInfoData({
                    ...personalInfoData,
                    [name]: value,
                  });
                }}
                defaultValue={currentOption}
                name="Gender"
              />
              <div className="date-of-birth">
                <div className="date-label">
                  {global.translate('Date of birth*')}
                </div>
                <DatePicker
                  date={selectedDate}
                  onDateChange={date => setSelectedDate(date)}
                  maxDate={startDate}
                  dropdownMode="select"
                  dateFormat="yyyy-MM-dd"
                  placeholder={global.translate('YYYY-MM-DD')}
                />
              </div>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Father's name"
                placeholder="Father's name"
                onChange={handleInputChange}
                value={personalInfoData?.FatherFName}
                name="FatherFName"
              />

              <Form.Input
                fluid
                label="Mother's name"
                placeholder="Mother's name"
                onChange={handleInputChange}
                value={personalInfoData?.MotherFName}
                name="MotherFName"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <div className="info-nationality">
                <div className="nationality-label">
                  {global.translate('Nationality*')}
                </div>
                <ReactFlagsSelect
                  defaultCountry={nationalityCountry?.toUpperCase()}
                  selected={nationalityCountry?.toUpperCase()}
                  onSelect={code => setNationalityCountry(code)}
                  searchable
                  placeholder={global.translate(
                    'Select your country',
                  )}
                />
              </div>
              <div className="info-born-country">
                <div className="nationality-label">
                  {global.translate('Country of birth')}
                </div>
                <ReactFlagsSelect
                  defaultCountry={bornCountry?.toUpperCase()}
                  selected={bornCountry?.toUpperCase()}
                  onSelect={code => setBornCountry(code)}
                  searchable
                  placeholder={global.translate(
                    'Select your country',
                  )}
                />
              </div>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="City of birth"
                placeholder="City of birth"
                value={personalInfoData?.CityOfBirth}
                name="CityOfBirth"
                onChange={handleInputChange}
              />
              <Form.Select
                className="gender-input"
                fluid
                search
                label="Profession"
                placeholder="Select your profession"
                options={professionOptions}
                onChange={(target, { name, value }) => {
                  setCurrentOption(value);
                  setPersonalInfoData({
                    ...personalInfoData,
                    [name]: value,
                  });
                }}
                defaultValue={personalInfoData?.Profession}
                name="Profession"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={8}
                label="Spouse name"
                placeholder="Spouse name"
                value={personalInfoData?.SpouseName}
                name="SpouseName"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="update-info-actions">
          <Button
            className="btn--cancel"
            onClick={() => {
              setOpen(false);
            }}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            className="change-button"
            onClick={handleSubmit}
            loading={loading}
            disabled={disableButton}
          >
            {global.translate('Change')}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
UpdateInfoModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
  handleInputChange: PropTypes.func,
  selectedCountry: PropTypes.objectOf(PropTypes.any),
  onCountryChange: PropTypes.func,
  personalInfo: PropTypes.objectOf(PropTypes.any),
};
UpdateInfoModal.defaultProps = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
  handleInputChange: () => {},
  selectedCountry: {},
  onCountryChange: () => {},
  personalInfo: {},
};

export default UpdateInfoModal;
