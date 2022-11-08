import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase-config";
import { doc, updateDoc, Timestamp, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (!auth.currentUser.uid) return;
    if (mounted) {
      (async () => {
        try {
          const docRef = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists) {
            setUser(docSnap.data());
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error />;

  const { fullName, phone, email, aboutMe } = user;

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
            defaultValue={fullName}
            {...register("fullName", { required: true })}
          />

          {/* phone*/}
          <label className="form-label mt-3" htmlFor="phone">
            Phone
          </label>
          <input
            className="form-control"
            id="phone"
            defaultValue={phone}
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
            defaultValue={email}
          />

          {/* about me */}
          <label className="form-label mt-4" htmlFor="about-me">
            About Me
          </label>
          <textarea
            className="form-control"
            id="aboutme"
            rows="5"
            defaultValue={aboutMe}
            {...register("aboutMe", { required: true })}
          />

          <div className="d-flex mt-4">
            <button className="btn btn-success ms-auto">Save changes</button>
          </div>
        </form>
      </div>
    </SignedInLayout>
  );
};

export default Profile;
