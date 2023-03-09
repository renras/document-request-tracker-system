import {
  doc,
  updateDoc,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";

const updateDocumentType = async (
  id,
  type,
  senderId,
  recipientId,
  body,
  claimingDate
) => {
  try {
    const docRef = doc(db, "documents", id);
    await updateDoc(docRef, {
      status: type,
      claimingDate: claimingDate ? claimingDate : null,
    });

    await addDoc(collection(db, "notifications"), {
      type: "REQUEST_UPDATE",
      body: body,
      senderId: senderId,
      recipientId: recipientId,
      clickAction: "/documents",
      isRead: false,
      createdAt: Timestamp.now(),
    });
  } catch (e) {
    console.error(e);
    alert("Failed to update document status. Please try again later.");
  }
};

export default updateDocumentType;
