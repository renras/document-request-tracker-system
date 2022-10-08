import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <SignedOutLayout>
      <div
        style={{ maxWidth: "50ch", marginTop: "5rem" }}
        className="w-100 text-center mx-auto"
      >
        <h1>The UPANG Document Tracking System</h1>
        <p className="mt-4">
          The Document Tracking System (DTS) of the University of Pangasinan is
          an information system capable of tracking the paper trail of documents
          created within UP offices.
        </p>
        <div className="d-flex gap-3 mt-5">
          <Link to="/documents" className="btn btn-dark btn-lg w-100">
            Create A Document
          </Link>
          <Link
            to="/track-request"
            className="btn btn-outline-dark btn-lg w-100"
          >
            Track A Document
          </Link>
        </div>
      </div>
    </SignedOutLayout>
  );
};

export default Home;
