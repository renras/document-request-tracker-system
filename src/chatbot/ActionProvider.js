import React from "react";
import PropTypes from "prop-types";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleCreateRequest = () => {
    const botMessage = createChatBotMessage(
      <>
        <p>Great! To request for a document, please follow these steps:</p>
        <ol>
          <li>Sign in to your account</li>
          <li>Click the &quot;Requests&quot; Tab</li>
          <li>Click the &quot;Create a Request&quot; Button</li>
          <li>Fill in the form then submit</li>
        </ol>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleTrackRequest = () => {
    const botMessage = createChatBotMessage(
      <>
        <p>Great! To track your request, please follow these steps:</p>
        <ol>
          <li>Click the &quot;Track a Request&quot; tab</li>
          <li>Enter the tracking id in the search</li>
        </ol>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleCreateRequest,
            handleTrackRequest,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

ActionProvider.propTypes = {
  children: PropTypes.node,
  createChatBotMessage: PropTypes.func,
  setState: PropTypes.func,
};
