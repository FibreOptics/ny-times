import React from "react";
import { Link } from "react-router-dom";
//import styles from "./Articles.module.scss";

const Articles = ({ articles, loading }) => {
  if (loading) return <h2>loading...</h2>;

  return (
    <ul>
      {articles.map((article, index) => {
        const id = article._id.split("/");
        const pathname = `/${index}/${id[3]}`;
        return (
          <li key={pathname}>
            <Link
              to={{
                pathname: pathname,
                state: { article }
              }}
            >
              {article.headline.main}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Articles;
