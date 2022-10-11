import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";

const Documents = () => {
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

  console.log(email)

  return (
    <SignedInLayout>
      <div>Hello World</div>
    </SignedInLayout>
  );
};

export default Documents;
