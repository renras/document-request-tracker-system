import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase-config";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../assets/images/avatar.jpg";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const [user, userLoading, userError] = useAuthState(auth);
  const [profile, profileLoading, profileError] = useDocumentData(
    user ? doc(db, "users", user.uid) : null
  );

  if (profileLoading || userLoading) return <Loader />;
  if (profileError || userError) return <Error />;

  const onSubmit = async (data) => {
    const { fullName, phone, aboutMe } = data;

    try {
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        fullName: fullName,
        phone: phone,
        aboutMe: aboutMe,
        updatedAt: Timestamp.now(),
      });
      await auth.currentUser.reload();
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <SignedInLayout>
      <div className="p-5">
        <form className="mw-sm m-auto" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h2">Profile</h2>

          <div className="mt-5 text-center">
            <img
              src={profile?.avatar || defaultAvatar}
              className="rounded-circle border"
              style={{ width: "150px", cursor: "pointer" }}
              alt="Avatar"
            />
          </div>

          {/* fullname */}
          <label className="form-label mt-3" htmlFor="full-name">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            id="full-name"
            defaultValue={profile?.fullName}
            {...register("fullName", { required: true })}
          />

          {/* phone*/}
          <label className="form-label mt-3" htmlFor="phone">
            Phone
          </label>
          <input
            className="form-control"
            id="phone"
            defaultValue={profile?.phone}
            {...register("phone", { required: true })}
          />

          {/* email */}
          <label
            className="form-label mt-3"
            htmlFor="email"
            style={{ pointerEvents: "none" }}
          >
            Email
          </label>
          <input
            className="form-control"
            type="text"
            id="email"
            readOnly
            defaultValue={profile?.email}
          />

          {/* about me */}
          <label className="form-label mt-4" htmlFor="about-me">
            About Me
          </label>
          <textarea
            className="form-control"
            id="aboutme"
            rows="5"
            defaultValue={profile?.aboutMe}
            {...register("aboutMe", { required: true })}
          />

          <div className="d-flex mt-4">
            <button className="btn btn-success ">Save changes</button>
          </div>
        </form>
      </div>
    </SignedInLayout>
  );
};

export default Profile;
