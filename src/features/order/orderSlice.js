import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQty } from "../cart/cartSlice";
import api from "../../utils/api";

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
    async (formData, {dispatch, rejectWithValue}) => {
        try{
            console.log(formData);
            const {data, navigate} = formData;
            const response = await api.post("/order", data);
            if(response.status !== 200) throw new Error(response.error);
            dispatch(getCartQty());
            navigate("/payment/success");
            return response.data;
        }catch(error) {
            return rejectWithValue(error.error);
        }


    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(createOrder.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})


export default orderSlice.reducer;
