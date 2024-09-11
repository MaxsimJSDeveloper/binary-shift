import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import toast from "react-hot-toast";
import css from "../EditWaterForma/EditWaterForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateWater } from "../../redux/water/operations";
import { getWaterToday } from "../../redux/today/operations";
import { fetchMonthWater } from "../../redux/month/operations";
import { selectIsLoading } from "../../redux/today/selectors";
import Loader from "../Loader/Loader";

const notifyIncorectData = () => toast.error("The data entered is incorrect");
const notifyIncorrectAmount = () =>
  toast.error("The value of the water you drink should be from 1 to 5000");
const notifySuccessUpdate = () => toast.success("Successfully utdated!");
const notifyError = () => toast.error("Oops, something went wrong");

function EditWaterForm({ onClose, water = 0, currentTime, id = null }) {
  const [amountWater, setAmountWater] = useState(water);
  const [time, setTime] = useState(currentTime);
  const [isTimeCorrect, setIsTimeCorrect] = useState(true);
  const [isAmountCorrect, setIsAmountCorrect] = useState(true);
  const dispatch = useDispatch();
  const timeFormat = /^([0-9]|[0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    setTime(currentTime);
  }, [currentTime]);

  function setAmountButton(type) {
    if (type === "plus" && amountWater <= 4950) {
      setAmountWater((prev) => (prev += 50));
      setIsAmountCorrect(true);
      return;
    }
    if (type === "minus" && amountWater >= 50) {
      if (amountWater - 50 === 0) setIsAmountCorrect(false);
      setAmountWater((prev) => (prev -= 50));
      return;
    }
    return;
  }

  function handleTimeChange(e) {
    const value = e.target.value;
    const timeFormat = /^[0-9:]*$/;

    if (timeFormat.test(value)) {
      setTime(value);
    }
    if (timeFormat.test(time)) {
      setIsTimeCorrect(true);
    }
  }

  function handleTimeBlur() {
    if (!timeFormat.test(time)) {
      setIsTimeCorrect(false);
    } else {
      setIsTimeCorrect(true);
    }
  }

  function handleAmountChange(e) {
    const value = e.target.value;
    const amountFormat = /^[0-9]*$/;
    const inputValue =
      !amountFormat.test(value) || value === "" ? "" : Number(value);
    setAmountWater(inputValue);
  }

  function handleAmountBlur() {
    const value = Number(amountWater);
    if (value > 5000 || value <= 0 || isNaN(value)) {
      setIsAmountCorrect(false);
    } else {
      setIsAmountCorrect(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isAmountCorrect || !isTimeCorrect) {
      if (amountWater === 0) {
        setIsAmountCorrect(false);
      }
      notifyIncorectData();
      return;
    }
    if (amountWater === 0) {
      setIsAmountCorrect(false);
      notifyIncorrectAmount();
      return;
    }

    const year = new Date().getFullYear();
    const monthNumber = new Date().getMonth()+1;
    const formatMonth = monthNumber.toString().padStart(2, "0");
    const day = new Date().getDate();
    const formatDay = day.toString().padStart(2, "0");
    const formatTime = time.toString().padStart(5, "0");
    const month = new Date().toLocaleString('en-Us', { month: 'long' });

    const date = new Date(
      `${year}-${formatMonth}-${formatDay}T${formatTime}:00`
    );
    const volume = amountWater;

    dispatch(updateWater({ id, date, volume }));
    dispatch(getWaterToday())
      .unwrap()
      .then(() => {
        notifySuccessUpdate();
        dispatch(getWaterToday());
        dispatch(fetchMonthWater({ month, year }));
        setTimeout(onClose, 2000);
      })
      .catch(() => {
        notifyError();
      });
  }
  return (
    <>
      <p className={css.subtext}>Amount of water:</p>
      <div className={css.amountbox}>
        <button
          className={css.amountbtn}
          onClick={() => setAmountButton("minus")}
        >
          <HiMinus size={24} />
        </button>
        <p className={`${css.amount} ${css.textamuont}`}>{amountWater}ml</p>
        <button
          className={css.amountbtn}
          onClick={() => setAmountButton("plus")}
        >
          <HiPlus size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={css.inputwrapper}>
          <label className={css.subtext} htmlFor="time">
            Recording time:
          </label>
          <input
            className={
              isTimeCorrect ? `${css.input}` : `${css.input} ${css.error}`
            }
            type="text"
            id="time"
            name="time"
            value={time}
            onChange={handleTimeChange}
            onBlur={handleTimeBlur}
            placeholder="hh:mm"
          />
          {!isTimeCorrect && (
            <p className={css.errortext}>Enter time in h:mm or hh:mm format</p>
          )}
        </div>
        <div className={css.inputwrapper}>
          <label className={css.text} htmlFor="amount">
            Enter the value of the water used:
          </label>
          <input
            className={
              isAmountCorrect ? `${css.input}` : `${css.input} ${css.error}`
            }
            type="text"
            id="amount"
            name="amount"
            maxLength={4}
            value={amountWater}
            placeholder="1-5000"
            onChange={handleAmountChange}
            onBlur={handleAmountBlur}
          />
          {!isAmountCorrect && (
            <p className={css.errortext}>Enter a value between 1 and 5000</p>
          )}
        </div>
        <div className={css.btnflexbox}>
          <p className={css.textamuont}>{amountWater}ml</p>
          {isLoading && <Loader />}
          <button className={css.submitbtn} type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default EditWaterForm;
