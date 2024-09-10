import Modal from "../Modal/Modal";
import css from "./SettingModal.module.css";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

export default function SettingModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Setting Modal">
      <div className={css.setting_modal_main_container}>
        <UserSettingsForm onClose={onClose} />
      </div>
    </Modal>
  );
}
