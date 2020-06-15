import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ copyrights }) => {
    return (
      <div className="footer-cont">
        <div className="title">{copyrights}</div>
      </div>
    );
};

Footer.propTypes = {
  copyrights: PropTypes.string.isRequired,
};

export default Footer;