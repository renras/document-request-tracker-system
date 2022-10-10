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
        <header className="navbar py-4 px-5">
          <div className={styles.user}>
            <p>Welcome, {email}!</p>
          </div>
          <button className="btn btn-dark" onClick={() => handleSignOut()}>
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
