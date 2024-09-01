import { useNavigate } from "react-router-dom";
import "./WaterСonsumptionTracker.module.css";

const WaterConsumptionTracker = () => {
  const navigate = useNavigate(); // Хук для навигації по маршрутам

  // обрробка кліку по кнопці
  const handleButtonClick = () => {
    navigate("/signup"); // редірект
  };

  return (
    <div className="tracker-container">
      <h1>Water consumption tracker</h1>
      <p>Record daily water intake and track</p>
      <div className="tracker-benefits">
        <h3>Tracker Benefits</h3>
        <ul>
          <li>
            <img src="path/to/icon1.png" alt="Habit drive icon" /> Habit drive
          </li>
          <li>
            <img src="path/to/icon2.png" alt="View statistics icon" /> View
            statistics
          </li>
          <li>
            <img src="path/to/icon3.png" alt="Personal rate setting icon" />{" "}
            Personal rate setting
          </li>
        </ul>
      </div>
      <button className="try-tracker-btn" onClick={handleButtonClick}>
        Try tracker
      </button>
    </div>
  );
};

export default WaterConsumptionTracker;
