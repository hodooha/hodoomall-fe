import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
    product: productSlice,
    cart: cartSlice
  },
});

export default store;
