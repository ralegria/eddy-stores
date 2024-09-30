import { useCallback, useEffect } from "react";
import { isEmpty } from "lodash";
import { Skeleton } from "antd";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { GET_ALL_PRODUCTS } from "../../graphql/CatalogQueries";
import { setCatalog } from "../../redux/storeSlice";

import ProductCard from "../ProductCard";

import "./ProductList.scss";
import { QUERY_FILTERS } from "../../consts";

const ProductList = ({ data }) => {
  //const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.store.catalog);

  const setProducts = useCallback(
    (items) => {
      dispatch(setCatalog(items));
    },
    [dispatch]
  );

  const categoryFilters = !isEmpty(data.categories)
    ? data.categories?.map((category) => category.documentId)
    : [];

  const { loading } = useQuery(GET_ALL_PRODUCTS, {
    skip: categoryFilters.length === 0,
    variables: {
      ...QUERY_FILTERS,
      categoryFilters: {
        categories: {
          documentId: {
            in: categoryFilters,
          },
        },
      },
    },
    onCompleted: (queryData) => {
      setProducts(queryData.products);
    },
  });

  useEffect(() => {
    if (!isEmpty(data.products)) {
      setProducts(data.products);
    }
  }, [setProducts, data]);

  const ProductSkeleton = () => {
    return (
      <div className="product-skeleton">
        <Skeleton.Image active block style={{ width: "100%", height: 328 }} />
        <Skeleton.Button active size="small" />
        <Skeleton.Input active size="small" block />
      </div>
    );
  };

  return (
    <div className="product-list">
      {data.title && data.subtitle && (
        <div className="header-block">
          <h4>{data.title}</h4>
          <p>{data.subtitle}</p>
        </div>
      )}
      <div className="list">
        {loading && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
        {!loading && (
          <>
            {products.map((product) => (
              <ProductCard key={product.documentId} data={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
