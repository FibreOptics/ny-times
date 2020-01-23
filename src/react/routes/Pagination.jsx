import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ articlesPerPage, totalArticles, paginate }) => {
  const pageNo = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNo.push(i); //our array of page no.
  }

  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      //
      pageCount={pageNo.length}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={number => paginate(number.selected + 1)}
      //
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
