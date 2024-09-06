import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from ""

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
      dispatch(showToastMessage("회원가입을 완료했습니다.", "success"));
      navigate("/login");
      return response.data;
    } catch (error) {
      dispatch(showToastMessage("회원가입에 실패했습니다.", "error"));
      return rejectWithValue(error.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    error: null,
    loading: false,
    user: null,
  },
  reducers: {

  },
  extraReducers: {

  }
});
