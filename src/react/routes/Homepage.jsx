import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Articles } from "react/components/components";

const Homepage = () => {
  const [articleState, setArticles] = useState({
    articles: [],
    isFetching: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(16);
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTO] = useState(0);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

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
      }, 618)
    );
  };

  const sortByDate = (a, b) => {
    return new Date(a.pub_date) - new Date(b.pub_date);
  };

  const fetchArticles = async url => {
    console.log(url);
    try {
      setArticles({ articles: articleState.articles, isFetching: true });
      const response = await fetch(url);
      const data = await response.json();
      const fromFetch = data.response.docs;
      const articlesFromFetch = fromFetch
        .sort(sortByDate)
        .reverse()
        //filter dups
        .filter((v, i, a) => {
          for (let index = 0; index < i; index++) {
            if (
              v.headline.main === a[index].headline.main &&
              v.abstract === a[index].abstract &&
              v.web_url === a[index].web_url &&
              v.pub_date === a[index].pub_date &&
              a.indexOf(v.headline.main) !== index
            )
              return false;
          }
          return true;
        });
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
    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`;
    fetchArticles(url);
  };

  const searchNYT = () => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
      query !== "" ? `q=${query}&` : ""
    }api-key=${process.env.REACT_APP_NYT_API_KEY}`;
    fetchArticles(url);
  };

  useEffect(() => {
    autoFetch();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (query !== "") searchNYT();
    else autoFetch();
    //eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    console.log(articleState);
  }, [articleState]);

  return (
    <div className='homepage'>
      <input placeholder='Search...' type='text' onChange={handleChange} />
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articleState.articles.length}
        paginate={paginate}
      />
      <Articles articles={currentArticles} loading={articleState.isFetching} />
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articleState.articles.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Homepage;
