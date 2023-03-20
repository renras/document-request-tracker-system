import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { db } from "../../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { AiFillEye } from "react-icons/ai";

const UserManagement = () => {
  const [profiles, profilesLoading, profilesError] = useCollectionData(
    collection(db, "users")
  );

  if (profilesLoading) return <Loader />;
  if (profilesError) return <Error />;

  const profilesSortedByRoles = profiles.sort((a, b) => {
    if (a.role === "ADMIN") return -1;
    if (b.role === "MEMBER") return 1;
    return 0;
  });
  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">User Management</h1>
        <table className="table mt-5 align-middle">
          <thead>
            <tr className="table-success">
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {profilesSortedByRoles.map((profile) => (
              <tr key={profile.id}>
                <td>{`${profile.lastName}, ${profile.firstName} ${profile.middleName[0]}.`}</td>
                <td>{profile.email}</td>
                <td>{profile.role}</td>
                <td>
                  <button className="btn btn-light">
                    <AiFillEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default UserManagement;
