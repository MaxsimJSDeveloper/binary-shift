import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import Modal from "../Modal/Modal";

import css from "./UserLogoutModal.module.css";

export default function UserLogOutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
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
        <h3 className={css.logout_confirm}> Do you really want to leave?</h3>

        <div className={css.button_container}>
          <button className={css.logout_btn} onClick={handleLogOut}>
            Log out
          </button>

          <button className={css.cancel_btn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

// в auth - operations.js

// export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     await axios.post('/users/logout');
//     clearAuthHeader();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// в extraReducers: builder => {
// builder.addCase(logOut.fulfilled, state => {
//   state.user = { name: null, email: null };
//   state.token = null;
//   state.isLoggedIn = false;
// });
