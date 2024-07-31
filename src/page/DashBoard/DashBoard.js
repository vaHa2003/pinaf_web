import classNames from "classnames/bind";
import React, { useEffect } from "react";
import styles from "./DashBoard.module.scss";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import callApi from "~/service";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
const cx = classNames.bind(styles);

function DashBoard() {
  const [dataAdmin, setDataAdmin] = React.useState([]);
  const [dataProducts, setDataProducts] = React.useState([]);
  const [dataBlog, setDataBlog] = React.useState([]);
  const [dataUsers, setDataUsers] = React.useState([]);

  // call api với data Admin
  const fetchProductData = async (config = {}) => {
    const respon = await callApi.fetchAdmin(config);
    setDataAdmin(respon);
  };

  // call api với data User
  const fetchUsers = async (config = {}) => {
    const respon = await callApi.fetchUsers(config);
    setDataUsers(respon);
  };

  // call api với data Product
  const fetchListProducts = async (config = {}) => {
    const response = await callApi.fetchProducts(config);
    setDataProducts(response);
  };

  // call api với data Blog
  const fetchListBlog = async (config = {}) => {
    const response = await callApi.fetchBlog(config);
    setDataBlog(response);
  };

  useEffect(() => {
    fetchProductData();
    fetchListProducts();
    fetchListBlog();
    fetchUsers();
  }, []);

  return (
    <div className={cx("dash_container")}>
      <h2 className={cx("dash_title")}>Report Chart, Statistics 📶 📈</h2>
      <div className={cx("dash__row")}>
        <div className={cx("dash__row-item")}>
          <div className={cx("dash__row-item-icon")}>
            <PeopleAltIcon sx={{ fontSize: "48px", color: "#3d8ded" }} />
          </div>
          <div className={cx("dash__row-item-content")}>
            <p className={cx("dash__row-content-users")}>{dataAdmin.length}</p>
            <h3 className={cx("dash__row-content-users-text")}>
              Nhân viên mới{" "}
            </h3>
          </div>
        </div>
        <div className={cx("dash__row-item")}>
          <div className={cx("dash__row-item-icon")}>
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: "48px", color: "#f98260 " }}
            />
          </div>
          <div className={cx("dash__row-item-content")}>
            <p className={cx("dash__row-content-users")}>{dataUsers.length}</p>
            <h3 className={cx("dash__row-content-users-text")}>Người dùng</h3>
          </div>
        </div>
        <div className={cx("dash__row-item")}>
          <div className={cx("dash__row-item-icon")}>
            <ShoppingCartOutlinedIcon
              sx={{ fontSize: "48px", color: "#fac049" }}
            />
          </div>
          <div className={cx("dash__row-item-content")}>
            <p className={cx("dash__row-content-users")}>
              {dataProducts.length}
            </p>
            <h3 className={cx("dash__row-content-users-text")}>Sản phẩm mới</h3>
          </div>
        </div>
        <div className={cx("dash__row-item")}>
          <div className={cx("dash__row-item-icon")}>
            <BookOutlinedIcon sx={{ fontSize: "48px", color: "#46c893" }} />
          </div>
          <div className={cx("dash__row-item-content")}>
            <p className={cx("dash__row-content-users")}>{dataBlog.length}</p>
            <h3 className={cx("dash__row-content-users-text")}>Blog mới</h3>
          </div>
        </div>
      </div>
      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                    style={{
                        marginTop: '3rem',
                        background: '#f9fafb',
                        padding: '20px',
                        borderRadius: '4px',
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                    }}
                >
                    <Typography sx={{ fontFamily: 'SF Mono', marginBottom: '1rem', fontWeight: 'bold' }}>
                        Biểu đồ thể hiện trách nhiệm của nhân viên
                    </Typography>
                    <BarChart
                        series={[
                            { data: [35, 44, 24, 34] },
                            { data: [51, 6, 49, 30] },
                            { data: [15, 25, 30, 50] },
                            { data: [60, 50, 15, 25] },
                        ]}
                        width={700}
                        height={300}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        margin={{ top: 20, bottom: 30, left: 40, right: 40 }}
                    />
                </div>

                <div
                    style={{
                        marginTop: '3rem',
                        padding: '70px 20px',
                        borderRadius: '4px',
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                    }}
                >
                    <Typography sx={{ fontFamily: 'SF Mono', marginBottom: '1rem', fontWeight: 'bold' }}>
                        Biểu đồ thể hiện trách nhiệm của nhân viên
                    </Typography>
                    <PieChart
                        sx={{ fontFamily: 'SF Mono' }}
                        series={[
                            {
                                data: dataAdmin.map((item, index) => ({
                                    id: index,
                                    value: Number(item.ratio.replace('%', '')),
                                    label: item.chucvu,
                                })),
                            },
                        ]}
                        width={580}
                        height={200}
                    />
                </div>
            </div> */}
    </div>
  );
}

export default DashBoard;
