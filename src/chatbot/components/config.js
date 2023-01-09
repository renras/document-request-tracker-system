import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hello and welcome to the school registrar's office! How can I assist you today?`
    ),
  ],
};

export default config;
