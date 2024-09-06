// Замість значення 1.5 повинно повиртатися значення dailyNorma

import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import css from "../DailyNorma/DailyNorma.module.css";

export default function DailyNorma({
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
}) {
  return (
    <div className={css.dailyform}>
      <span className={css.dailytitle}>My daily norma</span>
      <div className={css.datadaily}>
        <span className={css.water}>1.5 L</span>
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
