import WhyDrinkWater from "../components/WhyDrinkWater/WhyDrinkWater";
import WaterConsumptionTracker from "../components/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx";

import css from "./MainPage.module.css";
import Header from "../components/Header/Header.jsx";

export default function MainPage() {
  return (
    <div className={css.background}>
      <Header />
      <div className={css.wrap}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
      </div>
    </div>
  );
}
