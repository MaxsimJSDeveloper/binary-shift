import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import css from "./TodayWaterList.module.css";
import EditTodayListModal from "../EditTodayListModal/EditTodayListModal";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import Modal from "../Modal/Modal";
import TodayListModal from "../TodayListModal/TodayListModal";
import {
  addWater,
  updateWater,
  deleteWater,
} from "../../redux/water/operations";
import { getWaterToday } from "../../redux/today/operations";
import { selectEntriesToday, selectIsLoading, selectError } from "../../redux/today/selectors";

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const dailyWaterList = useSelector(selectEntriesToday);
  console.log("Список води на сьогодні:", dailyWaterList);
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

  const handleAddWater = async (newWater) => {
    try {
      const result = await dispatch(addWater(newWater)).unwrap();
      console.log("Add Water Result:", result);
      dispatch(getWaterToday()); 
    } catch (err) {
      console.error("Failed to add water:", err);
    }
  };
  
  const handleUpdateWater = async (updatedWater) => {
    try {
      const result = await dispatch(updateWater(updatedWater)).unwrap();
      console.log("Update Water Result:", result);
      dispatch(getWaterToday()); 
    } catch (err) {
      console.error("Failed to update water:", err);
    }
  };
  
  const handleDeleteWater = async (id) => {
    try {
      const result = await dispatch(deleteWater(id)).unwrap();
      console.log("Delete Water Result:", result);
      dispatch(getWaterToday()); 
    } catch (err) {
      console.error("Failed to delete water:", err);
    }
  };

  return (
    <div className={css.section}>
      <h2 className={css.heading}>Today</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className={css.listWrapper}>
        <ul className={css.list}>
          {Array.isArray(dailyWaterList) && dailyWaterList.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            dailyWaterList.map(entry => (
              <li key={entry._id} className={css.item}>
                <div className={css.waterOptions}>
                  <svg width={36} height={36} className={css.icon}>
                    <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
                  </svg>
                  <span className={css.waterAmount}>{entry.volume} ml</span>
                  <span className={css.waterTime}>
                    {new Date(entry.date).toLocaleTimeString()}
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
            onAddWater={handleAddWater}
          />
        </Modal>
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <EditTodayListModal
            onUpdate={handleUpdateWater}
            onClose={() => setIsEditModalOpen(false)}
            id={waterEntry?.id}
            time={waterEntry?.time}
            amountWater={waterEntry?.amountWater}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <DeleteEntryModal
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => handleDeleteWater(waterEntry?.id)}
          />
        </Modal>
      )}
    </div>
  );
};

export default TodayWaterList;
