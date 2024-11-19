import cn from "classnames";
import { Button } from "antd";
import { isEmpty } from "lodash";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import useCart from "../../hooks/useCart";
import { selectProduct } from "../../redux/storeSlice";

import { PRODUCT_CARD_STYLES } from "../../consts";
import { currency, imageURL } from "../../utils";

import "./ProductCard.scss";

const ProductCard = ({ data, type = PRODUCT_CARD_STYLES.DEFAULT }) => {
  const dispatch = useDispatch();
  const { addToCartHandler, removeFromCartHandler, isProductInCart } =
    useCart();

  const documentId = data.documentId;
  const isInCart = isProductInCart(documentId);
  const discountPrice = data.discount_price ?? null;
  const isCartType = type === PRODUCT_CARD_STYLES.CART;
  const hasCategory = !isEmpty(data.categories);
  const price = !isEmpty(data.pricing) ? data.pricing[0].amount : 0;

  const onProductClickHandler = () => {
    dispatch(selectProduct(data));
  };

  const ProductDetailsLink = ({ children }) => (
    <Link
      to={`${process.env.REACT_APP_ROOT}product/${documentId}`}
      onClick={() => onProductClickHandler()}
    >
      {children}
    </Link>
  );

  return (
    <div
      key={documentId}
      className={cn("product-card", type, {
        "horizontal-card": type === PRODUCT_CARD_STYLES.CART,
      })}
    >
      <div className="thumb-n-content">
        <ProductDetailsLink>
          <img
            src={imageURL(data.media[0].url)}
            alt={data.title}
            className="thumbnail"
          />
        </ProductDetailsLink>
        <div className="product-card-content">
          <ProductDetailsLink>
            {hasCategory && !isCartType && (
              <span className="category">{data.categories[0].title}</span>
            )}
            <h3 className="title">{data.title}</h3>
          </ProductDetailsLink>
          <div className="product-actions">
            {!isCartType && (
              <Button
                icon={isInCart ? <CheckOutlined /> : <PlusOutlined />}
                onClick={() =>
                  isInCart
                    ? removeFromCartHandler(documentId)
                    : addToCartHandler(data)
                }
              >
                {isInCart ? "Added" : "Add to cart"}
              </Button>
            )}
            <ProductDetailsLink>
              <div className={cn("price", { "has-discount": discountPrice })}>
                {discountPrice && (
                  <span className="original-price">
                    {currency(discountPrice)}
                  </span>
                )}
                <span
                  className={cn("", {
                    "original-price": !discountPrice,
                    "discount-price": discountPrice,
                  })}
                >
                  {currency(price)}
                </span>
              </div>
            </ProductDetailsLink>
          </div>
        </div>
      </div>
      {isCartType && (
        <Button
          icon={<CloseOutlined />}
          type="circle"
          size="small"
          onClick={() => removeFromCartHandler(documentId)}
        />
      )}
    </div>
  );
};

export default ProductCard;
