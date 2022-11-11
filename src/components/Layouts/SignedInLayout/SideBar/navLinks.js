import { FaFileAlt } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { BsBoxArrowUp } from "react-icons/bs";
import { HiDocumentSearch } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";

const navLinks = [
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

export default navLinks;
