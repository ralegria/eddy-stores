import { Button, Drawer } from "antd";

import { PRODUCT_CARD_STYLES } from "../../consts";

import useLayout from "../../hooks/useLayout";
import useCart from "../../hooks/useCart";

import ProductCard from "../../components/ProductCard";

import "./Cart.scss";

const Cart = () => {
  const { switchCart, isCartOpen } = useLayout();
  const { cartItems, formatSubtotal } = useCart();

  return (
    <div className="cart">
      <Drawer
        title="Tu carrito"
        className="cart"
        onClose={() => switchCart()}
        open={isCartOpen}
      >
        <div className="cart-items">
          {cartItems.map((item) => (
            <ProductCard data={item} type={PRODUCT_CARD_STYLES.CART} />
          ))}
        </div>
        <div className="cart-sumary">
          <div className="cart-subtotal">
            <p>Subtotal</p>
            <h5>{formatSubtotal}</h5>
          </div>
          <Button type="primary" style={{ width: "100%" }}>
            Proceed to Checkout
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
