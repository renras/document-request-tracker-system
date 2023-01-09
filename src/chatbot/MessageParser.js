import React from "react";
import PropTypes from "prop-types";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("request") && !message.includes("track")) {
      actions.handleCreateRequest();
    }

    if (message.includes("track")) {
      actions.handleTrackRequest();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;

MessageParser.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.node,
};
