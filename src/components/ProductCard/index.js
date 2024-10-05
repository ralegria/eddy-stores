import cn from "classnames";
import { Button } from "antd";
import { isEmpty } from "lodash";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

import useCart from "../../hooks/useCart";

import { PRODUCT_CARD_STYLES } from "../../consts";
import { currency, imageURL } from "../../utils";

import "./ProductCard.scss";

const ProductCard = ({ data, type = PRODUCT_CARD_STYLES.DEFAULT }) => {
  const { addToCartHandler, removeFromCartHandler, isProductInCart } =
    useCart();

  const documentId = data.documentId;
  const isInCart = isProductInCart(documentId);
  const discountPrice = data.discount_price ?? null;
  const isCartType = type === PRODUCT_CARD_STYLES.CART;
  const hasCategory = !isEmpty(data.categories);
  const price = !isEmpty(data.pricing) ? data.pricing[0].amount : 0;

  return (
    <div
      key={documentId}
      className={cn("product-card", type, {
        "horizontal-card": type === PRODUCT_CARD_STYLES.CART,
      })}
    >
      <div className="thumb-n-content">
        <img
          src={imageURL(data.media[0].url)}
          alt={data.title}
          className="thumbnail"
        />
        <div className="product-card-content">
          {hasCategory && !isCartType && (
            <span className="category">{data.categories[0].name}</span>
          )}
          <h3 className="title">{data.title}</h3>
          <div className="product-actions">
            {!isCartType && (
              <Button
                icon={isInCart ? <></> : <PlusOutlined />}
                onClick={() =>
                  isInCart
                    ? removeFromCartHandler(documentId)
                    : addToCartHandler(data)
                }
              >
                {isInCart ? "Added" : "Add to cart"}
              </Button>
            )}
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
