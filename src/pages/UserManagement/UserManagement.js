import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";

const UserManagement = () => {
  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">User Management</h1>
        <table className="table mt-5 align-middle">
          <thead>
            <tr className="table-success">
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default UserManagement;
