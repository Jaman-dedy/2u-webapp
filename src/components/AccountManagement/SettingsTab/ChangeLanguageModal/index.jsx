import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Item, Flag } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import changeLanguage from 'redux/actions/users/changeLanguage';
import replaceCountryFlag from 'helpers/replaceCountryFlag';
import './style.scss';

const ChangeLanguageModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const {
    language: {
      supported: { data = [] } = {},
      preferred = 'en',
    } = {},
  } = useSelector(({ user }) => user);

  useEffect(() => {
    setCountries(replaceCountryFlag(data));
    setFilteredCountries(replaceCountryFlag(data));
  }, [data]);
  const flagRenderer = item => <Flag name={item.flag} />;
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="mini"
      className="change-lg"
    >
      <Modal.Content>
        <h2>{global.translate('Change language')}</h2>
        <div className="change-lg__content">
          <Item.Group link>
            {countries.length !== 0 &&
              countries.map(item => (
                <Item
                  onClick={() => changeLanguage(item.key)(dispatch)}
                >
                  {flagRenderer(item)}
                  <Item.Content verticalAlign="middle">
                    {item.text}
                  </Item.Content>
                </Item>
              ))}
          </Item.Group>
        </div>
        <div>
          <div className="update-info-actions">
            <Button
              className="cancel-button"
              onClick={() => setOpen(false)}
            >
              {global.translate('Dismiss')}
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

ChangeLanguageModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
ChangeLanguageModal.defaultProps = {
  open: false,
  setOpen: () => {},
};

export default ChangeLanguageModal;
