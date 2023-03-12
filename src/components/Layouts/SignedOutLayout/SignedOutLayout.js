import PropTypes from "prop-types";
import styles from "./SignedOutLayout.module.css";
import { Chatbot } from "react-chatbot-kit";
import MessageParser from "../../../chatbot/MessageParser";
import ActionProvider from "../../../chatbot/ActionProvider";
import { BsChevronUp } from "react-icons/bs";
import ChatBotHeader from "../../../chatbot/components/Header/Header";
import Header from "./Header/Header";
import useConfig from "../../../chatbot/useConfig";

const SignedOutLayout = ({ children }) => {
  const [config, showBot, setShowBot] = useConfig();

  return (
    <div className={styles.container} >
      <Header />
      <main className="container-sm">{children}</main>
      <div className={styles.chatbot}>
        {showBot && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
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
