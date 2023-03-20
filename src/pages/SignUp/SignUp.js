import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { auth, db } from "../../firebase-config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import Dropdown from "../../components/ui/Dropdown/Dropdown";
import {
  regions as getRegions,
  provinces as getProvinces,
} from "select-philippines-address";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const STATUSES = [
  {
    value: "",
    label: "",
  },
  {
    value: "STUDENT",
    label: "Student",
  },
  {
    value: "ALUMNI",
    label: "Alumni",
  },
];

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const recaptchaRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(STATUSES[0]);
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [regionsError, setRegionsError] = useState(false);

  const regionOptions = regions.map((region) => ({
    value: region.region_code,
    label: region.region_name,
  }));

  const provinceOptions = provinces.map((province) => ({
    value: province.province_code,
    label: province.province_name,
  }));

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

    if (!status.value) {
      alert("Please select your status");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isRecaptchaValid) {
      alert("Please verify that you are not a robot");
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
        studentId: status === "STUDENT" ? studentId : null,
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

  const activeRegion = watch("region");

  useEffect(() => {
    (async () => {
      try {
        const regions = await getRegions();
        setRegions(regions);

        const provinces = await getProvinces(activeRegion?.value);
        setProvinces(provinces);
      } catch (e) {
        console.error(e);
        setRegionsError(true);
      } finally {
        setRegionsLoading(false);
      }
    })();
  }, [activeRegion]);

  if (regionsLoading) {
    return <Loader />;
  }

  if (regionsError) {
    return <Error />;
  }

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

        <div className="row mt-4">
          <div className="col-md-4">
            <label className="form-label">Status:</label>
            <Dropdown
              size="lg"
              id="status"
              value={status}
              options={STATUSES}
              onChange={(option) => setStatus(option)}
            />
          </div>
          <div className="col-md-8">
            {status.value === "STUDENT" && (
              <>
                <label className="form-label ">Student ID no.</label>
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
              </>
            )}
          </div>
        </div>

        {/* student info */}
        <div className="row">
          <div className="col-md-12">
            <label className="form-label mt-4">Course:</label>
            <input
              className="form-control form-control-lg"
              id="course"
              placeholder="BSIT/BSCS/BSBA"
              {...register("course", { required: true })}
            />
          </div>
        </div>

        {/* region */}
        <label htmlFor="region" className="form-label mt-4">
          Region
        </label>
        <Controller
          name="region"
          control={control}
          defaultValue={{
            value: "",
            label: "Select Region",
          }}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              size="lg"
              id="region"
              value={value}
              options={regionOptions}
              onChange={(option) => onChange(option)}
            />
          )}
          rules={{
            validate: (value) => value.value !== "" || "Please select a region",
          }}
        />

        {/* province */}
        <label htmlFor="province" className="form-label mt-4">
          Province
        </label>
        <Controller
          name="province"
          control={control}
          defaultValue={{
            value: "",
            label: "Select Province",
          }}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              size="lg"
              id="province"
              value={value}
              options={provinceOptions}
              onChange={(option) => {
                try {
                  const regions = getRegions(activeRegion?.value);
                  setRegions(regions);
                  onChange(option);
                } catch (e) {
                  alert("Failed to load regions");
                }
              }}
            />
          )}
          rules={{
            validate: (value) =>
              value.value !== "" || "Please select a province",
          }}
        />

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
            ref={recaptchaRef}
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
