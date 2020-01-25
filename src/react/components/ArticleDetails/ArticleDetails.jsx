import React from "react";

const ArticleDetails = ({ article }) => {
  const date = new Date(article.pub_date).toUTCString();
  console.log(article);
  return (
    <div className='detailspage'>
      <h1>{article.headline.main}</h1>
      <h2>{article.abstract}</h2>
      <h3>{date}</h3>
      <div>{article.byline.original}</div>
      {article.multimedia.length !== 0 ? (
        <img
          src={`https://static01.nyt.com/${article.multimedia[0].url}`}
          alt=''
          className='img'
        />
      ) : (
        <h3>no image</h3>
      )}
      <div>{article.lead_paragraph}</div>
      <a href={article.web_url}>
        <span>Source</span>
      </a>
    </div>
  );
};

export default ArticleDetails;
