import { createSlice } from "@reduxjs/toolkit";

// khởi tạo initialState
const initialState = {
  name: "",
  email: "",
  photo: "",
};

// createSlice : hàm tự động tạo Actions creator và Reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login
    setUserLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;

      // ví dụ:
      // {
      //     ...state,
      //     name: action.payload.name,
      // }
    },

    // logout
    setUserLogOut: (state, action) => {
      // đặt lại state về trạng thái cũ
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

// Action
export const { setUserLogin, setUserLogOut } = userSlice.actions;

// xuất selector để truy xuất lấy state trong store
export const selectUserName = (state) => {
  return state.user.name;
};
export const selectEmail = (state) => state.user.email;
export const selectPhoto = (state) => state.user.photo;

export default userSlice.reducer;
