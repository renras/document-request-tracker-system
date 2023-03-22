import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { auth } from "../../firebase-config";
import { updatePassword } from "firebase/auth";
import { useForm } from "react-hook-form";

const Account = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      alert("Confirm password is not equal to new password");
      return;
    }

    try {
      const user = auth.currentUser;
      await updatePassword(user, data.newPassword);
      reset();
      alert("Successfully updated password");
    } catch (e) {
      console.error(e);
      alert("Failed to update password");
    }
  };

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">Account</h1>
        <h2 className="h4 mt-5">Change Password</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4"
          style={{ width: "400px" }}
        >
          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            className="form-control"
            type="password"
            {...register("newPassword", {
              required: true,
            })}
          />
          <label htmlFor="confirm-new-password" className="mt-3">
            Confirm New Password
          </label>
          <input
            id="confirm-new-password"
            className="form-control"
            type="password"
            {...register("confirmNewPassword", {
              required: true,
            })}
          />
          <button className="btn btn-outline-danger mt-4">
            Update Password
          </button>
        </form>
      </div>
    </SignedInLayout>
  );
};

export default Account;
