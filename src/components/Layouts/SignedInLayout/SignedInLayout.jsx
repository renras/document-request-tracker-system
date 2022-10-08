import PropTypes from "prop-types";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";

const SignedInLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <SideBar />
      <main>{children}</main>
    </div>
  );
};

export default SignedInLayout;

SignedInLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
