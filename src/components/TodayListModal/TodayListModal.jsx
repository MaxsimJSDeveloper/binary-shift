// При вызове компонента передать пропс onClose
// <TodayWaterList onClose={handleCloseModal} />

// Исползуется пакет react-hot-toast
// надо установить
// npm install react-hot-toast

import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

import css from "../TodayListModal/TodayListModal.module.css";

const notifyIncorectData = () => toast.error("The data entered is incorrect");
const notifyIncorrectAmount = () =>
  toast.error("The value of the water you drink should be from 1 to 5000");
const notifySuccess = () => toast.success("Successfully created!");

function TodayWaterList({ onClose }) {
  const [amountWater, setAmountWater] = useState(0);
  const [time, setTime] = useState("");
  const [isTimeCorrect, setIsTimeCorrect] = useState(true);
  const [isAmountCorrect, setIsAmountCorrect] = useState(true);

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours());
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const currentTime = `${hours}:${minutes}`;
    setTime(currentTime);
  }, []);

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
  }

  function handleTimeBlur() {
    const timeFormat = /^([0-9]|[0-1][0-9]|2[0-3]):[0-5][0-9]$/;

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
      notifyIncorectData();
      return;
    }
    if (amountWater === 0) {
      notifyIncorrectAmount();
      return;
    }
    if (time.length === 5 && time.startsWith("0")) {
      const mewTime = time.slice(1);
      console.log({ time: mewTime, amountWater });
      notifySuccess();
      setTimeout(onClose, 2000);
      return;
    }
    console.log({ time, amountWater });
    notifySuccess();
    setTimeout(onClose, 2000);
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Add water</h2>
      <p className={css.text}>Choose a value:</p>
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
          <button className={css.submitbtn} type="submit">
            Save
          </button>
        </div>
      </form>
      <Toaster
        containerStyle={{
          top: 100,
        }}
      />
    </div>
  );
}

export default TodayWaterList;
