import css from "../EditTodayListModal/EditTodayListModal.module.css";
import EditWaterForm from "../EditWaterForma/EditWaterForm";

function EditTodayListModal({ onClose, time = "7:00", amountWater = 400, id }) {
  return (
    <div>
      <h2 className={css.title}>Edit the entered amount of water</h2>
      <div className={css.editbox}>
        <svg className={css.icon} width={36} height={36}>
          <use xlinkHref="/src/img/symbol-defs.svg#icon-glass" />
        </svg>
        <p className={css.amount}>{amountWater} ml</p>
        <p className={css.time}>{time}</p>
      </div>
      <p className={css.text}>Correct entered data:</p>
      <EditWaterForm
        onClose={onClose}
        currentTime={time}
        water={amountWater}
        id={id}
      />
    </div>
  );
}

export default EditTodayListModal;
