import PropTypes from "prop-types";

const Header = ({ toggleBot, icon }) => {
  return (
    <div className="react-chatbot-kit-chat-header d-flex justify-content-between">
      Conversation with Bot
      <button onClick={() => toggleBot()}>{icon}</button>
    </div>
  );
};

export default Header;

Header.propTypes = {
  toggleBot: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};
