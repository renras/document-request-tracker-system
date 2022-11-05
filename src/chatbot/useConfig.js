// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Header from "./components/Header/Header";

const useConfig = () => {
  const [showBot, setShowBot] = useState(true);

  const config = {
    initialMessages: [
      createChatBotMessage(`Hello`),
      createChatBotMessage("Do you have any questions?", {
        delay: 500,
        widget: "options",
        withAvatar: true,
      }),
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
          toggleBot={() => setShowBot(false)}
        />
      ),
    },
  };

  return [config, showBot, setShowBot];
};

export default useConfig;
