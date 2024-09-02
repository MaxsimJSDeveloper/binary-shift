import WhyDrinkWater from "../components/WhyDrinkWater/WhyDrinkWater";
import WaterConsumptionTracker from "../components/WaterСonsumptionTracker/WaterСonsumptionTracker";

import css from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={css.background}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
}
