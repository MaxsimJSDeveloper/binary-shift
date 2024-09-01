import { useNavigate } from "react-router-dom";
import css from "./WaterСonsumptionTracker.module.css";

const WaterConsumptionTracker = () => {
  const navigate = useNavigate(); // Хук для навигації по маршрутам

  // обрробка кліку по кнопці
  const handleButtonClick = () => {
    navigate("/signup"); // редірект
  };

  return (
    <div className={css.trackerContainer}>
      <h1>Water consumption tracker</h1>
      <p>Record daily water intake and track</p>
      <div className={css.trackerBenefits}>
        <h3>Tracker Benefits</h3>
        <ul>
          <li>
            <img src="path/to/icon1.png" /> Habit drive
          </li>
          <li>
            <img src="path/to/icon2.png" /> View statistics
          </li>
          <li>
            <img src="path/to/icon3.png" /> Personal rate setting
          </li>
        </ul>
      </div>
      <button className={css.tryTrackerBtn} onClick={handleButtonClick}>
        Try tracker
      </button>
    </div>
  );
};

export default WaterConsumptionTracker;
