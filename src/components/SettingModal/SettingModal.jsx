// const handleSave = (event) => {
//     event.preventDefault();

//     if (newPassword !== repeatNewPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     if (!name || !email || !currentPassword) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Invalid email address.");
//       return;
//     }

//     dispatch(updateUser({ photo, gender, name, email, currentPassword, newPassword }))
//       .unwrap()
//       .then(() => {
//         toast.success("User information updated successfully.");
//         onClose();
//       .catch((error) => {
//         toast.error("Error updating user information: " + error.message);
//       });
//   };
import { Field, Formik } from "formik";
import Modal from "../Modal/Modal";
import css from "./SettingModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "#000000cd",
  },
};
export default function SettingModal({ isOpen, onClose, avatarUrl, initials }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
      <div className={css.containerSettings}>
        <div>
          <h2>Setting</h2>
        </div>
        <div>
          <p>Your photo</p>
          {avatarUrl ? (
            <img src={avatarUrl} alt="User Avatar" className={css.userAvatar} />
          ) : (
            <div className={css.lettersContainer}>
              <p className={css.letters}>{initials}</p>
            </div>
          )}
        </div>
        <Formik>
          <label htmlFor="">
            <Field />
          </label>
        </Formik>
      </div>
    </Modal>
  );
}
