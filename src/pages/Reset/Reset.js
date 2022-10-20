import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase-config";
import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { sendPasswordResetEmail } from "firebase/auth";
const Reset = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      alert("Password reset email sent successfully");
    } catch {
      alert("Failed to send password reset email. Please try again later.");
    }
  };
  return (
    <SignedOutLayout>
      <form
        className="mw-sm border w-100 shadow-sm rounded py-5 px-4 mx-auto bg-light"
        style={{ marginTop: "5rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3">Reset Password</h1>
        <p className="text-muted">
          Enter the email address associated with your account and we will send
          you a link to reset your password If you didnt receive it in your
          inbox please check your spam folder
        </p>
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
        {/* sign up link */}
        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg w-50 mt-2">Reset</button>
        </div>
        <div className="text-center mt-4">
          Remember your password?
          <Link to="/sign-in" className="ms-2">
            Sign in
          </Link>
        </div>
      </form>
    </SignedOutLayout>
  );
};

export default Reset;
