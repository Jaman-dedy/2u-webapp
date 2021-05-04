import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const ComingSoon = ({ title, subtitle, image }) => {
  return (
    <div className="soon-container">
      <div className="soon-image">
        <Image src={image} />
      </div>
      <div className="soon-details">
        <div className="card-title">{title}</div>
        <div className="card-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

ComingSoon.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
};
ComingSoon.defaultProps = {
  title: '',
  subtitle: '',
  image: '',
};

export default ComingSoon;
