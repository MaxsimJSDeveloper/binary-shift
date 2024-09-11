import { useEffect, useId } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoMdClose } from "react-icons/io";
import css from "../DailyNormaModal/DailyNormaModal.module.css";
import * as Yup from "yup";

export default function DailyNormaModal({ closeModal, onSave }) {
  const user = useSelector(selectUser);
  const initialValues = {
    sex: sessionStorage.getItem("gender") || user?.gender,
    inputWeightValue: sessionStorage.getItem("weight") || "0",
    inputTimeValue: sessionStorage.getItem("time") || "0",
    dailyNorma: sessionStorage.getItem("dailyNorma") || "2.0",
  };

  const id = useId();

  const FeedbackSchema = Yup.object().shape({
    sex: Yup.string().required("Please select your gender"),
    inputWeightValue: Yup.number("It must be a number!")
      .positive("Only positive value!")
      .max(200, "Too high")
      .required("Required"),
    inputTimeValue: Yup.number()
      .positive("Only positive value!")
      .min(0)
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

    onSave(values.dailyNorma);

    setSubmitting(false);
    closeModal();
  };

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.closebtn} onClick={closeModal}>
          <IoMdClose className={css.closeicon} />
        </button>
        <div className={css.modaldescr}>
          <h3 className={css.maintitle}>My daily norma</h3>
          <div className={css.formulas}>
            <p className={css.formulaname}>
              For girl:
              <span className={css.formula}>V=(M*0.03) + (T*0.4)</span>
            </p>
            <p className={css.formulaname}>
              For man: <span className={css.formula}>V=(M*0.04) + (T*0.6)</span>
            </p>
          </div>
          <div className={css.formuladescr}>
            <p className={css.descrinfo}>
              <span className={css.symbol}>*</span> V is the volume of the water
              norm in liters per day, M is your body weight, T is the time of
              active sports, or another type of activity commensurate in terms
              of loads (in the absence of these, you must set 0)
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

            // const displayAmount = waterAmount === "0.0" ? "1.8" : waterAmount;
            const displayAmount = waterAmount === "0.0" ? "0.0" : waterAmount;

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
                <div className={css.modalform}>
                  <h4 className={css.titlecalculation}>Calculate your rate:</h4>
                  <div className={css.radiobuttons}>
                    <div className={css.radiocontainer}>
                      <Field
                        type="radio"
                        name="sex"
                        value="female"
                        onChange={handleChange}
                        id={`${id}-gendergirl`}
                      />
                      <label
                        htmlFor={`${id}-gendergirl`}
                        className={css.radiodescr}
                      >
                        For girl
                      </label>
                    </div>
                    <div className={css.radiocontainer}>
                      <Field
                        type="radio"
                        name="sex"
                        value="male"
                        onChange={handleChange}
                        id={`${id}-genderboy`}
                      />
                      <label
                        htmlFor={`${id}-genderboy`}
                        className={css.radiodescr}
                      >
                        For man
                      </label>
                    </div>
                    <ErrorMessage
                      className={css.error}
                      name="sex"
                      component="span"
                    />
                  </div>
                  <div>
                    <div className={css.calculcontainer}>
                      <label className={css.calcdescr} htmlFor={`${id}-weight`}>
                        Your weight in kilograms:
                      </label>
                      <Field
                        className={css.inputcalc}
                        type="text"
                        name="inputWeightValue"
                        value={values.inputWeightValue}
                        onFocus={() => handleFocus("inputWeightValue")}
                        onBlur={() => handleBlur("inputWeightValue")}
                        onChange={(e) =>
                          handleFieldChange("inputWeightValue", e.target.value)
                        }
                        id={`${id}-weight`}
                      />
                      <ErrorMessage
                        className={css.error}
                        name="inputWeightValue"
                        component="span"
                      />
                    </div>
                    <div className={css.calculcontainer}>
                      <label className={css.calcdescr} htmlFor={`${id}-time`}>
                        The time of active participation in sports or other
                        activities with a high physical load in hours:
                      </label>
                      <Field
                        className={css.inputcalc}
                        type="text"
                        name="inputTimeValue"
                        value={values.inputTimeValue}
                        onFocus={() => handleFocus("inputTimeValue")}
                        onBlur={() => handleBlur("inputTimeValue")}
                        onChange={(e) =>
                          handleFieldChange("inputTimeValue", e.target.value)
                        }
                        id={`${id}-time`}
                      />
                      <ErrorMessage
                        className={css.error}
                        name="inputTimeValue"
                        component="span"
                      />
                    </div>
                    <div className={css.reqamountcontainer}>
                      <p className={css.reqdescr}>
                        The required amount of water in liters per day:
                      </p>
                      <span className={css.reqamount}>{displayAmount} L</span>
                    </div>
                  </div>
                </div>
                <div className={css.wateramountcontainer}>
                  <h4 className={css.titlecalculation}>
                    Write down how much water you will drink:
                  </h4>
                  <div className={css.calculcontainer}>
                    <Field
                      className={css.inputcalc}
                      type="text"
                      name="dailyNorma"
                      value={values.dailyNorma}
                      onFocus={() => handleFocus("dailyNorma")}
                      onBlur={() => handleBlur("dailyNorma")}
                      onChange={(e) =>
                        handleFieldChange("dailyNorma", e.target.value)
                      }
                    />
                    <ErrorMessage
                      className={css.error}
                      name="dailyNorma"
                      component="span"
                    />
                  </div>
                </div>
                <div className={css.btncontainer}>
                  <button type="submit" className={css.formbutton}>
                    Save
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
