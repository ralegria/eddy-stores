import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/orderSlice";
import { currency } from "../utils";

const useCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.order.cart);
  const subtotal = useSelector((state) => state.order.subtotal);
  const counter = cartItems.length ?? 0;

  const isProductInCart = (documentId) =>
    cartItems.some((item) => item.documentId === documentId);

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  const removeFromCartHandler = (documentId) => {
    dispatch(removeFromCart(documentId));
  };

  return {
    cartItems,
    counter,
    subtotal,
    formatSubtotal: currency(subtotal),
    addToCartHandler,
    removeFromCartHandler,
    isProductInCart,
  };
};

export default useCart;
