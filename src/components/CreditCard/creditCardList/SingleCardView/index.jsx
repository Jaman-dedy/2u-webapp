/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/common/Card';

const SingleCardView = ({ card, onClick, detail }) => {
  return <Card card={card} onClick={onClick} detail={detail} />;
};
SingleCardView.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  detail: PropTypes.bool,
};
SingleCardView.defaultProps = {
  detail: false,
};
export default SingleCardView;
