import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { collection, query, doc, getDoc, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase-config";

const useFetchDocuments = (status) => {
  const documentsRef = collection(db, "documents");
  const q = status ? query(documentsRef, where("status", "==", status)) : null;
  const [documentsData] = useCollection(q || documentsRef);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!documentsData) return;

    let ignore = true;

    (async () => {
      try {
        const newDocuments = await Promise.all(
          documentsData.docs.map(async (document) => {
            const docRef = doc(db, "users", document.data().authorId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return {
                id: document.id,
                ...document.data(),
                author: docSnap.data(),
              };
            } else {
              return {
                id: document.id,
                ...document.data(),
                author: null,
              };
            }
          })
        );

        ignore && setData(newDocuments);
      } catch (e) {
        console.error(e);
        ignore && setError("Failed to fetch authors in documents");
      } finally {
        ignore && setLoading(false);
      }
    })();

    return () => {
      ignore = false;
    };
  }, [documentsData]);

  return { data, loading, error };
};

export default useFetchDocuments;

useFetchDocuments.propTypes = {
  status: PropTypes.string,
};
