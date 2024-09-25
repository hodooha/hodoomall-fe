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
  userCouponList: []
};

export const getCouponList = createAsyncThunk(
  "coupon/getCouponList",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/coupons", { params: { ...query } });
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
      const response = await api.post("/admin/coupons", formData);
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
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/coupons/${id}`);
      if (response.status !== 200) throw new Error(response.error);
      dispatch(
        showToastMessage({ message: "쿠폰 삭제 완료", status: "success" })
      );
      await dispatch(getCouponList());
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
);

export const getCouponDetail = createAsyncThunk(
  "coupon/getCouponDetail",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get(`/coupons/${id}`);
      if(response.status !== 200) throw new Error(response.error);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const addUserCoupon = createAsyncThunk(
  "coupon/addUserCoupon",
  async (data, {dispatch, rejectWithValue}) => {
    try{
      const response = await api.post("/userCoupon", data);
      if(response.status !== 200) throw new Error(response.error);
      dispatch(showToastMessage({message: "쿠폰 다운로드 성공", status: "success"}));
      return response.data;
    }
    catch(error){
      dispatch(showToastMessage({message: error.error, status: "error"}));
      return rejectWithValue(error.error);
    }

  }
)

export const getUserCouponList = createAsyncThunk(
  "coupon/getUserCouponList",
  async (_, {dispatch, rejectWithValue}) => {
    try{
      const response = await api.get("/userCoupon");
      if(response.status !== 200) throw new Error(response.error);
      return response.data;
    }
    catch(error){
      return rejectWithValue(error.error);
    }
  }
)

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setSelectedCoupon(state, action) {
      state.selectedCoupon = action.payload;
    },
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
      })
      .addCase(getCouponDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedCoupon = action.payload.selectedCoupon;
      })
      .addCase(getCouponDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserCoupon.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addUserCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserCouponList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCouponList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userCouponList = action.payload.userCouponList;
      })
      .addCase(getUserCouponList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const couponActions = couponSlice.actions;
export default couponSlice.reducer;
