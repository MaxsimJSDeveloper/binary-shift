import css from "./WaterСonsumptionTracker.module.css";
import sprite from "../../img/symbol-defs.svg";

export default function WaterConsumptionTracker() {
  return (
    <div className={(css.component, css.background)}>
      <h1 className={css.header}>Water consumption tracker</h1>
      <h3 className={css.secondHeader}>Record daily water intake and track</h3>
      <p className={css.trackerBenefits}>Tracker Benefits</p>
      <ul className={css.ulTrackerBenefits}>
        <li className={css.trackerItem}>
          <svg className={css.icon} aria-hidden="true">
            <use href={`${sprite}#icon-calendar`}></use>
          </svg>
          Habit drive
        </li>
        <li className={(css.trackerItem, css.trackerItemAdd)}>
          <svg className={css.icon} aria-hidden="true">
            <use href={`${sprite}#icon-presentation`}></use>
          </svg>
          View statistics
        </li>
        <li className={css.trackerItem}>
          <svg className={css.icon} aria-hidden="true">
            <use href={`${sprite}#icon-wrench`}></use>
          </svg>
          Personal rate setting
        </li>
      </ul>
      <button className={css.btn} href="">
        Try tracker
      </button>
    </div>
  );
}
