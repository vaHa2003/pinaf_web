// api/axiosClient.js
import axios from "axios";

// Thiết lập cấu hình mặc định cho các yêu cầu HTTP tại đây
const axiosClient = axios.create({
  baseURL: `https://pinaf.onrender.com`,
  responseType: "json",
});

//interceptors: bộ đánh chặn
// đánh chặn khi request gửi đi
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["token"] = token; // thêm token vào header để xác thực phân quyền
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
