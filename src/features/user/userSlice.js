import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import { cartActions, getCartQty } from "../cart/cartSlice";

const initialState = {
  error: "",
  loading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, name, password, navigate },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post("/users/create", {
        email,
        name,
        password,
      });
      dispatch(
        showToastMessage({
          message: "회원가입을 완료했습니다.",
          status: "success",
        })
      );
      if (response.status !== 200) throw new Error(response.error);
      navigate("/login");
      return response.data;
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "회원가입에 실패했습니다.",
          status: "error",
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status !== 200) throw new Error(response.error);
      const { user } = response.data;
      localStorage.setItem("token", user.token);
      dispatch(getCartQty());
      return user;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/users/me");
      if (response.status !== 200) throw new Error(response.error);
      const { user } = response.data;
      dispatch(getCartQty());
      return user;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/google", { token });
      if (response.status !== 200) throw new Error(response.error);
      const { user } = response.data;
      localStorage.setItem("token", user.token);
      dispatch(getCartQty());
      return user;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout", 
  async (_, rejectWithValue) => {
    try{
      const response = await api.get("/users/logout");
      if(response.status !== 200) throw new Error(response.error);
      localStorage.removeItem("token");
      return response;
    } catch(error){
      return rejectWithValue(error.error);
    }

  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithToken.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ;
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
