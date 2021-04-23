/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import './style.scss';

const TermsAndConditions = ({
  open,
  setOpen,
  handleTermsAndCondition,
}) => {
  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="small">
      <Modal.Content scrolling>
        <iframe
          src="https://2u.money/terms-and-conditions?view=simple"
          title="2u money terms and conditions"
          frameBorder="0"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button className="btn-cancel" onClick={() => setOpen(false)}>
          {global.translate('Cancel')}
        </Button>
        <Button
          className="btn-agree"
          onClick={handleTermsAndCondition}
        >
          {global.translate('I agree')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

TermsAndConditions.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleTermsAndCondition: PropTypes.func,
};
TermsAndConditions.defaultProps = {
  open: false,
  setOpen: () => {},
  handleTermsAndCondition: () => {},
};

export default TermsAndConditions;
