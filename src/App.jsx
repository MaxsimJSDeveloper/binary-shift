import { useState } from "react";
import "./App.css";
// import DailyNorma from "./components/DailyNorma/DailyNorma";
import Modal from "./components/Modal/Modal.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // <DailyNorma />
    <>
      <h1>Hello</h1>

      <button onClick={handleOpenModal}>Modal wrap</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Тут передайте те що вам треба</h2>
      </Modal>
    </>
  );
}

export default App;
