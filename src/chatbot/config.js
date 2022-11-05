// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";

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
};

export default config;
