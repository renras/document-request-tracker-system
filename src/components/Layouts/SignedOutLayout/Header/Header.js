import { NavLink } from "react-router-dom";
import logo from "../../../../assets/images/unilogo.png";

const Header = () => {
  return (
    <header className="navbar bg-light">
      <div className="container-sm">
        <NavLink to="/" className="navbar-brand fs-3 ">
          <img
            src={logo}
            alt="logo"
            height="60"
            className="d-inline-block align-text-top d-content-end"
          />
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-4">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/track-request"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Track a Request
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <NavLink to="/sign-in" className="btn btn-secondary">
          Sign In
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
