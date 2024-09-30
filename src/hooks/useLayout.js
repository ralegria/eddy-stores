import { useDispatch, useSelector } from "react-redux";
import { switchCartStatus } from "../redux/layoutSlice";

const useLayout = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector((state) => state.layout.isCartOpen);

  const switchCart = () => dispatch(switchCartStatus());

  return {
    switchCart,
    isCartOpen,
  };
};

export default useLayout;
