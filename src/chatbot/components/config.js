import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../Options";
import Header from "./Header/Header";
import { BsChevronDown } from "react-icons/bs";
import { useState, useEffect } from "react";

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
        `Hello and welcome to the school registrar's office! How can I assist you today?`,
        {
          widget: "Questions",
        }
      ),
    ],
    widgets: [
      {
        widgetName: "Questions",
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
