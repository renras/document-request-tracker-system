import { signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";
import Loader from "../../Loader/Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import Error from "../../Error/Error";

const SignedInLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/sign-in");
      }

      try {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          throw "User data not found";
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <header className="navbar py-4 px-5">
          <div className="d-flex align-items-center gap-4 ms-auto">
            <p style={{ margin: 0 }}>Welcome, {user.fullName}!</p>
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
