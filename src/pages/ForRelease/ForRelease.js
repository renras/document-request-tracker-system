import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import { auth } from "../../firebase-config";
import updateRequestType from "../../services/updateRequestType";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../../components/v2/Modal/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Timestamp } from "@firebase/firestore";

const ForRelease = () => {
  const {
    data: forReleaseDocuments,
    loading,
    error,
  } = useFetchDocuments("FOR RELEASE");
  const [user, userLoading, userError] = useAuthState(auth);

  const [documentForRelease, setDocumentForRelease] = useState(null);
  const { register, handleSubmit } = useForm();

  if (loading || userLoading) return <Loader />;
  if (error || userError) return <Error />;

  const onSubmit = async (data) => {
    if (!data.claimingDate) {
      alert("Please enter a date");
      return;
    }

    const newDate = Timestamp.fromDate(new Date(data.claimingDate)).toDate();

    try {
      await updateRequestType(
        documentForRelease.id,
        "RELEASED",
        user.uid,
        documentForRelease.recipientId,
        "has released your request",
        newDate
      );
    } catch (e) {
      console.error(e);
      alert("Failed to release document. Please try again later.");
    }
  };

  const handleRejectDocument = async (id, recipientId) => {
    try {
      await updateRequestType(
        id,
        "REJECTED",
        user.uid,
        recipientId,
        "has rejected your request"
      );
    } catch (e) {
      console.error(e);
      alert("Failed to reject document. Please try again later.");
    }
  };

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">For Release</h1>
        <AdminDocumentsTable
          documents={forReleaseDocuments}
          onAccept={(id, recipientId) =>
            setDocumentForRelease({ id, recipientId })
          }
          onReject={(id, recipientId) => handleRejectDocument(id, recipientId)}
          statusName="Release"
        />
      </div>

      {/* relase document  modal */}
      <Modal isOpen={!!documentForRelease}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-header">
            <h5 className="modal-title">Release Document</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setDocumentForRelease(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p id="claiming-date-input-description">
              Please enter the date on which the document will be available for
              the requestor to claim
            </p>
            <input
              type="date"
              className="form-control"
              id="claiming date"
              aria-describedby="claiming-date-input-description"
              {...register("claimingDate")}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setDocumentForRelease(null)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Release Document
            </button>
          </div>
        </form>
      </Modal>
    </SignedInLayout>
  );
};

export default ForRelease;
