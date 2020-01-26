import React from "react";
import { Link } from "react-router-dom";
//import styles from "./Articles.module.scss";

const Articles = ({ articles, loading }) => {
  if (loading) return <h2>loading...</h2>;

  return (
    <div className='article'>
      {articles.map((article, index) => {
        const id = article._id.split("/");
        const pathname = `/${index}/${id[3]}`;
        return (
          <div className='articleBox' key={pathname}>
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
