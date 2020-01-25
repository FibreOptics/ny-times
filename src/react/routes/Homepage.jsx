import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Articles } from "react/components/components";

const Homepage = () => {
  const [articleState, setArticles] = useState({
    articles: [],
    isFetching: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(25);
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTO] = useState(0);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const key = `GW3IYr3IjA4QnJDcv1JbgQBxRzK7ABBx`;

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

  const handleChange = e => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const input = e.target.value;
    setTypingTO(
      setTimeout(() => {
        setQuery(input);
      }, 750)
    );
  };
  //Sort
  const sortByDate = (a, b) => {
    return new Date(a.pub_date) - new Date(b.pub_date);
  };

  const fetchArticles = async url => {
    console.log(url);
    try {
      setArticles({ articles: articleState.articles, isFetching: true });
      const response = await fetch(url);
      const data = await response.json();
      const articlesFromFetch = data.response.docs;
      //articlesFromFetch.sort(sortByDate).reverse();

      setArticles({
        articles: [...new Set(articlesFromFetch)],
        isFetching: false
      });
    } catch (e) {
      console.log(e);
      setArticles({ articles: articleState.articles, isFetching: false });
    }
  };

  const autoFetch = () => {
    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${key}`;
    fetchArticles(url);
  };

  const searchNYT = () => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
      query !== "" ? `q=${query}&` : ""
    }api-key=${key}`;
    fetchArticles(url);
  };

  useEffect(() => {
    autoFetch();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (query !== "") searchNYT();
    //eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    console.log(articleState);
  }, [articleState]);

  return (
    <div className='homepage'>
      <input placeholder='Search...' type='text' onChange={handleChange} />
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
