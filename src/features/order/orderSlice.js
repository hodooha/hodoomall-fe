import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQty } from "../cart/cartSlice";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

const initialState = {
  loading: false,
  error: "",
  orderNum: null,
  orderList: [],
  totalPageNum: null,
  selectedOrder: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      console.log(formData);
      const { data, navigate } = formData;
      const response = await api.post("/order", data);
      if (response.status !== 200) throw new Error(response.error);
      dispatch(getCartQty());
      navigate("/payment/success");
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/order", { params: { ...query } });
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log(data);
      const response = await api.put("/order", data);
      if (response.status !== 200) throw new Error(response.error);
      dispatch(
        showToastMessage({ message: "주문 수정 완료", status: "success" })
      );
      await dispatch(getOrder({page: data.page, pageSize: 10}));
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderNum = action.payload.orderNum;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.orderList;
        state.totalPageNum = action.payload.totalPageNum;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
