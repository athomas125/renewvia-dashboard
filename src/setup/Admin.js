
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

var ps;

function Admin(props) {
  const location = useLocation();
  const [sidebarMini, setSidebarMini] = React.useState(false);
  const mainPanel = React.useRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
  }, [location]);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle("sidebar-mini");
  };
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
      />
      <div className="main-panel" ref={mainPanel}>
        <AdminNavbar {...location} handleMiniClick={handleMiniClick} />
        <Routes>{getRoutes(routes)}</Routes>
        {
          location.pathname.indexOf("full-screen-map") !== -1 ? null : (
            <Footer fluid />
          )
        }
      </div>
    </div>
  );
}

export default Admin;
