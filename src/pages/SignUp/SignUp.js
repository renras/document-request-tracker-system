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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const onSubmit = async (data) => {
    const {
      studentId,
      course,
      sex,
      lastName,
      firstName,
      middleName,
      completeAddress,
      birthday,
      placeOfBirth,
      elementarySchool,
      elementaryYearGraduated,
      highSchool,
      highSchoolYearGraduated,
      email,
      password,
      phone,
      confirmPassword,
    } = data;

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
        studentId,
        course,
        sex,
        lastName,
        firstName,
        middleName,
        completeAddress,
        birthday,
        placeOfBirth,
        elementarySchool,
        elementaryYearGraduated,
        highSchool,
        highSchoolYearGraduated,
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
        style={{ marginTop: "5rem", fontFamily: "Roboto, sans-serif" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3">Sign Up</h1>

        {/* full name */}
        <label className="form-label mt-4">Student Name:</label>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control form-control-lg"
              id="last-name"
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control form-control-lg"
              id="first-name"
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control form-control-lg"
              id="middle-name"
              placeholder="Middle Name"
              {...register("middleName", { required: true })}
            />
          </div>
        </div>

        {/* student info */}
        <div className="row">
          <div className="col mb-4">
            <label className="form-label mt-4">Student ID no.</label>
            <input
              className="form-control form-control-lg"
              id="student-id"
              placeholder="03-2020-00211"
              {...register("studentId", {
                required: true,
                pattern: /^([0-9]{2})-([0-9]{4})-([0-9]{5})$/,
              })}
            />
            {errors.studentId && errors.studentId.type === "pattern" && (
              <p className="text-danger">
                Please enter a valid student ID number.
              </p>
            )}
          </div>
          <div className="col mb-4">
            <label className="form-label mt-4">Course:</label>
            <input
              className="form-control form-control-lg"
              id="course"
              placeholder="BSIT/BSCS/BSBA"
              {...register("course", { required: true })}
            />
          </div>
        </div>

        {/* complete address */}
        <label className="form-label mt-4">Complete Address:</label>
        <input
          className="form-control form-control-lg"
          id="complete-address"
          placeholder="Street, Barangay, City, Province"
          {...register("completeAddress", { required: true })}
        />

        {/* birthday and place of birth */}
        <div className="row">
          <div className="col mb-4">
            <label className="form-label mt-4">Birthday</label>
            <input
              className="form-control form-control-lg"
              id="birthday"
              type="date"
              {...register("birthday", { required: true })}
            />
          </div>
          <div className="col mb-4">
            <label className="form-label mt-4">Place of Birth:</label>
            <input
              className="form-control form-control-lg"
              id="place-of-birth"
              {...register("placeOfBirth", { required: true })}
            />
          </div>
        </div>

        {/* elementary school */}
        <div className="row">
          <div className="col mb-4">
            <label className="form-label mt-4">Elementary School:</label>
            <input
              className="form-control form-control-lg"
              id="elementary-school"
              {...register("elementarySchool", { required: true })}
            />
          </div>
          <div className="col mb-4">
            <label className="form-label mt-4">Year Graduated:</label>
            <input
              className="form-control form-control-lg"
              id="elementary-year-graduated"
              {...register("elementaryYearGraduated", {
                required: true,
                pattern: /^(([0-9]{4}))$/,
              })}
            />
            {errors.elementaryYearGraduated &&
              errors.elementaryYearGraduated.type === "pattern" && (
                <p className="text-danger">Please enter a valid Year.</p>
              )}
          </div>
        </div>

        {/* high school */}
        <div className="row">
          <div className="col mb-4">
            <label className="form-label mt-4">High School:</label>
            <input
              className="form-control form-control-lg me-2"
              id="high-school"
              {...register("highSchool", { required: true })}
            />
          </div>
          <div className="col mb-4">
            <label className="form-label mt-4">Year Graduated:</label>
            <input
              className="form-control form-control-lg"
              id="high-year-graduated"
              {...register("highSchoolYearGraduated", {
                required: true,
                pattern: /^(([0-9]{4}))$/,
              })}
            />
            {errors.highSchoolYearGraduated &&
              errors.highSchoolYearGraduated.type === "pattern" && (
                <p className="text-danger">Please enter a valid Year.</p>
              )}
          </div>
        </div>
        {/* sex */}
        <label className="form-label mt-4">Sex:</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sex"
            id="male"
            value="M"
            {...register("sex", { required: true })}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sex"
            id="female"
            value="F"
            {...register("sex", { required: true })}
          />
          <label className="form-check-label">Female</label>
        </div>

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
