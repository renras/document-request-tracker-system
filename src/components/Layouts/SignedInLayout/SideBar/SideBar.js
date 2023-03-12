import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { doc } from "firebase/firestore";
import { db, auth } from "../../../../firebase-config";
import { useDocument } from "react-firebase-hooks/firestore";
import navLinks from "./navLinks";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userDoc, userLoading, userError] = useDocument(
    doc(db, "users", auth.currentUser.uid)
  );

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      style={{
        width: isOpen ? "256px" : "64px",
        height: "100vh",
        fontFamily: "Roboto, sans-serif"
      }}
      className={`navbar-dark bg-success border shadow-sm px-4 py-5 ${
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

      {/* todo:  create context*/}
      {userDoc && !userLoading && !userError && (
        <ul className="navbar-nav mt-5 d-flex flex-column gap-2 ">
          {navLinks.map((item, index) => {
            if (
              item.role === "ADMIN" &&
              userDoc.data() &&
              userDoc.data().role !== "ADMIN"
            )
              return null;

            return (
              <li key={index} className={`nav-item ${!isOpen ? "py-2" : ""}`}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link d-flex gap-3 ${isActive ? "active" : ""}`
                  }
                >
                  <div>{item.icon}</div>
                  {isOpen && <>{item.name}</>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SideBar;
