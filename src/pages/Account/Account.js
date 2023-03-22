import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { auth } from "../../firebase-config";
// import { updatePassword } from "firebase/auth";

const Account = () => {
  console.log(auth.currentUser);

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">Account</h1>
        <h2 className="h4 mt-5">Change Password</h2>
        <div className="mt-4" style={{ width: "500px" }}>
          <label htmlFor="new-password">New Password</label>
          <input id="new-password" className="form-control" type="password" />
          <label htmlFor="new-password" className="mt-3">
            Confirm New Password
          </label>
          <input id="new-password" className="form-control" type="password" />
          <button className="btn btn-outline-danger mt-4">
            Update Password
          </button>
        </div>
      </div>
    </SignedInLayout>
  );
};

export default Account;
