import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import { auth } from "../../firebase-config";
import updateRequestType from "../../services/updateRequestType";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../../components/v2/Modal/Modal";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Timestamp } from "@firebase/firestore";
import emailjs from "@emailjs/browser";

const ForRelease = () => {
  const {
    data: forReleaseDocuments,
    loading,
    error,
  } = useFetchDocuments("FOR RELEASE");
  const [user, userLoading, userError] = useAuthState(auth);
  const [documentForRelease, setDocumentForRelease] = useState(null);
  const { register, handleSubmit } = useForm();
  const [documentToReject, setDocumentToReject] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const {
    register: rejectModalRegister,
    handleSubmit: rejectModalHandleSubmit,
  } = useForm();
  const formRef = useRef(null);

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

      setDocumentForRelease(null); // close the modal
    } catch (e) {
      console.error(e);
      alert("Failed to release document. Please try again later.");
    }
  };

  const handleRejectDocument = (id, recipientId) => {
    setDocumentToReject({ id, recipientId });
    setShowRejectModal(true);
  };

  const handleRejectConfirmation = async () => {
    try {
      await updateRequestType(
        documentToReject.id,
        "REJECTED",
        user.uid,
        documentToReject.recipientId,
        "has rejected your request"
      );

      await emailjs.sendForm(
        "service_fs7z2n6",
        "template_d92oyze",
        formRef.current,
        "nwbcoDLTBTvMU-vIp"
      );

      setShowRejectModal(false);
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
          onReject={handleRejectDocument}
          statusName="Release"
        />
      </div>

      {/* reject document  modal */}
      <Modal isOpen={showRejectModal}>
        <div className="modal-header">
          <h5 className="modal-title">Confirm Reject</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setShowRejectModal(false)}
          ></button>
        </div>
        <form
          ref={formRef}
          onSubmit={rejectModalHandleSubmit(handleRejectConfirmation)}
        >
          <div className="modal-body">
            <p>Are you sure you want to reject this request?</p>
            <input
              {...register("requestor_email")}
              defaultValue={user.email}
              hidden
            />
            <textarea
              className="form-control"
              aria-label="reason for rejection"
              rows="5"
              placeholder="Enter the reason here"
              {...rejectModalRegister("reason", { required: true })}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger">Reject</button>
          </div>
        </form>
      </Modal>

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
