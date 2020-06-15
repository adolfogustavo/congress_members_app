import React from 'react';
import PropTypes from 'prop-types';

const MembersChooseType = ({ membersType, handleTypeOfMembers }) => {
  return (
    <div className="button-group-container pt2 pb2 bg-light-gray">
      <div className="btn-group">
        <button type="button" className={membersType === 'house' ? `btn btn-outline-dark btn-md tc active`: `btn btn-outline-dark btn-md tc`} onClick={ async () => handleTypeOfMembers('house') }>House</button>
        <button type="button" className={membersType === 'senate' ? `btn btn-outline-dark btn-md tc active`: `btn btn-outline-dark btn-md tc`} onClick={ async () => handleTypeOfMembers('senate') }>Senators</button>
      </div>
    </div>
  );
};

MembersChooseType.propTypes = {
  membersType: PropTypes.string.isRequired,
  handleTypeOfMembers: PropTypes.func.isRequired,
};

export default MembersChooseType;