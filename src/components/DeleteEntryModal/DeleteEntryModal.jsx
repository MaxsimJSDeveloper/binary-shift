// При вызове компонента передать пропс onClose и id

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import css from "./DeleteEntryModal.module.css";
import { deleteWater } from "../../redux/water/operations";
import { getWaterToday } from "../../redux/today/operations";
import { fetchMonthWater } from "../../redux/month/operations";
import { selectIsLoading } from "../../redux/today/selectors";
import Loader from "../Loader/Loader";


const notifySuccess = () => toast.success("Successfully deleted!");
const notifyError = () => toast.error("Oops, something went wrong");

export default function DeleteEntryModal({ onClose, id }) {
  const dispatch = useDispatch();
  const month = new Date().toLocaleString('en-Us', { month: 'long' });
  const year = new Date().getFullYear();
  const isLoading = useSelector(selectIsLoading);


  function handleDelete() {
    dispatch(deleteWater(id))
      .unwrap()
      .then(() => {
        notifySuccess();
        dispatch(getWaterToday());
        dispatch(fetchMonthWater({ month, year }));
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
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
