import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("User created successfully");
    } catch {
      alert("Failed to create user. Please try again later.");
    }
  };

  return (
    <SignedOutLayout>
      <form
        className="mw-sm border w-100 shadow-sm rounded py-5 px-4 mx-auto"
        style={{ marginTop: "5rem" }}
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

        <button className="btn btn-primary btn-lg btn-dark w-100 mt-5">
          Sign Up
        </button>

        {/* sign up link */}
        <div className="text-center mt-4">
          Already have an account?
          <Link to="/sign-in" className="ms-2">
            Sign In
          </Link>
        </div>
      </form>
    </SignedOutLayout>
  );
};

export default SignUp;
