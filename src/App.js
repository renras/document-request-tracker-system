import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Documents from "./pages/Documents/Documents";
import SignedOutTrackRequest from "./pages/SignedOutTrackRequest/SignedOutTrackRequest";
import ContactUs from "./pages/ContactUs/ContactUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="documents" element={<Documents />} />
      <Route path="track-request" element={<SignedOutTrackRequest />} />
      <Route path="contact-us" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
