import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Documents from "./pages/Documents/Documents";
import SignedOutTrackRequest from "./pages/SignedOutTrackRequest/SignedOutTrackRequest";
import ContactUs from "./pages/ContactUs/ContactUs";
import OnProcess from "./pages/OnProcess/OnProcess";
import ForRelease from "./pages/ForRelease/ForRelease";
import Released from "./pages/Released/Released";
import TrackDocument from "./pages/TrackDocument/TrackDocument";
import Reset from "./pages/Reset/Reset";
import "react-chatbot-kit/build/main.css";
import "./chatbot/chatbot.css";
import Reports from "./pages/Reports/Reports";
import Dashboard from "./pages/Dashboard/Dashboard";
import Rejected from "./pages/Rejected/Rejected";
import Profile from "./pages/Profile/Profile";
import UserManagement from "./pages/UserManagement/UserManagement";

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
      <Route path="for-release" element={<ForRelease />} />
      <Route path="released" element={<Released />} />
      <Route path="reports" element={<Reports />} />
      <Route path="track-document" element={<TrackDocument />} />
      <Route path="reset" element={<Reset />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="rejected" element={<Rejected />} />
      <Route path="profile" element={<Profile />} />
      <Route path="user-management" element={<UserManagement />} />
    </Routes>
  );
}

export default App;
