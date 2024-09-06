import React, { useState } from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import css from "../DailyNorma/DailyNorma.module.css";

export default function DailyNorma() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.dailyform}>
      <span className={css.dailytitle}>My daily norma</span>
      <div className={css.datadaily}>
        <span className={css.water}>1.5 L</span> {/* Тут треба замінити значення на dailyNorma */}
        <button className={css.waterbutton} onClick={handleOpenModal}>
          Edit
        </button>
        {isModalOpen && (
          <div className={css.modalOverlay}>
            <div className={css.modalContent}>
              <DailyNormaModal closeModal={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
