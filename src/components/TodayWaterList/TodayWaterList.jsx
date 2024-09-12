import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import css from "./TodayWaterList.module.css";
import EditTodayListModal from "../EditTodayListModal/EditTodayListModal";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import Modal from "../Modal/Modal";
import TodayListModal from "../TodayListModal/TodayListModal";
import {updateWater} from "../../redux/water/operations";
import { getWaterToday } from "../../redux/today/operations";
import { selectEntriesToday, selectIsLoading, selectError } from "../../redux/today/selectors";
import Loader from "../Loader/Loader";

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const dailyWaterList = useSelector(selectEntriesToday);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [waterEntry, setWaterEntry] = useState(null);

  

  useEffect(() => {
    dispatch(getWaterToday());   
  }, [dispatch]);

  const addWaterModal = () => {
    setWaterEntry(null);
    setIsModalOpen(true);
  };

  const editWaterModal = (entry) => {
    setWaterEntry(entry);
    setIsEditModalOpen(true);
  };

  const deleteWaterModal = (entry) => {
    setWaterEntry(entry);
    setIsDeleteModalOpen(true);
  };

if (isModalOpen||isEditModalOpen||isDeleteModalOpen) {
  document.body.style.overflow="hidden"
  }
  if (!isModalOpen&&!isEditModalOpen&&!isDeleteModalOpen) {
  document.body.style.overflow="auto"
}
  

  return (
    <div className={css.section}>
      <h2 className={css.heading}>Today</h2>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      <div className={css.listWrapper}>
        <ul className={css.list}>
          {Array.isArray(dailyWaterList) && dailyWaterList.length === 0 ? (
            <p className={css.listMessage}>No notes yet</p>
          ) : (
            dailyWaterList.map(entry => (
              <li key={entry._id} className={css.item}>
                <div className={css.waterOptions}>
                  <svg width={36} height={36} className={css.icon}>
                    <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
                  </svg>
                  <span className={css.waterAmount}>{entry.volume} ml</span>
                  <span className={css.waterTime}>
                    {new Date(entry.date).toLocaleTimeString('uk-UA',{hour:'2-digit',minute:'2-digit'})}
                  </span>
                </div>
                <div className={css.buttonsWrapper}>
                  <button
                    onClick={() => editWaterModal(entry)}
                    className={css.listButton}
                  >
                    <HiOutlinePencilSquare className={css.editIcon} />
                  </button>
                  <button
                    onClick={() => deleteWaterModal(entry)}
                    className={css.listButton}
                  >
                    <HiOutlineTrash className={css.deleteIcon} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <button onClick={addWaterModal} className={css.addButton}>
          <FiPlus className={css.addButtonIcon} />
          Add water
        </button>
      </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TodayListModal
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditTodayListModal
        onUpdate={updateWater}
        onClose={() => setIsEditModalOpen(false)}
        id={waterEntry?._id}
        time={new Date(waterEntry.date).toLocaleTimeString('uk-UA',{hour:'2-digit',minute:'2-digit'})}
        amountWater={waterEntry?.volume}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DeleteEntryModal
        onClose={() => setIsDeleteModalOpen(false)}
        id={waterEntry?._id}
          />
        </Modal>
      )}
    </div>
  );
};

export default TodayWaterList;
