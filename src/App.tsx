import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Profile from "./Pages/Profile";
import Registration from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="registration" element={<Registration />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signin" element={<SignIn/>} />
      </Routes>
    </div>
  );
}

export default App;
