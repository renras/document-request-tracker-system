import { signOut, sendEmailVerification } from "firebase/auth";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";
import Loader from "../../Loader/Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import Error from "../../Error/Error";
import { CgProfile } from "react-icons/cg";
import { BsChevronDown, BsPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import useClickAway from "../../../hooks/useClickAway";

const SignedInLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailVerifiedLoading, setEmailVerifiedLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch {
      alert("Failed to sign out user. Please try again later.");
    }
  };

  useClickAway(userMenuRef, (e) => {
    if (avatarWrapperRef.current.contains(e.target)) return;
    setIsUserMenuOpen(false);
  });

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
    <>
      <div className={styles.container}>
        <SideBar />
        <div className={styles.content}>
          <header className="navbar py-4 px-5">
            <div className="ms-auto" style={{ position: "relative" }}>
              <button
                ref={avatarWrapperRef}
                className="d-flex align-items-center gap-2"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                <CgProfile size={25} />
                <p style={{ margin: 0 }}>{user.fullName}</p>
                <div>
                  <BsChevronDown size={15} />
                </div>
              </button>
              {/* user menu */}
              <ul
                ref={userMenuRef}
                className="border rounded w-100 flex-column dropdown-menu"
                style={{
                  display: isUserMenuOpen ? "flex" : "none",
                  position: "absolute",
                  top: "2.5rem",
                }}
              >
                <li className="dropdown-item">
                  <Link
                    to="/profile"
                    className="d-flex gap-2 align-items-center"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <BsPerson size={20} />
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  className="dropdown-item d-flex gap-2 align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <BiLogOut size={20} />
                  <button onClick={() => handleSignOut()}>Logout</button>
                </li>
              </ul>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default SignedInLayout;

SignedInLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
