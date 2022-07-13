import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import HomePage from "./Pages/HomePage";
import Header from "./Header";
import Posts from "./Pages/Posts";
import Confirmation from "./Pages/Confirmation";
import ProductForm from "./Pages/ProductForm";

function App() {
  return (
    <div className="App">
      <Header/>
     <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signin" element={<SignIn/>} />
        <Route path="posts" element={<Posts/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
        <Route path="/addProduct" element={<ProductForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
