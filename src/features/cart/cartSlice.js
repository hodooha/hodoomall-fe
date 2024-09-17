import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import { Discuss } from "react-loader-spinner";

const initialState = {
  loading: false,
  error: "",
  cartItemCount: 0,
  cartList: [],
  totalPrice: 0,
};

export const getCartList = createAsyncThunk(
  "cart/getCartList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const getCartQty = createAsyncThunk(
  "cart/getCartQty",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart/qty");
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/cart", item);
      if (response.status !== 200) throw new Error(response.error);
      dispatch(
        showToastMessage({
          message: "카트에 상품 추가 완료",
          status: "success",
        })
      );
      await dispatch(getCartQty());
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
);

export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put("/cart", item);
      if (response.status !== 200) throw new Error(response.error);
      await dispatch(getCartList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id, {dispatch, rejectWithValue}) => {
    try{
      const response = await api.delete(`/cart/${id}`);
      if(response.status !== 200) throw new Error(response.error);
      dispatch(showToastMessage({message: "카트 상품 삭제 완료", status: "success"}));
      await dispatch(getCartList());
      return response.data;
    }
    catch(error){
      dispatch(showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartList.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload.cartList;
        state.cartItemCount = action.payload.cartItemCount;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(getCartList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartQty.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItemCount = action.payload.cartItemCount;
        state.error = null;
      })
      .addCase(getCartQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQty.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
