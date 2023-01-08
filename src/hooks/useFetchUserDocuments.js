import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { format } from "date-fns";

const useFetchUserDocuments = (user) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const documentsRef = collection(db, "documents");
        const q = query(documentsRef, where("authorId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: format(doc.data().createdAt.toDate(), "MMMM dd, yyyy"),
        }));
        setData(documents);
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

export default useFetchUserDocuments;

useFetchUserDocuments.propTypes = {
  user: PropTypes.any,
};
