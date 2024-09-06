import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  const [mouseDownOnOverlay, setMouseDownOnOverlay] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      setMouseDownOnOverlay(true);
    }
  };

  const handleMouseUp = () => {
    if (mouseDownOnOverlay) {
      onClose();
    }
    setMouseDownOnOverlay(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={css.modalOverlay}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
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
