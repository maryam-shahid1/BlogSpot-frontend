import { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditProfile from "./pages/EditProfile";
import PostDetail from "./pages/PostDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8080",
});

function App() {
  const { access_token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" />
            <Route
              path="/sign-in"
              element={
                !user ? (
                  <Login client={client} />
                ) : (
                  <Navigate to="/blogspot"></Navigate>
                )
              }
            />
            <Route path="/sign-up" element={<Signup client={client} />} />
            <Route path="/blogspot" element={<Home />}></Route>
            <Route path="/create" element={<CreatePost />}></Route>
            <Route path="/settings" element={<EditProfile />}></Route>
            <Route path="blogspot/post/:id" element={<PostDetail />}></Route>
            <Route path="profile/post/:id" element={<PostDetail />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
