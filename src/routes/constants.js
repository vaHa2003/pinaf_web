import PeopleIcon from "@mui/icons-material/People";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const MENUS = [
  {
    name: "User",
    path: "/adminlayout/users",
    icon: <PeopleIcon />,
  },
  {
    name: "Products",
    path: "/adminlayout/products",
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    name: "Blog",
    path: "/adminlayout/blog",
    icon: <BookOutlinedIcon />,
  },
  {
    name: "Dasboard",
    path: "/adminlayout/dashboard",
    icon: <BarChartOutlinedIcon />,
  },
];
