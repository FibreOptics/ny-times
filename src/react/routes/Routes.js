import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "sass/main.scss";
import { Header, Footer, ScrollToTop } from "react/components/components";
import Homepage from "./Homepage";
import Detailspage from "./Detailspage";
import Page404 from "./404";

const Routes = () => {
  const [searchInput, setSearchInput] = useState("");
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
