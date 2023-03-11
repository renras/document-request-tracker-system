import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../../firebase-config";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../assets/images/avatar.jpg";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const [user, userLoading, userError] = useAuthState(auth);
  const [profile, profileLoading, profileError] = useDocumentData(
    user ? doc(db, "users", user.uid) : null
  );
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  if (profileLoading || userLoading) return <Loader />;
  if (profileError || userError) return <Error />;

  const onSubmit = async (data) => {
    const { lastName, firstName, middleName, phone, aboutMe } = data;

    try {
      let url = profile?.avatar;
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, avatarFile);
        url = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        avatar: url,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        phone: phone,
        aboutMe: aboutMe,
        updatedAt: Timestamp.now(),
      });
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile. Please try again later.");
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  return (
    <SignedInLayout>
      <div className="p-5">
        <form className="mw-sm m-auto" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h2">Profile</h2>

          <label htmlFor="avatar" className="d-block mt-5 text-center">
            <img
              src={avatarPreview || profile?.avatar || defaultAvatar}
              className="rounded-circle border"
              style={{
                width: "150px",
                height: "150px",
                cursor: "pointer",
                objectFit: "cover",
              }}
              alt="Avatar"
            />
            <input
              type="file"
              accept="image/jpg,image/jpeg,image/png"
              id="avatar"
              hidden
              onChange={handleFileInputChange}
            />
          </label>

          {/* fullname */}
          <label className="form-label mt-3" htmlFor="full-name">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            id="full-name"
            defaultValue={
              profile?.lastName +
              ", " +
              profile?.firstName +
              " " +
              profile?.middleName
            }
            readOnly
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
            {...register("aboutMe")}
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
