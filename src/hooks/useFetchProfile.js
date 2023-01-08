import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const useFetchProfile = (user) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (e) {
        console.error(e);
        setError("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return { loading, error, data };
};

export default useFetchProfile;

useFetchProfile.propTypes = {
  user: PropTypes.any,
};
