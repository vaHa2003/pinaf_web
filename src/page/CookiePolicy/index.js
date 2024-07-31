import { CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import React, { useContext } from "react";
import { LoaderContext } from "~/context/Loader/LoaderContext";
import styles from "./CookiePage.module.scss";

import Footer from "~/components/layout/DefaultLayout/Footer";
const cx = classNames.bind(styles);
function CookiePage() {
  const loading = useContext(LoaderContext);

  return (
    <React.Fragment>
      {loading ? (
        <div className={cx("loading")}>
          <CircularProgress size="lg" color="success" />
        </div>
      ) : (
        <div className={cx("cookie")}>
          <div className={cx("cookie__container")}>
            <div className={cx("cookie__layout")}>
              <div className={cx("cookie__img")}></div>
              <div className={cx("cookie__breadcrumb-title")}>
                <h4>Cookies - Policy</h4>
                <span>
                  <a href="/">Home </a>- Cookies Policy
                </span>
              </div>
            </div>
          </div>
          {/* content cookie */}
          <div className={cx("cookie__content")}>
            <div className={cx("content__description")}>
              <p className={cx("content__readcookie")}>
                Please read this cookie policy carefully before using
                [https://pinaf.webflow.io/] website operated by [Brandbes]
              </p>

              <div className={cx("content__question")}>
                <h3 className={cx("content__what")}>What are cookies?</h3>
                <p className={cx("content__reply")}>
                  Cookies are simple text files that are stored on your computer
                  or mobile device by a website’s server. Each cookie is unique
                  to your web browser. It will contain some anonymous
                  information such as a unique identifier, website’s domain
                  name, and some digits and numbers.
                </p>
              </div>

              <div className={cx("content__question")}>
                <h3 className={cx("content__what")}>
                  What types of cookies do we use?
                </h3>

                <h3 className={cx("content__what")}>Necessary cookies</h3>
                <p className={cx("content__reply")}>
                  Necessary cookies allow us to offer you the best possible
                  experience when accessing and navigating through our website
                  and using its features. For example, these cookies let us
                  recognize that you have created an account and have logged
                  into that account.
                </p>
              </div>

              <div className={cx("content__question")}>
                <h3 className={cx("content__what")}>Functionality cookies</h3>

                <h3 className={cx("content__what")}>Necessary cookies</h3>
                <p className={cx("content__reply")}>
                  Functionality cookies let us operate the site in accordance
                  with the choices you make. For example, we will recognize your
                  username and remember how you customized the site during
                  future visits.Analytical cookies
                </p>
                <p className={cx("content__reply")}>
                  Functionality cookies let us operate the site in accordance
                  with the choices you make. For example, we will recognize your
                  username and remember how you customized the site during
                  future visits.Analytical cookies
                </p>
              </div>

              <div className={cx("content__question")}>
                <h3 className={cx("content__what")}>Analytical cookies</h3>

                <p className={cx("content__reply")}>
                  These cookies enable us and third-party services to collect
                  aggregated data for statistical purposes on how our visitors
                  use the website. These cookies do not contain personal
                  information such as names and email addresses and are used to
                  help us improve your user experience of the website.
                </p>
                <p className={cx("content__reply")}>
                  Functionality cookies let us operate the site in accordance
                  with the choices you make. For example, we will recognize your
                  username and remember how you customized the site during
                  future visits.Analytical cookies
                </p>
              </div>

              <div className={cx("content__question")}>
                <h3 className={cx("content__what")}>How to delete cookies?</h3>

                <p className={cx("content__reply")}>
                  If you want to restrict or block the cookies that are set by
                  our website, you can do so through your browser setting.
                  Alternatively, you can visit www.internetcookies.com, which
                  contains comprehensive information on how to do this on a wide
                  variety of browsers and devices. You will find general
                  information about cookies and details on how to delete cookies
                  from your device.
                </p>
              </div>

              <div className={cx("content__question")}>
                <h3 className={cx("content__what")}>Contacting us</h3>

                <p className={cx("content__reply")}>
                  If you have any questions about this policy or our use of
                  cookies, please contact us.
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </React.Fragment>
  );
}

export default CookiePage;
