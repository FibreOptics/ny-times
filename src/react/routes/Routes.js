import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "sass/main.scss";
import { Header, Footer } from "react/components/components";
import Homepage from "./Homepage";
import Detailspage from "./Detailspage";
import Page404 from "./404";

const Routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' render={() => <Homepage />} />
        <Route path='/404' component={Page404} />
        <Route path='/:id' component={Detailspage} />
        <Route render={() => <Redirect to='/404' />} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
