import { signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";
import { useAuthState } from "react-firebase-hooks/auth";

const SignedInLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      signOut(auth);
    } catch {
      alert("Failed to sign out user. Please try again later.");
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate("/sign-in");
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load page...</div>;

  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <header className="navbar py-4 px-5">
          <div className={styles.user}>
            <p>Welcome, {user.email}!</p>
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
