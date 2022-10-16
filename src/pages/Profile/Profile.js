import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "profile"), {
        name: data.fullname,
        lname: data.phone,
        email: data.email,
        aboutme: data.aboutme,
      });
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <SignedInLayout>
      <div className="container-sm">
        <form
          className="mw-sm  px-5 py-5 mt-5 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="d-flex mt-5">
            <h2 className="h3">BASIC INFO</h2>
            <button className="btn btn-success ms-auto">Save changes</button>
          </div>

          {/* firstname and last name */}
          <label className="form-label mt-4" htmlFor="fname">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            id="full-name"
            {...register("fname", { required: true })}
          />
          {/* phone*/}
          <label className="form-label mt-4" htmlFor="phone">
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
          <label className="form-label mt-3 h5" htmlFor="aboutme">
            About me
          </label>
          <textarea
            className="form-control"
            id="aboutme"
            rows="5"
            {...register("aboutme", { required: true })}
          />
        </form>
      </div>
    </SignedInLayout>
  );
};

export default Profile;
