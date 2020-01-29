import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "sass/main.scss";
import { Header, Footer, ScrollToTop } from "react/components/components";
import Homepage from "./Homepage";
import Detailspage from "./Detailspage";
import Page404 from "./404";

const Routes = () => {
  //---------------App level---------------//
  const [searchInput, setSearchInput] = useState("");
  const [initialArticles, setInitialArticles] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  //---------------App level---------------//

  const fetchArticles = async url => {
    //console.log(url);
    console.log("requesting");
    try {
      const response = await fetch(url);
      const data = await response.json();
      const fromFetch = data.response.docs;
      return await fromFetch;
    } catch (e) {
      console.log(e);
      alert("API request limit reached");
      return [];
    }
  };

  const fetchToArticleStates = async url => {
    setIsFetching(true);
    const fromFetch = await fetchArticles(url);
    setIsFetching(false);
    if (Array.isArray(fromFetch)) {
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
      //[...new Set(articlesFromFetch)]);
      return articlesFromFetch;
    } else {
      console.log(fromFetch);
    }
  };

  const autoFetch = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`;
    setInitialArticles(await fetchToArticleStates(url));
  };

  useEffect(() => {
    autoFetch();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <Homepage
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              isFetching={isFetching}
              fetchToArticleStates={fetchToArticleStates}
              initialArticles={initialArticles}
            />
          )}
        />
        <Route path='/404' component={Page404} />
        <Route path='/:id' component={Detailspage} />
        <Route render={() => <Redirect to='/404' />} />
      </Switch>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Routes;
