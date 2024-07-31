import React, { createContext, useEffect, useState } from "react";

// Tạo Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // khởi tạo trạng thái của giỏ hàng
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  // thêm sản phẩm vào giỏ hàng
  // xoá sản phẩm trong giỏ hàng
  // xoá tất cả sản phẩm trong giỏ hàng
  // lấy tổng số giỏ hàng

  // thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => {
    // kiểm tra xem mặt hàng đã có trong giỏ hàng chưa
    const isItemCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemCart) {
      // Nếu mặt hàng đã có trong thùng hàng thì hãy tăng số lượng mặt hàng đó lên
      // nếu không, hãy trả lại mặt hàng trong thùng hàng
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
  };

  // xoá sản phẩm trong giỏ hàng
  const removeFormCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    // nếu số lượng mặt hàng là 1, vui lòng xóa mặt hàng đó khỏi thùng hàng
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
    // nếu số lượng hàng lớn hơn 1 thì số lượng hàng đó sẽ giảm
    else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  // xoá tất cả giỏ hàng
  const clearCart = () => {
    setCartItems([]); // xét lại trạng thái của giỏ hàng là mảng rỗng
  };

  // tổng số giỏ hàng
  const getTotalCart = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Xóa một item hoàn toàn khỏi giỏ hàng
  const deleteItem = (item) => {
    // Lọc ra những item không phải là item cần xóa
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  // lấy các mặt hàng trong giỏ hàng trong localStorage
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  // sử dụng useEffect để duy trì giỏ hàng
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFormCart,
        clearCart,
        getTotalCart,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
