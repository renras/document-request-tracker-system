import PropTypes from "prop-types";
import styles from "./SignedOutLayout.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import img1 from "../../../assets/images/unilogo.png";
import { Chatbot } from "react-chatbot-kit";
import MessageParser from "../../../chatbot/MessageParser";
import useConfig from "../../../chatbot/useConfig";
import ActionProvider from "../../../chatbot/ActionProvider";
import { BsChevronUp } from "react-icons/bs";
import ChatBotHeader from "../../../chatbot/components/Header/Header";

const SignedOutLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [config, showBot, setShowBot] = useConfig();

  useEffect(() => {
    if (location.pathname.includes("sign-up")) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/documents");
      } else {
        console.log("User is not signed in");
      }
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  return (
    <div className={styles.container}>
      <header className="navbar bg-light">
        <div className="container-sm">
          <Link to="/" className={`${styles.link} navbar-brand fs-3 `}>
            <img
              src={img1}
              alt=""
              height="60"
              className="d-inline-block align-text-top d-content-end"
            />
          </Link>
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/track-request" className="nav-link">
                Track a Request
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
          <Link to="/sign-in" className="btn btn-secondary">
            Sign In
          </Link>
        </div>
      </header>
      <main className="container-sm">{children}</main>
      <div className={styles.chatbot}>
        {showBot && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            close="true"
          />
        )}

        {!showBot && (
          <ChatBotHeader
            icon={<BsChevronUp size={20} />}
            toggleBot={() => setShowBot(true)}
          />
        )}
      </div>
    </div>
  );
};

export default SignedOutLayout;

SignedOutLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
