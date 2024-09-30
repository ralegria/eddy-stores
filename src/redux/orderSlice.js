import { createSlice } from "@reduxjs/toolkit";

const getCartSubtotal = (cart = []) =>
  cart.reduce((acc, item) => {
    const discountPrice = item.discount_price ?? null;
    const priceToAdd = discountPrice ? discountPrice : item.pricing[0].amount;
    return acc + priceToAdd;
  }, 0);

export const orderSlice = createSlice({
  name: "selectedOrder",
  initialState: {
    cart: [],
    subtotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newCart = state.cart.filter(
        (item) => item.documentId !== action.payload.documentId
      );
      state.cart = [...newCart, action.payload];
      state.subtotal = getCartSubtotal(state.cart);
    },
    removeFromCart: (state, action) => {
      const documentId = action.payload;
      state.cart = state.cart.filter((item) => item.documentId !== documentId);
      state.subtotal = getCartSubtotal(state.cart);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = orderSlice.actions;

export default orderSlice.reducer;
