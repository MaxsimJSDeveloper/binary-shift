import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import css from "./UserLogoutModal.module.css";
import { selectIsLoading } from "../../redux/users/selectors.js";
import Loader from "../Loader/Loader.jsx";

export default function UserLogOutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/signin");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      shouldCloseOnEsc={true}
      contentLabel="LogOut Modal"
    >
      <div className={css.logout_modal_main_container}>
        <h2 className={css.log_out_title}>Log out</h2>
        <p className={css.logout_confirm}> Do you really want to leave?</p>

        <div className={css.button_container}>
          <button className={css.logout_btn} onClick={handleLogOut}>
            Log out
          </button>

          <button className={css.cancel_btn} onClick={onClose}>
            Cancel
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </Modal>
  );
}
