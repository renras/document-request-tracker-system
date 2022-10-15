import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";

const Track_Document = () => {
  return (
    <SignedInLayout>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="h2">Welcome to Track Documents</h1>
        <p className="mt-4">I&apos;m sorry but this page is not yet ready!</p>
      </div>
    </SignedInLayout>
  );
};

export default Track_Document;
