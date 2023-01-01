// import { signOut, sendEmailVerification } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
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
import { CgProfile } from "react-icons/cg";
import { BsChevronDown } from "react-icons/bs";
import Modal from "../../v2/Modal/Modal";

const SignedInLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailVerifiedLoading, setEmailVerifiedLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
  const navigate = useNavigate();

  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     navigate("/sign-in");
  //   } catch {
  //     alert("Failed to sign out user. Please try again later.");
  //   }
  // };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/sign-in");
      }

      if (!user.emailVerified) {
        try {
          sendEmailVerification(user);
        } catch (e) {
          console.error(e);
        } finally {
          setEmailVerifiedLoading(false);
        }
      } else {
        setIsVerified(true);
        setEmailVerifiedLoading(false);
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

  if (loading || emailVerifiedLoading) return <Loader />;
  if (error) return <Error />;
  if (user && !isVerified) return <div>Please verify your email...</div>;

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <header className="navbar py-4 px-5">
          <div className="d-flex align-items-center gap-2 ms-auto">
            <CgProfile size={25} />
            <p style={{ margin: 0 }}>{user.fullName}</p>
            <div>
              <BsChevronDown size={15} />
            </div>
            <Modal
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
            >
              asdsadas
            </Modal>
            {/* <button
              className="btn btn-outline-danger"
              onClick={() => handleSignOut()}
            >
              Logout
            </button> */}
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
