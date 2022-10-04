import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <form className="mw-sm border w-100 shadow-sm rounded py-5 px-4">
        <h1 className="h3">Sign Up</h1>

        {/* email */}
        <label className="form-label mt-4" htmlFor="email">
          Email
        </label>
        <input
          className="form-control form-control-lg"
          id="email"
          type="email"
        />

        {/* password */}
        <label className="form-label mt-3" htmlFor="password">
          Password
        </label>
        <input
          className="form-control form-control-lg"
          id="password"
          type="password"
        />

        {/* confirm password */}
        <label className="form-label mt-3" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="form-control form-control-lg"
          id="password"
          type="password"
        />

        <button className="btn btn-primary btn-lg w-100 mt-5">Sign In</button>

        {/* sign up link */}
        <div className="text-center mt-4">
          Do not have an account yet?
          <Link to="/sign-up" className="ms-2">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
