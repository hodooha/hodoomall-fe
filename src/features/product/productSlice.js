import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

const initialState = {
  loading: false,
  error: "",
  productList: [],
  totalPageNum: 10,
  selectedProduct: null,
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/products", formData);
      if (response.status !== 200) throw new Error(response.error);
        dispatch(getProductList());
      dispatch(
        showToastMessage({ message: "상품 생성 완료", status: "success" })
      );
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.error, status: "error" }));
      return rejectWithValue(error.error);
    }
  }
);

export const getProductList = createAsyncThunk(
  "product/getProductList",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("/products");
      if (response.status !== 200) throw new Error(response.error);
      const { productList } = response.data;
      return productList;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
        state.error = null;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
