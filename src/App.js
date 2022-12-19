import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Documents from "./pages/Documents/Documents";
import SignedOutTrackRequest from "./pages/SignedOutTrackRequest/SignedOutTrackRequest";
import ContactUs from "./pages/ContactUs/ContactUs";
import Incoming from "./pages/Incoming/Incoming";
import Hold from "./pages/Hold/Hold";
import OnProcess from "./pages/OnProcess/OnProcess";
import Released from "./pages/Released/Released";
import ForRelease from "./pages/ForRelease/ForRelease";
import TrackDocument from "./pages/TrackDocument/TrackDocument";
import TransactionManagement from "./pages/TransactionManagement/TransactionManagement";
import Profile from "./pages/Profile/Profile";
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
      <Route path="incoming" element={<Incoming />} />
      <Route path="on-process" element={<OnProcess />} />
      <Route path="hold" element={<Hold />} />
      <Route path="released" element={<Released />} />
      <Route path="track-document" element={<TrackDocument />} />
      <Route path="transaction-management" element={<TransactionManagement />} />
      <Route path="profile" element={<Profile />} />
      <Route path="for-release" element={<ForRelease />} />
      <Route path="reset" element={<Reset />} />
    </Routes>
  );
}

export default App;
