import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { db } from "../../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { AiFillEye } from "react-icons/ai";
import Modal from "../../components/v2/Modal/Modal";
import { useState } from "react";

const UserManagement = () => {
  const [profiles, profilesLoading, profilesError] = useCollectionData(
    collection(db, "users")
  );
  const [showProfile, setShowProfile] = useState(false);

  if (profilesLoading) return <Loader />;
  if (profilesError) return <Error />;

  const profilesSortedByRoles = profiles.sort((a, b) => {
    if (a.role === "ADMIN") return -1;
    if (b.role === "MEMBER") return 1;
    return 0;
  });
  return (
    <>
      <SignedInLayout>
        <div className="px-4">
          <h1 className="h2">User Management</h1>
          <table className="table mt-5 align-middle">
            <thead>
              <tr className="table-success">
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {profilesSortedByRoles.map((profile) => (
                <tr key={profile.id}>
                  <td>{`${profile.lastName}, ${profile.firstName} ${profile.middleName[0]}.`}</td>
                  <td>{profile.email}</td>
                  <td>{profile.role}</td>
                  <td>{profile.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => setShowProfile(profile)}
                    >
                      <AiFillEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SignedInLayout>
      {!!showProfile && (
        <Modal isOpen={!!showProfile}>
          <div className="modal-header">
            <h5 className="modal-title">Profile</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowProfile(null)}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row mt-4">
              <h2 className="h6 m-0 col">Full Name:</h2>
              <p className="m-0 col-8">{`${showProfile.lastName}, ${showProfile.firstName} ${showProfile.middleName[0]}.`}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Email:</h2>
              <p className="m-0 col-8">{showProfile.email}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Role:</h2>
              <p className="m-0 col-8">{showProfile.role}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Student ID:</h2>
              <p className="m-0 col-8">{showProfile.studentId || "n/a"}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Phone:</h2>
              <p className="m-0 col-8">{showProfile.phone}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Region:</h2>
              <p className="m-0 col-8">{showProfile.region}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Province:</h2>
              <p className="m-0 col-8">{showProfile.province}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">City:</h2>
              <p className="m-0 col-8">{showProfile.city}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Barangay:</h2>
              <p className="m-0 col-8">{showProfile.barangay}</p>
            </div>

            <div className="row mt-4">
              <h2 className="h6 m-0 col">Street:</h2>
              <p className="m-0 col-8">{showProfile.street}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserManagement;
