import classNames from "classnames/bind";
import styles from "./ModalLogin.module.scss";
import imgModal from "~/asset/imgs/asset 1.png";
import { IconGoogle } from "~/asset/imgs";
// redux
import {
  selectUserName,
  setUserLogin,
  setUserLogOut,
} from "~/store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "~/Firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "~/api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function ModalLogin({ openModal, closeModal }) {
  const inputPhone = useRef();

  const handeSubmit = async (value, { resetForm }) => {
    resetForm();
    // xử lý xác thực
    // get : lấy thông tin với key là users,
    //truyền thêm cái param là phone,password
    const res = await axiosClient.get("users", {
      params: {
        phone: value.phone,
        password: value.password,
      },
    });

    if (res.length > 0) {
      toast.success("Đăng nhập thành công", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      localStorage.setItem("token", "token123");
      inputPhone.current.focus();
      navigate("/");
      closeModal();
    } else {
      toast.error("Đăng nhập sai điện thoại hoặc password", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  // validate form
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone number is required")
        .matches(
          /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
          "Invalid phone number"
        ),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
          "Invalid password"
        ),
    }),
    onSubmit: handeSubmit,
  });

  // điều hướng trang
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  const handleSignIn = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          if (result) {
            let user = result.user;
            handleSetUser(user);
            closeModal(); // Đóng modal
            navigate("/"); // Điều hướng về trang chủ
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      signOut(auth)
        .then(() => {
          dispatch(setUserLogOut());
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleSetUser = (user) => {
    dispatch(
      setUserLogin({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  if (!openModal) {
    return null;
  }

  // hàm đóng modal
  const handleCloseModal = (e) => {
    if (e.target.id === "modalLogin") {
      return closeModal();
    }
  };

  return (
    <React.Fragment>
      <div className={cx("modal")} id="modalLogin" onClick={handleCloseModal}>
        <div className={cx("modal__container")}>
          <div className={cx("container__close")}>
            <button
              className={cx("container__close-btn")}
              onClick={() => closeModal()}
            >
              &times;
            </button>
          </div>

          <div className={cx("container__img")}>
            <img className={cx("img__logo")} src={imgModal} alt="img modal" />
            <div className={cx("container_content")}>
              <h3 className={cx("content__title")}> Login to Pinaf.</h3>
            </div>

            <form
              className={cx("content__form")}
              onSubmit={formik.handleSubmit}
            >
              <div className={cx("content__form_label")}>
                <input
                  id="label1"
                  type="text"
                  name="phone"
                  className={cx("form__input-name1")}
                  placeholder="Enter your phone number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  ref={inputPhone}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p style={{ color: "red", fontSize: "0.87rem" }}>
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              <div className={cx("content__form_label")}>
                <input
                  id="label2"
                  type="password"
                  name="password"
                  className={cx("form__input-name2")}
                  placeholder="Enter password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <p style={{ color: "red", fontSize: "0.87rem" }}>
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className={cx("form__btn")}>
                <button type="submit" className={cx("button__login")}>
                  LOG IN
                </button>
              </div>
            </form>

            <div className={cx("form__login-other")}>
              <div className={cx("form__name_other")}>
                <h3 className={cx("form__title")}>Or log in with</h3>
              </div>
              <div className={cx("form__name_icon")}>
                <div className={cx("form__icon-option")}>
                  <div onClick={handleSignIn}>
                    <IconGoogle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalLogin;
