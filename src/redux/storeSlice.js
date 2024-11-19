import moment from "moment";
import { isEmpty } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { DISCOUNT_TYPES } from "../consts";

const calcDiscount = (price, discount) => {
  const type = discount?.type;

  switch (type) {
    case DISCOUNT_TYPES.PERCENTAGE:
      return price - (Number(price) * Number(discount.amount)) / 100;
    case DISCOUNT_TYPES.FIXED:
      return Number(discount.amount);
    default:
      return price;
  }
};

const getProductObject = (product) => {
  const price = product.pricing[0].amount;
  const betweenDatesDiscounts = product.discounts.filter((discount) =>
    moment().isBetween(discount.start_date, discount.end_date)
  );
  return {
    ...product,
    ...(!isEmpty(betweenDatesDiscounts) && {
      discount_price: betweenDatesDiscounts?.reduce((acc, discount) => {
        const currentDiscountPrice = calcDiscount(price, discount);
        const previousDiscountPrice = calcDiscount(price, acc);
        const isSmallerThanPrevious =
          currentDiscountPrice > previousDiscountPrice;

        if (isEmpty(acc)) return currentDiscountPrice;

        return isSmallerThanPrevious
          ? currentDiscountPrice
          : previousDiscountPrice;
      }, null),
    }),
  };
};

export const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    catalog: [],
    selectedProductInfo: {
      pricing: [{ amount: null }],
    },
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProductInfo = getProductObject(action.payload);
    },
    setCatalog: (state, action) => {
      const rawProducts = action.payload ?? [];
      const products = rawProducts.map((product) => getProductObject(product));
      state.catalog = [...products];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCatalog, selectProduct } = storeSlice.actions;

export default storeSlice.reducer;
