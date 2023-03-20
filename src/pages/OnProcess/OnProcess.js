import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import { auth } from "../../firebase-config";
import updateRequestType from "../../services/updateRequestType";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import Filters from "../../components/Filters/Filters";

const OnProcess = () => {
  const {
    data: incomingDocuments,
    loading,
    error,
  } = useFetchDocuments("ON PROCESS");
  const [user, userLoading, userError] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  if (loading || userLoading) return <Loader />;
  if (error || userError) return <Error />;

  const handleAcceptDocument = async (id, recipientId) => {
    try {
      await updateRequestType(
        id,
        "FOR RELEASE",
        user.uid,
        recipientId,
        "has accepted your request"
      );
    } catch (e) {
      console.error(e);
      alert("Failed to update document status. Please try again later.");
    }
  };

  console.log(startDate);

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">On Process</h1>
        <Filters
          search={search}
          onSearchChange={setSearch}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
        />
        <AdminDocumentsTable
          documents={incomingDocuments}
          onAccept={(id, recipientId) => handleAcceptDocument(id, recipientId)}
          statusName="For Release"
          user={user}
        />
      </div>
    </SignedInLayout>
  );
};

export default OnProcess;
