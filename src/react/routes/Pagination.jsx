import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ articlesPerPage, totalArticles, paginate }) => {
  const pageNo = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNo.push(i); //our array of page no.
  }

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      //
      pageCount={pageNo.length}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={number => paginate(number.selected + 1)}
      //
      containerClassName={"containerClassName"}
      pageClassName={"pageClassName"}
      previousLinkClassName={"previousLinkClassName"}
      nextLinkClassName={"nextLinkClassName"}
      activeClassName={"activeClassName"}
    />
  );
};

export default Pagination;
