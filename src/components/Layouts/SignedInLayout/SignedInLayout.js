import { signOut, sendEmailVerification } from "firebase/auth";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";
import Loader from "../../Loader/Loader";
import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import Error from "../../Error/Error";
import { CgProfile } from "react-icons/cg";
import { BsChevronDown, BsPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import useClickAway from "../../../hooks/useClickAway";
import { GrNotification } from "react-icons/gr";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NotificationBox from "./NotificationBox";

const DATA = [
  {
    name: "Gladys Dare",
    description: "commented on Ecosystems and conservation",
  },
  {
    name: "Rosina Wisoky",
    description: "followed you",
  },
];

const SignedInLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailVerifiedLoading, setEmailVerifiedLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
  const [notificationsData, notificationsLoading, notificationsError] =
    useCollectionData(collection(db, "notifications"));
  const userMenuRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const navigate = useNavigate();
  const [notificationsWithSenderData, setNotificationsWithSenderData] =
    useState(null);
  const [
    notificationsWithSenderDataLoading,
    setNotificationsWithSenderDataLoading,
  ] = useState(true);
  const [
    notificationsWithSenderDataError,
    setNotificationsWithSenderDataError,
  ] = useState(null);

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

  useEffect(() => {
    if (!notificationsData) return;

    let ignore = true;
    try {
      (async () => {
        const newNotifications = await Promise.all(
          notificationsData.map(async (document) => {
            const docRef = doc(db, "users", document.senderId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return {
                ...document,
                sender: docSnap.data(),
              };
            } else {
              return {
                ...document,
                sender: null,
              };
            }
          })
        );

        ignore && setNotificationsWithSenderData(newNotifications);
      })();
    } catch (error) {
      console.error(error);
      ignore &&
        setNotificationsWithSenderDataError(
          "Failed to get notifications with sender data"
        );
    } finally {
      setNotificationsWithSenderDataLoading(false);
    }

    return () => {
      ignore = false;
    };
  }, [notificationsData]);

  if (
    loading ||
    emailVerifiedLoading ||
    notificationsLoading ||
    notificationsWithSenderDataLoading
  )
    return <Loader />;
  if (error || notificationsError || notificationsWithSenderDataError)
    return <Error />;
  if (user && !isVerified) return <div>Please verify your email...</div>;

  console.log(notificationsWithSenderData);
  return (
    <>
      <div className={styles.container}>
        <SideBar />
        <div className={styles.content}>
          <header className="navbar py-4 px-5">
            <div
              className="ms-auto d-flex gap-4 align-items-center"
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <button
                  className="d-flex align-items-center"
                  onClick={() => setIsNotificationBoxOpen((prev) => !prev)}
                >
                  <GrNotification size={20} />
                </button>
              </div>
              {isNotificationBoxOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "3rem",
                    right: "0",
                  }}
                >
                  <NotificationBox data={DATA} />
                </div>
              )}
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
