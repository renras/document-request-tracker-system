import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Dashboard = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        console.log("User is not signed in");
      }
    });

    return () => unsubscribe();
  }, []);

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
      <button className="btn btn-dark mt-5" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
