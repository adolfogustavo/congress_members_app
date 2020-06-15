import React from 'react';

const MembersPagination = ({ membersPerPage, totalMembers, paginate, currentPage }) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++){
    pageNumbers.push(i);
  }
  
  return (
    <nav>
      <ul className="pagination pagination-md pa4">
        { pageNumbers.map(number => 
          <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>) }
      </ul>
    </nav>
  );
};

export default MembersPagination;