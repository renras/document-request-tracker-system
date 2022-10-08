import PropTypes from "prop-types";
import SideBar from '../../SideBar/SideBar';

const SignedInLayout = ({ children }) => {
    return (
        <div>
            <SideBar />
            <main>
                {children}
            </main>
        </div>
    );
};

export default SignedInLayout;

SignedInLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };