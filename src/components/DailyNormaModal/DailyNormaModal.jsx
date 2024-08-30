import { useState } from "react";

export default function DailyNormaModal() {
  const [sex, setSex] = useState("man");
  const [inputWeightValue, setInputWeightValue] = useState(0);
  const [inputTimeValue, setInputTimeValue] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(1.8);
  const [dailyNorma, setDailyNorma] = useState(0);

  const handleSexChange = (evt) => {
    setSex(evt.target.value);
    handleAmountChange(evt.target.value, inputWeightValue, inputTimeValue);
  };

  const handleWeightChange = (evt) => {
    const weight = evt.target.value ? parseFloat(evt.target.value) : 0;
    setInputWeightValue(weight);
    handleAmountChange(sex, weight, inputTimeValue);
  };

  const handleTimeChange = (evt) => {
    const time = evt.target.value ? parseFloat(evt.target.value) : 0;
    setInputTimeValue(time);
    handleAmountChange(sex, inputWeightValue, time);
  };

  const handleDrinkChange = (evt) => {
    const norma = evt.target.value ? parseFloat(evt.target.value) : 0;
    setDailyNorma(norma);
  };

  const handleAmountChange = (currentSex, weight, time) => {
    const weightNum = parseFloat(weight) || 0;
    const timeNum = parseFloat(time) || 0;

    if (currentSex === "woman") {
      setRequiredAmount(weightNum * 0.03 + timeNum * 0.4);
    } else {
      setRequiredAmount(weightNum * 0.04 + timeNum * 0.6);
    }
  };

  return (
    <form>
      <div>
        <h3>My daily norma</h3>
        <div>
          <p>
            For woman: <span>V=(M*0.03) + (T*0.4)</span>
          </p>
          <p>
            For man: <span>V=(M*0.04) + (T*0.6)</span>
          </p>
        </div>
        <div>
          <p>
            <span>*</span>V is the volume of the water norm in liters per day, M
            is your body weight, T is the time of active sports, or another type
            of activity commensurate in terms of loads (in the absence of these,
            you must set 0)
          </p>
        </div>
      </div>
      <div>
        <h4>Calculate your rate:</h4>
        <div>
          <label>
            <input
              type="radio"
              name="sex"
              value="woman"
              checked={sex === "woman"}
              onChange={handleSexChange}
            />
            For woman
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="man"
              checked={sex === "man"}
              onChange={handleSexChange}
            />
            For man
          </label>
        </div>
        <div>
          <label>
            Your weight in kilograms:
            <input
              type="text"
              value={inputWeightValue}
              onChange={handleWeightChange}
            />
          </label>
          <label>
            The time of active participation in sports or other activities with
            a high physical load in hours:
            <input
              type="text"
              value={inputTimeValue}
              onChange={handleTimeChange}
            />
          </label>
          <p>
            The required amount of water in liters per day:
            <span>{requiredAmount.toFixed(2)} L</span>
          </p>
        </div>
      </div>
      <div>
        <h4>Write down how much water you will drink:</h4>
        <input type="text" value={dailyNorma} onChange={handleDrinkChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
