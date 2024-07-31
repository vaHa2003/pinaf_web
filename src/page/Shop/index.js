import { CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Shop.module.scss";
import { LoaderContext } from "~/context/Loader/LoaderContext";
import Footer from "~/components/layout/DefaultLayout/Footer";
import { Link } from "react-router-dom";
import callApi from "~/service";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { PiTextAlignLeftLight } from "react-icons/pi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AOS from "aos";
import "aos/dist/aos.css";
const cx = classNames.bind(styles);

function Shop() {
  const [products, setProducts] = useState([]);
  const spanRef1 = useRef();
  const spanRef2 = useRef();

  const [toogleIconSpan1, setToogleIconSpan1] = useState("icon_bg");
  const [toogleIconSpan2, setToogleIconSpan2] = useState("icon_sp");

  const [toogleBlock1, setToogleBlock1] = useState("cards");
  const [toogleBlock2, setToogleBlock2] = useState("cards__none");

  const loading = useContext(LoaderContext);

  const fetchProductData = async () => {
    const data = await callApi.fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProductData();
    AOS.init();
  }, []);

  const handleToogleIcon = () => {
    if (toogleIconSpan1 === "icon_bg") {
      setToogleIconSpan1("icon_sp");
      setToogleIconSpan2("icon_bg");
    } else {
      setToogleIconSpan1("icon_bg");
      setToogleIconSpan2("icon_sp");
      setToogleBlock1("cards");
      setToogleBlock2("cards__none");
    }
  };

  const handleToogleIcon2 = () => {
    if (toogleIconSpan2 === "icon_sp") {
      setToogleIconSpan2("icon_bg");
      setToogleIconSpan1("icon_sp");
      setToogleBlock2("cards1");
      setToogleBlock1("cards1__none");
    } else {
      setToogleBlock1("cards");
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className={cx("loading")}>
          <CircularProgress ize="lg" color="success" />
        </div>
      ) : (
        <div className={cx("list__product-item")}>
          <div className={cx("shop__container")}>
            <div className={cx("shop__layout")}>
              <div className={cx("shop__img")}></div>
              <div className={cx("shop__breadcrumb-title")}>
                <h4>Shop</h4>
                <span>
                  <a href="/">Home </a> - Shop
                </span>
              </div>
            </div>

            <div className={cx("container__icon")}>
              <div className={cx("container__icon-item")}>
                <div className={cx("container__item-layout")}>
                  <span
                    ref={spanRef1}
                    className={cx(toogleIconSpan1)}
                    onClick={handleToogleIcon}
                  >
                    <TfiLayoutGrid2 style={{ fontSize: "20px" }} />
                  </span>
                  <span
                    ref={spanRef2}
                    className={cx(toogleIconSpan2)}
                    onClick={handleToogleIcon2}
                  >
                    <PiTextAlignLeftLight style={{ fontSize: "20px" }} />
                  </span>
                </div>
              </div>
              <div className={cx("container__icon-item")}></div>
            </div>

            <div className={cx(toogleBlock1)}>
              {products.map((img) => (
                <div
                  className={cx("card")}
                  data-aos="flip-left"
                  data-aos-delay="50"
                  data-aos-duration="400"
                  data-aos-easing="ease-in-out"
                >
                  <div className={cx("product-thumbnail")}>
                    <img src={img.imgUrl} alt="img Products" />
                  </div>
                  <div className={cx("product-content")}>
                    <Link
                      to={`/products/${img.id}`}
                      key={img.id}
                      style={{ textDecoration: "none" }}
                    >
                      <h3 className={cx("product-name")}>{img.title}</h3>
                      <p className={cx("price-block")}>
                        $ {img.price} <span>USD</span>
                      </p>
                      {/* <button className={cx('add__btn')}>Add to cart</button> */}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className={cx(toogleBlock2)}>
              {products.map((img) => (
                <div
                  className={cx("card")}
                  data-aos="flip-left"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                >
                  <div className={cx("card__left")}>
                    <div className={cx("shop-thumbnail")}>
                      <img src={img.imgUrl} alt="img shops" />
                    </div>
                  </div>
                  <div className={cx("card__right")}>
                    <form className={cx("shop-content")}>
                      <div className={cx("shop__h3")}>
                        <h3 className={cx("shop__name")}>{img.title}</h3>
                      </div>
                      <div className={cx("shop__price")}>
                        <p className={cx("price__block")}>
                          $ {img.price} <span>USD</span>
                        </p>
                      </div>
                      <div className={cx("shop__description")}>
                        <p className={cx("text__description")}>
                          {img.description}
                        </p>
                      </div>
                      <div className={cx("shop__btn")}>
                        <div type="submit" className={cx("btn__cart")}>
                          <Link
                            to={`/products/${img.id}`}
                            key={img.id}
                            style={{ textDecoration: "none" }}
                          >
                            <span className={cx("shop__cart")}>
                              <ShoppingCartIcon
                                style={{ color: "#fff", fontSize: "20px" }}
                              />
                            </span>
                            <span style={{ color: "#fff" }}> ADD TO CART</span>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </React.Fragment>
  );
}

export default Shop;
