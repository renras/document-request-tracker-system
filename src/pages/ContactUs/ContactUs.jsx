import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore/lite";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "contactdata"), {
        name: data.name,
        email: data.email,
        message: data.message,
      });
      alert("Message sent successfully");
    } catch {
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <SignedOutLayout>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="container mt-5">
          <h2 className="mb-3"> ContactUs</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                {...register("message", { required: true })}
              />
            </div>
            <button  className="btn btn-primary btn-lg">Submit</button>
          </form>
        </div>
      </div>
    </SignedOutLayout>
  );
};

export default ContactUs;
