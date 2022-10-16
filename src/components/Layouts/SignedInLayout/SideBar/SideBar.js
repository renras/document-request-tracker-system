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

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      href: "/documents",
      name: "Documents",
      icon: <FaFileAlt color="#212529" size={20} />,
    },
    {
      href: "/incoming",
      name: "Incoming",
      icon: <HiDownload color="#212529" size={20} />,
    },
    {
      href: "/received",
      name: "Received",
      icon: <FaEnvelope color="#212529" size={20} />,
    },
    {
      href: "/hold",
      name: "Hold",
      icon: <FaLightbulb color="#212529" size={20} />,
    },
    {
      href: "/returned",
      name: "Returned",
      icon: <FaExchangeAlt color="#212529" size={20} />,
    },
    {
      href: "/released",
      name: "Released",
      icon: <BsBoxArrowUp color="#212529" size={20} />,
    },
    {
      href: "/track-document",
      name: "Track_Documents",
      icon: <HiDocumentSearch color="#212529" size={20} />,
    },
    {
      href: "/profile",
      name: "Profile",
      icon: <FaUserAlt color="#212529" size={20} />,
    },
  ];
  return (
    <div
      style={{ width: isOpen ? "256px" : "64px", height: "100vh" }}
      className={`bg-light border shadow-sm px-4 py-5 d-flex flex-column  ${
        !isOpen ? "align-items-center" : ""
      }`}
    >
      <div className="d-flex gap-3 align-items-center">
        <button onClick={toggle} style={{ cursor: "pointer" }}>
          <FaBars color="#212529" size={24} />
        </button>
        <h1
          style={{
            display: isOpen ? "block" : "none",
            margin: "0",
          }}
          className="navbar-brand fs-3"
        >
          UPANG
        </h1>
      </div>

      <ul className="navbar-nav mt-5">
        {menuItem.map((item, index) => (
          <li key={index} className={`nav-item ${!isOpen ? "py-2" : ""}`}>
            <Link to={item.href} className="nav-link d-flex gap-3">
              <div>{item.icon}</div>
              {isOpen && <p>{item.name}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
