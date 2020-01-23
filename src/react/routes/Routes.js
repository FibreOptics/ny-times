import React from "react";
import { Route, Switch } from "react-router-dom";
import "sass/main.scss";
import { Header } from "react/components/components";
import Homepage from "./Homepage";
import page404 from "./404";

const Routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/:id' component={Homepage} />
        <Route path='*' component={page404} />
      </Switch>
    </div>
  );
};

export default Routes;
