import moment from "moment";
import { isEmpty } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { DISCOUNT_TYPES } from "../consts";

export const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    catalog: [],
  },
  reducers: {
    setCatalog: (state, action) => {
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

      const rawProducts = action.payload ?? [];
      const products = rawProducts.map((product) => {
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
      });
      state.catalog = [...products];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCatalog } = storeSlice.actions;

export default storeSlice.reducer;
