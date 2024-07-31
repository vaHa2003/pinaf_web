import NotFoundPage from "~/components/404/NotFoundPage";
import AdminLayout from "~/components/layout/AdminLayout/AdminLayout";
import Blog from "~/page/Blog";
import BlogAdmin from "~/page/BlogAdmin";
import Cart from "~/page/Cart";
import Contact from "~/page/Contact";
import CookiePage from "~/page/CookiePolicy";
import DashBoard from "~/page/DashBoard/DashBoard";
import Home from "~/page/Home";
import LoginPage from "~/page/LoginPage";
import DataTable from "~/page/ProductsPage";
import ProductDetail from "~/page/ProductDetail/ProductDetail";
import Shop from "~/page/Shop";
import User from "~/page/UserAdmin";

// public
// loader cho các components
const publicRoutes = [
  {
    path: "/",
    component: () => <Home />,
    title: "Pinaf",
  },
  {
    path: "/shop",
    component: () => <Shop />,
    title: "Shop",
  },
  {
    path: "/page",
    component: () => <CookiePage />,
    title: "Cookie Policy",
  },
  {
    path: "/blog",
    component: () => <Blog />,
    title: "Blog",
  },
  {
    path: "/contact",
    component: () => <Contact />,
    title: "Contact",
  },
  {
    path: "/cart",
    component: () => <Cart />,
    title: "Cart",
  },
  // trang detail
  {
    path: "/products/:id",
    component: () => <ProductDetail />,
  },
  {
    path: "*",
    component: () => <NotFoundPage />,
  },
];

// private
const privateRoutes = [
  {
    path: "/login",
    component: <LoginPage />,
  },
  {
    path: "/adminlayout",
    component: <AdminLayout />,
    children: [
      {
        path: "users",
        component: <User />,
      },
      {
        path: "products",
        component: <DataTable />,
      },
      {
        path: "blog",
        component: <BlogAdmin />,
      },
      {
        path: "dashboard",
        component: <DashBoard />,
      },
    ],
  },
];

export { publicRoutes, privateRoutes };
