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

      <button onClick={handleOpenModal}>Modal wrap</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            width: 424,
            height: 296,
          }}
        >
          <p>Тут передайте те що вам треба</p>
        </div>
      </Modal>
    </>
  );
}

export default App;
