import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "messages"), data);
      alert("Message sent successfully");
      navigate(0);
    } catch {
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <SignedOutLayout>
      <div className="container-sm">
        <form
          className="mw-sm  px-4 py-5 mt-5 mx-auto border rounded shadow-sm bg-light"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="h3 ">Contact us</h2>

          {/* add first name and last name */}
          <div className="row">
            <div className="col">
              <label className="form-label mt-3" htmlFor="firstname">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                id="firstname"
                {...register("fistname", { required: true })}
              />
            </div>
            <div className="col">
              <label className="form-label mt-3" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="form-control"
                type="text"
                id="lastname"
                {...register("lastname", { required: true })}
              />
            </div>
          </div>

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

          {/* Title */}
          <label className="form-label mt-3" htmlFor="topic">
            Topic
          </label>
          <input
            className="form-control"
            id="topic"
            {...register("topic", { required: true })}
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
            <button className="btn btn-success ms-auto">Submit</button>
          </div>
        </form>
      </div>
    </SignedOutLayout>
  );
};

export default ContactUs;
