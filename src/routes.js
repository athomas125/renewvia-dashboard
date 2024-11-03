
import Dashboard from "pages/Dashboard.js";
import Tables from "pages/Tables.js";
import Overview from "pages/Overview";

const routes = [
  {
    path: "/overview",
    name: "Overview",
    icon: "nc-icon nc-single-copy-04",
    component: <Overview />,
    layout: "/admin",
  },
  {
    path: "/dashboard/:contractName",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "nc-icon nc-bullet-list-67",
    component: <Tables />,
    layout: "/admin",
  },
];

export default routes;
