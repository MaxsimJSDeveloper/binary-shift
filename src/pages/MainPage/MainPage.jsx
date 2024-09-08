import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater.jsx";
import WaterConsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx";

import css from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={css.background}>
      <div className={css.wrap}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
      </div>
    </div>
  );
}
