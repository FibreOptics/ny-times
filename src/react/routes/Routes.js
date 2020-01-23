import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "sass/main.scss";
import { Header } from "react/components/components";
import Homepage from "./Homepage";
import Detailspage from "./Detailspage";
import page404 from "./404";

const Routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/:id' component={Detailspage} />
        <Route path='/404' component={page404} />
        <Route render={() => <Redirect to='/404' />} />
      </Switch>
    </div>
  );
};

export default Routes;
