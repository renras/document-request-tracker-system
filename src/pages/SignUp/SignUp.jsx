import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.passwords);
      alert("User created successfully");
    } catch {
      alert("Failed to create user. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <form
        className="mw-sm border w-100 shadow-sm rounded py-5 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3">Sign Up</h1>

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
        <input
          className="form-control form-control-lg"
          id="password"
          type="password"
          {...register("password", { required: true })}
        />

        {/* confirm password */}
        <label className="form-label mt-3" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="form-control form-control-lg"
          id="password"
          type="password"
          {...register("confirmPassword", { required: true })}
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
