import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal.jsx";
import TodayWaterList from "./components/TodayListModal/TodayListModal.jsx";

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
      <h1>Hello</h1>

      <button onClick={handleOpenModal}>Modal wrap</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* <div
          style={{
            width: 424,
            height: 296,
          }}
        >
          <p>Тут передайте те що вам треба</p>
        </div> */}
        <TodayWaterList onClose={handleCloseModal} />
      </Modal>
    </>
  );
}

export default App;
