import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import styles from "./User.Module.scss";
import AdminTable from "~/components/AdminTable";
import callApi from "~/service";
import Paper from "@mui/material/Paper";
import { Button, IconButton, InputBase, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { ModalContext } from "~/context/ProductModal";
import ModalAdd from "~/components/ModalAdd";
import UsersModalContext from "~/context/UserModalContext";
const cx = classNames.bind(styles);

function User() {
  const ref = React.useRef("");

  const modal = useContext(ModalContext);

  // state User
  const [data, setData] = useState([]);
  const [initDataModal, setInitDataModal] = useState({});

  // config nhận vào object có param
  const fetchProductData = async (config = {}) => {
    const respon = await callApi.fetchAdmin(config);
    setData(respon);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // hàm tìm kiếm
  const handleSearch = async () => {
    // cách 1
    if (ref.current && ref.current.value) {
      await fetchProductData({
        params: {
          manv: ref.current.value?.trim(),
        },
      });
      ref.current.value = "";
    } else {
      await fetchProductData();
    }

    // cách 2:
    // await fetchProductData(
    //     ref.current && ref.current.value
    //         ? {
    //               params: {
    //                   manv: ref.current.value.trim(),
    //               },
    //           }
    //         : {},
    // );
  };

  const handleAdd = () => {
    setInitDataModal({});
    modal.handleClickAddOpen();
  };

  return (
    <UsersModalContext.Provider
      value={{
        initDataModal,
        setInitDataModal,
        handleSearch,
        fetchProductData,
      }}
    >
      <div className={cx("user__container")}>
        <h3 className={cx("container__title")}>Hello, Welcome back 👋</h3>
        <h3 className={cx("container__title")}>Users 🙋</h3>

        {/* =========== search ============== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px ",
              display: "flex",
              alignItems: "center",
              width: "28%",
              marginBottom: "20px",
              justifyContent: "space-between",
              boxShadow: 2,
            }}
          >
            <InputBase
              inputRef={ref}
              sx={{
                ml: 1,
                flex: 1,
                fontFamily: "SF Mono",
              }}
              placeholder="Tìm kiếm"
              inputProps={{ "aria-label": "Search" }}
            />
            <Tooltip
              title="Tìm kiếm sản phẩm"
              componentsProps={{
                tooltip: {
                  sx: {
                    color: "#fff",
                    backgroundColor: "#296152",
                    marginTop: "1px",
                    fontFamily: "SF Mono",
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  },
                },
              }}
            >
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="seaarch"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Paper>

          {/* icon Add */}
          <Tooltip
            title="Thêm sản phẩm"
            componentsProps={{
              tooltip: {
                sx: {
                  color: "#fff",
                  backgroundColor: "#296152",
                  marginTop: "1px",
                  fontFamily: "SF Mono",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                },
              },
            }}
          >
            <Button
              variant="contained"
              type="button"
              sx={{
                p: "10px",
                background: "#296152",
                color: "#fff",
                height: "40px",
                "&:hover": {
                  color: "#fff",
                  background: "#296152",
                },
              }}
              aria-label="seaarch"
              onClick={handleAdd}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </div>

        {/* modal edit */}
        <ModalAdd />

        {/* table row */}
        <AdminTable data={data} fetchProductData={fetchProductData} />
      </div>
    </UsersModalContext.Provider>
  );
}

export default User;
