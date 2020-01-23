import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ articlesPerPage, totalArticles, paginate }) => {
  const pageNo = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNo.push(i); //our array of page no.
  }
  /*   <nav>
      <ul className='pagination'>
        {pageNo.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav> */

  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      //breakClassName={"break-me"}
      pageCount={pageNo.length}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={number => paginate(number.selected + 1)}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
