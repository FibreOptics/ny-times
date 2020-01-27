import React from "react";
import { Redirect } from "react-router-dom";
import { ArticleDetails } from "react/components/components";

const Detailspage = ({ location, history }) => {
  return location.state ? (
    <ArticleDetails history={history} article={location.state.article} />
  ) : (
    <Redirect to='/404' />
  );
};

export default Detailspage;
