import { createSlice } from "@reduxjs/toolkit";

//============= giá trị khởi tạo ============
const initialState = {
  manv: "",
  password: "",
};

// createSlice : hàm tự động tạo Actions creator và Reducer
// ============ Cấu hình slice ===========
const userAdmin = createSlice({
  name: "admin", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    setAdminLogin: (state, action) => {
      // console.log('vietanh ~ action:', action);
      // Cập nhật state manv với giá trị truyền vào qua action (action.payload)
      // Chạy thử console.log(action) để xem chi tiết giá trị action truyền vào
      state.manv = action.payload.manv;
      state.password = action.payload.password;
    },
    setAdminLogOut: (state) => {
      state.manv = null;
      state.password = null;
    },
  },
});

// ============= Action =============
// Export action ra để sử dụng cho tiện.
// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(setAdminLoOut(),setAdminLogin()) để xem chi tiết
export const { setAdminLogOut, setAdminLogin } = userAdmin.actions;
// console.log('vietanh ~ setAdminLogin:', setAdminLogin());
// console.log('vietanh ~ setAdminLoOut:', setAdminLoOut());

// xuất selector để truy xuất lấy state trong store
// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectManv = (state) => {
  // console.log('vietanh ~ state:', state);
  return state.admin.manv;
};
export const selectPassword = (state) => state.admin.password;

// Export reducer để nhúng vào Store
export default userAdmin.reducer;
