import { onAuthStateChanged, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";

const SignedInLayout = ({ children }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      signOut(auth);
    } catch {
      alert("Failed to sign out user. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <header className="navbar bg-light">
          <h1 className="col-sm-4 fs-4 fw-semibold ms-2">DRT System</h1>
          <div className={styles.user}>
            <p className="fw-light">Welcome, {email}!</p>
          </div>
          <button className="btn btn-dark mt-0" size="small" onClick={() => handleSignOut()}>
            Logout
            </button>
        </header>

      <main>{children}</main>
    </div>
    </div>
  );
};

export default SignedInLayout;

SignedInLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
