import { IoMdClose } from "react-icons/io";
import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <IoMdClose className={css.icon} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
