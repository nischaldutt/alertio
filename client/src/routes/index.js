import Home from "../components/Home";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminNotifications from "../components/admin/AdminNotifications";
import CustomerSearch from "../components/customer/CustomerSearch";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/admin",
    component: AdminLogin,
    exact: true,
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    exact: true,
  },
  {
    path: "/admin/notifications",
    component: AdminNotifications,
    exact: true,
  },
  {
    path: "/customer",
    component: CustomerSearch,
    exact: true,
  },
];

export default routes;
