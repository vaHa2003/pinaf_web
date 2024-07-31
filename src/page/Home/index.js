import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Autoplay } from "swiper/modules";
import { imgContent, imgSliders } from "./Home";
import { Link } from "react-router-dom";
import product1 from "~/asset/imgs/asset 8.jpeg";
import product2 from "~/asset/imgs/asset 10.jpeg";
import product3 from "~/asset/imgs/asset 11.jpeg";
import { LoaderContext, LoaderProvider } from "~/context/Loader/LoaderContext";
import Footer from "~/components/layout/DefaultLayout/Footer";
import callApi from "~/service";
import PrevButton from "~/components/PrevButton/PrevButton";
import NextButton from "~/components/NextButton/NextButton";
import AOS from "aos";
import "aos/dist/aos.css";

const cx = classNames.bind(styles);

function Home() {
  // context loading
  const loading = useContext(LoaderContext);

  // state img Product
  const [products, setProducts] = useState([]);

  const fetchProductData = async () => {
    const data = await callApi.fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProductData();
    AOS.init({
      offset: 300,
      duration: 3000,
      delay: 600,
    });
  }, []);

  const settings = {
    infinite: true,
    slidesToScroll: 1,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {},
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <LoaderProvider>
      <React.Fragment>
        {loading ? (
          <div className={cx("loading")}>
            <CircularProgress ize="lg" color="success" />
          </div>
        ) : (
          <div className={cx("home")}>
            {/* Slider */}
            <div className={cx("home__slider")}>
              <Swiper
                spaceBetween={2}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay]}
              >
                {imgSliders.map((imgSlider, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imgSlider.url}
                      alt="img slider"
                      className={cx("home__imgSlider")}
                    />

                    <div className={cx("home_swipper_container")}>
                      <div className={cx("home_content")}>
                        <h1 className={cx("home_content__title")}>
                          {imgSlider.content}
                        </h1>
                        <p className={cx("home_content-description")}>
                          {imgSlider.description}
                        </p>
                        <Link to="/shop" style={{ textDecoration: "none" }}>
                          <button className={cx("home_content-btn")}>
                            Shop Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* product */}
            <div className={cx("home_product")}>
              <div
                className={cx("home__product-cart")}
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
              >
                <div className={cx("home__cart")}>
                  <div className={cx("home__cart_cl")}>
                    <div className={cx("home__cart-img-product")}>
                      <img
                        src={product1}
                        alt="img product 1"
                        className={cx("home__cart__img")}
                      />
                    </div>
                    <div className={cx("home__cart__content")}>
                      <h3 className={cx("home__content-best")}>
                        - Best Selling
                      </h3>
                      <p className={cx("home__content-title")}>
                        Plant <br /> For Healthy
                      </p>
                      <div className={cx("home__content-btn")}>
                        <Link to="/shop" style={{ textDecoration: "none" }}>
                          <span className={cx("home-btn_boder")}></span>
                          <div className={cx("home-btn_shop")}>
                            <p className={cx("home-btn-now")}>
                              SHOP NOW &rarr;
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("home__cart")}>
                  <div className={cx("home__cart_cl")}>
                    <div className={cx("home__cart-img-product")}>
                      <img
                        src={product2}
                        alt="img product 2"
                        className={cx("home__cart__img")}
                      />
                    </div>
                    <div className={cx("home__cart__content")}>
                      <h3 className={cx("home__content-best")}>
                        - Top Products
                      </h3>
                      <p className={cx("home__content-title")}>
                        Plant <br /> For Home
                      </p>
                      <div className={cx("home__content-btn")}>
                        <div className={cx("home-btn_shop")}>
                          <Link to="/shop" style={{ textDecoration: "none" }}>
                            <p className={cx("home-btn-now")}>
                              SHOP NOW &rarr;
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("home__cart")}>
                  <div className={cx("home__cart_cl")}>
                    <div className={cx("home__cart-img-product")}>
                      <img
                        src={product3}
                        alt="img product 1"
                        className={cx("home__cart__img")}
                      />
                    </div>
                    <div className={cx("home__cart__content")}>
                      <h3 className={cx("home__content-best")}>- Top Rated</h3>
                      <p className={cx("home__content-title")}>
                        Plant <br /> For Office
                      </p>
                      <div className={cx("home__content-btn")}>
                        <Link to="/shop" style={{ textDecoration: "none" }}>
                          <span className={cx("home-btn_boder")}></span>
                          <div className={cx("home-btn_shop")}>
                            <p className={cx("home-btn-now")}>
                              SHOP NOW &rarr;
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* hết product */}

            {/* Ưu Đãi Hàng Ngày */}
            <div className={cx("list__product")}>
              <div className={cx("list__product-container")}>
                <h3
                  className={cx("list__product-title")}
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                >
                  Daily Deals <span style={{ color: "#79a307" }}>&rarr;</span>
                </h3>

                <div className={cx("list__product-item")}>
                  <div className={cx("cards")}>
                    {products.map((product, id) => (
                      <div className={cx("card")} data-aos="flip-left">
                        <Link
                          to={`/products/${product.id}`}
                          key={id}
                          style={{ textDecoration: "none" }}
                        >
                          <div className={cx("product-thumbnail")}>
                            <img
                              src={product.imgUrl}
                              alt="img Products"
                              loading="lazy"
                            />
                          </div>
                          <div className={cx("product-content")}>
                            <h3 className={cx("product-name")}>
                              {product.title}
                            </h3>
                            <p className={cx("price-block")}>
                              $ {product.price} <span>USD</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* hết Ưu Đãi Hàng Ngày */}

            {/* logo đối tác */}
            <div className={cx("partners_section")}>
              <div className={cx("logos_slider")}>
                <div className={cx("overflow")}>
                  <div className={cx("logo_wrapper")}>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/637483a931e71834525136fb_4.svg"
                        alt="img logo1"
                      />
                    </div>

                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6374838bfa14686a90a279b1_3.svg"
                        alt="img logo1"
                      />
                    </div>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/63749d787800f3e8d7ab4345_5.svg"
                        alt="img logo1"
                      />
                    </div>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6374762a63943d7a03eee031_1.svg"
                        alt="img logo1"
                      />
                    </div>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/637483595f327eccd8609747_2.svg"
                        alt="img logo1"
                      />
                    </div>
                  </div>

                  <div className={cx("logo_wrapper")}>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/637483a931e71834525136fb_4.svg"
                        alt="img logo1"
                      />
                    </div>

                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6374838bfa14686a90a279b1_3.svg"
                        alt="img logo1"
                      />
                    </div>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/63749d787800f3e8d7ab4345_5.svg"
                        alt="img logo1"
                      />
                    </div>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6374762a63943d7a03eee031_1.svg"
                        alt="img logo1"
                      />
                    </div>
                    <div className={cx("logo_item")}>
                      <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/637483595f327eccd8609747_2.svg"
                        alt="img logo1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* giới thiệu */}
            <div className={cx("content__bg")}>
              <div className={cx("content__fl")}>
                <div className={cx("content__container")}>
                  <Slider {...settings}>
                    {imgContent.map((imgContent, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={imgContent.url}
                            alt="img avartar"
                            className={cx("content__img")}
                          />
                          <p className={cx("content__text")}>
                            Pinaf is an excellent plant store eCommerce website
                            template that I have used for my online store. The
                            template is beautifully designed and easy to
                            navigate, with a clean and modern aesthetic perfect
                            for displaying plants and other products.
                          </p>
                          <span className={cx("content__name")}>
                            Christopher Evans
                            <p className={cx("content__p")}>COBRA STRETCH</p>
                          </span>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            {/* Lợi ích khách hàng */}
            <div className={cx("feature-section")}>
              <div
                className={cx("freature-container")}
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
              >
                <div className={cx("freature-item")}>
                  <img
                    src="https://assets.website-files.com/63708df071bc73798fae96ee/6374b7eb7602dc0e623f007b_icon-2.svg"
                    alt="img ship"
                  />
                  <div className={cx("feature-content")}>
                    <h4 className={cx("feature-title")}>Free Shipping</h4>
                    <p className={cx("feature-summary")}>
                      Buy product over $100 and get free <br /> home delivery
                      offer
                    </p>
                  </div>

                  <div className={cx("bottom-line-shape")}></div>
                </div>
                <div className={cx("freature-item")}>
                  <img
                    src="https://assets.website-files.com/63708df071bc73798fae96ee/6374b7eafb7e46ab6f2a4301_icon-3.svg"
                    alt="img ship"
                  />
                  <div className={cx("feature-content")}>
                    <h4 className={cx("feature-title")}>Money Back Guarntee</h4>
                    <p className={cx("feature-summary")}>
                      You have 30-days return guarantee <br /> for every single
                      order
                    </p>
                  </div>
                  <div className={cx("bottom-line-center")}></div>
                </div>
                <div className={cx("freature-item")}>
                  <img
                    src="https://assets.website-files.com/63708df071bc73798fae96ee/6374b29d1cf7095d71fdf7c5_icon.svg"
                    alt="img ship"
                  />
                  <div className={cx("feature-content")}>
                    <h4 className={cx("feature-title")}>Safe Payment</h4>
                    <p className={cx("feature-summary")}>
                      We conform you that payment system <br /> are totally
                      secure
                    </p>
                    <div className={cx("bottom-line-shape")}></div>
                  </div>
                </div>
              </div>
            </div>
            {/* hết Lợi ích khách hàng */}

            {/* hình ảnh giới thiệu */}
            <div className={cx("shop-category-list")}>
              <div className={cx("listitem")}>
                <div className={cx("listitem__img-row")}>
                  <img
                    src="https://assets.website-files.com/6371f9c50ce0bd588f4fa954/6375b16009bb2fc4fc35deed_place%20your%20image.jpg"
                    alt="img Store Plant "
                    className={cx("listitem-img")}
                  />
                </div>
                <h3 className={cx("plant-caterory-title")}>Store Plant</h3>
              </div>
              <div className={cx("listitem")}>
                <div className={cx("listitem__img-row")}>
                  <img
                    src="https://assets.website-files.com/6371f9c50ce0bd588f4fa954/6375b1882e6aae6e73cbd994_place%20your%20image-1.jpg"
                    alt="img Store Plant "
                    className={cx("listitem-img")}
                  />
                </div>
                <h3 className={cx("plant-caterory-title")}>House Plant</h3>
              </div>
              <div className={cx("listitem")}>
                <div className={cx("listitem__img-row")}>
                  <img
                    src="https://assets.website-files.com/6371f9c50ce0bd588f4fa954/6375b1af280e6921127828c8_place%20your%20image-2.jpg"
                    alt="img Store Plant "
                    className={cx("listitem-img")}
                  />
                </div>
                <h3 className={cx("plant-caterory-title")}>Office Plant</h3>
              </div>
            </div>
            {/* hết hình ảnh giới thiệu */}

            <Footer />
          </div>
        )}
      </React.Fragment>
    </LoaderProvider>
  );
}

export default Home;
