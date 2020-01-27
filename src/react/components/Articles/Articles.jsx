import React from "react";
import { Link } from "react-router-dom";
import { Loading } from "react/components/components";
import styles from "./Articles.module.scss";

const Articles = ({ articles, loading }) => {
  if (loading)
    return (
      <div className={styles.article}>
        <Loading />
      </div>
    );
  return (
    <div className={styles.article}>
      {articles.map((article, index) => {
        const id = article._id.split("/");
        const pathname = `/${index}/${id[3]}`;
        return (
          <div className={styles.articleBox} key={pathname}>
            <Link
              to={{
                pathname: pathname,
                state: { article }
              }}
            >
              <div>
                <h4>{article.headline.main}</h4>
                <h5>{article.abstract}</h5>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
