// Tạo một store Redux trong ứng dụng của bạn bằng cách sử dụng configureStore() từ Redux Toolkit:
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "~/store/user/userSlice";
import userAdmin from "./admin/useSliceAdmin";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// `rootReducer` là reducer tổng hợp tất cả các reducer khác trong ứng dụng
// chỉ có 1 reudcer duy nhất là user
const rootReducer = combineReducers({
  user: userSlice,
  admin: userAdmin,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// `rootReducer` là reducer tổng hợp tất cả các reducer khác trong ứng dụng
// chỉ có 1 reducer  là user,admin
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const store = configureStore({
//     reducer: {
//         // Đây là nơi bạn định nghĩa các reducer của bạn.
//         // Ví dụ: todoReducer: todoReducer
//         user: userSlice,
//         admin: userAdmin,
//     },
// });

export const persistor = persistStore(store);
