import { useEffect, useState } from "react";

import css from "../TodayListModal/TodayListModal.module.css";
import AddWaterForm from "../AddWaterForm/AddWaterForm";

function TodayListModal({ onClose }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours());
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    setTime(currentTime);
  }, []);

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Add water</h2>
      <p className={css.text}>Choose a value:</p>
      <AddWaterForm onClose={onClose} currentTime={time} />
    </div>
  );
}

export default TodayListModal;
