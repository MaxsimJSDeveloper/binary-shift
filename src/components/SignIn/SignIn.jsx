import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import css from "./SignIn.module.css";
import toast from "react-hot-toast";
import { logIn } from "../../redux/auth/operations";
import sprite from "../../img/symbol-defs.svg";
import { selectIsLoading } from "../../redux/users/selectors";
import Loader from "../Loader/Loader";


export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too short")
      .max(18, "Too long")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then((data) => {
        toast.success("Login successful!");
        navigate("/home");
      })
      .catch((err) => {
        toast.error("Login failed");
        console.log(err);
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form className={css.form} autoComplete="off">
          <h2 className={css.heading}>Sign In</h2>

          <div className={css.fieldStyle}>
            <label className={css.label}>
              Enter your email
              <Field
                type="email"
                placeholder="E-mail"
                name="email"
                className={`${css.field} ${
                  touched.email && errors.email ? css.error : ""
                }`}
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

            <button type="submit" className={css.btn}>
              Sign In
            </button>
            <button
              type="button"
              className={css.signinLink}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
            {isLoading && <Loader />}
          </div>
        </Form>
      )}
    </Formik>
  );
}
