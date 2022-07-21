import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Profile from "./Components/Profile";
import SignUp from "./Components/Authentication/SignUp";
import SignIn from "./Components/Authentication/SignIn";
import HomePage from "./Components/HomePage";
import Header from "./Header";
import Posts from "./Components/Posts";
import Confirmation from "./Components/Authentication/Confirmation";
import MyAccount from "./Components/ProfileManagement/MyAccount";
import { Account } from "./Components/Authentication/Accounts";
import ProductForm from "./Components/ProductForm";

function App() {
  return (
    <div className="App">
      
      <Account>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/confirmation" element={<Confirmation />} />
<<<<<<< HEAD
          <Route path="/myaccount" element={<MyAccount />} />
=======
          <Route path="/addProduct" element={<ProductForm/>}/>
>>>>>>> main
        </Routes>
      </Account>
    </div>
  );
}

export default App;
