import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Profile from "./components/Profile/Profile";
import Registration from "./components/Registration/Registration";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="registration" element={<Registration />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
