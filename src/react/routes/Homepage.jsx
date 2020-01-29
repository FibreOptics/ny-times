import React, { useState, useEffect } from "react";
import { SortBar, Articles, Pagination } from "react/components/components";
import useDebounce from "utils/useDebounce";

//TODO: load next search offset

const Homepage = ({
  searchInput,
  setSearchInput,
  isFetching,
  fetchToArticleStates,
  initialArticles
}) => {
  const [articleState, setArticles] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(16);

  const debouncedSearchInput = useDebounce(searchInput, 368);

  const indexOfLastPost = currentPage * articlesPerPage;
  const indexOfFirstPost = indexOfLastPost - articlesPerPage;
  const currentArticles = articleState.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNo => {
    setCurrentPage(pageNo);
  };

  const sortByDate = (a, b) => {
    return new Date(a.pub_date) - new Date(b.pub_date);
  };
  const sortNewest = () => {
    setArticles([...articleState.sort(sortByDate).reverse()]);
  };
  const sortOldest = () => {
    setArticles([...articleState.sort(sortByDate)]);
  };

  const searchNYT = async () => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
      debouncedSearchInput !== "" ? `q=${debouncedSearchInput}&` : ""
    }api-key=${process.env.REACT_APP_NYT_API_KEY}`;
    setArticles(await fetchToArticleStates(url));
  };

  useEffect(() => {
    const run = async () => {
      if (debouncedSearchInput === "") {
        setTimeout(() => setArticles(initialArticles), 618);
        setTimeout(() => setArticles(initialArticles), 1688);
      }
      //TODO:create a queue stack with a debounce run
      else await searchNYT();
    };
    run();
    //eslint-disable-next-line
  }, [initialArticles, debouncedSearchInput]);

  useEffect(() => {
    if (searchInput !== "") searchNYT(searchInput);
    //eslint-disable-next-line
  }, []);

  return (
    <div className='homepage'>
      <div className='search'>
        <input
          placeholder='Search...'
          type='text'
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
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
