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

import Modal from "../Modal/Modal";

import css from "./SettingModal.module.css";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

export default function SettingModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Setting Modal">
      <div className={css.setting_modal_main_container}>
        {/* <div className={css.logout_modal_wrapper}> */}
        <h2 className={css.setting_title}>Setting</h2>

        <UserSettingsForm onClose={onClose} />
        {/* </div> */}
      </div>
    </Modal>
  );
}
