import { signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../../Loader/Loader";

const SignedInLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch {
      alert("Failed to sign out user. Please try again later.");
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate("/sign-in");
    }
  }, [loading, navigate, user]);

  if (loading) return <Loader />;
  if (error || !user) return <div>Failed to load page...</div>;

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <header className="navbar py-4 px-5">
          <div className="d-flex align-items-center gap-4 ms-auto">
            <p style={{ margin: 0 }}>
              Welcome, {user.displayName || user.email}!
            </p>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleSignOut()}
            >
              Logout
            </button>
          </div>
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
