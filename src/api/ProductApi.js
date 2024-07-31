// import axiosClient from './Api';

// const url = '/posts';

// const getAll = () => {
//     return axiosClient.get(url);
// };

// const getByID = (id) => {
//     return axiosClient.get(`${url}/${id}`);
// };

// const create = (body) => {
//     return axiosClient.post(url, body);
// };

// const updateByID = (id, body) => {
//     return axiosClient.put(`${url}/${id}`, body);
// };

// const deleteByID = (id) => {
//     return axiosClient.delete(`${url}/${id}`);
// };

// // export
// const ProductApi = { getAll, getByID, create, updateByID, deleteByID };
// export default ProductApi;

import axiosClient from "./Api";

// tối ưu API
const apiHelper = (url) => ({
  getAll: (config) => axiosClient.get(url, config),
  getByID: (id, config) => axiosClient.get(`${url}/${id}`, config),
  create: (data, config) => axiosClient.post(url, data, config),
  updateByID: (id, body, config) =>
    axiosClient.put(`${url}/${id}`, body, config),
  deleteByID: (id, config) => axiosClient.delete(`${url}/${id}`, config),
});

// Sử dụng hàm trợ giúp cho posts và admin
const PostApi = apiHelper("/products");
const AdminApi = apiHelper("/admin");
const BlogApi = apiHelper("/blogs");
const UsersApi = apiHelper("/users");

// export
export { PostApi, AdminApi, BlogApi, UsersApi };
