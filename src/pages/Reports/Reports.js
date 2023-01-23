import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import Dropdown from "../../components/ui/Dropdown/Dropdown";
import { useState } from "react";
import { DOCUMENT_TYPES } from "../Documents/CreateDocumentModal/documentTypes";

const Reports = () => {
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0]);

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Reports</h1>
        <div className="mt-5 position-relative" style={{ maxWidth: "256px" }}>
          <Dropdown
            id="document-type"
            value={documentType}
            options={DOCUMENT_TYPES}
            onChange={(option) => setDocumentType(option)}
          />
        </div>
      </div>
    </SignedInLayout>
  );
};

export default Reports;
