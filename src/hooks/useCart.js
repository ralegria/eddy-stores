import { useDispatch, useSelector } from "react-redux";
import { currency } from "../utils";

const useCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.order.cart);
  const subtotal = useSelector((state) => state.order.subtotal);

  return {
    cartItems,
    subtotal,
    formatSubtotal: currency(subtotal),
  };
};

export default useCart;
