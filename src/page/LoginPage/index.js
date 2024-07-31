import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "~/api/Api";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "~/store/admin/useSliceAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3600/">
        Pinaf
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = async (value, { resetForm }) => {
    resetForm();

    try {
      const res = await axiosClient.get("admin", {
        params: {
          manv: value.manv,
          password: value.password,
        },
      });
      console.log(res[0]);

      if (res.length > 0) {
        localStorage.setItem("tokenAdmin", "tokenAdmin123");
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 2100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(
          setAdminLogin({
            manv: res[0].manv,
            password: res[0].password,
          })
        );
        setTimeout(() => {
          window.location.href = "/adminlayout/users";
        }, 2200);
      } else {
        toast.error("Đăng nhập thất bại!", {
          position: "top-right",
          autoClose: 2100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi trong quá trình đăng nhập:", error);
    }
  };

  // validate form
  const formik = useFormik({
    initialValues: {
      manv: "",
      password: "",
    },

    validationSchema: Yup.object({
      manv: Yup.string().required("Mã nhân viên là bắt buộc"),
      password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Mật khẩu không hợp lệ"
        ),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#296253" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="400">
            Đăng nhập
          </Typography>

          <form
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="manv"
              label="Mã nhân viên"
              name="manv"
              autoComplete="manv"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.manv}
            />
            {/* TODO: chưa fix được lỗi validate form */}
            {/* {formik.errors.manv && formik.touched.manv && (
                            <p style={{ color: 'red', fontSize: '0.9rem' }}>{formik.errors.manv}</p>
                        )} */}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            {/* {formik.errors.password && formik.touched.password && (
                            <p style={{ color: 'red', fontSize: '0.9rem' }}>{formik.errors.password}</p>
                        )} */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#296253",
                padding: "10px",
                "&:hover": {
                  bgcolor: "#296253",
                },
              }}
            >
              Đăng nhập
            </Button>
          </form>
        </Box>
        <Copyright sx={{ mt: 30, mb: 4 }} />
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
