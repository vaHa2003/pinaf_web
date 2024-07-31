import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "~/context/Loader/LoaderContext";
import styles from "./Blog.module.scss";
import { CircularProgress } from "@mui/material";
import Footer from "~/components/layout/DefaultLayout/Footer";
import callApi from "~/service";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AOS from "aos";
import "aos/dist/aos.css";
const cx = classNames.bind(styles);

function Blog() {
  const [dataBlog, setDataBlog] = useState([]);

  const loading = useContext(LoaderContext);

  const blogData = async (config = {}) => {
    const res = await callApi.fetchBlog(config);
    setDataBlog(res);
  };

  useEffect(() => {
    blogData();
    AOS.init({
      delay: 200,
    });
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className={cx("loading")}>
          <CircularProgress ize="lg" color="success" />
        </div>
      ) : (
        <div className={cx("blog")}>
          <div className={cx("blog__container")}>
            <div className={cx("blog__layout")}>
              <div className={cx("blog__img")}></div>
              <div className={cx("blog__breadcrumb-title")}>
                <h4>Blog</h4>
                <span>
                  <a href="/">Home </a> - Blog
                </span>
              </div>
            </div>
            <div className={cx("img__content")}>
              <div className={cx("container")}>
                {dataBlog.map((blog) => {
                  return (
                    <div
                      className={cx("card")}
                      key={blog.id}
                      data-aos="flip-left"
                      data-aos-delay="50"
                      data-aos-duration="1000"
                      data-aos-easing="ease-in-out"
                    >
                      <div className={cx("card__header")}>
                        <img
                          src={blog.imgPost}
                          alt={blog.imgBlog}
                          className={cx("card__image")}
                          width={600}
                        />
                      </div>
                      <div className={cx("card__body")}>
                        <div className={cx("card__footer")}>
                          <div className={cx("user")}>
                            <img
                              src={blog.imgAuthor}
                              alt={blog.imgAuthor}
                              className={cx("user__image")}
                            />
                            <div className={cx("user__info")}>
                              <h5>{blog.author}</h5>
                            </div>
                          </div>
                        </div>
                        <div className={cx("card__time")}>
                          <CalendarMonthOutlinedIcon
                            style={{ color: "#51544f" }}
                          />
                          <small>{blog.creatAt}</small>
                        </div>

                        <h4>{blog.title}</h4>
                        <p>{blog.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={cx("footer__blog")}>
                <button>Next</button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </React.Fragment>
  );
}

export default Blog;
