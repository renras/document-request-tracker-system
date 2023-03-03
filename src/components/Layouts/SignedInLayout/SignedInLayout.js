import {
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import SideBar from "./SideBar/SideBar";
import styles from "./SignedInLayout.module.css";
import Loader from "../../Loader/Loader";
import {
  doc,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import Error from "../../Error/Error";
import { BsChevronDown, BsPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import useClickAway from "../../../hooks/useClickAway";
import { GrNotification } from "react-icons/gr";
import NotificationBox from "./NotificationBox";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import defaultAvatar from "../../../assets/images/avatar.jpg";

const SignedInLayout = ({ children }) => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [profile, profileLoading, profileError] = useDocumentData(
    user ? doc(db, "users", user.uid) : null
  );
  const [emailVerifiedLoading, setEmailVerifiedLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
  const [
    requestNotifications,
    requestNotificationsLoading,
    requestNotificationsError,
  ] = useCollection(
    profile?.role === "ADMIN"
      ? query(collection(db, "notifications"), where("type", "==", "REQUEST"))
      : null
  );
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!requestNotifications) {
      setNotificationsWithSenderDataLoading(false);
      return;
    }

    let ignore = true;
    try {
      (async () => {
        const newNotifications = await Promise.all(
          requestNotifications.docs.map(async (document) => {
            const docRef = doc(db, "users", document.data().senderId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return {
                ...document.data(),
                sender: docSnap.data(),
                id: document.id,
              };
            } else {
              return {
                ...document.data(),
                sender: null,
                id: document.id,
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
      ignore && setNotificationsWithSenderDataLoading(false);
    }

    return () => {
      ignore = false;
    };
  }, [requestNotifications]);

  if (
    userLoading ||
    profileLoading ||
    emailVerifiedLoading ||
    notificationsWithSenderDataLoading ||
    requestNotificationsLoading
  ) {
    console.log(notificationsWithSenderDataLoading);
    return <Loader />;
  }

  if (
    userError ||
    profileError ||
    notificationsWithSenderDataError ||
    requestNotificationsError
  )
    return <Error />;
  if (user && !isVerified) return <div>Please verify your email...</div>;

  const handleNotificationClick = async (notification) => {
    const notificationRef = doc(db, "notifications", notification.id);

    try {
      await updateDoc(notificationRef, {
        isRead: true,
      });
      navigate("/on-process");
    } catch (error) {
      alert("Server error");
    }
  };

  const notifications =
    profile?.role === "MEMBER" ? [] : notificationsWithSenderData;
  const unreadNotificationsCount =
    profile?.role === "MEMBER"
      ? 0
      : notificationsWithSenderData?.filter(
          (notification) => !notification.isRead
        ).length;

  return (
    <>
      <div className={styles.container}>
        <SideBar />
        <div className={`${styles.content} pb-4`}>
          <header className="navbar py-4 px-5">
            <div
              className="ms-auto d-flex gap-4 align-items-center"
              style={{ position: "relative" }}
            >
              <div className="position-relative">
                <button
                  className="d-flex align-items-center"
                  onClick={() => setIsNotificationBoxOpen((prev) => !prev)}
                >
                  <GrNotification size={20} />
                </button>
                {unreadNotificationsCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                    {unreadNotificationsCount}
                  </span>
                )}
              </div>
              {isNotificationBoxOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "3rem",
                    right: "0",
                  }}
                >
                  <NotificationBox
                    data={notifications}
                    onClick={(data) => handleNotificationClick(data)}
                  />
                </div>
              )}
              <button
                ref={avatarWrapperRef}
                className="d-flex align-items-center gap-2"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                <img
                  className="rounded-circle border"
                  src={profile.avatar || defaultAvatar}
                  alt="avatar"
                  style={{
                    width: "25px",
                    height: "25px",
                    objectFit: "cover",
                  }}
                />

                <p style={{ margin: 0 }}>{profile.fullName}</p>
                <div className="ms-2">
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
                  onClick={handleSignOut}
                >
                  <BiLogOut size={20} />
                  Logout
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
