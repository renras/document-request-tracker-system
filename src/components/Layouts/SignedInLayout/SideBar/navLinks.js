import { FaFileAlt } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { FaLightbulb } from "react-icons/fa";
import { BsBoxArrowUp } from "react-icons/bs";
import { HiDocumentSearch, HiOutlineDocumentReport } from "react-icons/hi";

const navLinks = [
  {
    href: "/documents",
    name: "Request Documents",
    icon: <FaFileAlt color="#fff" size={20} />,
  },
  {
    href: "/on-process",
    name: "On Process",
    icon: <HiDownload color="#fff" size={20} />,
    role: "ADMIN",
  },

  {
    href: "/for-release",
    name: "For Release",
    icon: <FaLightbulb color="#fff" size={20} />,
    role: "ADMIN",
  },
  {
    href: "/released",
    name: "Released",
    icon: <BsBoxArrowUp color="#fff" size={20} />,
    role: "ADMIN",
  },
  {
    href: "/reports",
    name: "Reports",
    icon: <HiOutlineDocumentReport color="#fff" size={20} />,
    role: "ADMIN",
  },
  {
    href: "/track-document",
    name: "Track Documents",
    icon: <HiDocumentSearch color="#fff" size={20} />,
  },
];

export default navLinks;
