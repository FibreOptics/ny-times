import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
  currentPage,
  articlesPerPage,
  totalArticles,
  paginate
}) => {
  const pageNo = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNo.push(i); //our array of page no.
  }

  return (
    <ReactPaginate
      pageCount={pageNo.length}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      //initialPage={currentPage - 1}
      //forcePage={currentPage + 1}
      onPageChange={number => paginate(number.selected + 1)}
      //
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      //
      containerClassName={"containerClassName"}
      activeClassName={"activeClassName"}
    />
  );
};

export default Pagination;
