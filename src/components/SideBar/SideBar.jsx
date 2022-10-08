import { FaFileAlt } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { FaEnvelope } from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import { BsBoxArrowUp } from 'react-icons/bs';
import { HiDocumentSearch } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import "./SideBar.css";
import { useState } from 'react';

const SideBar = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem=[
        {
            title: "/documents",
            name: "Documents",
            icon: <FaFileAlt/>
        },
        {
            title: "/incoming",
            name: "Incoming",
            icon: <HiDownload/>
        },
        {
            title: "/received",
            name: "Received",
            icon: <FaEnvelope/>
        },
        {
            title: "/hold",
            name: "Hold",
            icon: <FaLightbulb/>
        },
        {
            title: "/returned",
            name: "Returned",
            icon: <FaExchangeAlt/>
        },
        {
            title: "/released",
            name: "Released",
            icon: <BsBoxArrowUp/>
        },
        {
            title: "/trackdocuments",
            name: "Track Documents",
            icon: <HiDocumentSearch/>
        },
        {
            title: "/profile",
            name: "Profile",
            icon: <FaUserAlt/>
        },
       
    ]
    return (
        <div className='container-fluid'>
            <div style={{width: isOpen ? "300px" : "50px"}} className='sidebar'>
                <div className='top'>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bar'>
                    <FaBars onClick={toggle}/>
                    <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>UPANG</h1>
                </div>
            </div>
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassName='active'>
                        <div className='icon'>{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        </div>
    );
};

export default SideBar;