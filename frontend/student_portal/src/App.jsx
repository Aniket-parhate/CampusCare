import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import CreateComplaint from "./pages/CreateComplaint.jsx";
import Profile from "./pages/Profile";
 import MyComplaints from "./pages/MyComplaints";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/complaints/create"
        element={<CreateComplaint />}
      />
      <Route path="/profile" element={<Profile />} />
     <Route path="/complaints" element={<MyComplaints />} />
    </Routes>
  );
};

export default App;