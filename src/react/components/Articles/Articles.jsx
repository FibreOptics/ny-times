import React from "react";
import { Link } from "react-router-dom";
import styles from "./Articles.module.scss";

const Articles = ({ articles, loading }) => {
  if (loading) return <h2>loading...</h2>;
  return (
    <ul>
      {articles.map((article, index) => (
        <li
          key={`${index}__${article.print_section}__${article.print_page}__${article._id}`}
        >
          {article.headline.main}
        </li>
      ))}
    </ul>
  );
};

export default Articles;
