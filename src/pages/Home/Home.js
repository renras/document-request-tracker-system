import {Link} from 'react-router-dom';
import SignedOutLayout from '../../components/Layouts/SignedOutLayout/SignedOutLayout';

const Home = () => {
  return (
    <SignedOutLayout>
      <div
        style={{ maxWidth: "80ch", marginTop: "10rem" }}
        className="w-100 text-center mx-auto"
      >
        <h1 className="text-light" style={{ fontSize: "60px" }}>
          The UPANG Document Tracking System
        </h1>

        <div className="d-flex justify-content-center gap-4 mt-5">
          <Link to="/documents" className="btn btn-light btn-lg fw-semibold">
            Request for a Document
          </Link>
          <Link
            to="/track-request"
            className="btn btn-outline-light btn-lg fw-semibold"
          >
            Track A Document
          </Link>
        </div>
      </div>
    </SignedOutLayout>
  )
};

export default Home;