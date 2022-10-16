import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <SignedOutLayout>
      <div
        style={{ maxWidth: "50ch", marginTop: "5rem" }}
        className="w-100 text-center mx-auto"
      >
        <h1 
          className="fw-bold"
          style={{
            fontSize:'60px', 
            fontFamily:'Raleway', 
            color: 'white', 
            marginTop:'13rem'}}
            >
            The UPANG Document Tracking System
        </h1>
    
        <div className="d-flex gap-3 mt-5">
          <Link 
            to="/documents" 
            className="btn btn-light btn-lg w-100"
            style={{ color: 'black'}}
            >
            Create A Document
          </Link>
          <Link
            to="/track-request"
            className="btn btn-outline-dark btn-lg w-100 border border-3"
            style={{ color: 'white'}}
          >
            Track A Document
          </Link>
        </div>
      </div>
    </SignedOutLayout>
  );
};

export default Home;
