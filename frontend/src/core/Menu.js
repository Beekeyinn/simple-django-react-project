import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../auth/helper/index";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (currentLocation, path) => {
    if (currentLocation === path) {
      return { color: "#17a2b8" };
    } else {
      return null;
    }
  };
  return (
    <div className="shadow-cus mt-3">
      <nav className="nav navbar">
        <ul className="nav nav-tabs">
          <li className="nav-item ">
            <NavLink
              className="nav-link"
              style={isActive(location.pathname, "/")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          {localStorage.getItem("token") ? (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  style={isActive(location.pathname, "/dashboard")}
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  style={isActive(location.pathname, "/cart")}
                  to="/cart"
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link "
                  style={isActive(location.pathname, "/logout")}
                  onClick={() => {
                    logOut(() => {
                      console.log("Hello logout");
                      navigate("/login");
                    });
                  }}
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={isActive(location.pathname, "/register")}
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={isActive(location.pathname, "/login")}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
