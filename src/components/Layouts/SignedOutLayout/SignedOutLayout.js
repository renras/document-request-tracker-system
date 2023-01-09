import PropTypes from "prop-types";
import styles from "./SignedOutLayout.module.css";
import { Chatbot } from "react-chatbot-kit";
import MessageParser from "../../../chatbot/MessageParser";
// import useConfig from "../../../chatbot/useConfig";
import ActionProvider from "../../../chatbot/ActionProvider";
// import { BsChevronUp } from "react-icons/bs";
// import ChatBotHeader from "../../../chatbot/components/Header/Header";
import Header from "./Header/Header";
import config from "../../../chatbot/components/config";

const SignedOutLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className="container-sm">{children}</main>
      <div className={styles.chatbot}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          close="true"
        />
      </div>
    </div>
  );
};

export default SignedOutLayout;

SignedOutLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
