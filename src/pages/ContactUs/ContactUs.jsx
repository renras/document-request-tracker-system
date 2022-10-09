import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore/lite";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "messages"), {
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
      <div className="container-sm">
        <form
          className="mw-sm  px-4 py-5 mt-5 mx-auto border rounded shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="h3">Contact us</h2>

          {/* name */}
          <label className="form-label mt-4" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            {...register("name", { required: true })}
          />

          {/* email */}
          <label className="form-label mt-3" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            {...register("email", { required: true })}
          />

          {/* message */}
          <label className="form-label mt-3" htmlFor="message">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="5"
            {...register("message", { required: true })}
          />

          <div className="d-flex mt-5">
            <button className="btn btn-dark ms-auto">Submit</button>
          </div>
        </form>
      </div>
    </SignedOutLayout>
  );
};

export default ContactUs;
