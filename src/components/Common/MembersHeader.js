import React from 'react';
import PropTypes from 'prop-types';

const MembersHeader = ({ title, subtitle }) => {
    return (
      <div className="header-cont pl4">
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </div>
    );
};

MembersHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default MembersHeader;