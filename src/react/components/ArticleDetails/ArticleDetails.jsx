import React from "react";
import { GoBack } from "react/components/components";
import styles from "./ArticleDetails.module.scss";

const ArticleDetails = ({ history, article }) => {
  const date = new Date(article.pub_date).toUTCString();
  const backHome = () => {
    history.goBack();
  };
  //console.log(article);
  return (
    <div className={styles.detailspage}>
      <GoBack goBack={backHome} />
      <h2>{article.headline.main}</h2>
      <p>
        Source: <a href={article.web_url}>{article.web_url}</a>
      </p>
      <h4>{date}</h4>
      <p>{article.byline.original}</p>
      {article.multimedia.length !== 0 ? (
        <img
          src={`https://static01.nyt.com/${article.multimedia[0].url}`}
          alt=''
          className='img'
        />
      ) : (
        <h3>no image</h3>
      )}
      <p>{article.abstract}</p>
      <p>{article.lead_paragraph}</p>
    </div>
  );
};

export default ArticleDetails;
