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
  addDoc,
  Timestamp,
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
import { AiOutlineMail, AiOutlineSetting } from "react-icons/ai";

const SignedInLayout = ({ children }) => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [profile, profileLoading, profileError] = useDocumentData(
    user ? doc(db, "users", user.uid) : null
  );
  const [emailVerifiedLoading, setEmailVerifiedLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
  const dateInAWeek = useRef(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  //  get documents collection where due date is less than a week
  const [dueDocuments, dueDocumentsLoading, dueDocumentsError] = useCollection(
    profile?.role === "ADMIN"
      ? query(
          collection(db, "documents"),
          where("dueDate", "<", dateInAWeek.current),
          where("isDueDateNotified", "==", false)
        )
      : null
  );

  const [userNotifications, userNotificationsLoading, userNotificationsError] =
    useCollection(
      user && profile?.role === "MEMBER"
        ? query(
            collection(db, "notifications"),
            where("recipientId", "==", user.uid)
          )
        : profile?.role === "ADMIN"
        ? query(
            collection(db, "notifications"),
            where("recipientId", "==", null)
          )
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
    if (dueDocumentsLoading || dueDocumentsError) return;
    if (!dueDocuments) return;

    const dueDocumentsData = dueDocuments?.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // create notification for each document that is due
    (async () => {
      await Promise.all(
        dueDocumentsData.map(async (document) => {
          return new Promise((resolve) => {
            (async () => {
              await addDoc(collection(db, "notifications"), {
                type: "DUE DOCUMENT",
                body: `Document with tracking id of ${document.id} is due in a week`,
                senderId: null,
                recipientId: null,
                clickAction: "/on-process",
                isRead: false,
                createdAt: Timestamp.now(),
              });

              // update document to notify admin that notification has been sent
              await updateDoc(doc(db, "documents", document.id), {
                isDueDateNotified: true,
              });

              resolve("success");
            })();
          });
        })
      );
    })();
  }, [dueDocumentsLoading, dueDocumentsError, dueDocuments]);

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
    if (userNotificationsLoading || userNotificationsError) return;
    if (!userNotifications?.docs.length) {
      setNotificationsWithSenderDataLoading(false);
      return;
    }
    let ignore = true;
    try {
      (async () => {
        const newNotifications = await Promise.all(
          userNotifications?.docs.map(async (document) => {
            const senderRef = document.data().senderId
              ? doc(db, "users", document.data().senderId)
              : null;

            const recipientRef = document.data().recipientId
              ? doc(db, "users", document.data().recipientId)
              : null;
            const senderSnap = senderRef ? await getDoc(senderRef) : null;
            const recipientSnap = recipientRef
              ? await getDoc(recipientRef)
              : null;

            if (senderSnap?.exists() && recipientSnap?.exists()) {
              return {
                ...document.data(),
                sender: senderSnap.data(),
                recipient: recipientSnap.data(),
                id: document.id,
              };
            }

            if (senderSnap?.exists() && !recipientSnap?.exists()) {
              return {
                ...document.data(),
                sender: senderSnap.data(),
                recipient: null,
                id: document.id,
              };
            }

            return {
              ...document.data(),
              sender: null,
              recipient: null,
              id: document.id,
            };
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
  }, [userNotifications, userNotificationsLoading, userNotificationsError]);

  if (
    userLoading ||
    profileLoading ||
    emailVerifiedLoading ||
    notificationsWithSenderDataLoading ||
    userNotificationsLoading ||
    dueDocumentsLoading
  )
    return <Loader />;

  if (
    userError ||
    profileError ||
    notificationsWithSenderDataError ||
    userNotificationsError ||
    dueDocumentsError
  )
    return <Error />;
  if (user && !isVerified)
    return (
      <div className="container">
        <div
          style={{ width: "500px", marginTop: "193px" }}
          className="border py-5 px-4 text-center mx-auto rounded shadow-sm"
        >
          <AiOutlineMail size={200} />
          <h1 className="mt-4">Verify Email</h1>
          <p className="mt-5">
            We have sent a verification email to the address you provided.
            Please check your inbox (and spam folder, just in case) for an email
            from us.
          </p>
        </div>
      </div>
    );

  const handleNotificationClick = async (notification) => {
    const notificationRef = doc(db, "notifications", notification.id);

    try {
      await updateDoc(notificationRef, {
        isRead: true,
      });

      navigate(notification.clickAction);
    } catch (error) {
      alert("Server error");
    }
  };

  const unreadNotificationsCount = notificationsWithSenderData?.filter(
    (notification) => !notification.isRead
  ).length;

  if (!profile?.isActive) {
    return (
      <div className="container">
        <h1 style={{ marginTop: "100px" }}>
          This account is disabled by the admin
        </h1>
        <button
          className="btn btn-outline-danger btn-lg mt-4"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
    );
  }

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
                    data={notificationsWithSenderData || []}
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

                <p style={{ margin: 0 }}>
                  {`${profile.firstName} ${profile.lastName}`}
                </p>
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

                <hr className="dropdown-divider" />

                <li className="dropdown-item">
                  <Link
                    to="/account"
                    className="d-flex gap-2 align-items-center"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <AiOutlineSetting size={20} />
                    Account
                  </Link>
                </li>

                <hr className="dropdown-divider" />

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
