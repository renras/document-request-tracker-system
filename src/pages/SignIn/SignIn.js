import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/dashboard");
    } catch {
      alert("Failed to sign in user. Please try again later.");
    }
  };

  return (
    <SignedOutLayout>
      <form
        className="mw-sm border w-100 shadow-sm rounded py-5 px-4 mx-auto bg-light"
        style={{ marginTop: "5rem", fontFamily: "Roboto, sans-serif" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3">Sign In</h1>

        {/* email */}
        <label className="form-label mt-4" htmlFor="email">
          Email
        </label>
        <input
          className="form-control form-control-lg"
          id="email"
          type="email"
          {...register("email", { required: true })}
        />

        {/* password */}

        <label className="form-label mt-3" htmlFor="password">
          Password
        </label>
        <div className="input-group">
          <input
            className="form-control form-control-lg"
            id="password"
            type={!isPasswordVisible ? "password" : "text"}
            {...register("password", { required: true })}
          />
          <button
            type="button"
            className="input-group-text"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            style={{ width: "2.75rem" }}
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
          </button>
        </div>
        {/*add sign in button */}
        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg w-100 mt-5">Sign In</button>
        </div>

        {/*link to reset.js */}
        <div className="d-flex">
          <Link to="/reset" className="text-decoration-none ms-auto">
            <p className=" mt-3">Forgot your password?</p>
          </Link>
        </div>

        {/* sign up link */}
        <div className="text-center mt-4">
          Do not have an account yet?
          <Link to="/sign-up" className="ms-2">
            Sign up
          </Link>
        </div>
      </form>
    </SignedOutLayout>
  );
};

export default SignIn;
