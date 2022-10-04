import PropTypes from "prop-types";
import styles from "./SignedOutLayout.module.css";
import { Link } from "react-router-dom";

const SignedOutLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className="navbar bg-light">
        <div className="container-sm">
          <Link to="/" className={`${styles.link} navbar-brand fs-3 `}>
            UPANG
          </Link>
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/track-request" className="nav-link">
                Track a Request
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
          <Link to="/sign-in" className="btn btn-dark">
            Sign In
          </Link>
        </div>
      </header>
      <main className="container-sm">{children}</main>
    </div>
  );
};

export default SignedOutLayout;

SignedOutLayout.propTypes = {
  children: PropTypes.node.isRequired,
};