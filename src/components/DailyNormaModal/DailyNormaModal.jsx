import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoMdClose } from "react-icons/io";
import css from "../DailyNormaModal/DailyNormaModal.module.css";
import * as Yup from "yup";

export default function DailyNormaModal({ closeModal }) {
  const initialValues = {
    sex: sessionStorage.getItem("gender") || "male",
    inputWeightValue: sessionStorage.getItem("weight") || "0",
    inputTimeValue: sessionStorage.getItem("time") || "0",
    dailyNorma: sessionStorage.getItem("dailyNorma") || "0",
  };

  const FeedbackSchema = Yup.object().shape({
    sex: Yup.string().required("Please select your gender"),
    inputWeightValue: Yup.number()
      .positive("Only positive value!")
      .min(10, "Too low")
      .max(200, "Too high")
      .required("Required"),
    inputTimeValue: Yup.number()
      .positive("Only positive value!")
      .max(24, "Too long")
      .required("Required"),
    dailyNorma: Yup.number()
      .positive("Only positive value!")
      .required("Required"),
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleAmountChange = (currentSex, weight, time) => {
    const weightNum = parseFloat(weight) || 0;
    const timeNum = parseFloat(time) || 0;

    if (currentSex === "female") {
      return weightNum * 0.03 + timeNum * 0.4;
    } else {
      return weightNum * 0.04 + timeNum * 0.6;
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    sessionStorage.setItem("gender", values.sex);
    sessionStorage.setItem("weight", values.inputWeightValue);
    sessionStorage.setItem("time", values.inputTimeValue);
    sessionStorage.setItem("dailyNorma", values.dailyNorma);

    setSubmitting(false);
    closeModal();
  };

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.closebtn} onClick={closeModal}>
          <IoMdClose />
        </button>
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
              <span>*</span> V is the volume of the water norm in liters per
              day, M is your body weight, T is the time of active sports, or
              another type of activity commensurate in terms of loads (in the
              absence of these, you must set 0)
            </p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          {({ values, handleChange, setFieldValue }) => {
            const waterAmount = handleAmountChange(
              values.sex,
              values.inputWeightValue,
              values.inputTimeValue
            ).toFixed(1);

            const displayAmount = waterAmount === "0.0" ? "1.8" : waterAmount;

            const handleFieldChange = (field, value) => {
              setFieldValue(field, value);
            };

            const handleFocus = (field) => {
              if (values[field] === "0") {
                handleFieldChange(field, "");
              }
            };

            const handleBlur = (field) => {
              if (values[field] === "") {
                handleFieldChange(field, "0");
              }
            };

            return (
              <Form>
                <div>
                  <h4>Calculate your rate:</h4>
                  <div>
                    <label>For woman</label>
                    <Field
                      type="radio"
                      name="sex"
                      value="female"
                      onChange={handleChange}
                    />
                    <label>For man</label>
                    <Field
                      type="radio"
                      name="sex"
                      value="male"
                      onChange={handleChange}
                    />
                    <ErrorMessage name="sex" component="span" />
                  </div>
                  <div>
                    <label>Your weight in kilograms:</label>
                    <Field
                      type="text"
                      name="inputWeightValue"
                      value={values.inputWeightValue}
                      onFocus={() => handleFocus("inputWeightValue")}
                      onBlur={() => handleBlur("inputWeightValue")}
                      onChange={(e) =>
                        handleFieldChange("inputWeightValue", e.target.value)
                      }
                    />
                    <ErrorMessage name="inputWeightValue" component="span" />
                    <label>
                      The time of active participation in sports or other
                      activities with a high physical load in hours:
                    </label>
                    <Field
                      type="text"
                      name="inputTimeValue"
                      value={values.inputTimeValue}
                      onFocus={() => handleFocus("inputTimeValue")}
                      onBlur={() => handleBlur("inputTimeValue")}
                      onChange={(e) =>
                        handleFieldChange("inputTimeValue", e.target.value)
                      }
                    />
                    <ErrorMessage name="inputTimeValue" component="span" />
                    <p>
                      The required amount of water in liters per day:
                      <span>{displayAmount} L</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4>Write down how much water you will drink:</h4>
                  <Field
                    type="text"
                    name="dailyNorma"
                    value={values.dailyNorma}
                    onFocus={() => handleFocus("dailyNorma")}
                    onBlur={() => handleBlur("dailyNorma")}
                    onChange={(e) =>
                      handleFieldChange("dailyNorma", e.target.value)
                    }
                  />
                  <ErrorMessage name="dailyNorma" component="span" />
                </div>
                <button type="submit">Save</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
