import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { DefaultLayout } from "./components/layout";
import LoginPage from "./page/LoginPage";
import ProductPage from "./page/ProductsPage";
import AdminLayout from "./components/layout/AdminLayout/AdminLayout";
import User from "./page/UserAdmin";
import { Helmet } from "react-helmet";

function App() {
  const isAuthorization = localStorage.getItem("tokenAdmin");

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            // DefaultLayout mặc định
            // không có route.layout mặc định lấy DeaultLayout và lưu và biến Layout
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {/* {Page là children của Layout } */}
                    <Helmet>
                      <title>{route.title}</title>
                    </Helmet>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* TODO:chưa fix được router admin/products */}
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={isAuthorization ? <AdminLayout /> : <LoginPage />}
            >
              {route.children?.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={<User /> && childRoute.component}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
