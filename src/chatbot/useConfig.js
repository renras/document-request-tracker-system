// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Header from "./components/Header/Header";
import { useEffect } from "react";

const useConfig = () => {
  const [showBot, setShowBot] = useState(
    sessionStorage.getItem("showBot") === null
      ? true
      : JSON.parse(sessionStorage.getItem("showBot"))
  );

  useEffect(() => {
    sessionStorage.setItem("showBot", showBot);
  }, [showBot]);

  const config = {
    initialMessages: [
      createChatBotMessage(
        "Hello and welcome to the school registrar's office! How can I assist you today?",
        {
          delay: 500,
          widget: "options",
          withAvatar: true,
        }
      ),
    ],
    widgets: [
      {
        widgetName: "options",
        widgetFunc: (props) => <Options {...props} />,
      },
    ],
    customComponents: {
      header: () => (
        <Header
          icon={<BsChevronDown size={20} />}
          toggleBot={() => setShowBot((prev) => !prev)}
        />
      ),
    },
  };

  return [config, showBot, setShowBot];
};

export default useConfig;
