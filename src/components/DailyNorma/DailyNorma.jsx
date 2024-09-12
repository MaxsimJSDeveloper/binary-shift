import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import {
  fetchWaterRate,
  putWaterRate,
} from "../../redux/waterRate/operations.js";
import css from "../DailyNorma/DailyNorma.module.css";
import Loader from "../Loader/Loader.jsx";
import { fetchMonthWater } from "../../redux/month/operations.js";
import { getWaterToday } from "../../redux/today/operations.js";

export default function DailyNorma() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialNorma, setInitialNorma] = useState(null);
  const dispatch = useDispatch();
  const dailyNorma = useSelector((state) => state.waterRate.data);
  const isLoading = useSelector((state) => state.waterRate.isLoading);
  const month = new Date().toLocaleString('en-Us', { month: 'long' });
  const year = new Date().getFullYear();

  useEffect(() => {
    dispatch(fetchWaterRate());
  }, [dispatch]);

  useEffect(() => {
    if (dailyNorma !== null) {
      setInitialNorma((dailyNorma / 1000).toFixed(1));
    }
  }, [dailyNorma]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (newDailyNorma) => {
    dispatch(putWaterRate({ dailyNorma: newDailyNorma * 1000 }));
    dispatch(fetchMonthWater({ month, year }))
    dispatch(getWaterToday())
    setIsModalOpen(false);
  };
if (isModalOpen) {
  document.body.style.overflow="hidden"
  }
  if (!isModalOpen) {
  document.body.style.overflow="auto"
}
  return (
    <div className={css.dailyform}>
      <span className={css.dailytitle}>My daily norma</span>
      <div className={css.datadaily}>
        <span className={css.water}>
          {isLoading ? <Loader /> : `${initialNorma} L`}
        </span>
        <button className={css.waterbutton} onClick={handleOpenModal}>
          Edit
        </button>
        {isModalOpen && (
          <div className={css.modalOverlay}>
            <div className={css.modalContent}>
              {isLoading && <Loader />}
              <DailyNormaModal
                closeModal={handleCloseModal}
                onSave={handleSave}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
