import React from 'react';

const MembersSearch = ({ searchString, handleInputSearch }) => {
  return (
    <input
        type="text"
        value={searchString}
        onChange={handleInputSearch}
        placeholder="Search"
        className="members-search"
    />
  );
};

export default MembersSearch;