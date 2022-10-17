import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit } = useForm();

  // todo: logic
  // this should update the current user profile
  const onSubmit = async (data) => console.log(data);

  return (
    <SignedInLayout>
      <div className="p-5">
        <form className="mw-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h3">Profile</h2>

          {/* fullname */}
          <label className="form-label mt-4" htmlFor="full-name">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            id="full-name"
            {...register("fullName", { required: true })}
          />

          {/* phone*/}
          <label className="form-label mt-3" htmlFor="phone">
            Phone
          </label>
          <input
            className="form-control"
            id="phone"
            {...register("phone", { required: true })}
          />

          {/* email */}
          <label className="form-label mt-3" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="text"
            id="email"
            {...register("email", { required: true })}
          />

          {/* about me */}
          <label className="form-label mt-4" htmlFor="about-me">
            About Me
          </label>
          <textarea
            className="form-control"
            id="aboutme"
            rows="5"
            {...register("aboutMe", { required: true })}
          />

          <div className="d-flex mt-4">
            <button className="btn btn-primary ms-auto">Save changes</button>
          </div>
        </form>
      </div>
    </SignedInLayout>
  );
};

export default Profile;
