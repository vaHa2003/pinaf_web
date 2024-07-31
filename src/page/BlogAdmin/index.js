import classNames from "classnames/bind";
import React from "react";
import styles from "./BlogAdmin.module.scss";
const cx = classNames.bind(styles);

function BlogAdmin() {
  return (
    <div className={cx("blog_container")}>
      <h2 className={cx("blog_title")}>Blog ✍️</h2>
    </div>
  );
}

export default BlogAdmin;
