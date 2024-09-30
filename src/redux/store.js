import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import layoutSlice from "./layoutSlice";
import storeSlice from "./storeSlice";

export default configureStore({
  reducer: {
    store: storeSlice,
    order: orderReducer,
    layout: layoutSlice,
  },
});
