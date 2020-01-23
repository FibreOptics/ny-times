import React from "react";

const ArticleDetails = ({ article }) => {
  return <div className='detailspage'>{article.headline.main}</div>;
};

export default ArticleDetails;
