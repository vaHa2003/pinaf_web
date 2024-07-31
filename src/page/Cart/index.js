import classNames from "classnames/bind";
import React, { useContext } from "react";
import styles from "./Cart.module.scss";
import { CartContext } from "~/context/Cart";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
const cx = classNames.bind(styles);
function Cart() {
  const {
    cartItems,
    addToCart,
    removeFormCart,
    clearCart,
    getTotalCart,
    deleteItem,
  } = useContext(CartContext);

  const notifyRemovedFromCart = (item) =>
    toast.error(`${item.title} removed from cart!`, {
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

  const notifyCartCleared = () =>
    toast.success(`Cart cleared!`, {
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

  const handleRemoveFromCart = (product) => {
    removeFormCart(product);
    notifyRemovedFromCart(product);
  };

  return (
    <React.Fragment>
      <div className={cx("cart")}>
        <h1 className={cx("cart__title")}>
          Your Cart{" "}
          <span style={{ fontSize: "20px", fontWeight: "400" }}>
            ({cartItems.length} items)
          </span>
        </h1>

        {cartItems.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Product">
                      <div className={cx("product__table")}>
                        <div className={cx("product__img")}>
                          <img src={item.imgUrl} alt={item.name} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>{item.title}</p>
                    </td>
                    <td data-label="Price">${item.price}</td>
                    <td data-label="Quantity">
                      <div className={cx("quantity__btn")}>
                        <button
                          className={cx("button__sign")}
                          onClick={() => {
                            if (item.quantity === 1) {
                              handleRemoveFromCart(item);
                            } else {
                              removeFormCart(item);
                            }
                          }}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className={cx("button__sign")}
                          onClick={() => addToCart(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteItem(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <p className={cx("totalCart")}>
                Total: <span>${getTotalCart()}</span>
              </p>
              <div className={cx("btn__clearCart")}>
                <button
                  onClick={() => {
                    clearCart();
                    notifyCartCleared();
                  }}
                >
                  Clear cart
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={cx("cart__empty")}>
            <p style={{ fontSize: "2rem", color: "#296253" }}>
              Your cart is empty 🛒
            </p>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default Cart;
