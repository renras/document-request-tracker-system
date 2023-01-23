import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { BsSearch } from "react-icons/bs";

const Reports = () => {
  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Reports</h1>
        <div className="mt-5 position-relative" style={{ maxWidth: "384px " }}>
          <input type="text" className="form-control" />

          <BsSearch
            className="position-absolute  top-50 translate-middle-y text-black-50"
            style={{ right: "1rem" }}
          />
        </div>
      </div>
    </SignedInLayout>
  );
};

export default Reports;
