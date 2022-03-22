import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <div className="container-fluid">
        <div className="jumbotron p-4 bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="led">{description}</p>
          <Menu />
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="container-fluid footer m-auto py-3">
        <div className="container-fluid bg-info text-white text-center py-3">
          <h4>If you have any question. Reach me out at Facebook.</h4>
          <div className="container">
            <span className="text-warning">Django Api and React Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
