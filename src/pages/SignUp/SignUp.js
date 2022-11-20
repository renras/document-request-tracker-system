import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase-config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { fullName, email, password, phone, confirmPassword } = data;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        fullName,
        email,
        phone,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        role: "MEMBER",
      });

      navigate("/documents");
    } catch (e) {
      console.error(e);
      alert("Failed to create user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignedOutLayout>
      <form
        className="mw-sm border w-100 shadow-sm rounded py-5 px-4 mx-auto bg-light"
        style={{ marginTop: "5rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3">Sign Up</h1>

        {/* full name */}
        <label className="form-label mt-4" htmlFor="full-name">
          Full Name
        </label>
        <input
          className="form-control form-control-lg"
          id="full-name"
          {...register("fullName", { required: true })}
        />

        {/* full name */}
        <label className="form-label mt-4" htmlFor="phone">
          Phone
        </label>
        <input
          className="form-control form-control-lg"
          id="phone"
          {...register("phone", { required: true })}
        />

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
          id="confirm-password"
          type="password"
          {...register("confirmPassword", { required: true })}
        />

        <button
          className="btn btn-success btn-lg w-100 mt-5"
          disabled={loading}
        >
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
