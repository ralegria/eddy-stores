import cn from "classnames";
import { Button } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import useCart from "../../hooks/useCart";

import Images from "../../components/Images";
import LongDescription from "../../components/LongDescription";

import { GET_PRODUCT } from "../../graphql/CatalogQueries";
import { selectProduct } from "../../redux/storeSlice";
import { QUERY_FILTERS } from "../../consts";
import { currency } from "../../utils";

import "./Product.scss";

const Product = () => {
  const dispatch = useDispatch();
  const { addToCartHandler, removeFromCartHandler, isProductInCart } =
    useCart();
  const { documentId } = useParams();
  const storedProduct = useSelector((state) => state.store.selectedProductInfo);

  const gallery = storedProduct.media ?? [];
  const price = storedProduct.pricing[0].amount ?? 0;
  const discountPrice = storedProduct.discount_price ?? null;
  const isInCart = isProductInCart(documentId);

  const galleryLayoutClases = cn("gallery", {
    "one-item": gallery.length === 1,
    "two-items": gallery.length === 2,
    "multiple-items": gallery.length > 2,
  });

  const { loading } = useQuery(GET_PRODUCT, {
    variables: {
      documentId,
      ...QUERY_FILTERS,
    },
    onCompleted: (data) => {
      dispatch(selectProduct(data.product));
    },
  });
  return (
    <div className="product-page">
      {!loading && (
        <>
          <div className={galleryLayoutClases}>
            {gallery.map((media) => (
              <Images src={media.url} width={"100%"} className="gallery-item" />
            ))}
          </div>
          <div className="info">
            <div className="head-info">
              <h1>{storedProduct.title}</h1>
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
            <div className="actions">
              <Button
                icon={isInCart ? <CheckOutlined /> : <PlusOutlined />}
                onClick={() =>
                  isInCart
                    ? removeFromCartHandler(documentId)
                    : addToCartHandler(storedProduct)
                }
              >
                {isInCart && "Added"}
                {!isInCart && "Add to cart"}
              </Button>
              <Button>Share with friends</Button>
            </div>
            <p>{storedProduct.short_description}</p>
            <div className="long-description">
              <h5>Product details</h5>
              <LongDescription product={storedProduct} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
