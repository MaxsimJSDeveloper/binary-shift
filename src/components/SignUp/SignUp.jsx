import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import css from "./SignUp.module.css";
import toast from "react-hot-toast";
import { register } from "../../redux/auth/operations";
import sprite from "../../img/symbol-defs.svg";
import { selectIsLoading } from "../../redux/users/selectors";
import Loader from "../Loader/Loader";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const validationControl = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too short")
      .max(18, "Too long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const { email, password } = values;
    dispatch(register({ email, password }))
      .unwrap()
      .then((data) => {
        toast.success("Registration successful!");
        console.log(data);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Registration failed");
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationControl}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form className={css.form} autoComplete="off">
          <h2 className={css.heading}>Sign Up</h2>
          <div className={css.fieldStyle}>
            <label className={css.label}>
              Enter your email
              <Field
                type="email"
                placeholder="Email"
                name="email"
                className={`${css.field} ${
                  touched.email && errors.email ? css.error : ""
                }`}
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              Enter your password
              <div className={css.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className={`${css.field} ${
                    touched.password && errors.password ? css.error : ""
                  }`}
                  autoComplete="password"
                />
                <svg className={css.eyeIcon} onClick={togglePasswordVisibility}>
                  <use
                    xlinkHref={`${sprite}#${
                      showPassword ? "icon-eye-closed" : "icon-eye-open"
                    }`}
                  />
                </svg>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              Repeat password
              <div className={css.passwordWrapper}>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  name="confirmPassword"
                  className={`${css.field} ${
                    touched.confirmPassword && errors.confirmPassword
                      ? css.error
                      : ""
                  }`}
                  autoComplete="password"
                />
                <svg
                  className={css.eyeIcon}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <use
                    xlinkHref={`${sprite}#${
                      showConfirmPassword ? "icon-eye-closed" : "icon-eye-open"
                    }`}
                  />
                </svg>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </label>

            <button type="submit" className={css.btn}>
              Sign Up
            </button>

            <button
              type="button"
              className={css.signinLink}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            {isLoading && <Loader />}
          </div>
        </Form>
      )}
    </Formik>
  );
}
