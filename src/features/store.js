import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
import couponSlice from "./coupon/couponSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    coupon: couponSlice
  },
});

export default store;
