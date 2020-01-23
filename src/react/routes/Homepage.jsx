import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Articles } from "react/components/components";

const Homepage = () => {
  const [articleState, setArticles] = useState({
    articles: [],
    isFetching: false
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [articlesPerPage, setArticlesPerPage] = useState(25);

  const indexOfLastPost = currentPage * articlesPerPage;
  const indexOfFirstPost = indexOfLastPost - articlesPerPage;
  const currentArticles = articleState.articles.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = pageNo => {
    console.log(pageNo);
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    const year = "2020";
    const month = "1";
    const query = "";
    const key = `GW3IYr3IjA4QnJDcv1JbgQBxRzK7ABBx`;
    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?${`q=${query}&`}api-key=${key}`;
    const fetchArticles = async () => {
      try {
        setArticles({ articles: articleState.articles, isFetching: true });
        const response = await fetch(url);
        const data = await response.json();
        setArticles({ articles: data.response.docs, isFetching: false });
      } catch (e) {
        console.log(e);
        setArticles({ articles: articleState.articles, isFetching: false });
      }
    };
    fetchArticles();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(articleState);
  }, [articleState]);

  return (
    <div className='homepage'>
      {/* {articleState.articles.length !== 0 ? ( */}
      <Articles articles={currentArticles} loading={articleState.isFetching} />
      {/* ) : null} */}
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articleState.articles.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Homepage;
