// При вызове компонента передать пропс onClose и id

import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import css from "./DeleteEntryModal.module.css";
import { deleteWater } from "../../redux/water/operations";

const notifySuccess = () => toast.success("Successfully deleted!");
const notifyError = () => toast.error("Oops, something went wrong");

export default function DeleteEntryModal({ onClose, id }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteWater(id))
      .unwrap()
      .then(() => {
        notifySuccess();
        setTimeout(onClose, 2000);
      })
      .catch(() => {
        notifyError();
      });
  }
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Delete entry</h2>
      <p className={css.text}>Are you sure you want to delete the entry?</p>
      <div className={css.btnwrapper}>
        <button className={css.deletebtn} type="submit" onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelbtn} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
      <Toaster
        containerStyle={{
          top: 100,
        }}
      />
    </div>
  );
}
