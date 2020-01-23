import React from "react";
import { Redirect } from "react-router-dom";
import { ArticleDetails } from "react/components/components";

const Detailspage = props => {
  return props.location.state ? (
    <ArticleDetails article={props.location.state.article} />
  ) : (
    <Redirect to='/404' />
  );
};

export default Detailspage;
