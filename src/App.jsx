import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Modal from "./components/Modal/Modal.jsx";
import MainPage from "./pages/MainPage";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
