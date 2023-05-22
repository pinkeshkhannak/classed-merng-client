import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./Utils/AuthRoute";
import SinglePost from "./components/pages/SinglePost";

import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <AuthProvider>
      <Container>
        <BrowserRouter>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/posts/:postId" element={<SinglePost />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
