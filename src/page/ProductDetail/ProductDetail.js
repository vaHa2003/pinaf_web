import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import callApi from "~/service";
import Footer from "~/components/layout/DefaultLayout/Footer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoCaretDown } from "react-icons/io5";
import { CartContext } from "~/context/Cart";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectUserName } from "~/store/user/userSlice";
import ModalLogin from "../ModalLogin/ModalLogin";
const cx = classNames.bind(styles);

function ProductDetail() {
  let { id } = useParams(); // lấy id trên url

  const { cartItems, addToCart, removeFormCart } = useContext(CartContext);

  // trạng thái modal login
  const [modalLogin, setModalLogin] = useState(false);

  const userName = useSelector(selectUserName);

  // state img Product
  const [products, setProducts] = useState([]);
  const [MaxProducts, setMaxProducts] = useState([]);

  const fetchProductData = async (id) => {
    const data = await callApi.fetchProductsDetail(id);
    setProducts(data);
  };

  const fetchMaxProductData = async () => {
    const data = await callApi.fetchProducts();
    const maxProduct = data.sort(() => 0.5 - Math.random()).slice(0, 4);
    setMaxProducts(maxProduct);
  };

  // toast messages
  const notifyAddedToCart = (item) =>
    toast.success(`${item.title} added to cart!`, {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const notifyRemovedFromCart = (item) =>
    toast.success(`${item.title} removed from cart!`, {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  useEffect(() => {
    fetchProductData(id);
    fetchMaxProductData();
    window.scrollTo(0, 0); // chuyển đến trang này là hiển từ đầu xuống
  }, [id, userName]);

  const handleRemoveFromCart = (product) => {
    removeFormCart(product);
    notifyRemovedFromCart(product);
  };

  // token trong local storage
  const token = localStorage.getItem("token");

  return (
    <React.Fragment>
      <div className={cx("product__layout")}>
        <div className={cx("product__img")}></div>
        <div className={cx("product__breadcrumb-title")}>
          <h4>{products.title}</h4>
          <span>
            <a href="/">Home </a> - Shop - {products.title}
          </span>
        </div>
      </div>
      <div className={cx("product__container")}>
        <div className={cx("product__container-layout")}>
          <div className={cx("container__layout-fl")}>
            <div className={cx("product__container-left")}>
              <img src={products.imgUrl} alt={products.imgUrl} />
            </div>
            <div className={cx("product__container-right")}>
              <h2 className={cx("container__title")}>{products.title}</h2>
              <p className={cx("container__content")}>$ {products.price} USD</p>
              <p className={cx("container__description")}>
                {products.description}
              </p>

              <div className={cx("container__infomation")}>
                <div className={cx("infomation__item")}>
                  <ul>
                    <li>Product Information</li>
                    <li>
                      Brand: <span>{products.brand}</span>
                    </li>
                    <li>
                      Model Name: <span>{products.modelname}</span>
                    </li>
                    <li>
                      Color:<span>{products.color}</span>
                    </li>
                    <li>
                      Size: <span>{products.size}</span>
                    </li>
                  </ul>

                  <ul className={cx("container__quantity")}>
                    <li> Quantity</li>
                    {/* <li>
                                            <span>
                                                <input
                                                    type="number"
                                                    name=""
                                                    id="quantityInput"
                                                    placeholder="1"
                                                    min="1"
                                                    max="20"
                                                    defaultValue="1"
                                                    className={cx('input__quantity')}
                                                />
                                            </span>
                                        </li> */}

                    <li>
                      {!token ? (
                        <button
                          className={cx("btn__add")}
                          onClick={() => setModalLogin(true)}
                        >
                          Add to cart
                        </button>
                      ) : cartItems.find((item) => item.id === products.id) ? (
                        <div className={cx("btn__cartItem")}>
                          <button
                            className={cx("btn__adjust")}
                            onClick={() => addToCart(products)}
                          >
                            +
                          </button>
                          <p>
                            {
                              cartItems.find((item) => item.id === products.id)
                                .quantity
                            }
                          </p>
                          <button
                            className={cx("btn__adjust")}
                            onClick={() => {
                              const cartItem = cartItems.find(
                                (item) => item.id === products.id
                              );
                              if (cartItem.quantity === 1) {
                                handleRemoveFromCart(products);
                              } else {
                                removeFormCart(products);
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                      ) : (
                        <button
                          className={cx("btn__add")}
                          onClick={() => {
                            addToCart(products);
                            notifyAddedToCart(products);
                          }}
                        >
                          Add to cart
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("AccordionActions")}>
            <Accordion>
              <AccordionSummary
                style={{
                  fontFamily: "Libre Baskerville, sans-serif",
                  color: "#555",
                  fontWeight: "bold",
                }}
                expandIcon={<IoCaretDown style={{ fontSize: "26px" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Details
              </AccordionSummary>
              <AccordionDetails
                style={{
                  color: "#51544f",
                  fontSize: "15px",
                  fontWeight: "400px",
                  lineHeight: "28px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                There are many variations of passages of Lorem Ipsum available,
                but thema jority have suffered alteration in some form, biny
                injected humour, or randon Contrary to popular belief, Lorem
                Ipsum is not.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<IoCaretDown style={{ fontSize: "26px" }} />}
                aria-controls="panel2-content"
                id="panel2-header"
                style={{
                  fontFamily: "Libre Baskerville, sans-serif",
                  color: "#555",
                  fontWeight: "bold",
                }}
              >
                Shipping
              </AccordionSummary>
              <AccordionDetails
                style={{
                  color: "#51544f",
                  fontSize: "15px",
                  fontWeight: "400px",
                  lineHeight: "28px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Recipient's name. Business's name (if applicable) Street address
                (with apartment or suite number) City, State and ZIP code (on
                the same line)* Country*
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<IoCaretDown style={{ fontSize: "26px" }} />}
                aria-controls="panel3-content"
                id="panel3-header"
                style={{
                  fontFamily: "Libre Baskerville, sans-serif",
                  color: "#555",
                  fontWeight: "bold",
                }}
              >
                Returns
              </AccordionSummary>
              <AccordionDetails
                style={{
                  color: "#51544f",
                  fontSize: "15px",
                  fontWeight: "400px",
                  lineHeight: "28px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                If a customer is buying the products from our shops, then please
                make sure to check the products in front of our sellers. Later,
                if any problems occur than the customer will not be entitled to
                any changes but will be given services based on the product
                provided a description.(Warranty)
              </AccordionDetails>
            </Accordion>
          </div>

          <div className={cx("product__list")}>
            <h4 className={cx("product__title")}> Related Products</h4>
            <div className={cx("product__line")}></div>

            <div className={cx("cards")}>
              {MaxProducts.map((img) => (
                <div className={cx("card")} key={img.id}>
                  <Link
                    to={`/products/${img.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className={cx("product-thumbnail")}>
                      <img loading="lazy" src={img.imgUrl} alt="img Products" />
                    </div>
                    <div className={cx("product-content")}>
                      <h3 className={cx("product-name")}>{img.title}</h3>
                      <p className={cx("price-block")}>
                        $ {img.price} <span>USD</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Đảm bảo rằng bạn đã render ModalLogin ở ngoài event handler */}
      {modalLogin && (
        <ModalLogin
          openModal={modalLogin}
          closeModal={() => setModalLogin(false)}
        />
      )}
    </React.Fragment>
  );
}

export default ProductDetail;
