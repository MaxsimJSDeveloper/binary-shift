// import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import css from "./UserLogoModal.module.css";
import { useEffect, useRef } from "react";
export default function UserLogoModal({ isOpen, onClose, children }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent} ref={modalRef}>
        {children}
      </div>
    </div>
  );
}
UserLogoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
