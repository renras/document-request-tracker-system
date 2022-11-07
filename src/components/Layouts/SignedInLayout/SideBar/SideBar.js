import { FaFileAlt } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { BsBoxArrowUp } from "react-icons/bs";
import { HiDocumentSearch } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { doc } from "firebase/firestore";
import { db, auth } from "../../../../firebase-config";
import { useDocument } from "react-firebase-hooks/firestore";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userDoc, userLoading, userError] = useDocument(
    doc(db, "users", auth.currentUser.uid)
  );

  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      href: "/documents",
      name: "Documents",
      icon: <FaFileAlt color="#fff" size={20} />,
    },
    {
      href: "/incoming",
      name: "Incoming",
      icon: <HiDownload color="#fff" size={20} />,
      role: "ADMIN",
    },
    {
      href: "/received",
      name: "Received",
      icon: <FaEnvelope color="#fff" size={20} />,
      role: "ADMIN",
    },
    {
      href: "/hold",
      name: "Hold",
      icon: <FaLightbulb color="#fff" size={20} />,
      role: "ADMIN",
    },
    {
      href: "/returned",
      name: "Returned",
      icon: <FaExchangeAlt color="#fff" size={20} />,
      role: "ADMIN",
    },
    {
      href: "/released",
      name: "Released",
      icon: <BsBoxArrowUp color="#fff" size={20} />,
      role: "ADMIN",
    },
    {
      href: "/track-document",
      name: "Track Documents",
      icon: <HiDocumentSearch color="#fff" size={20} />,
    },
    {
      href: "/profile",
      name: "Profile",
      icon: <FaUserAlt color="#fff" size={20} />,
    },
  ];

  return (
    <div
      style={{
        width: isOpen ? "256px" : "64px",
        height: "100vh",
      }}
      className={`bg-success text-white border shadow-sm px-4 py-5 d-flex flex-column  ${
        !isOpen ? "align-items-center" : ""
      }`}
    >
      <div className="d-flex gap-3 align-items-center">
        <button onClick={toggle} style={{ cursor: "pointer" }}>
          <FaBars color="#fff" size={24} />
        </button>
        <h1
          style={{
            display: isOpen ? "block" : "none",
            margin: 0,
          }}
          className="navbar-brand fs-2"
        >
          PHINMA
        </h1>
      </div>

      {userDoc && !userLoading && !userError && (
        <ul className="navbar-nav mt-5">
          {menuItem.map((item, index) => {
            if (
              item.role === "ADMIN" &&
              userDoc.data() &&
              userDoc.data().role !== "ADMIN"
            )
              return null;

            return (
              <li key={index} className={`nav-item ${!isOpen ? "py-2" : ""}`}>
                <Link to={item.href} className="nav-link d-flex gap-3">
                  <div>{item.icon}</div>
                  {isOpen && <p>{item.name}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SideBar;
