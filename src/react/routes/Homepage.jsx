import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { SortBar, Articles } from "react/components/components";
import useDebounce from "utils/useDebounce";

const Homepage = () => {
  const [articleState, setArticles] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(16);
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchInput = useDebounce(searchInput, 368);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const indexOfLastPost = currentPage * articlesPerPage;
  const indexOfFirstPost = indexOfLastPost - articlesPerPage;
  const currentArticles = articleState.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNo => {
    setCurrentPage(pageNo);
  };

  const fetchArticles = async url => {
    //console.log(url);
    try {
      setArticles(articleState);
      setIsFetching(true);
      const response = await fetch(url);
      const data = await response.json();
      const fromFetch = data.response.docs;
      const articlesFromFetch = fromFetch
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
      //setArticles([...new Set(articlesFromFetch)]);
      setArticles(articlesFromFetch);
      setIsFetching(false);
    } catch (e) {
      console.log(e);
      setArticles(articleState);
      setIsFetching(false);
    }
  };

  const autoFetch = () => {
    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`;
    fetchArticles(url);
  };

  const searchNYT = () => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
      debouncedSearchInput !== "" ? `q=${debouncedSearchInput}&` : ""
    }api-key=${process.env.REACT_APP_NYT_API_KEY}`;
    fetchArticles(url);
  };

  useEffect(() => {
    autoFetch();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (debouncedSearchInput === "") setTimeout(autoFetch, 861);
    else searchNYT();
    //eslint-disable-next-line
  }, [debouncedSearchInput]);

  const sortByDate = (a, b) => {
    return new Date(a.pub_date) - new Date(b.pub_date);
  };
  const sortNewest = () => {
    setArticles([...articleState.sort(sortByDate).reverse()]);
  };
  const sortOldest = () => {
    setArticles([...articleState.sort(sortByDate)]);
  };

  return (
    <div className='homepage'>
      <div className='search'>
        <input
          placeholder='Search...'
          type='text'
          onChange={e => setSearchInput(e.target.value)}
        />
        <SortBar newestFnc={sortNewest} oldestFnc={sortOldest} />
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articleState.length}
        paginate={paginate}
      />
      <Articles articles={currentArticles} loading={isFetching} />
    </div>
  );
};

export default Homepage;
