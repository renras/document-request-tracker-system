import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Documents from "./pages/Documents/Documents";
import SignedOutTrackRequest from "./pages/SignedOutTrackRequest/SignedOutTrackRequest";
import ContactUs from "./pages/ContactUs/ContactUs";
import OnProcess from "./pages/OnProcess/OnProcess";
import ForRelease from "./pages/ForRelease/ForRelease";
// import Received from "./pages/Received/Received";
import Released from "./pages/Released/Released";
// import Returned from "./pages/Returned/Returned";
import TrackDocument from "./pages/TrackDocument/TrackDocument";
// import Profile from "./pages/Profile/Profile";
import Reset from "./pages/Reset/Reset";
import "react-chatbot-kit/build/main.css";
import "./chatbot/chatbot.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="documents" element={<Documents />} />
      <Route path="track-request" element={<SignedOutTrackRequest />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="on-process" element={<OnProcess />} />
      {/* <Route path="received" element={<Received />} /> */}
      <Route path="for-release" element={<ForRelease />} />
      <Route path="released" element={<Released />} />
      <Route path="track-document" element={<TrackDocument />} />
      {/* <Route path="profile" element={<Profile />} /> */}
      {/* <Route path="returned" element={<Returned />} /> */}
      <Route path="reset" element={<Reset />} />
    </Routes>
  );
}

export default App;
