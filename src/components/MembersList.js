import React from 'react';
import PropTypes from 'prop-types';

const GridHeader = ({ membersType }) => (
  <div className="flex pt3 mt2 pb3 pl3 item-list-header">
    <div className="w-100 b">Name</div>
    <div className="w-100 b">Party</div>
    <div className="w-100 b">Born</div>
    <div className="w-100 b">Gender</div>
    <div className="w-100 b">State</div>
    { membersType === 'house' && <div className="w-100 b">District</div>}
    <div className="w-100 b">Next Election</div>
    <div className="w-100 b">Detail</div>
  </div>
);

const handleMoreInfo = (memberId) => {
  window.open(`/${memberId}`,"_self")
}

const MembersList = ({ filtered, membersType }) => {

  return (
    <div className="members-container">
        <GridHeader membersType={membersType}/>
        { filtered.length === 0 && <div className="search-no-results">No results</div> }
        {filtered.map( (info, key) => (
        <div className="flex pl3 pb2 item-list" key={key} onClick={() => handleMoreInfo(info.id)}>
          <div className="w-100">{info.full_name}</div>
          <div className="w-100">{info.party}</div>
          <div className="w-100">{info.date_of_birth}</div>
          <div className="w-100">{info.gender}</div>
          <div className="w-100">{info.state}</div>
          { membersType === 'house' && <div className="w-100">{info.district}</div> }
          <div className="w-100">{info.next_election}</div>
          <div className="w-100"><button className="btn btn-sm btn-outline-success" onClick={() => handleMoreInfo(info.id)}>More</button></div>
        </div>
      ))}
    </div>
  );
};

MembersList.propTypes = {
  filtered: PropTypes.array.isRequired,
};

export default MembersList;