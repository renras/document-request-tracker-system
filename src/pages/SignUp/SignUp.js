import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase-config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const onSubmit = async (data) => {
    const { fullName, email, password, phone, confirmPassword } = data;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isRecaptchaValid) {
      alert("Please complete the reCAPTCHA");
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
        avatar: result.user.photoURL,
      });

      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Failed to create user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecaptchaChange = () => {
    setIsRecaptchaValid(true);
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
          placeholder="Juan Dela Cruz"
          {...register("fullName", { required: true })}
        />
        {/* phone  */}
        <label className="form-label mt-4">Phone</label>
        <PhoneInput
          className="d-flex gap-2 form-control form-control-lg"
          id="phone"
          {...register("phone", { required: true })}
          international
          defaultCountry="PH"
          value={value}
          onChange={setValue}
        />
        {value && !isValidPhoneNumber(value) && (
          <p className="text-danger mb-0">Invalid phone number</p>
        )}
        {/* email */}
        <label className="form-label mt-4" htmlFor="email">
          Email
        </label>
        <input
          className="form-control form-control-lg "
          placeholder="juandelacruz@gmail.com"
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        {/* password */}
        <label className="form-label mt-4" htmlFor="password">
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
        {/* confirm password */}
        <label className="form-label mt-4" htmlFor="confirm-password">
          Confirm Password
        </label>
        <div className="input-group">
          <input
            className="form-control form-control-lg"
            id="confirm-password"
            type={!isConfirmPasswordVisible ? "password" : "text"}
            {...register("confirmPassword", { required: true })}
          />

          <button
            type="button"
            className="input-group-text"
            onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            style={{ width: "2.75rem" }}
          >
            <FontAwesomeIcon
              icon={isConfirmPasswordVisible ? faEye : faEyeSlash}
            />
          </button>
        </div>
        {/* recaptcha */}
        <div>
          <ReCAPTCHA
            sitekey="6LejVO0kAAAAAITbB2_ar2afzFtRmdASW_0prvLC"
            onChange={handleRecaptchaChange}
            style={{ marginTop: "2em" }}
          />
        </div>

        {/* sign up button */}
        <button
          className="btn btn-success btn-lg w-100 mt-5"
          type="submit"
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
