import css from "./WhyDrinkWater.module.css";

export default function WhyDrinkWater() {
  return (
    <div className={css.background}>
      <p className={css.whyDrink}>Why drink water</p>
      <ul className={css.ulWhyDrink}>
        <li className={(css.liElements, css.liFonts, css.liTop)}>
          Supply of nutrients to all organs
        </li>
        <li className={(css.liFonts, css.liElements)}>
          Providing oxygen to the lungs
        </li>
        <li className={(css.liFonts, css.liElements)}>
          Maintaining the work of the heart
        </li>
        <li className={(css.liFonts, css.liElements)}>
          Release of processed substances
        </li>
        <li className={(css.liFonts, css.liElements)}>
          Ensuring the stability of the internal environment
        </li>
        <li className={(css.liFonts, css.liElements)}>
          Maintaining within the normal temperature
        </li>
        <li className={(css.liFonts, css.liBot)}>
          Maintaining an immune system capable of resisting disease
        </li>
      </ul>
    </div>
  );
}
