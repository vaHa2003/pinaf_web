import { AdminApi, BlogApi, PostApi, UsersApi } from "../api/ProductApi";
// * ===== sản phẩm ====*

// get sản phẩm
const fetchProducts = async (config = {}) => {
  try {
    const response = await PostApi.getAll(config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// get chi tiết sản phẩm
const fetchProductsDetail = async (title) => {
  try {
    const response = await PostApi.getByID(title);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// delete sản phẩm
const DeleteProducts = async (id) => {
  try {
    const response = await PostApi.deleteByID(id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// * ===== nhân viên ====*
// get nhân viên
const fetchAdmin = async (config = {}) => {
  try {
    const response = await AdminApi.getAll(config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// create nhân viên
const createProducts = async () => {
  try {
    const response = await PostApi.create();
    return response;
  } catch (error) {
    console.error(error);
  }
};

// update nhân viên
const UpdateAdmin = async (config = {}) => {
  try {
    const response = await AdminApi.updateByID(config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// create nhân viên
const createAdmin = async () => {
  try {
    const response = await AdminApi.create();
    return response;
  } catch (error) {
    console.error(error);
  }
};

// delete nhân viên
const DeleteUsers = async (id) => {
  try {
    const response = await AdminApi.deleteByID(id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// * ===== blog ====*
// get blog
const fetchBlog = async (config = {}) => {
  try {
    const response = await BlogApi.getAll(config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// * ===== users ====*
// get users
const fetchUsers = async (config = {}) => {
  try {
    const response = await UsersApi.getAll(config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const callApi = {
  fetchProducts,
  fetchAdmin,
  createAdmin,
  UpdateAdmin,
  DeleteUsers,
  DeleteProducts,
  createProducts,
  fetchBlog,
  fetchUsers,
  fetchProductsDetail,
};
export default callApi;
