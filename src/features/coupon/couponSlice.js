import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

const initialState = {
  loading: false,
  error: null,
  couponNum: null,
  couponList: [],
  totalPageNum: null,
  selectedCoupon: null,
};

export const getCouponList = createAsyncThunk(
  "coupon/getCouponList",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/coupon", { params: { ...query } });
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/coupon", formData);
      if (response.status !== 200) throw new Error(response.error);
      dispatch(
        showToastMessage({ message: "쿠폰 생성 완료", status: "success" })
      );
      await dispatch(getCouponList());
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id, {dispatch, rejectWithValue}) => {
    try{
      const response = await api.delete(`/coupon/${id}`);
      if(response.status !== 200) throw new Error(response.error);
      dispatch(
        showToastMessage({ message: "쿠폰 삭제 완료", status: "success" })
      );
      await dispatch(getCouponList());
      return response.data;
    }
    catch(error){
      dispatch(
        showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
)

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setSelectedCoupon(state, action){
      state.selectedCoupon = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCouponList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.couponList = action.payload.couponList;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getCouponList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const couponActions = couponSlice.actions;
export default couponSlice.reducer;
