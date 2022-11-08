import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center">
        <BiErrorCircle size={96} />
        <h1 className="mt-4">Failed to load page</h1>
        <p className="mt-2">
          This page isn&apos;t loading correctly. Please check your login and
          try again.
        </p>
        <button className="btn btn-success mt-4" onClick={() => navigate(0)}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Error;
