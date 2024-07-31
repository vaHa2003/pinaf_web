import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ProductsPage.module.scss";
import classNames from "classnames/bind";
import ProductTable from "~/components/ProductTable";
import callApi from "~/service";
import { Button, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { ModalContext } from "~/context/ProductModal";
import ModalAddProducts from "~/components/ModalAddProducts";
import ProductModalContext from "~/context/ProductsModalContext";
const cx = classNames.bind(styles);

function ProductsPage() {
  const ref = useRef("");

  const modal = useContext(ModalContext);

  const [listProducts, setListProducts] = React.useState([]);

  // lưu giá trị values của các trường
  const [initDataProducts, setInitDataProducts] = useState({});

  const fetchListProducts = async (config = {}) => {
    const response = await callApi.fetchProducts(config);
    setListProducts(response);
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  // hàm tìm kiếm sản phẩm
  const handleSearchProducts = async () => {
    console.table([ref.current.value]);
    if (ref.current && ref.current.value) {
      let searchValue = ref.current.value.trim().replace(/\s+/g, " ");
      await fetchListProducts({
        params: {
          title: searchValue,
        },
      });
      ref.current.value = "";
    } else {
      await fetchListProducts();
    }
  };

  const handleAddProducts = () => {
    modal.handleClickAddOpen();
  };

  return (
    <ProductModalContext.Provider
      value={{ fetchListProducts, initDataProducts, setInitDataProducts }}
    >
      <div className={cx("product_container")}>
        <h2 className={cx("product_title")}>Products 📦</h2>
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
                onClick={handleSearchProducts}
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
              onClick={handleAddProducts}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </div>

        {/* modal add */}
        <ModalAddProducts data={listProducts} refetch={fetchListProducts} />

        {/* table sản phẩm */}
        <ProductTable data={listProducts} refetch={fetchListProducts} />
      </div>
    </ProductModalContext.Provider>
  );
}

export default ProductsPage;
