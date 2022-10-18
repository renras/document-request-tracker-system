import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "messages"), {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        topic: data.topic,
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

          {/* Title */}
          <div className="row">
            <div className="col">
              <label className="form-label mt-3" htmlFor="topic">
                Topic
              </label>
              <select
                className="form-select"
                id="topic"
                {...register("topic", { required: true })}
              >
                <option value="#">Choose one from the selection</option>
                <option value="Schools and Courses">Schools & Courses</option>
                <option value="Tuition Fees & Payment Options">
                  Tuition Fees & Payment Options
                </option>
                <option value="Scholarship Programs">
                  Scholarship Programs
                </option>
                <option value="Board Exam Performance">
                  Board Exam Performance
                </option>
                <option value="Employability Rates">Employability Rates</option>
              </select>
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
            <button className="btn btn-primary ms-auto">Submit</button>
          </div>
        </form>
      </div>
    </SignedOutLayout>
  );
};

export default ContactUs;
