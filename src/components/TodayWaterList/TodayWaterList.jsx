import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaterToday } from "../../redux/today/operations";
import { selectEntriesToday } from "../../redux/today/selectors";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const dailyWaterList = useSelector(selectEntriesToday);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };
  const deleteWaterModal = (entry) => {
    setWaterEntry(entry);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className={css.section}>
      <h2 className={css.heading}>Today</h2>
      <div className={css.listWrapper}>
        <ul className={css.list}>
          <li className={css.item}>
            <div className={css.waterOptions}>
              <svg width={36} height={36} className={css.icon}>
                <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
              </svg>
              <span className={css.waterAmount}>250 ml</span>
              <span className={css.waterTime}>09.00</span>
            </div>
            <div className={css.buttonsWrapper}>
              <button className={css.listButton}>
                <HiOutlinePencilSquare className={css.editIcon} />
              </button>
              <button className={css.listButton}>
                <HiOutlineTrash className={css.deleteIcon} />
              </button>
            </div>
          </li>
          <li className={css.item}>
            <div className={css.waterOptions}>
              <svg width={36} height={36} className={css.icon}>
                <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
              </svg>
              <span className={css.waterAmount}>300 ml</span>
              <span className={css.waterTime}>12.20</span>
            </div>
            <div className={css.buttonsWrapper}>
              <button className={css.listButton}>
                <HiOutlinePencilSquare className={css.editIcon} />
              </button>
              <button className={css.listButton}>
                <HiOutlineTrash className={css.deleteIcon} />
              </button>
            </div>
          </li>
          <li className={css.item}>
            <div className={css.waterOptions}>
              <svg width={36} height={36} className={css.icon}>
                <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
              </svg>
              <span className={css.waterAmount}>350 ml</span>
              <span className={css.waterTime}>14.30</span>
            </div>
            <div className={css.buttonsWrapper}>
              <button className={css.listButton}>
                <HiOutlinePencilSquare className={css.editIcon} />
              </button>
              <button className={css.listButton}>
                <HiOutlineTrash className={css.deleteIcon} />
              </button>
            </div>
          </li>
          <li className={css.item}>
            <div className={css.waterOptions}>
              <svg width={36} height={36} className={css.icon}>
                <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
              </svg>
              <span className={css.waterAmount}>150 ml</span>
              <span className={css.waterTime}>16.45</span>
            </div>
            <div className={css.buttonsWrapper}>
              <button className={css.listButton}>
                <HiOutlinePencilSquare className={css.editIcon} />
              </button>
              <button className={css.listButton}>
                <HiOutlineTrash className={css.deleteIcon} />
              </button>
            </div>
          </li>
          <li className={css.item}>
            <div className={css.waterOptions}>
              <svg width={36} height={36} className={css.icon}>
                <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
              </svg>
              <span className={css.waterAmount}>250 ml</span>
              <span className={css.waterTime}>18.30</span>
            </div>
            <div className={css.buttonsWrapper}>
              <button className={css.listButton}>
                <HiOutlinePencilSquare className={css.editIcon} />
              </button>
              <button className={css.listButton}>
                <HiOutlineTrash className={css.deleteIcon} />
              </button>
            </div>
          </li>
          {/* {dailyWaterList?.map(entry => (
                    <li key={entry._id}>
                        <p>{entry.volume} ml</p>
                        <p>{new Date(entry.date).toLocaleTimeString()}</p>
                        <button onClick={() => editWaterModal(entry)}>Edit</button>
                        <button onClick={() => deleteWaterModal(entry)}>Delete</button>
                    </li>
                ))} */}
        </ul>
        <button onClick={addWaterModal} className={css.addButton}>
          <FiPlus className={css.addButtonIcon} />
          Add water
        </button>
      </div>
    </div>
  );
};

export default TodayWaterList;
