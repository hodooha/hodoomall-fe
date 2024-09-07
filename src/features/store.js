import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
  },
});

export default store;
