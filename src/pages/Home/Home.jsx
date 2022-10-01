import { AiFillFacebook } from "react-icons/ai";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <AiFillFacebook size={30} color="blue" />
        <button className="btn btn-primary">Home</button>
      </div>
    </div>
  );
};

export default Home;
