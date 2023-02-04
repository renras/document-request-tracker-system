import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";

const Dashboard = () => {
  const columns = ["Type", "Count"];

  return (
    <SignedInLayout>
      <div className="px-5">
        <h1 className="h2">Dashboard</h1>
        <table className="table mt-5">
          <thead>
            <tr className="table-success">
              {columns.map((column, index) => (
                <th scope="col" key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">Requested Documents</td>
              <td className="align-middle">0</td>
            </tr>
            <tr>
              <td className="align-middle">On Processing Documents</td>
              <td className="align-middle">0</td>
            </tr>
            <tr>
              <td className="align-middle">Released Documents</td>
              <td className="align-middle">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default Dashboard;
