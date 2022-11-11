import PropTypes from "prop-types";
import styles from "./SignedOutLayout.module.css";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Chatbot } from "react-chatbot-kit";
import MessageParser from "../../../chatbot/MessageParser";
import useConfig from "../../../chatbot/useConfig";
import ActionProvider from "../../../chatbot/ActionProvider";
import { BsChevronUp } from "react-icons/bs";
import ChatBotHeader from "../../../chatbot/components/Header/Header";
import { useState } from "react";
import Loader from "../../Loader/Loader";
import Header from "./Header/Header";

const SignedOutLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [config, showBot, setShowBot] = useConfig();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname.includes("sign-up")) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/documents");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <Header />
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
