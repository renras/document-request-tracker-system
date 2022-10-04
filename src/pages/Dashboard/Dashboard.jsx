import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      signOut(auth);
    } catch {
      alert("Failed to sign out user. Please try again later.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1 className="h2">Welcome {email}!</h1>
      <p className="mt-4">I&apos;m sorry but this page is not yet ready!</p>
      <button className="btn btn-dark mt-5" onClick={handleSignOut}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
