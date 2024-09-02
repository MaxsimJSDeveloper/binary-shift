import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal.jsx";
import MainPage from "./pages/MainPage.jsx";

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
      <MainPage />
    </>
  );
}

export default App;
